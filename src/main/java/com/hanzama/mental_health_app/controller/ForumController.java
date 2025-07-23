package com.hanzama.mental_health_app.controller;

import com.hanzama.mental_health_app.domain.entity.User;
import com.hanzama.mental_health_app.dto.request.PostRequest;
import com.hanzama.mental_health_app.dto.request.ReplyRequest;
import com.hanzama.mental_health_app.dto.response.PostResponse;
import com.hanzama.mental_health_app.dto.response.ReplyResponse;
import com.hanzama.mental_health_app.service.ForumService;

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
@RequestMapping("/api/forums")
@RequiredArgsConstructor
public class ForumController {

    private final ForumService forumService;

    /**
     * Get all forum posts (Public endpoint)
     * GET /api/forums/
     */
    @GetMapping
    public ResponseEntity<List<PostResponse>> getAllPosts() {
        log.info("REST API: Getting all forum posts");
        List<PostResponse> posts = forumService.getAllPosts();
        return ResponseEntity.ok(posts);
    }

    /**
     * Get a specific forum post by ID (Public endpoint)
     * GET /api/forums/{postId}
     */
    @GetMapping("/{postId}")
    public ResponseEntity<PostResponse> getPostById(@PathVariable Long postId) {
        log.info("REST API: Getting forum post by ID: {}", postId);
        PostResponse post = forumService.getPostById(postId);
        return ResponseEntity.ok(post);
    }

    /**
     * Create a new forum post (Secured endpoint)
     * POST /api/forums/
     */
    @PostMapping
    public ResponseEntity<PostResponse> createPost(
            @Valid @RequestBody PostRequest postRequest,
            @AuthenticationPrincipal User currentUser) {
        log.info("REST API: Creating new forum post by user: {}", currentUser.getUsername());
        PostResponse createdPost = forumService.createPost(postRequest, currentUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPost);
    }

    /**
     * Update an existing forum post (Secured endpoint)
     * PUT /api/forums/{postId}
     */
    @PutMapping("/{postId}")
    public ResponseEntity<PostResponse> updatePost(
            @PathVariable Long postId,
            @Valid @RequestBody PostRequest postRequest,
            @AuthenticationPrincipal User currentUser) {
        log.info("REST API: Updating forum post ID: {} by user: {}", postId, currentUser.getUsername());
        PostResponse updatedPost = forumService.updatePost(postId, postRequest, currentUser);
        return ResponseEntity.ok(updatedPost);
    }

    /**
     * Delete a forum post (Secured endpoint)
     * DELETE /api/forums/{postId}
     */
    @DeleteMapping("/{postId}")
    public ResponseEntity<Void> deletePost(
            @PathVariable Long postId,
            @AuthenticationPrincipal User currentUser) {
        log.info("REST API: Deleting forum post ID: {} by user: {}", postId, currentUser.getUsername());
        forumService.deletePost(postId, currentUser);
        return ResponseEntity.noContent().build();
    }

    /**
     * Add a reply to a forum post (Secured endpoint)
     * POST /api/forums/{postId}/replies
     */
    @PostMapping("/{postId}/replies")
    public ResponseEntity<ReplyResponse> addReply(
            @PathVariable Long postId,
            @Valid @RequestBody ReplyRequest replyRequest,
            @AuthenticationPrincipal User currentUser) {
        log.info("REST API: Adding reply to post ID: {} by user: {}", postId, currentUser.getUsername());
        ReplyResponse createdReply = forumService.addReplyToPost(postId, replyRequest, currentUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdReply);
    }
}
