package com.hanzama.mental_health_app.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * WebPageController - Controller utama untuk semua halaman web publik
 * 
 * Controller ini menggabungkan fungsi dari:
 * - LandingPageController (Landing page utama)
 * - PageController (Halaman informasi)
 * - LegalPagesController (Halaman legal)
 * 
 * Menangani semua endpoint publik yang dapat diakses tanpa autentikasi:
 * - Landing page (/)
 * - Halaman informasi (about, help, contact)
 * - Halaman legal (privacy, terms, disclaimer)
 * 
 * Semua halaman menggunakan struktur master layout dari layouts/main.html
 * 
 * @author Hanzama
 * @version 2.0
 * @since 2025-01-22
 */
@Controller
@Slf4j
public class WebPageController {

    // ==================== LANDING PAGE ====================
    
    /**
     * Endpoint untuk menampilkan landing page aplikasi.
     * Halaman utama yang dapat diakses oleh siapa saja tanpa autentikasi.
     * 
     * @param model Model object untuk meneruskan data ke template Thymeleaf
     * @return nama template yang akan dirender
     */
    @GetMapping("/")
    public String showLandingPage(Model model, HttpServletRequest request) {
        log.info("Request untuk landing page diterima");
        
        // Menambahkan atribut-atribut untuk template Thymeleaf
        model.addAttribute("pageTitle", "Project Akasha: Ubah Luka Menjadi Kekuatan");
        model.addAttribute("pageDescription", "Platform kesehatan mental yang aman dan terpercaya untuk mendukung perjalanan pemulihan Anda");
        model.addAttribute("headline", "Saat Korban Menjadi Pahlawan");
        model.addAttribute("characterImage", "/images/cover-character.jpg");
        model.addAttribute("developerName", "Hanzama Development");
        model.addAttribute("currentYear", "2025");
        
        // Data untuk CTA dan fitur
        model.addAttribute("ctaText", "Mulai Perjalanan Anda");
        model.addAttribute("platformName", "Project Akasha");
        
        // Tambahkan current path untuk navigasi
        model.addAttribute("currentPath", request.getRequestURI());
        
        log.info("Landing page berhasil dimuat dengan atribut lengkap");
        
        return "pages/index";
    }

    // ==================== HALAMAN INFORMASI ====================

    /**
     * Menampilkan halaman Tentang Kami
     * Berisi informasi tentang misi, visi, dan tim Project Akasha.
     * 
     * @param model Model untuk menyimpan data yang akan ditampilkan
     * @return View name untuk halaman About
     */
    @GetMapping("/about")
    public String showAboutPage(Model model, HttpServletRequest request) {
        log.info("Request untuk halaman About diterima");
        
        // Meta data halaman
        model.addAttribute("pageTitle", "Tentang Kami - Project Akasha");
        model.addAttribute("pageDescription", 
            "Pelajari lebih lanjut tentang Project Akasha - platform kesehatan mental yang aman, terpercaya, dan mudah diakses untuk semua.");
        
        // Data pengembang dan perusahaan
        model.addAttribute("developerName", "Hanzama");
        model.addAttribute("currentYear", "2025");
        model.addAttribute("foundingYear", "2024");
        model.addAttribute("companyName", "PT. Akasha Digital Indonesia");
        
        // Konten mission dan vision
        model.addAttribute("missionStatement", 
            "Menyediakan platform kesehatan mental yang aman, mudah diakses, dan berbasis komunitas untuk mendukung perjalanan pemulihan setiap individu.");
        model.addAttribute("visionStatement", 
            "Menciptakan sebuah dunia di mana tidak ada seorang pun yang harus merasa sendirian dalam perjuangan kesehatan mental mereka, dan setiap orang memiliki akses ke dukungan yang mereka butuhkan untuk tumbuh dan pulih.");
        
        // Tambahkan current path untuk navigasi
        model.addAttribute("currentPath", request.getRequestURI());
        
        log.info("Halaman About berhasil dimuat");
        return "pages/legal/about";
    }

