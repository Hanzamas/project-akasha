package com.hanzama.mental_health_app.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO untuk request update profil pengguna.
 * Berisi data yang dapat diubah oleh pengguna tanpa informasi sensitif seperti password.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfileUpdateRequest {

    /**
     * Nama depan pengguna
     */
    @NotBlank(message = "Nama depan tidak boleh kosong")
    @Size(min = 2, max = 50, message = "Nama depan harus antara 2-50 karakter")
    private String firstName;

    /**
     * Nama belakang pengguna
     */
    @NotBlank(message = "Nama belakang tidak boleh kosong")
    @Size(min = 2, max = 50, message = "Nama belakang harus antara 2-50 karakter")
    private String lastName;
}
