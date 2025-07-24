 /* =============================================================================
   PROJECT AKASHA - LEGAL PAGES MAIN COORDINATOR
   Legal pages JavaScript coordinator - loads all legal section files
   ============================================================================= */

// ======= LEGAL PAGES COORDINATOR ======= 
document.addEventListener('DOMContentLoaded', function() {
    // Initialize general legal page features
    initializeLegalPageFeatures();
    
    console.log('📋 Legal pages coordinator initialized');
});

// ======= GENERAL LEGAL PAGE FEATURES ======= 
function initializeLegalPageFeatures() {
    // Common features untuk semua legal pages
    setupPrintFunctionality();
    setupKeyboardShortcuts();
    setupScrollBehavior();
}

// ======= PRINT FUNCTIONALITY ======= 
function setupPrintFunctionality() {
    // Add print functionality to any print buttons
    const printButtons = document.querySelectorAll('[data-action="print"]');
    
    printButtons.forEach(button => {
        button.addEventListener('click', function() {
            window.print();
        });
    });
    
    // Add Ctrl+P keyboard shortcut
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'p') {
            e.preventDefault();
            window.print();
        }
    });
}

// ======= KEYBOARD SHORTCUTS ======= 
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // ESC untuk close modals atau kembali ke top
        if (e.key === 'Escape') {
            const scrollTopBtn = document.querySelector('.scroll-top');
            if (scrollTopBtn) {
                scrollTopBtn.click();
            }
        }
        
        // Ctrl + Home untuk kembali ke top
        if (e.ctrlKey && e.key === 'Home') {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
}

// ======= SMOOTH SCROLL BEHAVIOR ======= 
function setupScrollBehavior() {
    // Enhance all anchor links with smooth scrolling
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([data-no-smooth])');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ======= DYNAMIC SCRIPT LOADING ======= 
function loadSpecificLegalPageScript() {
    const currentPage = getCurrentLegalPage();
    
    switch (currentPage) {
        case 'privacy':
            loadScript('/js/pages/legal/legal-privacy.js');
            break;
        case 'terms':
            loadScript('/js/pages/legal/legal-terms.js');
            break;
        case 'about':
            loadScript('/js/pages/legal/legal-about.js');
            break;
        case 'contact':
            loadScript('/js/pages/legal/legal-contact.js');
            break;
        case 'help':
            loadScript('/js/pages/legal/legal-help.js');
            break;
        case 'disclaimer':
            loadScript('/js/pages/legal/legal-disclaimer.js');
            break;
        default:
            console.log('No specific script for this legal page');
    }
}

// ======= UTILITY FUNCTIONS ======= 
function getCurrentLegalPage() {
    const path = window.location.pathname;
    
    if (path.includes('/privacy')) return 'privacy';
    if (path.includes('/terms')) return 'terms';
    if (path.includes('/about')) return 'about';
    if (path.includes('/contact')) return 'contact';
    if (path.includes('/help')) return 'help';
    if (path.includes('/disclaimer')) return 'disclaimer';
    
    return 'unknown';
}

function loadScript(src) {
    // Check if script already loaded
    const existingScript = document.querySelector(`script[src="${src}"]`);
    if (existingScript) {
        return;
    }
    
    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    script.onload = function() {
        console.log(`✅ Loaded: ${src}`);
    };
    script.onerror = function() {
        console.warn(`❌ Failed to load: ${src}`);
    };
    
    document.head.appendChild(script);
}

// ======= AUTO-LOAD SPECIFIC SCRIPTS ======= 
// Automatically load page-specific scripts
loadSpecificLegalPageScript();