package com.hanzama.mental_health_app.config;

import com.hanzama.mental_health_app.domain.entity.User;
import com.hanzama.mental_health_app.domain.enums.Role;
import com.hanzama.mental_health_app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Data initializer untuk membuat admin user default saat aplikasi pertama kali dijalankan.
 * Admin user ini diperlukan untuk mengakses admin panel dan mengelola sistem.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class AdminDataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        createDefaultAdmin();
    }

    /**
     * Membuat admin user default jika belum ada di database.
     * Credentials default:
     * - Email: admin@projectakasha.com
     * - Password: admin123
     */
    private void createDefaultAdmin() {
        String adminEmail = "admin@projectakasha.com";
        
        if (userRepository.findByEmail(adminEmail).isEmpty()) {
            log.info("Membuat admin user default...");
            
            User admin = User.builder()
                    .firstName("Administrator")
                    .lastName("Project Akasha")
                    .enabled(true)
                    .email(adminEmail)
                    .password(passwordEncoder.encode("admin123"))
                    .role(Role.ADMIN)
                    .build();
            
            userRepository.save(admin);
            
            log.info("Admin user berhasil dibuat:");
            log.info("Email: {}", adminEmail);
            log.info("Password: admin123");
            log.info("PENTING: Segera ganti password default setelah login pertama!");
            
        } else {
            log.info("Admin user sudah ada di database");
        }
    }
}
