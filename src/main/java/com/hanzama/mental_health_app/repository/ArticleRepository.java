package com.hanzama.mental_health_app.repository;

import com.hanzama.mental_health_app.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    
}
