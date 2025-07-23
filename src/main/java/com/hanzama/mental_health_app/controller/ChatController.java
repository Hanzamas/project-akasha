package com.hanzama.mental_health_app.controller;

import com.hanzama.mental_health_app.domain.entity.ChatMessage;
import com.hanzama.mental_health_app.domain.entity.User;
import com.hanzama.mental_health_app.dto.ChatRequest;
import com.hanzama.mental_health_app.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller untuk menangani endpoint chat AI.
 * Menyediakan endpoint untuk mengirim pesan ke AI dan mengambil riwayat chat.
 * Semua endpoint memerlukan JWT authentication.
 */
@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
@Slf4j
public class ChatController {

    private final ChatService chatService;

    /**
     * Endpoint untuk mengirim pesan ke AI dan mendapat respons.
     * 
     * @param chatRequest data pesan yang dikirim pengguna
     * @param currentUser pengguna yang sedang login (dari JWT token)
     * @return ResponseEntity berisi ChatMessage respons dari AI
     */
    @PostMapping
    public ResponseEntity<ChatMessage> postChatMessage(
            @RequestBody ChatRequest chatRequest,
            @AuthenticationPrincipal User currentUser) {
        
        log.info("Menerima request chat dari pengguna: {} dengan panjang pesan: {} karakter", 
                currentUser.getEmail(), chatRequest.getMessage().length());
        
        try {
            // Validasi input
            if (chatRequest.getMessage() == null || chatRequest.getMessage().trim().isEmpty()) {
                log.warn("Pesan kosong dari pengguna: {}", currentUser.getEmail());
                return ResponseEntity.badRequest().build();
            }

            // Proses pesan melalui service
            ChatMessage aiResponse = chatService.sendMessage(chatRequest, currentUser);
            
            log.info("Chat berhasil diproses untuk pengguna: {} dengan AI response ID: {}", 
                    currentUser.getEmail(), aiResponse.getId());
            
            return ResponseEntity.ok(aiResponse);
            
        } catch (IllegalArgumentException e) {
            log.error("Invalid request dari pengguna: {}. Error: {}", 
                    currentUser.getEmail(), e.getMessage());
            return ResponseEntity.badRequest().build();
            
        } catch (Exception e) {
            log.error("Gagal memproses chat untuk pengguna: {}. Error: {}", 
                    currentUser.getEmail(), e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Endpoint untuk mengambil riwayat chat pengguna.
     * 
     * @param currentUser pengguna yang sedang login (dari JWT token)
     * @return ResponseEntity berisi List ChatMessage riwayat chat
     */
    @GetMapping("/history")
    public ResponseEntity<List<ChatMessage>> getChatHistory(
            @AuthenticationPrincipal User currentUser) {
        
        log.info("Mengambil riwayat chat untuk pengguna: {}", currentUser.getEmail());
        
        try {
            List<ChatMessage> chatHistory = chatService.getChatHistory(currentUser);
            
            log.info("Berhasil mengambil {} pesan untuk pengguna: {}", 
                    chatHistory.size(), currentUser.getEmail());
            
            return ResponseEntity.ok(chatHistory);
            
        } catch (Exception e) {
            log.error("Gagal mengambil riwayat chat untuk pengguna: {}. Error: {}", 
                    currentUser.getEmail(), e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
}
