package com.hanzama.mental_health_app.service.impl;

import com.hanzama.mental_health_app.domain.entity.User;
import com.hanzama.mental_health_app.dto.request.JournalRequest;
import com.hanzama.mental_health_app.dto.request.MoodRequest;
import com.hanzama.mental_health_app.dto.response.JournalResponse;
import com.hanzama.mental_health_app.dto.response.MoodResponse;
import com.hanzama.mental_health_app.dto.response.DashboardResponse;
import com.hanzama.mental_health_app.dto.response.ProfileResponse;
import com.hanzama.mental_health_app.dto.response.JournalSummaryResponse;
import com.hanzama.mental_health_app.entity.JournalEntry;
import com.hanzama.mental_health_app.entity.MoodEntry;
import com.hanzama.mental_health_app.enums.MoodType;
import com.hanzama.mental_health_app.repository.JournalEntryRepository;
import com.hanzama.mental_health_app.repository.MoodEntryRepository;
import com.hanzama.mental_health_app.service.SelfGrowthService;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class SelfGrowthServiceImpl implements SelfGrowthService {

    private final JournalEntryRepository journalEntryRepository;
    private final MoodEntryRepository moodEntryRepository;

    @Override
    @Transactional(readOnly = true)
    public List<JournalResponse> getMyJournals(User currentUser) {
        log.info("Getting all journals for user: {}", currentUser.getUsername());
        List<JournalEntry> journals = journalEntryRepository.findByUserOrderByCreatedAtDesc(currentUser);
        return journals.stream()
                .map(this::mapToJournalResponse)
                .collect(Collectors.toList());
    }

    @Override
    public JournalResponse createJournal(JournalRequest request, User currentUser) {
        log.info("Creating new journal for user: {}", currentUser.getUsername());
        
        JournalEntry newJournal = JournalEntry.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .user(currentUser)
                .build();
        
        JournalEntry savedJournal = journalEntryRepository.save(newJournal);
        log.info("Journal created successfully with ID: {}", savedJournal.getId());
        
        return mapToJournalResponse(savedJournal);
    }

    @Override
    public JournalResponse updateJournal(Long journalId, JournalRequest request, User currentUser) {
        log.info("Updating journal ID: {} by user: {}", journalId, currentUser.getUsername());
        
        JournalEntry existingJournal = journalEntryRepository.findById(journalId)
                .orElseThrow(() -> new EntityNotFoundException("Journal entry not found with ID: " + journalId));
        
        // Validate ownership - Critical security check
        if (!existingJournal.getUser().getId().equals(currentUser.getId())) {
            log.warn("Access denied: User {} attempted to update journal owned by user ID: {}", 
                    currentUser.getUsername(), existingJournal.getUser().getId());
            throw new RuntimeException("Access denied: You can only update your own journal entries");
        }
        
        existingJournal.setTitle(request.getTitle());
        existingJournal.setContent(request.getContent());
        
        JournalEntry updatedJournal = journalEntryRepository.save(existingJournal);
        log.info("Journal updated successfully with ID: {}", updatedJournal.getId());
        
        return mapToJournalResponse(updatedJournal);
    }

    @Override
    public void deleteJournal(Long journalId, User currentUser) {
        log.info("Deleting journal ID: {} by user: {}", journalId, currentUser.getUsername());
        
        JournalEntry existingJournal = journalEntryRepository.findById(journalId)
                .orElseThrow(() -> new EntityNotFoundException("Journal entry not found with ID: " + journalId));
        
        // Validate ownership - Critical security check
        if (!existingJournal.getUser().getId().equals(currentUser.getId())) {
            log.warn("Access denied: User {} attempted to delete journal owned by user ID: {}", 
                    currentUser.getUsername(), existingJournal.getUser().getId());
            throw new RuntimeException("Access denied: You can only delete your own journal entries");
        }
        
        journalEntryRepository.delete(existingJournal);
        log.info("Journal deleted successfully with ID: {}", journalId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<MoodResponse> getMyMoods(User currentUser) {
        log.info("Getting all moods for user: {}", currentUser.getUsername());
        List<MoodEntry> moods = moodEntryRepository.findByUserOrderByEntryDateDesc(currentUser);
        return moods.stream()
                .map(this::mapToMoodResponse)
                .collect(Collectors.toList());
    }

    @Override
    public MoodResponse createMood(MoodRequest request, User currentUser) {
        log.info("Creating new mood entry for user: {}", currentUser.getUsername());
        
        // Validate and convert mood string to MoodType enum
        MoodType moodType;
        try {
            moodType = MoodType.valueOf(request.getMood().toUpperCase());
        } catch (IllegalArgumentException e) {
            log.error("Invalid mood type: {}", request.getMood());
            throw new IllegalArgumentException("Invalid mood type. Valid values are: HAPPY, SAD, ANXIOUS, CALM, NEUTRAL");
        }
        
        MoodEntry newMood = MoodEntry.builder()
                .mood(moodType)
                .notes(request.getNotes())
                .user(currentUser)
                .build();
        
        MoodEntry savedMood = moodEntryRepository.save(newMood);
        log.info("Mood entry created successfully with ID: {}", savedMood.getId());
        
        return mapToMoodResponse(savedMood);
    }

    @Override
    @Transactional(readOnly = true)
    public DashboardResponse getMyDashboard(User currentUser) {
        log.info("Getting dashboard data for user: {}", currentUser.getUsername());

        // 1. Get profile data
        ProfileResponse profile = ProfileResponse.builder()
                .id(currentUser.getId())
                .firstName(currentUser.getFirstName())
                .lastName(currentUser.getLastName())
                .email(currentUser.getEmail())
                .build();

        // 2. Get top 5 recent journals
        List<JournalEntry> recentJournalEntries = journalEntryRepository.findTop5ByUserOrderByCreatedAtDesc(currentUser);
        List<JournalSummaryResponse> recentJournals = recentJournalEntries.stream()
                .map(this::mapToJournalSummaryResponse)
                .collect(Collectors.toList());

        // 3. Get top 5 recent moods
        List<MoodEntry> recentMoodEntries = moodEntryRepository.findTop5ByUserOrderByEntryDateDesc(currentUser);
        List<MoodResponse> recentMoods = recentMoodEntries.stream()
                .map(this::mapToMoodResponse)
                .collect(Collectors.toList());

        // 4. Build dashboard response
        DashboardResponse dashboardResponse = DashboardResponse.builder()
                .profile(profile)
                .recentJournals(recentJournals)
                .recentMoods(recentMoods)
                .build();

        log.info("Dashboard data successfully retrieved for user: {} with {} journals and {} moods", 
                currentUser.getUsername(), recentJournals.size(), recentMoods.size());

        return dashboardResponse;
    }

    // Helper method to map JournalEntry entity to JournalSummaryResponse DTO
    private JournalSummaryResponse mapToJournalSummaryResponse(JournalEntry journal) {
        return JournalSummaryResponse.builder()
                .id(journal.getId())
                .title(journal.getTitle())
                .createdAt(journal.getCreatedAt())
                .build();
    }

    // Helper method to map JournalEntry entity to JournalResponse DTO
    private JournalResponse mapToJournalResponse(JournalEntry journal) {
        return JournalResponse.builder()
                .id(journal.getId())
                .title(journal.getTitle())
                .content(journal.getContent())
                .createdAt(journal.getCreatedAt())
                .updatedAt(journal.getUpdatedAt())
                .build();
    }

    // Helper method to map MoodEntry entity to MoodResponse DTO
    private MoodResponse mapToMoodResponse(MoodEntry mood) {
        return MoodResponse.builder()
                .id(mood.getId())
                .mood(mood.getMood().name())
                .notes(mood.getNotes())
                .entryDate(mood.getEntryDate())
                .build();
    }
}
