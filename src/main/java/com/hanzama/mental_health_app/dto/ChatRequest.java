package com.hanzama.mental_health_app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO untuk request chat dari pengguna.
 * Berisi pesan yang akan dikirimkan ke sistem AI.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatRequest {

    /**
     * Pesan yang dikirimkan oleh pengguna ke AI
     */
    private String message;
}
