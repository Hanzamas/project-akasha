package com.hanzama.mental_health_app.repository;

import com.hanzama.mental_health_app.entity.ForumPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ForumPostRepository extends JpaRepository<ForumPost, Long> {
    
    /**
     * Find all forum posts ordered by creation date in descending order (newest first)
     * @return List of ForumPost entities sorted by createdAt desc
     */
    List<ForumPost> findAllByOrderByCreatedAtDesc();
}
