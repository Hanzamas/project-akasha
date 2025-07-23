package com.hanzama.mental_health_app.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * DTO untuk respons dashboard pengguna.
 * Berisi aggregasi data dari berbagai modul untuk ditampilkan di dashboard.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponse {

    /**
     * Informasi profil pengguna yang sedang login
     */
    private ProfileResponse profile;

    /**
     * Daftar 5 jurnal terakhir pengguna
     */
    private List<JournalSummaryResponse> recentJournals;

    /**
     * Daftar 5 catatan mood terakhir pengguna
     */
    private List<MoodResponse> recentMoods;
}
