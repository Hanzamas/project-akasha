package com.hanzama.mental_health_app.enums;

/**
 * Enum representing different mood types for mood tracking
 */
public enum MoodType {
    HAPPY("Happy"),
    SAD("Sad"),
    ANXIOUS("Anxious"),
    CALM("Calm"),
    NEUTRAL("Neutral");

    private final String displayName;

    MoodType(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
