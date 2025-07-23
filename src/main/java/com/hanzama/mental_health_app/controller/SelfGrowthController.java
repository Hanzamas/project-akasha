package com.hanzama.mental_health_app.controller;

import com.hanzama.mental_health_app.domain.entity.User;
import com.hanzama.mental_health_app.dto.request.JournalRequest;
import com.hanzama.mental_health_app.dto.request.MoodRequest;
import com.hanzama.mental_health_app.dto.response.JournalResponse;
import com.hanzama.mental_health_app.dto.response.MoodResponse;
import com.hanzama.mental_health_app.service.SelfGrowthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/me")
@RequiredArgsConstructor
public class SelfGrowthController {

    private final SelfGrowthService selfGrowthService;

    /**
     * Get all journal entries for the authenticated user
     * GET /api/me/journals
     */
    @GetMapping("/journals")
    public ResponseEntity<List<JournalResponse>> getMyJournals(
            @AuthenticationPrincipal User currentUser) {
        log.info("REST API: Getting all journals for user: {}", currentUser.getUsername());
        List<JournalResponse> journals = selfGrowthService.getMyJournals(currentUser);
        return ResponseEntity.ok(journals);
    }

    /**
     * Create a new journal entry for the authenticated user
     * POST /api/me/journals
     */
    @PostMapping("/journals")
    public ResponseEntity<JournalResponse> createJournal(
            @Valid @RequestBody JournalRequest journalRequest,
            @AuthenticationPrincipal User currentUser) {
        log.info("REST API: Creating new journal for user: {}", currentUser.getUsername());
        JournalResponse createdJournal = selfGrowthService.createJournal(journalRequest, currentUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdJournal);
    }

    /**
     * Update an existing journal entry (owner only)
     * PUT /api/me/journals/{journalId}
     */
    @PutMapping("/journals/{journalId}")
    public ResponseEntity<JournalResponse> updateJournal(
            @PathVariable Long journalId,
            @Valid @RequestBody JournalRequest journalRequest,
            @AuthenticationPrincipal User currentUser) {
        log.info("REST API: Updating journal ID: {} for user: {}", journalId, currentUser.getUsername());
        JournalResponse updatedJournal = selfGrowthService.updateJournal(journalId, journalRequest, currentUser);
        return ResponseEntity.ok(updatedJournal);
    }

    /**
     * Delete a journal entry (owner only)
     * DELETE /api/me/journals/{journalId}
     */
    @DeleteMapping("/journals/{journalId}")
    public ResponseEntity<Void> deleteJournal(
            @PathVariable Long journalId,
            @AuthenticationPrincipal User currentUser) {
        log.info("REST API: Deleting journal ID: {} for user: {}", journalId, currentUser.getUsername());
        selfGrowthService.deleteJournal(journalId, currentUser);
        return ResponseEntity.noContent().build();
    }

    /**
     * Get all mood entries for the authenticated user
     * GET /api/me/moods
     */
    @GetMapping("/moods")
    public ResponseEntity<List<MoodResponse>> getMyMoods(
            @AuthenticationPrincipal User currentUser) {
        log.info("REST API: Getting all moods for user: {}", currentUser.getUsername());
        List<MoodResponse> moods = selfGrowthService.getMyMoods(currentUser);
        return ResponseEntity.ok(moods);
    }

    /**
     * Create a new mood entry for the authenticated user
     * POST /api/me/moods
     */
    @PostMapping("/moods")
    public ResponseEntity<MoodResponse> createMood(
            @Valid @RequestBody MoodRequest moodRequest,
            @AuthenticationPrincipal User currentUser) {
        log.info("REST API: Creating new mood entry for user: {}", currentUser.getUsername());
        MoodResponse createdMood = selfGrowthService.createMood(moodRequest, currentUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdMood);
    }
}
