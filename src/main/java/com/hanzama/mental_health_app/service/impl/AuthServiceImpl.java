package com.hanzama.mental_health_app.service.impl;

import com.hanzama.mental_health_app.domain.entity.User;
import com.hanzama.mental_health_app.domain.enums.Role;
import com.hanzama.mental_health_app.dto.AuthResponse;
import com.hanzama.mental_health_app.dto.LoginRequest;
import com.hanzama.mental_health_app.dto.RegisterRequest;
import com.hanzama.mental_health_app.dto.request.ProfileUpdateRequest;
import com.hanzama.mental_health_app.dto.response.ProfileResponse;
import com.hanzama.mental_health_app.repository.UserRepository;
import com.hanzama.mental_health_app.service.AuthService;
import com.hanzama.mental_health_app.service.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Implementasi dari AuthService yang menangani logika bisnis untuk autentikasi dan registrasi.
 * Mengintegrasikan Spring Security dengan JWT untuk proses authentication.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    /**
     * Melakukan registrasi pengguna baru ke dalam sistem.
     * 
     * @param request data registrasi yang berisi informasi pengguna baru
     * @return AuthResponse yang berisi token JWT untuk pengguna yang baru terdaftar
     */
    @Override
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        log.info("Memulai proses registrasi untuk email: {}", request.getEmail());
        
        // Validasi email sudah terdaftar atau belum
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            log.warn("Percobaan registrasi dengan email yang sudah terdaftar: {}", request.getEmail());
            throw new RuntimeException("Email sudah terdaftar dalam sistem");
        }

        // Buat objek User baru dari RegisterRequest
        User newUser = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword())) // Enkripsi password
                .role(Role.USER) // Default role adalah USER
                .enabled(true)
                .accountNonExpired(true)
                .accountNonLocked(true)
                .credentialsNonExpired(true)
                .build();

        // Simpan user baru ke database
        User savedUser = userRepository.save(newUser);
        log.info("Pengguna baru berhasil terdaftar dengan ID: {} dan email: {}", 
                savedUser.getId(), savedUser.getEmail());

        // Hasilkan token JWT untuk user yang baru dibuat
        String token = jwtService.generateToken(savedUser);
        
        log.info("Token JWT berhasil dibuat untuk pengguna: {}", savedUser.getEmail());

        // Kembalikan AuthResponse yang berisi token
        return AuthResponse.builder()
                .token(token)
                .build();
    }

    /**
     * Melakukan autentikasi pengguna yang sudah terdaftar.
     * 
     * @param request data login yang berisi email dan password
     * @return AuthResponse yang berisi token JWT untuk pengguna yang berhasil login
     */
    @Override
    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        log.info("Memulai proses login untuk email: {}", request.getEmail());

        try {
            // Otentikasi pengguna menggunakan AuthenticationManager
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );

            log.info("Autentikasi berhasil untuk email: {}", request.getEmail());

            // Cari data user dari database berdasarkan email
            User user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> {
                        log.error("User tidak ditemukan setelah autentikasi berhasil: {}", request.getEmail());
                        return new RuntimeException("Data pengguna tidak ditemukan");
                    });

            // Hasilkan token JWT untuk user tersebut
            String token = jwtService.generateToken(user);
            
            log.info("Login berhasil untuk pengguna: {} dengan role: {}", 
                    user.getEmail(), user.getRole());

            // Kembalikan AuthResponse yang berisi token
            return AuthResponse.builder()
                    .token(token)
                    .build();

        } catch (Exception e) {
            log.warn("Gagal melakukan login untuk email: {}. Error: {}", 
                    request.getEmail(), e.getMessage());
            throw new RuntimeException("Email atau password tidak valid");
        }
    }

    /**
     * Mendapatkan informasi profil pengguna yang sedang login.
     * 
     * @param currentUser pengguna yang sedang login
     * @return ProfileResponse yang berisi informasi profil pengguna
     */
    @Override
    @Transactional(readOnly = true)
    public ProfileResponse getMyProfile(User currentUser) {
        log.info("Mengambil profil untuk pengguna: {}", currentUser.getEmail());

        // Mapping data User ke ProfileResponse
        return ProfileResponse.builder()
                .id(currentUser.getId())
                .firstName(currentUser.getFirstName())
                .lastName(currentUser.getLastName())
                .email(currentUser.getEmail())
                .build();
    }

    /**
     * Memperbarui informasi profil pengguna yang sedang login.
     * 
     * @param request data profil yang akan diperbarui
     * @param currentUser pengguna yang sedang login
     * @return ProfileResponse yang berisi informasi profil yang sudah diperbarui
     */
    @Override
    @Transactional
    public ProfileResponse updateMyProfile(ProfileUpdateRequest request, User currentUser) {
        log.info("Memperbarui profil untuk pengguna: {} dari '{}' ke '{} {}'", 
                currentUser.getEmail(), 
                currentUser.getFullName(), 
                request.getFirstName(), 
                request.getLastName());

        // Ambil data user dari database berdasarkan ID
        User user = userRepository.findById(currentUser.getId())
                .orElseThrow(() -> {
                    log.error("User tidak ditemukan dengan ID: {}", currentUser.getId());
                    return new RuntimeException("Data pengguna tidak ditemukan");
                });

        // Update field firstName dan lastName dari DTO
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());

        // Simpan perubahan ke database
        User updatedUser = userRepository.save(user);
        
        log.info("Profil berhasil diperbarui untuk pengguna: {} menjadi '{}'", 
                updatedUser.getEmail(), updatedUser.getFullName());

        // Kembalikan sebagai ProfileResponse
        return ProfileResponse.builder()
                .id(updatedUser.getId())
                .firstName(updatedUser.getFirstName())
                .lastName(updatedUser.getLastName())
                .email(updatedUser.getEmail())
                .build();
    }
}
