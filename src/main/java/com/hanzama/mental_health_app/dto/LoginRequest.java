package com.hanzama.mental_health_app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO untuk request login pengguna.
 * Berisi kredensial yang diperlukan untuk autentikasi.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {

    /**
     * Alamat email pengguna yang berfungsi sebagai username
     */
    private String email;

    /**
     * Password pengguna
     */
    private String password;
}
