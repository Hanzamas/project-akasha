package com.hanzama.mental_health_app.controller;

import com.hanzama.mental_health_app.entity.Article;
import com.hanzama.mental_health_app.entity.CopingTool;
import com.hanzama.mental_health_app.service.ContentService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api/content")
@RequiredArgsConstructor
public class ContentController {

    private final ContentService contentService;

    /**
     * Get all articles (Public endpoint)
     * GET /api/content/articles
     */
    @GetMapping("/articles")
    public ResponseEntity<List<Article>> getAllArticles() {
        log.info("REST API: Getting all articles (public access)");
        List<Article> articles = contentService.getAllArticles();
        return ResponseEntity.ok(articles);
    }

    /**
     * Get a specific article by ID (Public endpoint)
     * GET /api/content/articles/{id}
     */
    @GetMapping("/articles/{id}")
    public ResponseEntity<Article> getArticleById(@PathVariable Long id) {
        log.info("REST API: Getting article by ID: {} (public access)", id);
        Optional<Article> article = contentService.getArticleById(id);
        
        if (article.isPresent()) {
            return ResponseEntity.ok(article.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Get all coping tools (Public endpoint)
     * GET /api/content/coping-tools
     */
    @GetMapping("/coping-tools")
    public ResponseEntity<List<CopingTool>> getAllCopingTools() {
        log.info("REST API: Getting all coping tools (public access)");
        List<CopingTool> tools = contentService.getAllCopingTools();
        return ResponseEntity.ok(tools);
    }
}
