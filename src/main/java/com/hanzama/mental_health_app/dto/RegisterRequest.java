package com.hanzama.mental_health_app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO untuk request registrasi pengguna baru.
 * Berisi semua informasi yang diperlukan untuk membuat akun pengguna.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {

    /**
     * Nama depan pengguna
     */
    private String firstName;

    /**
     * Nama belakang pengguna
     */
    private String lastName;

    /**
     * Alamat email pengguna (akan digunakan sebagai username)
     */
    private String email;

    /**
     * Password pengguna (akan di-hash sebelum disimpan)
     */
    private String password;
}
