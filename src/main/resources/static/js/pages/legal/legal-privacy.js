/* =============================================================================
   PROJECT AKASHA - PRIVACY PAGE INTERACTIVE FEATURES
   JavaScript untuk scrollspy navigation, smooth scrolling, dan scroll to top
   ============================================================================= */

document.addEventListener('DOMContentLoaded', function() {
    // ======= SMOOTH SCROLLING NAVIGATION ======= 
    const sections = document.querySelectorAll('.content-section[id]');
    const scrollTopBtn = document.getElementById('scrollTop');

    // ======= SCROLLSPY FUNCTIONALITY ======= 
    // Since we removed sidebar navigation, we can simplify or remove scrollspy
    // Keep simple scroll animations instead

    // ======= SCROLL TO TOP FUNCTIONALITY ======= 
    function toggleScrollTopButton() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }

    // Show/hide scroll to top button
    window.addEventListener('scroll', toggleScrollTopButton);

    // Scroll to top when button is clicked
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ======= ENHANCED UX FEATURES ======= 
    
    // Highlight search functionality (if implemented later)
    const searchInput = document.getElementById('privacy-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            highlightSearchTerms(searchTerm);
        });
    }

    function highlightSearchTerms(term) {
        if (term.length < 3) {
            clearHighlights();
            return;
        }

        const textNodes = getTextNodesIn(document.querySelector('.privacy-main'));
        
        textNodes.forEach(node => {
            const text = node.textContent.toLowerCase();
            if (text.includes(term)) {
                const highlightedHTML = node.textContent.replace(
                    new RegExp(`(${term})`, 'gi'),
                    '<mark class="search-highlight">$1</mark>'
                );
                
                const wrapper = document.createElement('span');
                wrapper.innerHTML = highlightedHTML;
                node.parentNode.replaceChild(wrapper, node);
            }
        });
    }

    function clearHighlights() {
        const highlights = document.querySelectorAll('.search-highlight');
        highlights.forEach(highlight => {
            const parent = highlight.parentNode;
            parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
            parent.normalize();
        });
    }

    function getTextNodesIn(node) {
        let textNodes = [];
        
        if (node.nodeType === 3) { // Text node
            textNodes.push(node);
        } else {
            for (let i = 0; i < node.childNodes.length; i++) {
                textNodes = textNodes.concat(getTextNodesIn(node.childNodes[i]));
            }
        }
        
        return textNodes;
    }

    // ======= ACCESSIBILITY ENHANCEMENTS ======= 
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Alt + T untuk scroll to top
        if (e.altKey && e.code === 'KeyT') {
            e.preventDefault();
            scrollTopBtn.click();
        }
        
        // Alt + H untuk kembali ke hero section
        if (e.altKey && e.code === 'KeyH') {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });

    // Focus management untuk screen readers
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('focus', function() {
            const rect = this.getBoundingClientRect();
            if (rect.top < 0 || rect.bottom > window.innerHeight) {
                this.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                });
            }
        });
    });

    // ======= LOADING ANIMATIONS ======= 
    
    // Animate sections on scroll
    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe content sections for animation
    sections.forEach(section => {
        section.classList.add('animate-on-scroll');
        animateObserver.observe(section);
    });

    // ======= PROGRESS INDICATOR ======= 
    
    // Create reading progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.innerHTML = '<div class="progress-fill"></div>';
    document.body.appendChild(progressBar);

    const progressFill = progressBar.querySelector('.progress-fill');

    function updateReadingProgress() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        progressFill.style.width = scrolled + '%';
    }

    window.addEventListener('scroll', updateReadingProgress);

    // ======= PRINT FUNCTIONALITY ======= 
    
    // Add print button if needed
    const printBtn = document.getElementById('print-privacy');
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            // Focus on main content before printing
            const mainContent = document.querySelector('.privacy-main');
            if (mainContent) {
                mainContent.focus();
            }
            
            window.print();
        });
    }

    // ======= COPY LINK FUNCTIONALITY ======= 
    
    // Add copy link functionality to section titles
    sections.forEach(section => {
        const title = section.querySelector('.section-title');
        if (title) {
            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-link-btn';
            copyBtn.innerHTML = '<i class="fas fa-link" aria-hidden="true"></i>';
            copyBtn.title = 'Salin link ke bagian ini';
            copyBtn.setAttribute('aria-label', 'Salin link ke bagian ini');
            
            copyBtn.addEventListener('click', function() {
                const sectionId = section.getAttribute('id');
                const url = `${window.location.origin}${window.location.pathname}#${sectionId}`;
                
                navigator.clipboard.writeText(url).then(() => {
                    // Show success feedback
                    const originalHTML = this.innerHTML;
                    this.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i>';
                    this.style.color = '#4caf50';
                    
                    setTimeout(() => {
                        this.innerHTML = originalHTML;
                        this.style.color = '';
                    }, 2000);
                }).catch(err => {
                    console.warn('Could not copy link:', err);
                });
            });
            
            title.appendChild(copyBtn);
        }
    });

    // ======= INITIALIZE ======= 
    
    // Set initial state
    toggleScrollTopButton();
    updateReadingProgress();
    
    // Handle direct links (if someone visits with #section)
    if (window.location.hash) {
        const targetSection = document.querySelector(window.location.hash);
        if (targetSection) {
            setTimeout(() => {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }

    console.log('🔒 Privacy page interactive features initialized');
});
