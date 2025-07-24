/**
 * PROJECT AKASHA - CTA SECTION JAVASCRIPT
 * JavaScript untuk CTA section dengan enhanced interactions
 */

class CTASection {
    constructor() {
        this.section = document.getElementById('final-cta');
        this.ctaButtons = this.section?.querySelectorAll('.btn-primary, .btn-secondary');
        this.appButtons = this.section?.querySelectorAll('.app-button');
        this.trustItems = this.section?.querySelectorAll('.reassurance-item');
        this.ctaContent = this.section?.querySelector('.cta-content');
        
        this.init();
    }

    init() {
        if (!this.section) return;
        
        this.setupCTAObserver();
        this.initButtonEnhancements();
        this.initAppButtonActions();
        this.initTrustIndicatorsAnimation();
        this.initExternalLinkTracking();
        
        console.log('CTA section initialized');
    }

    setupCTAObserver() {
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        };

        const ctaObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerCTAAnimations();
                    ctaObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        if (this.ctaContent) {
            ctaObserver.observe(this.ctaContent);
        }
    }

    triggerCTAAnimations() {
        // Animate trust indicators dengan stagger
        setTimeout(() => {
            this.animateTrustIndicators();
        }, 600);
        
        // Animate buttons dengan delay
        setTimeout(() => {
            this.animateButtons();
        }, 800);
    }

    animateTrustIndicators() {
        if (!this.trustItems) return;

        this.trustItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px) scale(0.9)';
                item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0) scale(1)';
                    item.classList.add('animate-trust');
                }, 100);
                
            }, index * 200); // Stagger dengan delay 200ms
        });
    }

    animateButtons() {
        if (!this.ctaButtons) return;

        this.ctaButtons.forEach((button, index) => {
            setTimeout(() => {
                button.style.opacity = '0';
                button.style.transform = 'translateY(30px) scale(0.95)';
                button.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                
                setTimeout(() => {
                    button.style.opacity = '1';
                    button.style.transform = 'translateY(0) scale(1)';
                    button.classList.add('animate-cta');
                }, 150);
                
            }, index * 300);
        });
    }

    initButtonEnhancements() {
        if (!this.ctaButtons) return;

        this.ctaButtons.forEach(button => {
            // Enhanced hover effects
            button.addEventListener('mouseenter', () => {
                this.enhanceButtonHover(button, true);
            });

            button.addEventListener('mouseleave', () => {
                this.enhanceButtonHover(button, false);
            });

            // Click ripple effect
            button.addEventListener('click', (e) => {
                this.createRippleEffect(button, e);
                this.trackCTAClick(button);
            });

            // Enhanced focus for accessibility
            button.addEventListener('focus', () => {
                button.style.boxShadow = '0 0 0 3px rgba(74, 144, 226, 0.3)';
            });

            button.addEventListener('blur', () => {
                button.style.boxShadow = '';
            });
        });
    }

    enhanceButtonHover(button, isHovering) {
        const icon = button.querySelector('i');
        
        if (isHovering) {
            button.style.transform = 'translateY(-3px) scale(1.02)';
            button.style.boxShadow = '0 10px 25px rgba(74, 144, 226, 0.3)';
            
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
            
            // Subtle glow effect
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            
        } else {
            button.style.transform = 'translateY(0) scale(1)';
            button.style.boxShadow = '';
            
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        }
    }

    createRippleEffect(button, event) {
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        ripple.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: translate(-50%, -50%);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 1;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    initAppButtonActions() {
        if (!this.appButtons) return;

        this.appButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const buttonType = this.getAppButtonType(button);
                
                if (buttonType === 'google-play') {
                    this.handleGooglePlayClick(e, button);
                } else if (buttonType === 'github') {
                    this.handleGitHubClick(e, button);
                }
                
                this.createButtonClickFeedback(button);
            });

            // Enhanced hover for app buttons
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-2px) scale(1.05)';
                button.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0) scale(1)';
                button.style.boxShadow = '';
            });
        });
    }

    getAppButtonType(button) {
        const icon = button.querySelector('i');
        if (icon?.classList.contains('fa-google-play')) return 'google-play';
        if (icon?.classList.contains('fa-github')) return 'github';
        return 'unknown';
    }

    handleGooglePlayClick(event, button) {
        event.preventDefault();
        
        // Show coming soon notification
        this.showNotification('Aplikasi akan segera tersedia di Google Play Store! 🚀', 'info');
        
        // Analytics tracking
        this.trackDownloadAttempt('google-play');
        
        // Optional: Open pre-registration page atau landing page
        // window.open('https://play.google.com/store/apps/details?id=com.hanzama.mental_health_app', '_blank');
    }

    handleGitHubClick(event, button) {
        // Let the default action happen (external link)
        this.trackDownloadAttempt('github');
        
        // Show tracking notification
        setTimeout(() => {
            this.showNotification('Terima kasih telah melihat source code kami! ⭐', 'success');
        }, 1000);
    }

    createButtonClickFeedback(button) {
        // Scale animation pada click
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `cta-notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'var(--color-success)' : 'var(--color-primary)'};
            color: white;
            padding: var(--space-md) var(--space-lg);
            border-radius: var(--radius-lg);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 350px;
            font-size: 0.9rem;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Animate out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
    }

    initTrustIndicatorsAnimation() {
        if (!this.trustItems) return;

        this.trustItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-3px) scale(1.05)';
                item.style.color = 'var(--color-primary)';
                item.style.transition = 'all 0.3s ease';
                
                const icon = item.querySelector('i');
                if (icon) {
                    icon.style.transform = 'scale(1.2)';
                    icon.style.color = 'var(--color-success)';
                }
            });

            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0) scale(1)';
                item.style.color = '';
                
                const icon = item.querySelector('i');
                if (icon) {
                    icon.style.transform = 'scale(1)';
                    icon.style.color = '';
                }
            });
        });
    }

    initExternalLinkTracking() {
        const externalLinks = this.section?.querySelectorAll('a[target="_blank"]');
        if (!externalLinks) return;

        externalLinks.forEach(link => {
            link.addEventListener('click', () => {
                const href = link.getAttribute('href');
                const linkText = link.textContent.trim();
                
                console.log(`External link clicked: ${linkText} -> ${href}`);
                
                // Analytics tracking
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'external_link_click', {
                        'event_category': 'engagement',
                        'event_label': linkText,
                        'section': 'cta'
                    });
                }
            });
        });
    }

    trackCTAClick(button) {
        const buttonText = button.textContent.trim();
        const section = 'final-cta';
        
        console.log(`CTA button clicked: ${buttonText} in section: ${section}`);
        
        // Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'cta_button_click', {
                'event_category': 'conversion',
                'event_label': buttonText,
                'section': section
            });
        }
    }

    trackDownloadAttempt(platform) {
        console.log(`Download attempted for platform: ${platform}`);
        
        // Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'download_attempt', {
                'event_category': 'acquisition',
                'event_label': platform,
                'section': 'cta'
            });
        }
    }

    // Public methods untuk trigger animations manual
    refreshAnimations() {
        this.triggerCTAAnimations();
    }

    // Method untuk update button states
    updateButtonState(buttonSelector, state) {
        const button = this.section?.querySelector(buttonSelector);
        if (!button) return;

        switch (state) {
            case 'loading':
                button.style.pointerEvents = 'none';
                button.style.opacity = '0.7';
                break;
            case 'success':
                button.style.background = 'var(--color-success)';
                setTimeout(() => {
                    button.style.background = '';
                }, 2000);
                break;
            case 'error':
                button.style.background = 'var(--color-error)';
                setTimeout(() => {
                    button.style.background = '';
                }, 2000);
                break;
            default:
                button.style.pointerEvents = '';
                button.style.opacity = '';
                break;
        }
    }
}

// Initialize CTA section when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Delay initialization to ensure other scripts are loaded
    setTimeout(() => {
        window.ctaSection = new CTASection();
    }, 100);
});

// CSS untuk ripple effect dan notifications
const ctaStyles = document.createElement('style');
ctaStyles.textContent = `
    @keyframes ripple {
        to {
            width: 100px;
            height: 100px;
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: var(--space-sm);
    }
    
    .notification-content i {
        font-size: 1.1rem;
    }
    
    .cta-notification {
        font-family: var(--font-primary, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
    }
`;
document.head.appendChild(ctaStyles);

// Export untuk penggunaan di index.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CTASection;
}
