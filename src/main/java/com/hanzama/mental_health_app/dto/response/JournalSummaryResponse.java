package com.hanzama.mental_health_app.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO untuk respons ringkasan jurnal pengguna.
 * Berisi informasi ringkas dari jurnal untuk ditampilkan di dashboard.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JournalSummaryResponse {

    /**
     * ID unik jurnal
     */
    private Long id;

    /**
     * Judul jurnal
     */
    private String title;

    /**
     * Tanggal pembuatan jurnal
     */
    private LocalDateTime createdAt;
}
