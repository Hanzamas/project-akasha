/**
 * PROJECT AKASHA - FOOTER COMPONENT JAVASCRIPT
 * Essential functionality untuk footer
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ======= EXTERNAL LINK HANDLING =======
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    
    externalLinks.forEach(link => {
        // Add security attributes if missing
        if (!link.getAttribute('rel')) {
            link.setAttribute('rel', 'noopener noreferrer');
        }
        
        // Add external link indicator
        link.addEventListener('click', function(e) {
            // Optional: Add confirmation for external links
            // if (!confirm('Anda akan diarahkan ke situs eksternal. Lanjutkan?')) {
            //     e.preventDefault();
            // }
        });
    });
    
    // ======= PHONE NUMBER CLICK TRACKING =======
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            const phoneNumber = this.getAttribute('href').replace('tel:', '');
            console.log('Emergency call initiated:', phoneNumber);
            
            // Optional: Send analytics event
            if (typeof gtag !== 'undefined') {
                gtag('event', 'emergency_call', {
                    'phone_number': phoneNumber,
                    'event_category': 'emergency'
                });
            }
        });
    });
    
    // ======= EMAIL PROTECTION =======
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Basic email protection - could add more sophisticated methods
            const email = this.getAttribute('href').replace('mailto:', '');
            
            // Optional: Replace with contact form for better protection
            // e.preventDefault();
            // openContactForm(email);
        });
    });
    
    // ======= SMOOTH SCROLL FOR FOOTER LINKS =======
    const internalLinks = document.querySelectorAll('.footer-links a[href^="/"], .footer-legal a[href^="/"]');
    
    internalLinks.forEach(link => {
        // Only add smooth scroll if it's an anchor link
        if (link.getAttribute('href').includes('#')) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                const hashIndex = href.indexOf('#');
                
                if (hashIndex !== -1) {
                    const targetId = href.substring(hashIndex);
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        e.preventDefault();
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        }
    });
    
    // ======= FOOTER VISIBILITY TRACKING =======
    const footer = document.querySelector('.main-footer');
    
    if (footer) {
        const footerObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Footer is visible
                    footer.classList.add('footer-visible');
                    
                    // Optional: Track footer view
                    console.log('Footer viewed');
                } else {
                    footer.classList.remove('footer-visible');
                }
            });
        }, {
            threshold: 0.2
        });
        
        footerObserver.observe(footer);
    }
    
    // ======= CONTACT FORM INTEGRATION =======
    function openContactForm(email) {
        // Example contact form integration
        // This could open a modal or redirect to contact page
        const contactUrl = `/contact?ref=${encodeURIComponent(email)}`;
        window.location.href = contactUrl;
    }
    
    // ======= SOCIAL MEDIA ANALYTICS =======
    const socialLinks = document.querySelectorAll('.footer-links a[href*="github.com"], .footer-links a[href*="linkedin.com"], .footer-links a[href*="instagram.com"], .footer-links a[href*="twitter.com"]');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            const platform = this.href.includes('github') ? 'github' :
                           this.href.includes('linkedin') ? 'linkedin' :
                           this.href.includes('instagram') ? 'instagram' : 'twitter';
                           
            console.log('Social media link clicked:', platform);
            
            // Optional: Send analytics event
            if (typeof gtag !== 'undefined') {
                gtag('event', 'social_click', {
                    'platform': platform,
                    'event_category': 'social_media'
                });
            }
        });
    });
    
    // ======= COPYRIGHT YEAR AUTO-UPDATE =======
    const copyrightElement = document.querySelector('.footer-copyright p');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        const copyrightText = copyrightElement.textContent;
        
        // Update year if it's different from current year
        if (!copyrightText.includes(currentYear.toString())) {
            copyrightElement.textContent = copyrightText.replace(/©\s*\d{4}/, `© ${currentYear}`);
        }
    }
    
});