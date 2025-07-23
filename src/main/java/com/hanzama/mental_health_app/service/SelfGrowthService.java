package com.hanzama.mental_health_app.service;

import com.hanzama.mental_health_app.domain.entity.User;
import com.hanzama.mental_health_app.dto.request.JournalRequest;
import com.hanzama.mental_health_app.dto.request.MoodRequest;
import com.hanzama.mental_health_app.dto.response.JournalResponse;
import com.hanzama.mental_health_app.dto.response.MoodResponse;
import com.hanzama.mental_health_app.dto.response.DashboardResponse;

import java.util.List;

public interface SelfGrowthService {
    
    /**
     * Get all journal entries for the current user
     * @param currentUser The authenticated user
     * @return List of JournalResponse DTOs sorted by creation date (newest first)
     */
    List<JournalResponse> getMyJournals(User currentUser);
    
    /**
     * Create a new journal entry for the current user
     * @param request The journal data
     * @param currentUser The authenticated user
     * @return JournalResponse DTO of the created journal
     */
    JournalResponse createJournal(JournalRequest request, User currentUser);
    
    /**
     * Update an existing journal entry (owner only)
     * @param journalId The ID of the journal to update
     * @param request The updated journal data
     * @param currentUser The authenticated user
     * @return JournalResponse DTO of the updated journal
     * @throws jakarta.persistence.EntityNotFoundException if journal not found
     * @throws java.nio.file.AccessDeniedException if user is not the owner
     */
    JournalResponse updateJournal(Long journalId, JournalRequest request, User currentUser);
    
    /**
     * Delete a journal entry (owner only)
     * @param journalId The ID of the journal to delete
     * @param currentUser The authenticated user
     * @throws jakarta.persistence.EntityNotFoundException if journal not found
     * @throws java.nio.file.AccessDeniedException if user is not the owner
     */
    void deleteJournal(Long journalId, User currentUser);
    
    /**
     * Get all mood entries for the current user
     * @param currentUser The authenticated user
     * @return List of MoodResponse DTOs sorted by entry date (newest first)
     */
    List<MoodResponse> getMyMoods(User currentUser);
    
    /**
     * Create a new mood entry for the current user
     * @param request The mood data
     * @param currentUser The authenticated user
     * @return MoodResponse DTO of the created mood entry
     */
    MoodResponse createMood(MoodRequest request, User currentUser);

    /**
     * Get dashboard data for the current user
     * @param currentUser The authenticated user
     * @return DashboardResponse containing aggregated user data
     */
    DashboardResponse getMyDashboard(User currentUser);
}
