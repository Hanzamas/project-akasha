package com.hanzama.mental_health_app.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MoodResponse {
    
    private Long id;
    private String mood;
    private String notes;
    private LocalDate entryDate;
}