    /**
     * Menampilkan halaman Pusat Bantuan & FAQ
     * Berisi FAQ dan panduan penggunaan platform.
     * 
     * @param model Model untuk menyimpan data yang akan ditampilkan
     * @return View name untuk halaman Help
     */
    @GetMapping("/help")
    public String showHelpPage(Model model, HttpServletRequest request) {
        log.info("Request untuk halaman Help diterima");
        
        // Meta data halaman
        model.addAttribute("pageTitle", "Pusat Bantuan & FAQ - Project Akasha");
        model.addAttribute("pageDescription", 
            "Temukan jawaban untuk pertanyaan umum tentang Project Akasha dan cara menggunakan platform kesehatan mental kami");
        
        // Kontak support
        model.addAttribute("supportEmail", "support@projectakasha.com");
        model.addAttribute("technicalEmail", "tech@projectakasha.com");
        model.addAttribute("responseTime", "1-2 hari kerja");
        
        // Nomor darurat dan hotline
        model.addAttribute("emergencyNumber", "119");
        model.addAttribute("mentalHealthHotline", "021-7256526");
        model.addAttribute("suicidePreventionHotline", "021-3190-4343");
        
        // Data platform
        model.addAttribute("platformName", "Project Akasha");
        
        // Tambahkan current path untuk navigasi
        model.addAttribute("currentPath", request.getRequestURI());
        
        log.info("Halaman Help berhasil dimuat");
        return "pages/legal/help";
    }

    /**
     * Menampilkan halaman Kontak
     * Berisi informasi kontak dan cara menghubungi tim.
     * 
     * @param model Model untuk menyimpan data yang akan ditampilkan
     * @return View name untuk halaman Contact
     */
    @GetMapping("/contact")
    public String showContactPage(Model model, HttpServletRequest request) {
        log.info("Request untuk halaman Contact diterima");
        
        // Meta data halaman
        model.addAttribute("pageTitle", "Hubungi Kami - Project Akasha");
        model.addAttribute("pageDescription", 
            "Hubungi tim Project Akasha untuk pertanyaan, dukungan, atau kerjasama dalam bidang kesehatan mental");
        
        // Email kontak
        model.addAttribute("generalEmail", "hello@projectakasha.com");
        model.addAttribute("supportEmail", "support@projectakasha.com");
        model.addAttribute("businessEmail", "business@projectakasha.com");
        model.addAttribute("mediaEmail", "media@projectakasha.com");
        model.addAttribute("legalEmail", "legal@projectakasha.com");
        
        // Nomor darurat
        model.addAttribute("emergencyNumber", "119");
        model.addAttribute("phone", "+62 21 1234 5678");
        
        // Informasi perusahaan
        model.addAttribute("companyName", "PT. Akasha Digital Indonesia");
        model.addAttribute("address", "Jakarta, Indonesia");
        model.addAttribute("businessHours", "Senin - Jumat, 09:00 - 17:00 WIB");
        model.addAttribute("developerName", "Hanzama");
        
        // Social media links
        model.addAttribute("instagramUrl", "https://instagram.com/projectakasha");
        model.addAttribute("twitterUrl", "https://twitter.com/projectakasha");
        model.addAttribute("linkedinUrl", "https://linkedin.com/company/projectakasha");
        model.addAttribute("youtubeUrl", "https://youtube.com/@projectakasha");
        
        // Tambahkan current path untuk navigasi
        model.addAttribute("currentPath", request.getRequestURI());
        
        log.info("Halaman Contact berhasil dimuat");
        return "pages/legal/contact";
    }

    // ==================== HALAMAN LEGAL ====================

    /**
     * Menampilkan halaman Kebijakan Privasi (Privacy Policy).
     * Halaman ini menjelaskan bagaimana data pengguna dikumpulkan, digunakan, dan dilindungi.
     * 
     * @param model Spring Model untuk passing data ke template
     * @return String nama template Thymeleaf
     */
    @GetMapping("/privacy")
    public String showPrivacyPolicy(Model model, HttpServletRequest request) {
        log.info("Request untuk halaman Privacy Policy diterima");
        
        // Meta data halaman
        model.addAttribute("pageTitle", "Kebijakan Privasi - Project Akasha");
        model.addAttribute("pageDescription", 
            "Kebijakan privasi Project Akasha - Platform kesehatan mental yang melindungi data dan privasi pengguna");
        
        // Data update dan kontak
        model.addAttribute("lastUpdated", "15 Januari 2025");
        model.addAttribute("effectiveDate", "15 Januari 2025");
        model.addAttribute("companyName", "PT. Akasha Digital Indonesia");
        model.addAttribute("contactEmail", "privacy@projectakasha.com");
        model.addAttribute("dpoEmail", "dpo@projectakasha.com");
        model.addAttribute("legalEmail", "legal@projectakasha.com");
        
        // Data platform
        model.addAttribute("platformName", "Project Akasha");
        
        // Tambahkan current path untuk navigasi
        model.addAttribute("currentPath", request.getRequestURI());
        
        log.info("Halaman Privacy Policy berhasil dimuat");
        return "pages/legal/privacy";
    }

