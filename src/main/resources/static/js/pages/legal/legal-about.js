/**
 * PROJECT AKASHA - ABOUT PAGE JAVASCRIPT
 * About page JavaScript dengan animasi dan interaktivitas lengkap
 */

class AboutPage {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeFeatures());
        } else {
            // DOM is already ready
            this.initializeFeatures();
        }
    }

    initializeFeatures() {
        try {
            this.setupScrollAnimations();
            this.setupStoryRevealAnimation();
            this.setupValueCardsStagger();
            this.setupMissionListAnimation();
            this.setupInteractiveElements();
            this.setupTypingEffects();
            this.setupProgressIndicator();
            this.setupCTAAnimation(); // Add CTA animation setup
            
            console.log('📄 About page animations and interactions initialized');
        } catch (error) {
            console.error('Error initializing About page features:', error);
        }
    }

    // ======= SCROLL ANIMATIONS ======= 
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Trigger specific animations based on element
                    if (entry.target.classList.contains('vm-grid')) {
                        this.animateVisionMissionCards();
                    }
                    
                    if (entry.target.classList.contains('values-grid')) {
                        this.animateValueCards();
                    }
                    
                    // Handle CTA section specifically
                    if (entry.target.classList.contains('cta-content')) {
                        entry.target.closest('.cta-section').classList.add('fade-in');
                        console.log('CTA section animated');
                    }
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
        
        // Special observer for CTA content
        const ctaContent = document.querySelector('.cta-content');
        if (ctaContent) {
            observer.observe(ctaContent);
        }
    }

    // ======= STORY REVEAL ANIMATION ======= 
    setupStoryRevealAnimation() {
        const storyParagraphs = document.querySelectorAll('.story-reveal');
        
        if (storyParagraphs.length === 0) {
            console.warn('No story paragraphs found for animation');
            return;
        }

        const storyObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('story-animate');
                    }, index * 300); // Stagger delay
                    
                    storyObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        storyParagraphs.forEach(paragraph => {
            storyObserver.observe(paragraph);
        });
    }

    // ======= VISION MISSION CARDS ANIMATION ======= 
    animateVisionMissionCards() {
        const vmCards = document.querySelectorAll('.vm-card-animate');
        
        vmCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('vm-card-reveal');
            }, index * 400);
        });
    }

    // ======= VALUE CARDS STAGGER ======= 
    setupValueCardsStagger() {
        const valueCards = document.querySelectorAll('.value-card-animate');
        
        if (valueCards.length === 0) {
            console.warn('No value cards found for animation');
            return;
        }

        const valueObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateValueCards();
                    valueObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        const valuesGrid = document.querySelector('.values-grid');
        if (valuesGrid) {
            valueObserver.observe(valuesGrid);
        }
    }

    animateValueCards() {
        const valueCards = document.querySelectorAll('.value-card-animate');
        
        valueCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('value-reveal');
                this.addValueCardInteractions(card);
            }, index * 200);
        });
    }

    // ======= MISSION LIST ANIMATION ======= 
    setupMissionListAnimation() {
        const missionItems = document.querySelectorAll('.mission-item');
        
        if (missionItems.length === 0) {
            console.warn('No mission items found for animation');
            return;
        }

        const missionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateMissionList();
                    missionObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        const missionList = document.querySelector('.mission-list');
        if (missionList) {
            missionObserver.observe(missionList);
        }
    }

    animateMissionList() {
        const missionItems = document.querySelectorAll('.mission-item');
        
        missionItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('mission-reveal');
            }, index * 150);
        });
    }

    // ======= INTERACTIVE ELEMENTS ======= 
    setupInteractiveElements() {
        try {
            this.setupCTAButtonTracking();
            this.setupImageInteractions();
            // Removed copy to clipboard and share functionality for cleaner UI
        } catch (error) {
            console.error('Error setting up interactive elements:', error);
        }
    }

    setupCTAButtonTracking() {
        const ctaButtons = document.querySelectorAll('.cta-primary, .cta-secondary');
        
        ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.trackCTAClick(button);
                this.addRippleEffect(e, button);
            });
        });
    }

    setupImageInteractions() {
        const storyImage = document.querySelector('.story-img');
        if (!storyImage) {
            console.warn('No story image found - this is normal if image path is not available');
            // Hide the story visual section if no image
            const storyVisual = document.querySelector('.story-visual');
            if (storyVisual) {
                storyVisual.style.display = 'none';
            }
            // Adjust story content to full width
            const storyContent = document.querySelector('.story-content');
            if (storyContent) {
                storyContent.style.gridTemplateColumns = '1fr';
            }
            return;
        }

        storyImage.addEventListener('click', () => {
            this.showImageModal(storyImage);
        });

        storyImage.style.cursor = 'pointer';
        storyImage.title = 'Click to view larger image';
    }

    setupCopyToClipboard() {
        // Disable copy functionality for cleaner hero section
        console.log('Copy to clipboard functionality disabled for cleaner UI');
    }

    setupShareFunctionality() {
        // Disable share functionality for cleaner hero section
        console.log('Share functionality disabled for cleaner UI');
    }

    addNativeShareButton() {
        const shareBtn = document.createElement('button');
        shareBtn.className = 'share-btn';
        shareBtn.innerHTML = '<i class="fas fa-share-alt"></i> Bagikan';
        shareBtn.style.cssText = `
            background: var(--color-secondary);
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: var(--radius-lg);
            font-size: 0.9rem;
            cursor: pointer;
            margin-left: 1rem;
            transition: all 0.3s ease;
        `;
        
        shareBtn.addEventListener('click', async () => {
            try {
                await navigator.share({
                    title: 'Tentang Project Akasha',
                    text: 'Kisah di balik Project Akasha dan misi kami untuk kesehatan mental.',
                    url: window.location.href
                });
            } catch (err) {
                console.log('Share canceled or failed:', err);
            }
        });
        
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.appendChild(shareBtn);
        }
    }

    addSocialShareButtons() {
        const shareContainer = document.createElement('div');
        shareContainer.className = 'social-share';
        shareContainer.style.cssText = `
            margin-top: 1rem;
            display: flex;
            gap: 0.5rem;
            justify-content: center;
        `;
        
        const platforms = [
            { name: 'Twitter', icon: 'fab fa-twitter', url: `https://twitter.com/intent/tweet?text=Tentang Project Akasha&url=${encodeURIComponent(window.location.href)}` },
            { name: 'Facebook', icon: 'fab fa-facebook-f', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}` },
            { name: 'WhatsApp', icon: 'fab fa-whatsapp', url: `https://wa.me/?text=Tentang Project Akasha ${encodeURIComponent(window.location.href)}` }
        ];
        
        platforms.forEach(platform => {
            const btn = document.createElement('a');
            btn.href = platform.url;
            btn.target = '_blank';
            btn.className = 'social-share-btn';
            btn.innerHTML = `<i class="${platform.icon}"></i>`;
            btn.title = `Bagikan di ${platform.name}`;
            btn.style.cssText = `
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 40px;
                height: 40px;
                background: var(--color-gray-600);
                color: white;
                border-radius: 50%;
                text-decoration: none;
                transition: all 0.3s ease;
            `;
            
            btn.addEventListener('mouseenter', () => {
                btn.style.background = 'var(--color-primary)';
                btn.style.transform = 'translateY(-2px)';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.background = 'var(--color-gray-600)';
                btn.style.transform = 'translateY(0)';
            });
            
            shareContainer.appendChild(btn);
        });
        
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.appendChild(shareContainer);
        }
    }

    // ======= TYPING EFFECTS ======= 
    setupTypingEffects() {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            this.typewriterEffect(heroTitle);
        }
    }

    typewriterEffect(element) {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid var(--color-primary)';
        
        let index = 0;
        const typeInterval = setInterval(() => {
            element.textContent += text[index];
            index++;
            
            if (index === text.length) {
                clearInterval(typeInterval);
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        }, 100);
    }

    // ======= PROGRESS INDICATOR ======= 
    setupProgressIndicator() {
        const progressBar = this.createProgressBar();
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / scrollHeight) * 100;
            
            progressBar.style.width = `${progress}%`;
        });
    }

    // ======= CTA ANIMATION ======= 
    setupCTAAnimation() {
        const ctaSection = document.querySelector('.cta-section');
        const ctaContent = document.querySelector('.cta-content');
        
        if (!ctaSection || !ctaContent) {
            console.warn('CTA section or content not found');
            return;
        }

        // Ensure CTA section is visible
        ctaSection.style.display = 'block';
        
        const ctaObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log('CTA section is in view, triggering animation');
                    entry.target.classList.add('fade-in');
                    ctaObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        ctaObserver.observe(ctaSection);
    }

    createProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
            z-index: 9999;
            transition: width 0.3s ease;
        `;
        return progressBar;
    }

    // ======= UTILITY METHODS ======= 
    addValueCardInteractions(card) {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-12px) scale(1.02)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });

        // Double-click for special effect
        card.addEventListener('dblclick', () => {
            this.triggerCardPulse(card);
        });
    }

    triggerCardPulse(card) {
        card.style.animation = 'pulse 0.6s ease-out';
        setTimeout(() => {
            card.style.animation = '';
        }, 600);
    }

    addRippleEffect(event, button) {
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    createCopyUrlButton() {
        const copyBtn = document.createElement('button');
        copyBtn.innerHTML = '🔗 Copy Link';
        copyBtn.style.cssText = `
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: rgba(255, 255, 255, 0.9);
            border: 1px solid var(--color-gray-300);
            border-radius: var(--radius-md);
            padding: 0.5rem 1rem;
            font-size: 0.8rem;
            cursor: pointer;
            transition: all 0.3s ease;
        `;
        
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(window.location.href).then(() => {
                this.showNotification('Link copied to clipboard!');
            });
        });
        
        return copyBtn;
    }

    showImageModal(image) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;
        
        const img = image.cloneNode();
        img.style.cssText = `
            max-width: 90vw;
            max-height: 90vh;
            border-radius: var(--radius-lg);
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5);
        `;
        
        modal.appendChild(img);
        modal.addEventListener('click', () => modal.remove());
        document.body.appendChild(modal);
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: var(--color-success);
            color: white;
            padding: 1rem 2rem;
            border-radius: var(--radius-lg);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    trackCTAClick(button) {
        const action = button.classList.contains('cta-primary') ? 'primary' : 'secondary';
        console.log(`About page CTA clicked: ${action}`);
        
        // Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'about_cta_click', {
                'event_category': 'engagement',
                'event_label': action,
                'page': 'about'
            });
        }
    }
}

// ======= CSS ANIMATIONS (added via JavaScript) ======= 
const aboutAnimationStyles = document.createElement('style');
aboutAnimationStyles.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(aboutAnimationStyles);

// Initialize About page
window.aboutPage = new AboutPage();