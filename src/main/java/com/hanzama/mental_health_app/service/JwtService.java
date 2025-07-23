package com.hanzama.mental_health_app.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

/**
 * Service untuk menangani operasi JWT (JSON Web Token).
 * Menyediakan fungsi untuk generate token, ekstrak data dari token, dan validasi token.
 */
@Service
@Slf4j
public class JwtService {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration:86400000}") // Default 24 jam dalam milliseconds
    private long jwtExpiration;

    /**
     * Membuat JWT token baru untuk pengguna.
     * 
     * @param userDetails detail pengguna yang akan dibuatkan token
     * @return JWT token string
     */
    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    /**
     * Membuat JWT token dengan claims tambahan.
     * 
     * @param extraClaims claims tambahan yang ingin ditambahkan ke token
     * @param userDetails detail pengguna yang akan dibuatkan token
     * @return JWT token string
     */
    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        return buildToken(extraClaims, userDetails, jwtExpiration);
    }

    /**
     * Mengekstrak username (email) dari JWT token.
     * 
     * @param token JWT token
     * @return username (email) dari token
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Mengekstrak tanggal expiration dari JWT token.
     * 
     * @param token JWT token
     * @return tanggal expiration
     */
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /**
     * Mengekstrak claim spesifik dari JWT token.
     * 
     * @param token JWT token
     * @param claimsResolver function untuk mengekstrak claim yang diinginkan
     * @param <T> tipe data claim
     * @return nilai claim
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * Memvalidasi apakah JWT token valid untuk pengguna tertentu.
     * 
     * @param token JWT token yang akan divalidasi
     * @param userDetails detail pengguna untuk membandingkan dengan token
     * @return true jika token valid, false jika tidak
     */
    public boolean isTokenValid(String token, UserDetails userDetails) {
        try {
            final String username = extractUsername(token);
            return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
        } catch (Exception e) {
            log.warn("Token validation failed: {}", e.getMessage());
            return false;
        }
    }

    /**
     * Memeriksa apakah JWT token sudah expired.
     * 
     * @param token JWT token
     * @return true jika token sudah expired, false jika masih valid
     */
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    /**
     * Membangun JWT token dengan parameter yang diberikan.
     * 
     * @param extraClaims claims tambahan
     * @param userDetails detail pengguna
     * @param expiration waktu expiration dalam milliseconds
     * @return JWT token string
     */
    private String buildToken(Map<String, Object> extraClaims, UserDetails userDetails, long expiration) {
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Mengekstrak semua claims dari JWT token.
     * 
     * @param token JWT token
     * @return claims object
     */
    private Claims extractAllClaims(String token) {
        return Jwts
                .parser()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * Mendapatkan signing key untuk JWT dari secret key.
     * 
     * @return Key object untuk signing JWT
     */
    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
