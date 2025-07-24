/**
 * PROJECT AKASHA - FEATURES SECTION JAVASCRIPT
 * Feature cards stagger animations dan interactions
 */

// Features Section Management
class FeaturesSection {
    constructor() {
        this.featuresElement = document.querySelector('#features');
        this.featureCards = document.querySelectorAll('.feature-card');
        this.chatBubbles = document.querySelectorAll('.chat-bubble');
        this.forumCards = document.querySelectorAll('.forum-card');
        this.contentItems = document.querySelectorAll('.content-item');
        
        this.init();
    }
    
    init() {
        this.initFeatureCardsStagger();
        this.initMockupAnimations();
        this.initHoverEnhancements();
        this.initProgressiveLoading();
    }
    
    // ======= FEATURE CARDS STAGGER ANIMATION =======
    initFeatureCardsStagger() {
        if (this.featureCards.length === 0) return;
        
        // Set initial state for all feature cards
        this.featureCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(60px) scale(0.95)';
            card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        const cardsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateFeatureCards();
                    cardsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        
        // Observe the features grid container
        const featuresGrid = document.querySelector('.features-grid');
        if (featuresGrid) {
            cardsObserver.observe(featuresGrid);
        }
    }
    
    animateFeatureCards() {
        this.featureCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
                
                // Add bounce effect for icons
                const icon = card.querySelector('.feature-icon');
                if (icon) {
                    setTimeout(() => {
                        icon.style.transition = 'transform 0.4s ease-out';
                        icon.style.transform = 'scale(1.1) rotate(-3deg)';
                        setTimeout(() => {
                            icon.style.transform = 'scale(1) rotate(0deg)';
                        }, 250);
                    }, 500);
                }
                
                // Animate mockup elements inside
                this.animateCardContent(card, index);
                
            }, index * 200); // 200ms delay between each card
        });
    }
    
    // ======= CARD CONTENT ANIMATIONS =======
    animateCardContent(card, cardIndex) {
        // Animate chat bubbles if present
        const chatBubbles = card.querySelectorAll('.chat-bubble');
        chatBubbles.forEach((bubble, index) => {
            bubble.style.opacity = '0';
            bubble.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                bubble.style.transition = 'all 0.5s ease-out';
                bubble.style.opacity = '1';
                bubble.style.transform = 'translateX(0)';
            }, 800 + (index * 150));
        });
        
        // Animate forum cards if present
        const forumCards = card.querySelectorAll('.forum-card');
        forumCards.forEach((forumCard, index) => {
            forumCard.style.opacity = '0';
            forumCard.style.transform = 'scale(0.9)';
            setTimeout(() => {
                forumCard.style.transition = 'all 0.4s ease-out';
                forumCard.style.opacity = '1';
                forumCard.style.transform = 'scale(1)';
            }, 900 + (index * 100));
        });
        
        // Animate content items if present
        const contentItems = card.querySelectorAll('.content-item');
        contentItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
                item.style.transition = 'all 0.5s ease-out';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 1000 + (index * 120));
        });
        
        // Animate mood chart if present
        const moodLine = card.querySelector('.mood-line');
        if (moodLine) {
            moodLine.style.transform = 'scaleX(0)';
            moodLine.style.transformOrigin = 'left';
            setTimeout(() => {
                moodLine.style.transition = 'transform 1s ease-out';
                moodLine.style.transform = 'scaleX(1)';
            }, 1200);
        }
    }
    
    // ======= MOCKUP ANIMATIONS =======
    initMockupAnimations() {
        // Progressive chat animation
        const chatMockups = document.querySelectorAll('.chat-mockup');
        chatMockups.forEach(mockup => {
            mockup.addEventListener('mouseenter', () => {
                const bubbles = mockup.querySelectorAll('.chat-bubble');
                bubbles.forEach((bubble, index) => {
                    setTimeout(() => {
                        bubble.style.transform = 'translateX(3px)';
                        setTimeout(() => {
                            bubble.style.transform = 'translateX(0)';
                        }, 150);
                    }, index * 100);
                });
            });
        });
        
        // Community grid hover effects
        const communityGrids = document.querySelectorAll('.community-grid');
        communityGrids.forEach(grid => {
            const forumCards = grid.querySelectorAll('.forum-card');
            forumCards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    card.style.transform = 'translateY(-3px) scale(1.02)';
                });
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'translateY(0) scale(1)';
                });
            });
        });
    }
    
    // ======= ENHANCED HOVER EFFECTS =======
    initHoverEnhancements() {
        this.featureCards.forEach(card => {
            const icon = card.querySelector('.feature-icon');
            const mockup = card.querySelector('.chat-mockup, .community-grid, .growth-dashboard, .education-preview');
            
            card.addEventListener('mouseenter', () => {
                // Icon rotation effect
                if (icon) {
                    icon.style.transform = 'scale(1.05) rotate(5deg)';
                }
                
                // Mockup subtle zoom
                if (mockup) {
                    mockup.style.transform = 'scale(1.02)';
                }
                
                // Add glow effect
                card.style.boxShadow = '0 25px 60px rgba(74, 144, 226, 0.2)';
            });
            
            card.addEventListener('mouseleave', () => {
                // Reset transforms
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
                
                if (mockup) {
                    mockup.style.transform = 'scale(1)';
                }
                
                // Reset shadow
                card.style.boxShadow = '0 15px 40px rgba(45, 55, 72, 0.08)';
            });
        });
        
        // Highlight tags interaction
        const highlights = document.querySelectorAll('.highlight');
        highlights.forEach(highlight => {
            highlight.addEventListener('mouseenter', () => {
                highlight.style.transform = 'translateY(-2px) scale(1.05)';
            });
            highlight.addEventListener('mouseleave', () => {
                highlight.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    // ======= PROGRESSIVE LOADING EFFECT =======
    initProgressiveLoading() {
        // Add typing effect for chat bubbles
        const chatBubbles = document.querySelectorAll('.chat-bubble');
        chatBubbles.forEach(bubble => {
            const text = bubble.textContent;
            bubble.textContent = '';
            
            bubble.addEventListener('mouseenter', () => {
                if (bubble.textContent === '') {
                    this.typeText(bubble, text, 30);
                }
            });
        });
    }
    
    typeText(element, text, speed) {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }
    
    // ======= UTILITY METHODS =======
    resetAnimations() {
        // Reset feature cards
        this.featureCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(60px) scale(0.95)';
        });
    }
    
    // Equal height adjustment for cards
    equalizeCardHeights() {
        if (window.innerWidth <= 768) return; // Skip on mobile
        
        let maxHeight = 0;
        this.featureCards.forEach(card => {
            card.style.height = 'auto';
            maxHeight = Math.max(maxHeight, card.offsetHeight);
        });
        
        this.featureCards.forEach(card => {
            card.style.height = maxHeight + 'px';
        });
    }
}

// Initialize Features Section when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const featuresSection = new FeaturesSection();
        
        // Equalize heights on load and resize
        window.addEventListener('load', () => featuresSection.equalizeCardHeights());
        window.addEventListener('resize', () => featuresSection.equalizeCardHeights());
    });
} else {
    const featuresSection = new FeaturesSection();
    window.addEventListener('load', () => featuresSection.equalizeCardHeights());
    window.addEventListener('resize', () => featuresSection.equalizeCardHeights());
}

// Export for potential use in main index.js
window.FeaturesSection = FeaturesSection;
