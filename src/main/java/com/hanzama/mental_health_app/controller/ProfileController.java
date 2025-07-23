package com.hanzama.mental_health_app.controller;

import com.hanzama.mental_health_app.domain.entity.User;
import com.hanzama.mental_health_app.dto.request.ProfileUpdateRequest;
import com.hanzama.mental_health_app.dto.response.ProfileResponse;
import com.hanzama.mental_health_app.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

/**
 * REST Controller untuk menangani endpoint manajemen profil pengguna.
 * Menyediakan endpoint untuk melihat dan memperbarui informasi profil pengguna yang sedang login.
 */
@RestController
@RequestMapping("/api/me/profile")
@RequiredArgsConstructor
@Slf4j
public class ProfileController {

    private final AuthService authService;

    /**
     * Endpoint untuk mendapatkan informasi profil pengguna yang sedang login.
     * 
     * @param currentUser pengguna yang sedang login (dari JWT token)
     * @return ResponseEntity berisi ProfileResponse dengan informasi profil
     */
    @GetMapping
    public ResponseEntity<ProfileResponse> getMyProfile(
            @AuthenticationPrincipal User currentUser) {
        
        log.info("Request untuk mendapatkan profil dari pengguna: {}", currentUser.getEmail());
        
        try {
            ProfileResponse profile = authService.getMyProfile(currentUser);
            log.info("Berhasil mengambil profil untuk pengguna: {}", currentUser.getEmail());
            
            return ResponseEntity.ok(profile);
            
        } catch (Exception e) {
            log.error("Gagal mengambil profil untuk pengguna: {}. Error: {}", 
                    currentUser.getEmail(), e.getMessage());
            throw e;
        }
    }

    /**
     * Endpoint untuk memperbarui informasi profil pengguna yang sedang login.
     * 
     * @param request data profil yang akan diperbarui
     * @param currentUser pengguna yang sedang login (dari JWT token)
     * @return ResponseEntity berisi ProfileResponse dengan informasi profil yang sudah diperbarui
     */
    @PutMapping
    public ResponseEntity<ProfileResponse> updateMyProfile(
            @Valid @RequestBody ProfileUpdateRequest request,
            @AuthenticationPrincipal User currentUser) {
        
        log.info("Request untuk memperbarui profil dari pengguna: {} dengan data: {}", 
                currentUser.getEmail(), request);
        
        try {
            ProfileResponse updatedProfile = authService.updateMyProfile(request, currentUser);
            log.info("Berhasil memperbarui profil untuk pengguna: {}", currentUser.getEmail());
            
            return ResponseEntity.ok(updatedProfile);
            
        } catch (Exception e) {
            log.error("Gagal memperbarui profil untuk pengguna: {}. Error: {}", 
                    currentUser.getEmail(), e.getMessage());
            throw e;
        }
    }
}
