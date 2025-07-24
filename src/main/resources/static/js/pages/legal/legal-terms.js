/* =============================================================================
   PROJECT AKASHA - TERMS & CONDITIONS PAGE
   Interactive features untuk halaman Terms & Conditions
   ============================================================================= */

document.addEventListener('DOMContentLoaded', function() {
    console.log('📋 Terms & Conditions page JavaScript loaded');
    
    // Initialize all terms page features
    initializeScrollToTop();
    initializeReadingProgress();
    initializeCopyLinkFeatures();
    initializeScrollAnimations();
    
    console.log('✅ Terms & Conditions page features initialized');
});

// ======= SCROLL TO TOP FUNCTIONALITY ======= 
function initializeScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTop');
    
    if (!scrollTopBtn) {
        console.warn('Scroll to top button not found');
        return;
    }
    
    // Show/hide scroll to top button based on scroll position
    function toggleScrollTopButton() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }
    
    // Initial check
    toggleScrollTopButton();
    
    // Listen for scroll events
    window.addEventListener('scroll', throttle(toggleScrollTopButton, 100));
    
    // Handle click event
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    console.log('✅ Scroll to top functionality initialized');
}

// ======= READING PROGRESS BAR ======= 
function initializeReadingProgress() {
    // Create progress bar element
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.innerHTML = '<div class="progress-fill"></div>';
    
    // Insert at the beginning of body
    document.body.insertBefore(progressBar, document.body.firstChild);
    
    const progressFill = progressBar.querySelector('.progress-fill');
    
    function updateReadingProgress() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.pageYOffset;
        const progress = (scrolled / documentHeight) * 100;
        
        progressFill.style.width = Math.min(progress, 100) + '%';
    }
    
    // Listen for scroll events
    window.addEventListener('scroll', throttle(updateReadingProgress, 50));
    
    // Initial calculation
    updateReadingProgress();
    
    console.log('✅ Reading progress bar initialized');
}

// ======= COPY LINK FUNCTIONALITY ======= 
function initializeCopyLinkFeatures() {
    const sectionTitles = document.querySelectorAll('.section-title');
    
    sectionTitles.forEach(title => {
        // Add copy link button
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-link-btn';
        copyBtn.innerHTML = '<i class="fas fa-link" aria-hidden="true"></i>';
        copyBtn.setAttribute('aria-label', 'Salin link ke bagian ini');
        copyBtn.setAttribute('title', 'Salin link ke bagian ini');
        
        // Get section ID
        const section = title.closest('.content-section');
        const sectionId = section ? section.id : null;
        
        if (sectionId) {
            copyBtn.addEventListener('click', async function(e) {
                e.preventDefault();
                
                const url = window.location.origin + window.location.pathname + '#' + sectionId;
                
                try {
                    await navigator.clipboard.writeText(url);
                    showCopySuccess(copyBtn);
                } catch (err) {
                    console.error('Failed to copy link:', err);
                    // Fallback untuk browser lama
                    fallbackCopyLink(url, copyBtn);
                }
            });
            
            title.appendChild(copyBtn);
        }
    });
    
    console.log('✅ Copy link features initialized');
}

// ======= SCROLL ANIMATIONS ======= 
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.content-section, .highlight-box, .warning-box, .definition-item, .service-item, .requirement-item');
    
    // Add animation class to elements
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
    });
    
    // Create intersection observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Optional: unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    console.log('✅ Scroll animations initialized');
}

// ======= UTILITY FUNCTIONS ======= 
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function showCopySuccess(button) {
    const originalHTML = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i>';
    button.style.color = '#4caf50';
    
    setTimeout(() => {
        button.innerHTML = originalHTML;
        button.style.color = '';
    }, 2000);
}

function fallbackCopyLink(text, button) {
    // Create temporary textarea for copying
    const tempTextarea = document.createElement('textarea');
    tempTextarea.value = text;
    tempTextarea.style.position = 'fixed';
    tempTextarea.style.opacity = '0';
    tempTextarea.style.pointerEvents = 'none';
    
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    
    try {
        document.execCommand('copy');
        showCopySuccess(button);
    } catch (err) {
        console.error('Fallback copy failed:', err);
    } finally {
        document.body.removeChild(tempTextarea);
    }
}

// ======= ENHANCED USER EXPERIENCE ======= 
function setupEnhancedInteractions() {
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('.definition-item, .service-item, .requirement-item, .rule-item, .contact-method');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Initialize enhanced interactions
setupEnhancedInteractions();
