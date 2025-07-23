package com.hanzama.mental_health_app.service.impl;

import com.hanzama.mental_health_app.domain.entity.User;
import com.hanzama.mental_health_app.dto.request.PostRequest;
import com.hanzama.mental_health_app.dto.request.ReplyRequest;
import com.hanzama.mental_health_app.dto.response.AuthorResponse;
import com.hanzama.mental_health_app.dto.response.PostResponse;
import com.hanzama.mental_health_app.dto.response.ReplyResponse;
import com.hanzama.mental_health_app.entity.ForumPost;
import com.hanzama.mental_health_app.entity.ForumReply;
import com.hanzama.mental_health_app.repository.ForumPostRepository;
import com.hanzama.mental_health_app.repository.ForumReplyRepository;
import com.hanzama.mental_health_app.service.ForumService;

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
public class ForumServiceImpl implements ForumService {

    private final ForumPostRepository forumPostRepository;
    private final ForumReplyRepository forumReplyRepository;

    @Override
    @Transactional(readOnly = true)
    public List<PostResponse> getAllPosts() {
        log.info("Getting all forum posts");
        List<ForumPost> posts = forumPostRepository.findAllByOrderByCreatedAtDesc();
        return posts.stream()
                .map(this::mapToPostResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public PostResponse getPostById(Long postId) {
        log.info("Getting forum post by ID: {}", postId);
        ForumPost post = forumPostRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Forum post not found with ID: " + postId));
        return mapToPostResponse(post);
    }

    @Override
    public PostResponse createPost(PostRequest postRequest, User currentUser) {
        log.info("Creating new forum post by user: {}", currentUser.getUsername());
        
        ForumPost newPost = ForumPost.builder()
                .title(postRequest.getTitle())
                .content(postRequest.getContent())
                .author(currentUser)
                .build();
        
        ForumPost savedPost = forumPostRepository.save(newPost);
        log.info("Forum post created successfully with ID: {}", savedPost.getId());
        
        return mapToPostResponse(savedPost);
    }

    @Override
    public PostResponse updatePost(Long postId, PostRequest postRequest, User currentUser) {
        log.info("Updating forum post ID: {} by user: {}", postId, currentUser.getUsername());
        
        ForumPost existingPost = forumPostRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Forum post not found with ID: " + postId));
        
        // Check ownership
        if (!existingPost.getAuthor().getId().equals(currentUser.getId())) {
            log.warn("Access denied: User {} attempted to update post owned by {}", 
                    currentUser.getUsername(), existingPost.getAuthor().getUsername());
            throw new RuntimeException("Access denied: You can only update your own posts");
        }
        
        existingPost.setTitle(postRequest.getTitle());
        existingPost.setContent(postRequest.getContent());
        
        ForumPost updatedPost = forumPostRepository.save(existingPost);
        log.info("Forum post updated successfully with ID: {}", updatedPost.getId());
        
        return mapToPostResponse(updatedPost);
    }

    @Override
    public void deletePost(Long postId, User currentUser) {
        log.info("Deleting forum post ID: {} by user: {}", postId, currentUser.getUsername());
        
        ForumPost existingPost = forumPostRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Forum post not found with ID: " + postId));
        
        // Check ownership
        if (!existingPost.getAuthor().getId().equals(currentUser.getId())) {
            log.warn("Access denied: User {} attempted to delete post owned by {}", 
                    currentUser.getUsername(), existingPost.getAuthor().getUsername());
            throw new RuntimeException("Access denied: You can only delete your own posts");
        }
        
        forumPostRepository.delete(existingPost);
        log.info("Forum post deleted successfully with ID: {}", postId);
    }

    @Override
    public ReplyResponse addReplyToPost(Long postId, ReplyRequest replyRequest, User currentUser) {
        log.info("Adding reply to post ID: {} by user: {}", postId, currentUser.getUsername());
        
        ForumPost existingPost = forumPostRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Forum post not found with ID: " + postId));
        
        ForumReply newReply = ForumReply.builder()
                .content(replyRequest.getContent())
                .author(currentUser)
                .forumPost(existingPost)
                .build();
        
        ForumReply savedReply = forumReplyRepository.save(newReply);
        log.info("Reply created successfully with ID: {}", savedReply.getId());
        
        return mapToReplyResponse(savedReply);
    }

    // Helper method to map ForumPost entity to PostResponse DTO
    private PostResponse mapToPostResponse(ForumPost post) {
        List<ReplyResponse> replyResponses = post.getReplies() != null 
                ? post.getReplies().stream()
                    .map(this::mapToReplyResponse)
                    .collect(Collectors.toList())
                : List.of();
        
        return PostResponse.builder()
                .id(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .createdAt(post.getCreatedAt())
                .author(mapToAuthorResponse(post.getAuthor()))
                .replies(replyResponses)
                .build();
    }

    // Helper method to map ForumReply entity to ReplyResponse DTO
    private ReplyResponse mapToReplyResponse(ForumReply reply) {
        return ReplyResponse.builder()
                .id(reply.getId())
                .content(reply.getContent())
                .createdAt(reply.getCreatedAt())
                .author(mapToAuthorResponse(reply.getAuthor()))
                .build();
    }

    // Helper method to map User entity to AuthorResponse DTO
    private AuthorResponse mapToAuthorResponse(User user) {
        return AuthorResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .build();
    }
}
