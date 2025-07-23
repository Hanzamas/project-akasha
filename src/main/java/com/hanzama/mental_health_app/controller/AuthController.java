package com.hanzama.mental_health_app.controller;

import com.hanzama.mental_health_app.dto.AuthResponse;
import com.hanzama.mental_health_app.dto.LoginRequest;
import com.hanzama.mental_health_app.dto.RegisterRequest;
import com.hanzama.mental_health_app.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST Controller untuk menangani endpoint autentikasi.
 * Menyediakan endpoint untuk registrasi dan login pengguna melalui API.
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthService authService;

    /**
     * Endpoint untuk registrasi pengguna baru.
     * 
     * @param registerRequest data registrasi yang dikirim dari klien
     * @return ResponseEntity berisi AuthResponse dengan JWT token
     */
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest registerRequest) {
        log.info("Menerima request registrasi untuk email: {}", registerRequest.getEmail());
        
        try {
            AuthResponse response = authService.register(registerRequest);
            log.info("Registrasi berhasil untuk email: {}", registerRequest.getEmail());
            
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
            
        } catch (Exception e) {
            log.error("Gagal melakukan registrasi untuk email: {}. Error: {}", 
                    registerRequest.getEmail(), e.getMessage());
            throw e;
        }
    }

    /**
     * Endpoint untuk login pengguna.
     * 
     * @param loginRequest data login yang berisi email dan password
     * @return ResponseEntity berisi AuthResponse dengan JWT token
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest) {
        log.info("Menerima request login untuk email: {}", loginRequest.getEmail());
        
        try {
            AuthResponse response = authService.login(loginRequest);
            log.info("Login berhasil untuk email: {}", loginRequest.getEmail());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("Gagal melakukan login untuk email: {}. Error: {}", 
                    loginRequest.getEmail(), e.getMessage());
            throw e;
        }
    }
}