    /**
     * Menampilkan halaman Syarat & Ketentuan (Terms of Service).
     * Halaman ini berisi aturan dan ketentuan penggunaan platform.
     * 
     * @param model Spring Model untuk passing data ke template
     * @return String nama template Thymeleaf
     */
    @GetMapping("/terms")
    public String showTermsOfService(Model model, HttpServletRequest request) {
        log.info("Request untuk halaman Terms of Service diterima");
        
        // Meta data halaman
        model.addAttribute("pageTitle", "Syarat dan Ketentuan - Project Akasha");
        model.addAttribute("pageDescription", 
            "Syarat dan ketentuan penggunaan platform Project Akasha - Ketahui hak dan kewajiban Anda sebagai pengguna");
        
        // Data update dan kontak
        model.addAttribute("lastUpdated", "15 Januari 2025");
        model.addAttribute("effectiveDate", "15 Januari 2025");
        model.addAttribute("companyName", "PT. Akasha Digital Indonesia");
        model.addAttribute("contactEmail", "legal@projectakasha.com");
        model.addAttribute("supportEmail", "support@projectakasha.com");
        
        // Data platform dan kebijakan
        model.addAttribute("platformName", "Project Akasha");
        model.addAttribute("minimumAge", "18");
        model.addAttribute("jurisdiction", "Republik Indonesia");
        
        // Tambahkan current path untuk navigasi
        model.addAttribute("currentPath", request.getRequestURI());
        
        log.info("Halaman Terms of Service berhasil dimuat");
        return "pages/legal/terms";
    }

    /**
     * Menampilkan halaman Disclaimer (Sangkalan).
     * Halaman ini berisi pembatasan tanggung jawab dan peringatan penting
     * terkait penggunaan platform kesehatan mental.
     * 
     * @param model Spring Model untuk passing data ke template
     * @return String nama template Thymeleaf
     */
    @GetMapping("/disclaimer")
    public String showDisclaimer(Model model) {
        log.info("Request untuk halaman Disclaimer diterima");
        
        // Meta data halaman
        model.addAttribute("pageTitle", "Disclaimer - Project Akasha");
        model.addAttribute("pageDescription", 
            "Disclaimer Project Akasha - Informasi penting tentang batasan layanan dan tanggung jawab platform kesehatan mental");
        
        // Data update dan kontak
        model.addAttribute("lastUpdated", "15 Januari 2025");
        model.addAttribute("companyName", "PT. Akasha Digital Indonesia");
        model.addAttribute("contactEmail", "legal@projectakasha.com");
        model.addAttribute("emergencyNumber", "119");
        
        // Data khusus disclaimer
        model.addAttribute("platformName", "Project Akasha");
        model.addAttribute("jurisdiction", "Republik Indonesia");
        
        log.info("Halaman Disclaimer berhasil dimuat");
        return "pages/legal/disclaimer";
    }

    // ==================== ERROR HANDLING ====================

    /**
     * Error handler untuk halaman yang tidak ditemukan
     * Redirect ke halaman error 404 dengan informasi yang helpful
     */
    @GetMapping("/error/404")
    public String handleNotFound(Model model) {
        log.warn("404 error - halaman tidak ditemukan");
        
        model.addAttribute("pageTitle", "Halaman Tidak Ditemukan - Project Akasha");
        model.addAttribute("pageDescription", "Halaman yang Anda cari tidak ditemukan di Project Akasha");
        model.addAttribute("errorMessage", "Halaman yang Anda cari tidak ditemukan.");
        model.addAttribute("errorCode", "404");
        model.addAttribute("supportEmail", "support@projectakasha.com");
        
        return "error/404";
    }
}
