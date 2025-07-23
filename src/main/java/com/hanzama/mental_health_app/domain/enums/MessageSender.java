package com.hanzama.mental_health_app.domain.enums;

/**
 * Enum MessageSender untuk mendefinisikan pengirim pesan dalam sistem chat AI.
 * Digunakan untuk membedakan antara pesan yang dikirim oleh pengguna dan respons dari AI.
 */
public enum MessageSender {
    
    /**
     * Pesan yang dikirim oleh pengguna (user input)
     */
    USER("User"),
    
    /**
     * Pesan yang dikirim oleh sistem AI sebagai respons
     */
    AI("AI Assistant");

    private final String displayName;

    MessageSender(String displayName) {
        this.displayName = displayName;
    }

    /**
     * Mendapatkan nama tampilan yang user-friendly untuk sender
     */
    public String getDisplayName() {
        return displayName;
    }

    /**
     * Mengecek apakah sender adalah pengguna
     */
    public boolean isUser() {
        return this == USER;
    }

    /**
     * Mengecek apakah sender adalah AI
     */
    public boolean isAI() {
        return this == AI;
    }
}
