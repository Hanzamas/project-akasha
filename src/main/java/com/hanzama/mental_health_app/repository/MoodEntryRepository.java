package com.hanzama.mental_health_app.repository;

import com.hanzama.mental_health_app.entity.MoodEntry;
import com.hanzama.mental_health_app.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MoodEntryRepository extends JpaRepository<MoodEntry, Long> {
    
    /**
     * Find all mood entries belonging to a specific user, ordered by entry date in descending order (newest first)
     * @param user The user whose mood entries to retrieve
     * @return List of MoodEntry entities sorted by entryDate desc
     */
    List<MoodEntry> findByUserOrderByEntryDateDesc(User user);

    /**
     * Find top 5 mood entries belonging to a specific user, ordered by entry date in descending order (newest first)
     * @param user The user whose mood entries to retrieve
     * @return List of top 5 MoodEntry entities sorted by entryDate desc
     */
    List<MoodEntry> findTop5ByUserOrderByEntryDateDesc(User user);
}
