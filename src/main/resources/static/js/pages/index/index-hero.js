/**
 * PROJECT AKASHA - HERO SECTION JAVASCRIPT
 * Khusus untuk hero section animations dan interactions
 */

// Hero Section Management
class HeroSection {
    constructor() {
        this.heroElement = document.querySelector('#hero');
        this.floatingElements = document.querySelectorAll('.floating-icon');
        this.heroBgDecoration = document.querySelector('.hero-bg-decoration');
        this.statsElements = document.querySelectorAll('.stat-number');
        this.trustItems = document.querySelectorAll('#hero .trust-item');
        
        this.init();
    }
    
    init() {
        this.initHeroAnimations();
        this.initFloatingElements();
        this.initParallaxEffect();
        this.initStatsAnimation();
        this.initTrustAnimation();
    }
    
    // ======= HERO ANIMATIONS =======
    initHeroAnimations() {
        // Immediate trigger for hero section (always visible)
        setTimeout(() => {
            const heroElements = document.querySelectorAll('#hero .fade-in');
            heroElements.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('animate-in');
                }, index * 200);
            });
        }, 300);
    }
    
    // ======= FLOATING ELEMENTS =======
    initFloatingElements() {
        this.floatingElements.forEach((element, index) => {
            // Set initial state
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px) scale(0.8)';
            element.style.pointerEvents = 'auto';
            
            // Animate in after delay
            setTimeout(() => {
                element.style.transition = 'all 0.6s ease-out';
                element.style.opacity = '0.7';
                element.style.transform = 'translateY(0) scale(1)';
            }, 1000 + (index * 300));
            
            // Add mouse interaction
            element.addEventListener('mouseenter', () => {
                element.style.transition = 'all 0.3s ease-out';
                element.style.transform = 'translateY(-5px) scale(1.3) rotate(15deg)';
                element.style.opacity = '1';
                element.style.animationPlayState = 'paused';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transition = 'all 0.5s ease-out';
                element.style.transform = 'translateY(0) scale(1) rotate(0deg)';
                element.style.opacity = '0.7';
                element.style.animationPlayState = 'running';
            });
        });
    }
    
    // ======= PARALLAX EFFECT =======
    initParallaxEffect() {
        if (this.heroBgDecoration) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.3;
                this.heroBgDecoration.style.transform = `translateY(${rate}px)`;
            });
        }
    }
    
    // ======= STATS ANIMATION =======
    initStatsAnimation() {
        // Trigger hero stats animation immediately
        setTimeout(() => {
            this.statsElements.forEach((stat, index) => {
                setTimeout(() => this.animateStatNumber(stat), 600 + (index * 200));
            });
        }, 500);
    }
    
    animateStatNumber(element) {
        const text = element.textContent;
        
        // Skip animation for non-numeric values
        if (text === '∞' || text === '24/7' || text === '100%') {
            element.style.opacity = '0';
            element.style.transform = 'scale(0.8)';
            setTimeout(() => {
                element.style.transition = 'all 0.6s ease-out';
                element.style.opacity = '1';
                element.style.transform = 'scale(1)';
            }, 100);
            return;
        }
        
        // For numeric values
        element.classList.add('animate-stat');
    }
    
    // ======= TRUST INDICATORS ANIMATION =======
    initTrustAnimation() {
        // Trigger hero trust animation
        setTimeout(() => {
            this.trustItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('animate-trust');
                }, index * 150);
            });
        }, 1000);
    }
    
    // ======= HERO CTA TRACKING =======
    initCTATracking() {
        const heroCta = document.querySelector('#hero .hero-cta, #hero .btn-primary');
        if (heroCta) {
            heroCta.addEventListener('click', function() {
                console.log('Hero CTA clicked - Starting user journey');
                
                // Optional: Analytics tracking
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'hero_cta_click', {
                        'event_category': 'engagement',
                        'event_label': 'hero_journey_start'
                    });
                }
            });
        }
    }
}

// Initialize Hero Section when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new HeroSection();
    });
} else {
    new HeroSection();
}

// Export for potential use in main index.js
window.HeroSection = HeroSection;