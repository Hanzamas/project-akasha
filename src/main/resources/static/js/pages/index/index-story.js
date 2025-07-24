/**
 * PROJECT AKASHA - STORY SECTION JAVASCRIPT
 * Timeline stagger dan value cards animations
 */

// Story Section Management
class StorySection {
    constructor() {
        this.storyElement = document.querySelector('#story');
        this.timelineItems = document.querySelectorAll('.timeline-item');
        this.valueCards = document.querySelectorAll('.value-card');
        this.progressLine = document.querySelector('.progress-line-fg');
        
        this.init();
    }
    
    init() {
        this.initProgressLineAnimation();
        this.initTimelineStagger();
        this.initValueCardsStagger();
        this.initHoverEnhancements();
    }
    
    // ======= PROGRESS LINE ANIMATION =======
    initProgressLineAnimation() {
        if (this.progressLine) {
            // Set initial state
            this.progressLine.style.width = '0%';
            
            const progressObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            this.progressLine.style.width = '75%';
                        }, 800);
                        progressObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            progressObserver.observe(this.progressLine.parentElement);
        }
    }
    
    // ======= TIMELINE STAGGER ANIMATION =======
    initTimelineStagger() {
        if (this.timelineItems.length === 0) return;
        
        // Set initial state for all timeline items
        this.timelineItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-30px)';
            item.style.transition = 'all 0.6s ease-out';
        });
        
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateTimelineItems();
                    timelineObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        // Observe the timeline container
        const timelineContainer = document.querySelector('.story-timeline');
        if (timelineContainer) {
            timelineObserver.observe(timelineContainer);
        }
    }
    
    animateTimelineItems() {
        this.timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
                
                // Add subtle bounce effect
                setTimeout(() => {
                    item.style.transform = 'translateX(-5px)';
                    setTimeout(() => {
                        item.style.transform = 'translateX(0)';
                    }, 150);
                }, 300);
                
            }, index * 200); // 200ms delay between each item
        });
    }
    
    // ======= VALUE CARDS STAGGER ANIMATION =======
    initValueCardsStagger() {
        if (this.valueCards.length === 0) return;
        
        // Set initial state for all value cards
        this.valueCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(40px) scale(0.9)';
            card.style.transition = 'all 0.7s ease-out';
        });
        
        const cardsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateValueCards();
                    cardsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        // Observe the cards container
        const cardsContainer = document.querySelector('.story-values-grid');
        if (cardsContainer) {
            cardsObserver.observe(cardsContainer);
        }
    }
    
    animateValueCards() {
        this.valueCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
                
                // Add icon bounce effect
                const icon = card.querySelector('.value-icon');
                if (icon) {
                    setTimeout(() => {
                        icon.style.transition = 'transform 0.3s ease-out';
                        icon.style.transform = 'scale(1.1) rotate(5deg)';
                        setTimeout(() => {
                            icon.style.transform = 'scale(1) rotate(0deg)';
                        }, 200);
                    }, 400);
                }
                
            }, index * 150); // 150ms delay between each card
        });
    }
    
    // ======= HOVER ENHANCEMENTS =======
    initHoverEnhancements() {
        // Enhanced timeline item hover
        this.timelineItems.forEach(item => {
            const dot = item.querySelector('.timeline-dot');
            
            item.addEventListener('mouseenter', () => {
                if (dot) {
                    dot.style.transition = 'all 0.3s ease-out';
                    dot.style.transform = 'scale(1.15) rotate(10deg)';
                }
            });
            
            item.addEventListener('mouseleave', () => {
                if (dot) {
                    dot.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });
        
        // Enhanced value card hover
        this.valueCards.forEach(card => {
            const icon = card.querySelector('.value-icon');
            
            card.addEventListener('mouseenter', () => {
                if (icon) {
                    icon.style.transition = 'all 0.3s ease-out';
                    icon.style.transform = 'scale(1.1) rotate(-5deg)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });
    }
    
    // ======= UTILITY METHODS =======
    resetAnimations() {
        // Reset timeline items
        this.timelineItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-30px)';
        });
        
        // Reset value cards
        this.valueCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(40px) scale(0.9)';
        });
        
        // Reset progress line
        if (this.progressLine) {
            this.progressLine.style.width = '0%';
        }
    }
}

// Initialize Story Section when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new StorySection();
    });
} else {
    new StorySection();
}

// Export for potential use in main index.js
window.StorySection = StorySection;
