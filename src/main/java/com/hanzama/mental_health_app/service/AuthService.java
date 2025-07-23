package com.hanzama.mental_health_app.service;

import com.hanzama.mental_health_app.domain.entity.User;
import com.hanzama.mental_health_app.dto.AuthResponse;
import com.hanzama.mental_health_app.dto.LoginRequest;
import com.hanzama.mental_health_app.dto.RegisterRequest;
import com.hanzama.mental_health_app.dto.request.ProfileUpdateRequest;
import com.hanzama.mental_health_app.dto.response.ProfileResponse;

/**
 * Interface untuk Service layer yang menangani autentikasi dan registrasi pengguna.
 * Menyediakan kontrak untuk operasi login dan register dalam aplikasi kesehatan mental.
 */
public interface AuthService {

    /**
     * Melakukan registrasi pengguna baru ke dalam sistem.
     * 
     * @param request data registrasi yang berisi informasi pengguna baru
     * @return AuthResponse yang berisi token JWT dan informasi pengguna
     */
    AuthResponse register(RegisterRequest request);

    /**
     * Melakukan autentikasi pengguna yang sudah terdaftar.
     * 
     * @param request data login yang berisi email dan password
     * @return AuthResponse yang berisi token JWT dan informasi pengguna
     */
    AuthResponse login(LoginRequest request);

    /**
     * Mendapatkan informasi profil pengguna yang sedang login.
     * 
     * @param currentUser pengguna yang sedang login
     * @return ProfileResponse yang berisi informasi profil pengguna
     */
    ProfileResponse getMyProfile(User currentUser);

    /**
     * Memperbarui informasi profil pengguna yang sedang login.
     * 
     * @param request data profil yang akan diperbarui
     * @param currentUser pengguna yang sedang login
     * @return ProfileResponse yang berisi informasi profil yang sudah diperbarui
     */
    ProfileResponse updateMyProfile(ProfileUpdateRequest request, User currentUser);
}
