package com.hanzama.mental_health_app.repository;

import com.hanzama.mental_health_app.domain.entity.ChatMessage;
import com.hanzama.mental_health_app.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface untuk entitas ChatMessage.
 * Menyediakan operasi CRUD standar dan method custom untuk pencarian
 * berdasarkan pengguna dengan pengurutan berdasarkan waktu.
 */
@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    /**
     * Mengambil semua riwayat chat milik seorang pengguna,
     * diurutkan dari yang paling baru (descending order berdasarkan createdAt).
     * 
     * @param user pengguna yang riwayat chatnya akan diambil
     * @return List ChatMessage yang diurutkan dari yang paling baru
     */
    List<ChatMessage> findByUserOrderByCreatedAtDesc(User user);
}
