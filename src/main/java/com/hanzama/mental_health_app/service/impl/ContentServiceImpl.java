package com.hanzama.mental_health_app.service.impl;

import com.hanzama.mental_health_app.dto.request.ArticleRequest;
import com.hanzama.mental_health_app.dto.request.CopingToolRequest;
import com.hanzama.mental_health_app.entity.Article;
import com.hanzama.mental_health_app.entity.CopingTool;
import com.hanzama.mental_health_app.repository.ArticleRepository;
import com.hanzama.mental_health_app.repository.CopingToolRepository;
import com.hanzama.mental_health_app.service.ContentService;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class ContentServiceImpl implements ContentService {

    private final ArticleRepository articleRepository;
    private final CopingToolRepository copingToolRepository;

    @Override
    @Transactional(readOnly = true)
    public List<Article> getAllArticles() {
        log.info("Getting all articles");
        return articleRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Article> getArticleById(Long id) {
        log.info("Getting article by ID: {}", id);
        return articleRepository.findById(id);
    }

    @Override
    public Article createArticle(ArticleRequest request) {
        log.info("Creating new article with title: {}", request.getTitle());
        
        Article newArticle = Article.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .authorName(request.getAuthorName())
                .build();
        
        Article savedArticle = articleRepository.save(newArticle);
        log.info("Article created successfully with ID: {}", savedArticle.getId());
        
        return savedArticle;
    }

    @Override
    public Article updateArticle(Long id, ArticleRequest request) {
        log.info("Updating article ID: {}", id);
        
        Article existingArticle = articleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Article not found with ID: " + id));
        
        existingArticle.setTitle(request.getTitle());
        existingArticle.setContent(request.getContent());
        existingArticle.setAuthorName(request.getAuthorName());
        
        Article updatedArticle = articleRepository.save(existingArticle);
        log.info("Article updated successfully with ID: {}", updatedArticle.getId());
        
        return updatedArticle;
    }

    @Override
    public void deleteArticle(Long id) {
        log.info("Deleting article ID: {}", id);
        
        Article existingArticle = articleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Article not found with ID: " + id));
        
        articleRepository.delete(existingArticle);
        log.info("Article deleted successfully with ID: {}", id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CopingTool> getAllCopingTools() {
        log.info("Getting all coping tools");
        return copingToolRepository.findAll();
    }

    @Override
    public CopingTool createCopingTool(CopingToolRequest request) {
        log.info("Creating new coping tool with name: {}", request.getName());
        
        CopingTool newTool = CopingTool.builder()
                .name(request.getName())
                .description(request.getDescription())
                .howTo(request.getHowTo())
                .build();
        
        CopingTool savedTool = copingToolRepository.save(newTool);
        log.info("Coping tool created successfully with ID: {}", savedTool.getId());
        
        return savedTool;
    }

    @Override
    public void deleteCopingTool(Long id) {
        log.info("Deleting coping tool ID: {}", id);
        
        CopingTool existingTool = copingToolRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Coping tool not found with ID: " + id));
        
        copingToolRepository.delete(existingTool);
        log.info("Coping tool deleted successfully with ID: {}", id);
    }
}
