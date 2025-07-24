/**
 * PROJECT AKASHA - HEADER COMPONENT JAVASCRIPT
 * Essential functionality untuk navigation header
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ======= MOBILE MENU TOGGLE =======
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Toggle aria-expanded
            this.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle nav menu
            navMenu.classList.toggle('nav-open');
            
            // Prevent body scroll when menu is open
            if (!isExpanded) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('nav-open');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when pressing Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('nav-open')) {
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('nav-open');
                document.body.style.overflow = '';
            }
        });
    }
    
    // ======= HEADER SCROLL BEHAVIOR =======
    const header = document.querySelector('.main-header');
    let lastScrollTop = 0;
    let scrollTimeout;
    
    if (header) {
        window.addEventListener('scroll', function() {
            // Clear existing timeout
            clearTimeout(scrollTimeout);
            
            // Debounce scroll event
            scrollTimeout = setTimeout(function() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                // Add scrolled class when not at top
                if (scrollTop > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                
                // Hide/show header based on scroll direction
                if (scrollTop > lastScrollTop && scrollTop > 200) {
                    // Scrolling down - hide header
                    header.classList.add('header-hidden');
                } else {
                    // Scrolling up - show header
                    header.classList.remove('header-hidden');
                }
                
                lastScrollTop = scrollTop;
            }, 10); // Small delay for better performance
        });
    }
    
    // ======= SMOOTH SCROLLING FOR ANCHOR LINKS =======
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('nav-open')) {
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                    navMenu.classList.remove('nav-open');
                    document.body.style.overflow = '';
                }
                
                // Smooth scroll to target
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ======= ACTIVE NAVIGATION STATE =======
    function updateActiveNavigation() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            const linkPath = new URL(link.href).pathname;
            
            // Remove active class from all links
            link.classList.remove('nav-active');
            
            // Add active class to current page
            if (linkPath === currentPath || (currentPath === '/' && linkPath === '/')) {
                link.classList.add('nav-active');
            }
        });
    }
    
    // Update active navigation on page load
    updateActiveNavigation();
    
    // ======= RESIZE HANDLER =======
    window.addEventListener('resize', function() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('nav-open')) {
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('nav-open');
            document.body.style.overflow = '';
        }
    });
    
});