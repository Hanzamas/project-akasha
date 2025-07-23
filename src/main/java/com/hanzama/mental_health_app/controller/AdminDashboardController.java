package com.hanzama.mental_health_app.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Web Controller untuk menangani Dashboard Admin Panel.
 * Menyediakan halaman dashboard untuk administrator yang telah berhasil login.
 * 
 * Controller ini menggunakan Thymeleaf untuk render dashboard admin
 * dan hanya dapat diakses oleh pengguna dengan role ADMIN.
 */
@Controller
@RequestMapping("/admin")
@RequiredArgsConstructor
@Slf4j
public class AdminDashboardController {

    /**
     * Menampilkan halaman dashboard admin setelah login berhasil.
     * 
     * Method ini akan:
     * - Memuat informasi admin yang sedang login
     * - Menyiapkan data untuk ditampilkan di dashboard
     * - Render template dashboard admin
     * 
     * @param model Spring Model untuk passing data ke template
     * @return String nama template Thymeleaf
     */
    @GetMapping("/dashboard")
    public String showDashboard(Model model) {
        log.info("Request untuk dashboard admin diterima");
        
        // Ambil informasi authentication dari security context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        if (authentication != null && authentication.isAuthenticated()) {
            String adminEmail = authentication.getName();
            log.info("Menampilkan dashboard admin untuk: {}", adminEmail);
            
            // Tambahkan data ke model untuk ditampilkan di template
            model.addAttribute("adminEmail", adminEmail);
            model.addAttribute("pageTitle", "Admin Dashboard - Project Akasha");
            model.addAttribute("welcomeMessage", "Selamat datang di Admin Panel Project Akasha");
        }
        
        log.info("Dashboard admin berhasil dimuat");
        return "/pages/admin/dashboard";
    }
}
