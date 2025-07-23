package com.hanzama.mental_health_app.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotBlank;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MoodRequest {
    
    @NotBlank(message = "Mood cannot be blank")
    private String mood;
    
    private String notes;
}
