package com.hanzama.mental_health_app.domain.entity;

import com.hanzama.mental_health_app.domain.enums.MessageSender;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

/**
 * Entitas ChatMessage yang merepresentasikan pesan dalam sistem interaksi AI.
 * Setiap pesan terhubung dengan pengguna tertentu dan mencatat apakah pesan tersebut
 * berasal dari pengguna atau respons dari AI.
 */
@Entity
@Table(name = "chat_messages")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "message", columnDefinition = "TEXT", nullable = false)
    private String message;

    @Enumerated(EnumType.STRING)
    @Column(name = "sender", nullable = false)
    private MessageSender sender;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    /**
     * Relasi Many-to-One ke entitas User.
     * Banyak ChatMessage dapat dimiliki oleh satu User.
     * Menggunakan LAZY loading untuk performa yang optimal.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    /**
     * Mengecek apakah pesan ini dikirim oleh pengguna
     */
    public boolean isFromUser() {
        return MessageSender.USER.equals(this.sender);
    }

    /**
     * Mengecek apakah pesan ini adalah respons dari AI
     */
    public boolean isFromAI() {
        return MessageSender.AI.equals(this.sender);
    }

    /**
     * Mendapatkan preview singkat dari pesan (maksimal 100 karakter)
     */
    public String getMessagePreview() {
        if (message == null) {
            return "";
        }
        return message.length() > 100 ? message.substring(0, 100) + "..." : message;
    }

    /**
     * Mendapatkan informasi sender dalam format yang readable
     */
    public String getSenderDisplayName() {
        return sender != null ? sender.getDisplayName() : "Unknown";
    }
}
