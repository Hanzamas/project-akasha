package com.hanzama.mental_health_app.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostResponse {
    
    private Long id;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private AuthorResponse author;
    private List<ReplyResponse> replies;
}
