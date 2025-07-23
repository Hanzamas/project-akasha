package com.hanzama.mental_health_app.controller;

import com.hanzama.mental_health_app.dto.request.ArticleRequest;
import com.hanzama.mental_health_app.dto.request.CopingToolRequest;
import com.hanzama.mental_health_app.entity.Article;
import com.hanzama.mental_health_app.entity.CopingTool;
import com.hanzama.mental_health_app.service.ContentService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/admin/content")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminContentController {

    private final ContentService contentService;

    /**
     * Create a new article (Admin only)
     * POST /api/admin/content/articles
     */
    @PostMapping("/articles")
    public ResponseEntity<Article> createArticle(@Valid @RequestBody ArticleRequest articleRequest) {
        log.info("REST API: Admin creating new article with title: {}", articleRequest.getTitle());
        Article createdArticle = contentService.createArticle(articleRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdArticle);
    }

    /**
     * Update an existing article (Admin only)
     * PUT /api/admin/content/articles/{id}
     */
    @PutMapping("/articles/{id}")
    public ResponseEntity<Article> updateArticle(
            @PathVariable Long id,
            @Valid @RequestBody ArticleRequest articleRequest) {
        log.info("REST API: Admin updating article ID: {}", id);
        Article updatedArticle = contentService.updateArticle(id, articleRequest);
        return ResponseEntity.ok(updatedArticle);
    }

    /**
     * Delete an article (Admin only)
     * DELETE /api/admin/content/articles/{id}
     */
    @DeleteMapping("/articles/{id}")
    public ResponseEntity<Void> deleteArticle(@PathVariable Long id) {
        log.info("REST API: Admin deleting article ID: {}", id);
        contentService.deleteArticle(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Create a new coping tool (Admin only)
     * POST /api/admin/content/coping-tools
     */
    @PostMapping("/coping-tools")
    public ResponseEntity<CopingTool> createCopingTool(@Valid @RequestBody CopingToolRequest toolRequest) {
        log.info("REST API: Admin creating new coping tool with name: {}", toolRequest.getName());
        CopingTool createdTool = contentService.createCopingTool(toolRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTool);
    }

    /**
     * Delete a coping tool (Admin only)
     * DELETE /api/admin/content/coping-tools/{id}
     */
    @DeleteMapping("/coping-tools/{id}")
    public ResponseEntity<Void> deleteCopingTool(@PathVariable Long id) {
        log.info("REST API: Admin deleting coping tool ID: {}", id);
        contentService.deleteCopingTool(id);
        return ResponseEntity.noContent().build();
    }
}
