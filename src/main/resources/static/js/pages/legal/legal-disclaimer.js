/**
 * DISCLAIMER PAGE INTERACTIVE FEATURES
 * Consistent JavaScript functionality matching privacy and terms pages
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Disclaimer page JavaScript loaded');
    
    // Reading Progress Bar
    createReadingProgress();
    
    // Smooth Scrolling for Navigation
    initSmoothScrolling();
    
    // Scroll to Top Button
    initScrollToTop();
    
    // Copy Link to Section
    initCopyLinks();
    
    // Emergency Contact Highlighting
    highlightEmergencyContacts();
    
    // Intersection Observer for Section Animations
    initSectionAnimations();
});

/**
 * Create reading progress bar
 */
function createReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.id = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0;
        height: 4px;
        background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
        z-index: 1000;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', updateReadingProgress);
}

function updateReadingProgress() {
    const progressBar = document.getElementById('reading-progress');
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
}

/**
 * Initialize smooth scrolling for navigation links
 */
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.content-nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Add visual feedback
                targetElement.style.backgroundColor = 'rgba(var(--primary-rgb), 0.1)';
                setTimeout(() => {
                    targetElement.style.backgroundColor = '';
                }, 2000);
            }
        });
    });
}

/**
 * Initialize scroll to top button
 */
function initScrollToTop() {
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.id = 'scroll-to-top';
    scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up" aria-hidden="true"></i>';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effects
    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.background = 'var(--accent-color)';
    });
    
    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.background = 'var(--primary-color)';
    });
}

/**
 * Initialize copy link functionality for sections
 */
function initCopyLinks() {
    const sections = document.querySelectorAll('.content-section[id]');
    
    sections.forEach(section => {
        const title = section.querySelector('.section-title');
        if (title) {
            const copyButton = document.createElement('button');
            copyButton.innerHTML = '<i class="fas fa-link" aria-hidden="true"></i>';
            copyButton.className = 'copy-link-btn';
            copyButton.setAttribute('aria-label', 'Copy link to this section');
            copyButton.style.cssText = `
                background: none;
                border: none;
                color: var(--text-light);
                cursor: pointer;
                margin-left: 0.5rem;
                padding: 0.25rem;
                border-radius: 4px;
                transition: all 0.3s ease;
                opacity: 0;
            `;
            
            title.appendChild(copyButton);
            
            // Show copy button on section hover
            section.addEventListener('mouseenter', () => {
                copyButton.style.opacity = '1';
            });
            
            section.addEventListener('mouseleave', () => {
                copyButton.style.opacity = '0';
            });
            
            // Copy functionality
            copyButton.addEventListener('click', function() {
                const url = window.location.origin + window.location.pathname + '#' + section.id;
                
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(url).then(() => {
                        showCopyNotification(copyButton);
                    });
                } else {
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = url;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    showCopyNotification(copyButton);
                }
            });
        }
    });
}

function showCopyNotification(button) {
    const originalHTML = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i>';
    button.style.color = 'var(--success-color, #4caf50)';
    
    setTimeout(() => {
        button.innerHTML = originalHTML;
        button.style.color = 'var(--text-light)';
    }, 2000);
}

/**
 * Highlight emergency contact information
 */
function highlightEmergencyContacts() {
    const emergencyNumbers = document.querySelectorAll('.emergency-number a, .hotline-number a');
    
    emergencyNumbers.forEach(number => {
        number.addEventListener('click', function(e) {
            // Add pulse animation
            this.style.animation = 'pulse 0.6s ease-in-out';
            
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    });
    
    // Add pulse keyframes if not already present
    if (!document.querySelector('#pulse-keyframes')) {
        const style = document.createElement('style');
        style.id = 'pulse-keyframes';
        style.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Initialize section animations with Intersection Observer
 */
function initSectionAnimations() {
    const sections = document.querySelectorAll('.content-section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });
}

/**
 * Initialize disclaimer-specific features
 */
function initDisclaimerFeatures() {
    // Add special attention to critical warnings
    const criticalNotices = document.querySelectorAll('.critical-notice, .emergency-banner');
    
    criticalNotices.forEach(notice => {
        notice.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
        });
        
        notice.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '';
        });
    });
    
    // Auto-scroll to emergency section if URL contains emergency hash
    if (window.location.hash === '#keadaan-darurat') {
        setTimeout(() => {
            const emergencySection = document.getElementById('keadaan-darurat');
            if (emergencySection) {
                emergencySection.scrollIntoView({ behavior: 'smooth' });
                emergencySection.style.border = '3px solid #f44336';
                setTimeout(() => {
                    emergencySection.style.border = '';
                }, 3000);
            }
        }, 500);
    }
}

// Initialize disclaimer-specific features
document.addEventListener('DOMContentLoaded', initDisclaimerFeatures);
