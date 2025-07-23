package com.hanzama.mental_health_app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO untuk response autentikasi.
 * Berisi JWT token yang akan digunakan oleh klien mobile untuk akses API.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {

    /**
     * JWT token untuk autentikasi API endpoints
     */
    private String token;
}
