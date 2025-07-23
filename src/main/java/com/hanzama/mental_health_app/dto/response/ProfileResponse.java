package com.hanzama.mental_health_app.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO untuk respons informasi profil pengguna.
 * Berisi data yang aman untuk dikirim ke klien mobile tanpa informasi sensitif.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfileResponse {

    /**
     * ID unik pengguna
     */
    private Long id;

    /**
     * Nama depan pengguna
     */
    private String firstName;

    /**
     * Nama belakang pengguna
     */
    private String lastName;

    /**
     * Email pengguna
     */
    private String email;

    /**
     * Nama lengkap pengguna (gabungan firstName dan lastName)
     */
    public String getFullName() {
        return firstName + " " + lastName;
    }
}
