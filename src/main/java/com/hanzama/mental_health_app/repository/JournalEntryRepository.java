package com.hanzama.mental_health_app.repository;

import com.hanzama.mental_health_app.entity.JournalEntry;
import com.hanzama.mental_health_app.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JournalEntryRepository extends JpaRepository<JournalEntry, Long> {
    
    /**
     * Find all journal entries belonging to a specific user, ordered by creation date in descending order (newest first)
     * @param user The user whose journal entries to retrieve
     * @return List of JournalEntry entities sorted by createdAt desc
     */
    List<JournalEntry> findByUserOrderByCreatedAtDesc(User user);

    /**
     * Find top 5 journal entries belonging to a specific user, ordered by creation date in descending order (newest first)
     * @param user The user whose journal entries to retrieve
     * @return List of top 5 JournalEntry entities sorted by createdAt desc
     */
    List<JournalEntry> findTop5ByUserOrderByCreatedAtDesc(User user);
}
