/**
 * PROJECT AKASHA - INDEX PAGE JAVASCRIPT
 * Global landing page functionality (tanpa hero section)
 * Memuat index-hero.js secara dinamis
 */

// ======= DYNAMIC SCRIPT LOADING =======
function loadHeroScript() {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = '/js/pages/index/index-hero.js';
        script.defer = true;
        script.onload = () => {
            console.log('Hero script loaded successfully');
            resolve();
        };
        script.onerror = () => {
            console.error('Failed to load hero script');
            reject(new Error('Hero script loading failed'));
        };
        document.head.appendChild(script);
    });
}

function loadStoryScript() {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = '/js/pages/index/index-story.js';
        script.defer = true;
        script.onload = () => {
            console.log('Story script loaded successfully');
            resolve();
        };
        script.onerror = () => {
            console.error('Failed to load story script');
            reject(new Error('Story script loading failed'));
        };
        document.head.appendChild(script);
    });
}

function loadFeaturesScript() {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = '/js/pages/index/index-features.js';
        script.defer = true;
        script.onload = () => {
            console.log('Features script loaded successfully');
            resolve();
        };
        script.onerror = () => {
            console.error('Failed to load features script');
            reject(new Error('Features script loading failed'));
        };
        document.head.appendChild(script);
    });
}

function loadMissionScript() {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = '/js/pages/index/index-mission.js';
        script.defer = true;
        script.onload = () => {
            console.log('Mission script loaded successfully');
            resolve();
        };
        script.onerror = () => {
            console.error('Failed to load mission script');
            reject(new Error('Mission script loading failed'));
        };
        document.head.appendChild(script);
    });
}

function loadCTAScript() {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = '/js/pages/index/index-cta.js';
        script.defer = true;
        script.onload = () => {
            console.log('CTA script loaded successfully');
            resolve();
        };
        script.onerror = () => {
            console.error('Failed to load CTA script');
            reject(new Error('CTA script loading failed'));
        };
        document.head.appendChild(script);
    });
}

function loadDeveloperScript() {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = '/js/pages/index/index-developer.js';
        script.defer = true;
        script.onload = () => {
            console.log('Developer script loaded successfully');
            resolve();
        };
        script.onerror = () => {
            console.error('Failed to load developer script');
            reject(new Error('Developer script loading failed'));
        };
        document.head.appendChild(script);
    });
}

document.addEventListener('DOMContentLoaded', async function() {
    
    // Load section scripts first
    try {
        await Promise.all([
            loadHeroScript(),
            loadStoryScript(),
            loadFeaturesScript(),
            loadMissionScript(),
            loadCTAScript(),
            loadDeveloperScript()
        ]);
        console.log('All section scripts loaded, initializing page...');
    } catch (error) {
        console.error('Error loading section scripts:', error);
        // Continue with page initialization even if section scripts fail
    }
    
    // ======= SMOOTH SCROLLING FOR NAVIGATION =======
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.main-header')?.offsetHeight || 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ======= SCROLL ANIMATIONS (Non-Hero Sections) =======
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const scrollObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special handling for non-hero sections
                if (entry.target.closest('.story-section, .features-section, .mission-section, .cta-section')) {
                    // Add specific animations for other sections
                    const stats = entry.target.querySelectorAll('.stat-number:not(#hero .stat-number)');
                    stats.forEach((stat, index) => {
                        setTimeout(() => animateGeneralStat(stat), index * 200);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements except hero
    document.querySelectorAll('.fade-in:not(#hero .fade-in)').forEach(el => {
        scrollObserver.observe(el);
    });
    
    // ======= GENERAL STATS ANIMATION (Non-Hero) =======
    function animateGeneralStat(element) {
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
        
        element.classList.add('animate-stat');
    }
    
    // ======= TRUST INDICATORS ANIMATION (Non-Hero) =======
    const trustItems = document.querySelectorAll('.trust-item:not(#hero .trust-item)');
    const trustObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-trust');
                }, index * 200);
                trustObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    trustItems.forEach(item => {
        trustObserver.observe(item);
    });
    
    // ======= GENERAL CTA BUTTON TRACKING =======
    const ctaButtons = document.querySelectorAll('.btn-primary:not(#hero .btn-primary)');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const section = this.closest('section')?.id || 'unknown';
            console.log(`CTA clicked in section: ${section}`);
            
            // Optional: Analytics tracking
            if (typeof gtag !== 'undefined') {
                gtag('event', 'cta_click', {
                    'event_category': 'engagement',
                    'event_label': section
                });
            }
        });
    });
    
    // ======= PERFORMANCE OPTIMIZATION =======
    // Preload critical images
    const criticalImages = [
        '/images/cover-character.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    // ======= INTERSECTION OBSERVER FOR SECTIONS =======
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add any section-specific animations here
                const sectionId = entry.target.id;
                console.log(`Section ${sectionId} is now visible`);
            }
        });
    }, { threshold: 0.3 });
    
    // Observe all major sections
    document.querySelectorAll('section[id]').forEach(section => {
        sectionObserver.observe(section);
    });
    
});