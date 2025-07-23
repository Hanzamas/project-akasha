// package com.hanzama.mental_health_app.controller;

// import lombok.RequiredArgsConstructor;
// import lombok.extern.slf4j.Slf4j;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.stereotype.Controller;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.RequestMapping;

// /**
//  * Web Controller untuk menangani halaman login Admin Panel.
//  * Mengatur tampilan form login untuk admin dan mengecek status authentication.
//  * 
//  * Controller ini menggunakan Thymeleaf untuk render halaman login admin
//  * dan terintegrasi dengan Spring Security form login configuration.
//  */
// @Controller
// @RequestMapping("/admin")
// @RequiredArgsConstructor
// @Slf4j
// public class AdminAuthController {

//     /**
//      * Menampilkan halaman login untuk admin panel.
//      * 
//      * Method ini akan:
//      * - Memeriksa apakah pengguna sudah login sebagai admin
//      * - Jika sudah login, redirect ke dashboard admin
//      * - Jika belum login, tampilkan halaman login
//      * 
//      * @return String nama template Thymeleaf atau redirect URL
//      */
//     @GetMapping("/login")
//     public String showLoginPage() {
//         log.info("Request untuk halaman login admin diterima");
        
//         // Ambil informasi authentication dari security context
//         Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
//         // Periksa apakah pengguna sudah terutentikasi dan memiliki role ADMIN
//         if (authentication != null && 
//             authentication.isAuthenticated() && 
//             !authentication.getName().equals("anonymousUser")) {
            
//             // Periksa apakah pengguna memiliki role ADMIN
//             boolean isAdmin = authentication.getAuthorities().stream()
//                     .anyMatch(grantedAuthority -> 
//                             grantedAuthority.getAuthority().equals("ROLE_ADMIN"));
            
//             if (isAdmin) {
//                 log.info("Admin sudah login, redirect ke dashboard: {}", authentication.getName());
//                 return "redirect:/pages/admin/dashboard";
//             }
//         }
        
//         log.info("Menampilkan halaman login admin");
//         return "pages/admin/login";
//     }
// }
