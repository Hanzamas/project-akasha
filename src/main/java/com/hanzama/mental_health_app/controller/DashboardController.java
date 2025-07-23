package com.hanzama.mental_health_app.controller;

import com.hanzama.mental_health_app.domain.entity.User;
import com.hanzama.mental_health_app.dto.response.DashboardResponse;
import com.hanzama.mental_health_app.service.SelfGrowthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

/**
 * REST Controller untuk menangani endpoint dashboard pengguna.
 * Menyediakan endpoint untuk mengambil data aggregasi dari berbagai modul
 * yang ditampilkan di dashboard pengguna yang sedang login.
 */
@RestController
@RequestMapping("/api/me/dashboard")
@RequiredArgsConstructor
@Slf4j
public class DashboardController {

    private final SelfGrowthService selfGrowthService;

    /**
     * Endpoint untuk mendapatkan data dashboard pengguna yang sedang login.
     * Endpoint ini mengumpulkan data dari berbagai modul (profil, jurnal, mood)
     * dan menyajikannya dalam format yang sesuai untuk dashboard.
     * 
     * @param currentUser pengguna yang sedang login (dari JWT token)
     * @return ResponseEntity berisi DashboardResponse dengan data aggregasi
     */
    @GetMapping
    public ResponseEntity<DashboardResponse> getDashboardData(
            @AuthenticationPrincipal User currentUser) {
        
        log.info("Request untuk mendapatkan data dashboard dari pengguna: {}", 
                currentUser.getEmail());
        
        try {
            DashboardResponse dashboardData = selfGrowthService.getMyDashboard(currentUser);
            log.info("Berhasil mengambil data dashboard untuk pengguna: {} dengan {} jurnal dan {} mood", 
                    currentUser.getEmail(), 
                    dashboardData.getRecentJournals().size(), 
                    dashboardData.getRecentMoods().size());
            
            return ResponseEntity.ok(dashboardData);
            
        } catch (Exception e) {
            log.error("Gagal mengambil data dashboard untuk pengguna: {}. Error: {}", 
                    currentUser.getEmail(), e.getMessage());
            throw e;
        }
    }
}
