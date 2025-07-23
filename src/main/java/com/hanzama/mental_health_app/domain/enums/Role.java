package com.hanzama.mental_health_app.domain.enums;

/**
 * Enum Role untuk mendefinisikan peran pengguna dalam sistem aplikasi kesehatan mental.
 * Digunakan untuk mengatur hak akses antara pengguna biasa dan administrator.
 */
public enum Role {
    
    /**
     * Pengguna biasa - dapat mengakses fitur utama aplikasi seperti:
     * - Interaksi dengan AI
     * - Komunitas & Forum
     * - Pertumbuhan Diri (Journal & Mood Tracking)
     * - Konten & Edukasi
     */
    USER("User"),
    
    /**
     * Administrator - memiliki akses penuh termasuk:
     * - Semua fitur USER
     * - Panel Admin
     * - Manajemen pengguna
     * - Manajemen konten
     * - Moderasi forum
     */
    ADMIN("Administrator");

    private final String displayName;

    Role(String displayName) {
        this.displayName = displayName;
    }

    /**
     * Mendapatkan nama tampilan yang user-friendly untuk role
     */
    public String getDisplayName() {
        return displayName;
    }

    /**
     * Mendapatkan role authority string untuk Spring Security
     */
    public String getAuthority() {
        return "ROLE_" + this.name();
    }
}
