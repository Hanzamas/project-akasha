/**
 * PROJECT AKASHA - MISSION SECTION JAVASCRIPT
 * JavaScript untuk Mission section dengan animasi enhanced
 */

class MissionSection {
    constructor() {
        this.section = document.getElementById('mission');
        this.valueCards = this.section?.querySelectorAll('.value-item');
        this.missionItems = this.section?.querySelectorAll('.mission-list li');
        this.missionBlocks = this.section?.querySelectorAll('.mission-block');
        
        this.init();
    }

    init() {
        if (!this.section) return;
        
        this.setupMissionObserver();
        this.initValueCardsInteraction();
        this.initMissionListStagger();
        this.initProgressiveTextLoading();
        
        console.log('Mission section initialized');
    }

    setupMissionObserver() {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };

        const missionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerMissionAnimations();
                    missionObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        missionObserver.observe(this.section);
    }

    triggerMissionAnimations() {
        // Animate mission list items
        this.animateMissionList();
        
        // Animate value cards dengan delay
        setTimeout(() => {
            this.animateValueCards();
        }, 600);
        
        // Animate mission blocks
        setTimeout(() => {
            this.animateMissionBlocks();
        }, 300);
    }

    animateMissionList() {
        if (!this.missionItems) return;

        this.missionItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(-20px)';
                item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, 50);
                
            }, index * 150); // Stagger dengan delay 150ms
        });
    }

    animateValueCards() {
        if (!this.valueCards) return;

        this.valueCards.forEach((card, index) => {
            setTimeout(() => {
                // Reset position untuk animasi
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px) scale(0.95)';
                card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                    card.classList.add('animate-in');
                }, 100);
                
            }, index * 200); // Stagger dengan delay 200ms
        });
    }

    animateMissionBlocks() {
        if (!this.missionBlocks) return;

        this.missionBlocks.forEach((block, index) => {
            setTimeout(() => {
                const title = block.querySelector('h3');
                const content = block.querySelector('p, ul');
                
                if (title) {
                    title.style.opacity = '0';
                    title.style.transform = 'translateY(20px)';
                    title.style.transition = 'all 0.6s ease-out';
                    
                    setTimeout(() => {
                        title.style.opacity = '1';
                        title.style.transform = 'translateY(0)';
                    }, 100);
                }
                
                if (content) {
                    setTimeout(() => {
                        content.style.opacity = '0';
                        content.style.transform = 'translateY(15px)';
                        content.style.transition = 'all 0.6s ease-out';
                        
                        setTimeout(() => {
                            content.style.opacity = '1';
                            content.style.transform = 'translateY(0)';
                        }, 100);
                    }, 200);
                }
                
            }, index * 300);
        });
    }

    initValueCardsInteraction() {
        if (!this.valueCards) return;

        this.valueCards.forEach(card => {
            // Enhanced hover effects
            card.addEventListener('mouseenter', () => {
                this.enhanceCardHover(card, true);
            });

            card.addEventListener('mouseleave', () => {
                this.enhanceCardHover(card, false);
            });

            // Click tracking
            card.addEventListener('click', () => {
                this.trackValueCardClick(card);
            });
        });
    }

    enhanceCardHover(card, isHovering) {
        const icon = card.querySelector('.value-icon');
        const title = card.querySelector('h4');
        
        if (isHovering) {
            // Hover effects
            card.style.transform = 'translateY(-12px) scale(1.02)';
            card.style.boxShadow = '0 25px 60px rgba(45, 55, 72, 0.2)';
            
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.filter = 'brightness(1.2)';
            }
            
            if (title) {
                title.style.color = 'var(--color-secondary)';
            }
            
            // Subtle ripple effect
            this.createRippleEffect(card);
            
        } else {
            // Reset effects
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 8px 25px rgba(45, 55, 72, 0.08)';
            
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.filter = 'brightness(1)';
            }
            
            if (title) {
                title.style.color = 'var(--color-primary)';
            }
        }
    }

    createRippleEffect(card) {
        // Simple glow effect instead of complex ripple
        const existingGlow = card.querySelector('.card-glow');
        if (existingGlow) return;
        
        const glow = document.createElement('div');
        glow.className = 'card-glow';
        glow.style.cssText = `
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(45deg, var(--color-primary), var(--color-secondary));
            border-radius: var(--radius-xl);
            opacity: 0;
            z-index: -1;
            transition: opacity 0.3s ease;
        `;
        
        card.style.position = 'relative';
        card.appendChild(glow);
        
        setTimeout(() => {
            glow.style.opacity = '0.1';
        }, 50);
        
        setTimeout(() => {
            glow.remove();
        }, 300);
    }

    initProgressiveTextLoading() {
        const missionIntro = this.section?.querySelector('.mission-intro');
        if (!missionIntro) return;

        const paragraphs = missionIntro.querySelectorAll('p');
        paragraphs.forEach((p, index) => {
            p.style.opacity = '0';
            p.style.transform = 'translateY(20px)';
            p.style.transition = 'all 0.8s ease-out';
            
            setTimeout(() => {
                p.style.opacity = '1';
                p.style.transform = 'translateY(0)';
            }, index * 400 + 200);
        });
    }

    trackValueCardClick(card) {
        const cardTitle = card.querySelector('h4')?.textContent || 'Unknown';
        console.log(`Mission value card clicked: ${cardTitle}`);
        
        // Optional: Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'value_card_click', {
                'event_category': 'engagement',
                'event_label': cardTitle,
                'section': 'mission'
            });
        }

        // Subtle click feedback
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
    }

    // Method untuk equal height jika diperlukan
    equalizeCardHeights() {
        if (!this.valueCards || this.valueCards.length === 0) return;

        // Reset heights
        this.valueCards.forEach(card => {
            card.style.height = 'auto';
        });

        // Find maximum height
        let maxHeight = 0;
        this.valueCards.forEach(card => {
            const cardHeight = card.offsetHeight;
            if (cardHeight > maxHeight) {
                maxHeight = cardHeight;
            }
        });

        // Apply maximum height to all cards
        this.valueCards.forEach(card => {
            card.style.height = `${maxHeight}px`;
        });
    }

    // Public method untuk trigger animations secara manual
    refreshAnimations() {
        this.triggerMissionAnimations();
    }
}

// Initialize Mission section when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Delay initialization to ensure other scripts are loaded
    setTimeout(() => {
        window.missionSection = new MissionSection();
    }, 100);
});

// Export untuk penggunaan di index.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MissionSection;
}
