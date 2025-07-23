package com.hanzama.mental_health_app.service;

import com.hanzama.mental_health_app.dto.request.ArticleRequest;
import com.hanzama.mental_health_app.dto.request.CopingToolRequest;
import com.hanzama.mental_health_app.entity.Article;
import com.hanzama.mental_health_app.entity.CopingTool;

import java.util.List;
import java.util.Optional;

public interface ContentService {
    
    /**
     * Get all articles (Public access)
     * @return List of all articles
     */
    List<Article> getAllArticles();
    
    /**
     * Get a specific article by its ID (Public access)
     * @param id The ID of the article to retrieve
     * @return Optional containing the article if found
     */
    Optional<Article> getArticleById(Long id);
    
    /**
     * Create a new article (Admin only)
     * @param request The article data
     * @return The created article
     */
    Article createArticle(ArticleRequest request);
    
    /**
     * Update an existing article (Admin only)
     * @param id The ID of the article to update
     * @param request The updated article data
     * @return The updated article
     * @throws jakarta.persistence.EntityNotFoundException if article not found
     */
    Article updateArticle(Long id, ArticleRequest request);
    
    /**
     * Delete an article (Admin only)
     * @param id The ID of the article to delete
     * @throws jakarta.persistence.EntityNotFoundException if article not found
     */
    void deleteArticle(Long id);
    
    /**
     * Get all coping tools (Public access)
     * @return List of all coping tools
     */
    List<CopingTool> getAllCopingTools();
    
    /**
     * Create a new coping tool (Admin only)
     * @param request The coping tool data
     * @return The created coping tool
     */
    CopingTool createCopingTool(CopingToolRequest request);
    
    /**
     * Delete a coping tool (Admin only)
     * @param id The ID of the coping tool to delete
     * @throws jakarta.persistence.EntityNotFoundException if coping tool not found
     */
    void deleteCopingTool(Long id);
}
