package com.hanzama.mental_health_app.service;

import com.hanzama.mental_health_app.domain.entity.ChatMessage;
import com.hanzama.mental_health_app.domain.entity.User;
import com.hanzama.mental_health_app.dto.ChatRequest;

import java.util.List;

/**
 * Interface untuk Service layer yang menangani interaksi AI dan chat.
 * Menyediakan kontrak untuk operasi pengiriman pesan dan manajemen riwayat chat.
 */
public interface ChatService {

    /**
     * Mengirim pesan dari pengguna ke sistem AI dan menyimpan percakapan.
     * 
     * @param request data pesan yang dikirim pengguna
     * @param currentUser pengguna yang sedang login
     * @return ChatMessage respons dari AI
     */
    ChatMessage sendMessage(ChatRequest request, User currentUser);

    /**
     * Mengambil riwayat chat milik pengguna tertentu.
     * 
     * @param currentUser pengguna yang riwayat chatnya akan diambil
     * @return List ChatMessage yang diurutkan dari yang terbaru
     */
    List<ChatMessage> getChatHistory(User currentUser);
}
