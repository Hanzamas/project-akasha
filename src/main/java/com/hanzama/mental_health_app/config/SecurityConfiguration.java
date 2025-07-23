package com.hanzama.mental_health_app.config;

import com.hanzama.mental_health_app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Konfigurasi keamanan utama untuk aplikasi kesehatan mental.
 * Mengimplementasikan dual authentication mechanism:
 * - JWT Token untuk API endpoints (/api/**)
 * - Form Login berbasis sesi untuk Admin Panel (/admin/**)
 */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final UserRepository userRepository;
//     private final JwtAuthFilter jwtAuthFilter;

    /**
     * Konfigurasi utama Security Filter Chain dengan aturan akses yang berbeda
     * untuk API endpoints dan Web endpoints.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtAuthFilter jwtAuthFilter) throws Exception {
        return http
                // Konfigurasi CSRF - nonaktif untuk API, aktif untuk web
                .csrf(csrf -> csrf
                        .ignoringRequestMatchers("/api/**")
                )
                
                // Konfigurasi aturan otorisasi
                .authorizeHttpRequests(authz -> authz
                        // Landing Page - akses publik
                        .requestMatchers("/").permitAll()
                        
                        // Static resources - akses publik (CSS, JS, Images, dll)
                        .requestMatchers("/css/**", "/js/**", "/images/**", "/favicon.ico").permitAll()
                        // .requestMatchers("/admin/css/**", "/admin/js/**", "/admin/images/**").permitAll()
                        
                        // Legal pages - akses publik (sesuai struktur baru)
                        .requestMatchers("/privacy", "/terms", "/disclaimer", "/about", "/help", "/contact").permitAll()
                        .requestMatchers("/pages/legal/**").permitAll()
                        
                        // API Authentication endpoints - akses publik
                        .requestMatchers("/api/auth/**").permitAll()
                        
                        // // Admin Panel - hanya untuk role ADMIN dengan form login
                        // .requestMatchers("/admin/**").hasRole("ADMIN")
                        
                        // API endpoints lainnya - memerlukan JWT authentication
                        .requestMatchers("/api/**").authenticated()
                        
                        // Semua request lainnya memerlukan authentication
                        .anyRequest().authenticated()
                )
                
                // // Konfigurasi Form Login untuk Admin Panel
                // .formLogin(form -> form
                //         .loginPage("/admin/login")
                //         .loginProcessingUrl("/admin/login")
                //         .defaultSuccessUrl("/admin/dashboard", true)
                //         .failureUrl("/admin/login?error=true")
                //         .permitAll()
                // )
                
                // // Konfigurasi Logout untuk Admin Panel
                // .logout(logout -> logout
                //         .logoutUrl("/admin/logout")
                //         .logoutSuccessUrl("/admin/login?logout=true")
                //         .invalidateHttpSession(true)
                //         .deleteCookies("JSESSIONID")
                //         .permitAll()
                // )
                
                // Konfigurasi Session Management
                .sessionManagement(session -> session
                        // API menggunakan stateless (JWT)
                        .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
                        .maximumSessions(1)
                        .maxSessionsPreventsLogin(false)
                )
                
                // Set Authentication Provider
                .authenticationProvider(authenticationProvider())
                
                // Tambahkan JWT filter sebelum UsernamePasswordAuthenticationFilter
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                
                .build();
    }

    /**
     * UserDetailsService bean untuk mengambil data pengguna dari database.
     * Digunakan oleh Spring Security untuk proses authentication.
     */
    @Bean
    public UserDetailsService userDetailsService() {
        return email -> userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "Pengguna dengan email '" + email + "' tidak ditemukan"
                ));
    }

    /**
     * PasswordEncoder bean menggunakan BCrypt untuk hashing password.
     * BCrypt secara otomatis menangani salt dan merupakan standar industri.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * AuthenticationProvider bean yang menghubungkan UserDetailsService
     * dengan PasswordEncoder untuk proses authentication.
     */
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    /**
     * AuthenticationManager bean yang diekspos agar dapat di-inject
     * ke dalam service lain, terutama untuk proses login programmatic.
     */
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
}
