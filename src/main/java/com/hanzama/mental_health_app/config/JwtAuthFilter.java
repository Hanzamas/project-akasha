package com.hanzama.mental_health_app.config;

import com.hanzama.mental_health_app.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * Filter untuk memproses JWT authentication pada setiap request.
 * Filter ini akan mengecek Authorization header dan memvalidasi JWT token.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    /**
     * Melakukan filtering pada setiap HTTP request untuk memproses JWT authentication.
     * 
     * @param request HTTP request
     * @param response HTTP response
     * @param filterChain filter chain untuk melanjutkan ke filter berikutnya
     * @throws ServletException jika terjadi error dalam servlet
     * @throws IOException jika terjadi error I/O
     */
    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        
        // Skip JWT processing untuk endpoint auth
        if (request.getServletPath().contains("/api/auth")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Ambil Authorization header dari request
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;

        // Jika header tidak ada atau tidak dimulai dengan "Bearer ", lanjutkan ke filter berikutnya
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            log.debug("No valid Authorization header found for request: {}", request.getRequestURI());
            filterChain.doFilter(request, response);
            return;
        }

        // Ekstrak token JWT (setelah "Bearer ")
        jwt = authHeader.substring(7);
        
        try {
            // Ekstrak username (email) dari token menggunakan jwtService
            userEmail = jwtService.extractUsername(jwt);

            // Jika username ada dan belum ada otentikasi di SecurityContextHolder
            if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                
                // Muat UserDetails dari userDetailsService
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);

                // Validasi token menggunakan jwtService.isTokenValid()
                if (jwtService.isTokenValid(jwt, userDetails)) {
                    
                    // Jika valid, buat UsernamePasswordAuthenticationToken
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );
                    
                    // Set details untuk authentication token
                    authToken.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                    );
                    
                    // Simpan authentication ke SecurityContextHolder
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    
                    log.debug("JWT authentication successful for user: {}", userEmail);
                } else {
                    log.warn("Invalid JWT token for user: {}", userEmail);
                }
            }
        } catch (Exception e) {
            log.error("Cannot set user authentication from JWT token: {}", e.getMessage());
            // Clear security context jika terjadi error
            SecurityContextHolder.clearContext();
        }

        // Setelah selesai, panggil filterChain.doFilter(request, response)
        filterChain.doFilter(request, response);
    }
}
