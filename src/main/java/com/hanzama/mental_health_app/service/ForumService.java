package com.hanzama.mental_health_app.service;

import com.hanzama.mental_health_app.domain.entity.User;
import com.hanzama.mental_health_app.dto.request.PostRequest;
import com.hanzama.mental_health_app.dto.request.ReplyRequest;
import com.hanzama.mental_health_app.dto.response.PostResponse;
import com.hanzama.mental_health_app.dto.response.ReplyResponse;

import java.util.List;

public interface ForumService {
    
    /**
     * Get all forum posts sorted by creation date (newest first)
     * @return List of PostResponse DTOs
     */
    List<PostResponse> getAllPosts();
    
    /**
     * Get a specific post by its ID
     * @param postId The ID of the post to retrieve
     * @return PostResponse DTO with all replies
     * @throws jakarta.persistence.EntityNotFoundException if post not found
     */
    PostResponse getPostById(Long postId);
    
    /**
     * Create a new forum post
     * @param postRequest The post data
     * @param currentUser The user creating the post
     * @return PostResponse DTO of the created post
     */
    PostResponse createPost(PostRequest postRequest, User currentUser);
    
    /**
     * Update an existing forum post
     * @param postId The ID of the post to update
     * @param postRequest The updated post data
     * @param currentUser The user requesting the update
     * @return PostResponse DTO of the updated post
     * @throws jakarta.persistence.EntityNotFoundException if post not found
     * @throws java.nio.file.AccessDeniedException if user is not the owner
     */
    PostResponse updatePost(Long postId, PostRequest postRequest, User currentUser);
    
    /**
     * Delete a forum post
     * @param postId The ID of the post to delete
     * @param currentUser The user requesting the deletion
     * @throws jakarta.persistence.EntityNotFoundException if post not found
     * @throws java.nio.file.AccessDeniedException if user is not the owner
     */
    void deletePost(Long postId, User currentUser);
    
    /**
     * Add a reply to an existing forum post
     * @param postId The ID of the post to reply to
     * @param replyRequest The reply data
     * @param currentUser The user creating the reply
     * @return ReplyResponse DTO of the created reply
     * @throws jakarta.persistence.EntityNotFoundException if post not found
     */
    ReplyResponse addReplyToPost(Long postId, ReplyRequest replyRequest, User currentUser);
}
