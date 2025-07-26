/* =============================================================================
   PROJECT AKASHA - HELP CENTER JAVASCRIPT
   Comprehensive help center functionality with search, FAQ accordion, and animations
   ============================================================================= */

// ======= HELP PAGE CLASS ======= 
class HelpPage {
    constructor() {
        this.searchInput = null;
        this.faqItems = [];
        this.searchTimeout = null;
        this.searchDelay = 300;
        this.allContent = [];
        this.currentFilter = '';
        
        this.init();
    }
    
    // ======= INITIALIZATION ======= 
    init() {
        this.cacheElements();
        this.setupScrollAnimations();
        this.setupSearchFunctionality();
        this.setupFAQAccordion();
        this.setupStaggerAnimations();
        this.setupEmergencyContacts();
        this.setupSmoothScrolling();
        this.logInitialization();
    }
    
    // ======= CACHE DOM ELEMENTS ======= 
    cacheElements() {
        this.searchInput = document.getElementById('help-search');
        this.faqItems = document.querySelectorAll('.faq-item');
        this.quickLinks = document.querySelectorAll('.quick-link-card');
        this.faqCategories = document.querySelectorAll('.faq-category');
        this.supportOptions = document.querySelectorAll('.support-option');
        this.emergencyContacts = document.querySelectorAll('.emergency-contact');
        
        // Build searchable content index
        this.buildContentIndex();
        
        console.log('📋 Help page elements cached');
    }
    
    // ======= BUILD SEARCHABLE CONTENT INDEX ======= 
    buildContentIndex() {
        this.allContent = [];
        
        // Index FAQ content
        this.faqItems.forEach((item, index) => {
            const question = item.querySelector('.faq-question span')?.textContent || '';
            const answer = item.querySelector('.faq-answer')?.textContent || '';
            const category = item.closest('.faq-category')?.id || '';
            
            this.allContent.push({
                type: 'faq',
                element: item,
                question,
                answer,
                category,
                index,
                searchText: `${question} ${answer}`.toLowerCase()
            });
        });
        
        // Index quick links
        this.quickLinks.forEach((link, index) => {
            const title = link.querySelector('h3')?.textContent || '';
            const description = link.querySelector('p')?.textContent || '';
            
            this.allContent.push({
                type: 'quicklink',
                element: link,
                title,
                description,
                index,
                searchText: `${title} ${description}`.toLowerCase()
            });
        });
        
        console.log(`📊 Indexed ${this.allContent.length} searchable items`);
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
                }
            });
        }, observerOptions);
        
        // Observe fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
        
        console.log('✨ Scroll animations initialized');
    }
    
    // ======= STAGGER ANIMATIONS ======= 
    setupStaggerAnimations() {
        // Initialize animation states first
        this.initializeAnimationStates();
        
        // Animate quick link cards
        this.animateCards('.card-animate', 'fadeInUp');
        
        // Animate FAQ categories
        this.animateCards('.category-animate', 'slideInUp');
        
        // Animate support options
        this.animateCards('.support-animate', 'fadeInScale');
        
        console.log('🎭 Stagger animations initialized');
    }
    
    // ======= INITIALIZE ANIMATION STATES ======= 
    initializeAnimationStates() {
        // Set initial hidden state for animation elements if JavaScript is available
        const animationElements = document.querySelectorAll('.card-animate, .category-animate, .support-animate');
        
        animationElements.forEach(element => {
            element.classList.add('fade-out');
        });
        
        console.log(`🎬 Animation states initialized for ${animationElements.length} elements`);
    }
    
    animateCards(selector, animationType) {
        const cards = document.querySelectorAll(selector);
        
        if (cards.length === 0) {
            console.warn(`⚠️ No elements found for selector: ${selector}`);
            return;
        }
        
        console.log(`🎯 Setting up animation for ${cards.length} cards with selector: ${selector}`);
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = parseFloat(entry.target.dataset.delay || 0) * 1000;
                    
                    console.log(`✨ Animating element with delay: ${delay}ms`);
                    
                    setTimeout(() => {
                        entry.target.classList.remove('fade-out');
                        entry.target.classList.add('animate-in');
                        
                        // Force style update
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = animationType === 'fadeInScale' 
                            ? 'translateY(0) scale(1)' 
                            : 'translateY(0)';
                            
                        console.log(`✅ Element animated: ${selector}`);
                    }, delay);
                    
                    // Unobserve after animation
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -20px 0px'
        });
        
        cards.forEach((card, index) => {
            // Ensure element starts hidden when JavaScript is enabled
            if (!card.classList.contains('fade-out')) {
                card.classList.add('fade-out');
            }
            
            observer.observe(card);
            console.log(`👁️ Observing card ${index + 1} of ${cards.length}`);
        });
    }
    
    // ======= SEARCH FUNCTIONALITY ======= 
    setupSearchFunctionality() {
        if (!this.searchInput) return;
        
        // Search input event
        this.searchInput.addEventListener('input', (e) => {
            clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(() => {
                this.performSearch(e.target.value.trim());
            }, this.searchDelay);
        });
        
        // Search on Enter key
        this.searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                clearTimeout(this.searchTimeout);
                this.performSearch(e.target.value.trim());
            }
        });
        
        // Clear search with Escape
        this.searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.clearSearch();
            }
        });
        
        // Add search icon click functionality
        const searchIcon = document.querySelector('.search-icon');
        if (searchIcon) {
            searchIcon.addEventListener('click', () => {
                this.performSearch(this.searchInput.value.trim());
            });
        }
        
        console.log('🔍 Search functionality initialized');
    }
    
    // ======= PERFORM SEARCH ======= 
    performSearch(query) {
        this.currentFilter = query.toLowerCase();
        
        if (!query) {
            this.clearSearch();
            return;
        }
        
        console.log(`🔍 Searching for: "${query}"`);
        
        const results = this.allContent.filter(item => 
            item.searchText.includes(this.currentFilter)
        );
        
        this.displaySearchResults(results, query);
        this.highlightSearchTerms(query);
        
        // Analytics-like logging
        console.log(`📊 Search results: ${results.length} items found`);
    }
    
    // ======= DISPLAY SEARCH RESULTS ======= 
    displaySearchResults(results, query) {
        // Hide all content first
        this.faqItems.forEach(item => {
            item.style.display = 'none';
            item.classList.remove('search-highlight');
        });
        
        this.quickLinks.forEach(link => {
            link.style.opacity = '0.3';
            link.style.pointerEvents = 'none';
        });
        
        // Show matching results
        if (results.length > 0) {
            results.forEach(result => {
                if (result.type === 'faq') {
                    result.element.style.display = 'block';
                    result.element.classList.add('search-highlight');
                    
                    // Auto-expand FAQ if it matches
                    this.expandFAQ(result.element);
                } else if (result.type === 'quicklink') {
                    result.element.style.opacity = '1';
                    result.element.style.pointerEvents = 'auto';
                    result.element.classList.add('search-highlight');
                }
            });
            
            // Show search stats
            this.showSearchStats(results.length, query);
        } else {
            this.showNoResults(query);
        }
    }
    
    // ======= HIGHLIGHT SEARCH TERMS ======= 
    highlightSearchTerms(query) {
        const terms = query.toLowerCase().split(' ').filter(term => term.length > 2);
        
        terms.forEach(term => {
            const elements = document.querySelectorAll('.faq-question span, .faq-answer p, .quick-link-card h3, .quick-link-card p');
            
            elements.forEach(el => {
                if (el.closest('.faq-item').style.display === 'none') return;
                
                const text = el.textContent;
                const regex = new RegExp(`(${term})`, 'gi');
                const highlightedText = text.replace(regex, '<mark class="search-highlight-text">$1</mark>');
                
                if (highlightedText !== text) {
                    el.innerHTML = highlightedText;
                }
            });
        });
    }
    
    // ======= SHOW SEARCH STATS ======= 
    showSearchStats(count, query) {
        this.removeSearchStats();
        
        const statsEl = document.createElement('div');
        statsEl.className = 'search-stats';
        statsEl.innerHTML = `
            <div class="search-stats-content">
                <i class="fas fa-search"></i>
                <span>Ditemukan <strong>${count}</strong> hasil untuk "<em>${query}</em>"</span>
                <button class="clear-search" onclick="helpPage.clearSearch()">
                    <i class="fas fa-times"></i> Hapus Filter
                </button>
            </div>
        `;
        
        const faqSection = document.querySelector('.faq-section .container');
        if (faqSection) {
            faqSection.insertBefore(statsEl, faqSection.firstChild);
        }
    }
    
    // ======= SHOW NO RESULTS ======= 
    showNoResults(query) {
        this.removeSearchStats();
        
        const noResultsEl = document.createElement('div');
        noResultsEl.className = 'no-results';
        noResultsEl.innerHTML = `
            <div class="no-results-content">
                <i class="fas fa-search-minus"></i>
                <h3>Tidak ada hasil ditemukan</h3>
                <p>Tidak ditemukan hasil untuk "<em>${query}</em>"</p>
                <div class="no-results-suggestions">
                    <p>Coba:</p>
                    <ul>
                        <li>Gunakan kata kunci yang berbeda</li>
                        <li>Periksa ejaan kata kunci</li>
                        <li>Gunakan istilah yang lebih umum</li>
                        <li>Hubungi support jika perlu bantuan</li>
                    </ul>
                </div>
                <button class="clear-search" onclick="helpPage.clearSearch()">
                    <i class="fas fa-arrow-left"></i> Kembali ke semua FAQ
                </button>
            </div>
        `;
        
        const faqSection = document.querySelector('.faq-section .container');
        if (faqSection) {
            faqSection.insertBefore(noResultsEl, faqSection.firstChild);
        }
    }
    
    // ======= CLEAR SEARCH ======= 
    clearSearch() {
        if (this.searchInput) {
            this.searchInput.value = '';
        }
        
        this.currentFilter = '';
        
        // Restore all content
        this.faqItems.forEach(item => {
            item.style.display = 'block';
            item.classList.remove('search-highlight');
            this.collapseFAQ(item);
        });
        
        this.quickLinks.forEach(link => {
            link.style.opacity = '1';
            link.style.pointerEvents = 'auto';
            link.classList.remove('search-highlight');
        });
        
        // Remove search UI elements
        this.removeSearchStats();
        this.removeHighlights();
        
        console.log('🗑️ Search cleared');
    }
    
    // ======= REMOVE SEARCH UI ELEMENTS ======= 
    removeSearchStats() {
        const existingStats = document.querySelector('.search-stats, .no-results');
        if (existingStats) {
            existingStats.remove();
        }
    }
    
    removeHighlights() {
        document.querySelectorAll('mark.search-highlight-text').forEach(mark => {
            const parent = mark.parentNode;
            parent.replaceChild(document.createTextNode(mark.textContent), mark);
            parent.normalize();
        });
    }
    
    // ======= FAQ ACCORDION SYSTEM ======= 
    setupFAQAccordion() {
        this.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            if (question && answer) {
                question.addEventListener('click', () => {
                    const isExpanded = question.getAttribute('aria-expanded') === 'true';
                    
                    if (isExpanded) {
                        this.collapseFAQ(item);
                    } else {
                        this.expandFAQ(item);
                    }
                });
            }
        });
        
        console.log('📂 FAQ accordion system initialized');
    }
    
    // ======= EXPAND FAQ ======= 
    expandFAQ(faqItem) {
        const question = faqItem.querySelector('.faq-question');
        const answer = faqItem.querySelector('.faq-answer');
        
        if (question && answer) {
            question.setAttribute('aria-expanded', 'true');
            faqItem.classList.add('active');
            
            // Smooth height animation
            answer.style.maxHeight = answer.scrollHeight + 'px';
            
            // Animate icon
            const icon = question.querySelector('i');
            if (icon) {
                icon.style.transform = 'rotate(180deg)';
            }
            
            // Scroll into view if needed
            setTimeout(() => {
                if (this.currentFilter && !this.isElementInViewport(faqItem)) {
                    faqItem.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest' 
                    });
                }
            }, 300);
        }
    }
    
    // ======= COLLAPSE FAQ ======= 
    collapseFAQ(faqItem) {
        const question = faqItem.querySelector('.faq-question');
        const answer = faqItem.querySelector('.faq-answer');
        
        if (question && answer) {
            question.setAttribute('aria-expanded', 'false');
            faqItem.classList.remove('active');
            
            // Smooth height animation
            answer.style.maxHeight = '0';
            
            // Animate icon
            const icon = question.querySelector('i');
            if (icon) {
                icon.style.transform = 'rotate(0deg)';
            }
        }
    }
    
    // ======= EMERGENCY CONTACTS ENHANCEMENT ======= 
    setupEmergencyContacts() {
        this.emergencyContacts.forEach(contact => {
            const numberLink = contact.querySelector('.emergency-number');
            
            if (numberLink) {
                // Add copy to clipboard functionality
                numberLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    const number = numberLink.textContent.trim();
                    
                    this.copyToClipboard(number).then(() => {
                        this.showCopySuccess(contact, 'Nomor disalin!');
                    }).catch(() => {
                        // Fallback: open phone app
                        window.location.href = numberLink.href;
                    });
                });
                
                // Add visual feedback on hover
                numberLink.addEventListener('mouseenter', () => {
                    this.showTooltip(numberLink, 'Klik untuk menyalin atau menelepon');
                });
                
                numberLink.addEventListener('mouseleave', () => {
                    this.hideTooltip();
                });
            }
        });
        
        console.log('🚨 Emergency contacts enhanced');
    }
    
    // ======= COPY TO CLIPBOARD ======= 
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.select();
            
            try {
                document.execCommand('copy');
                return true;
            } finally {
                document.body.removeChild(textArea);
            }
        }
    }
    
    // ======= SHOW COPY SUCCESS ======= 
    showCopySuccess(element, message) {
        const feedback = document.createElement('div');
        feedback.className = 'copy-feedback';
        feedback.textContent = message;
        
        element.style.position = 'relative';
        element.appendChild(feedback);
        
        setTimeout(() => {
            feedback.remove();
        }, 2000);
    }
    
    // ======= TOOLTIP SYSTEM ======= 
    showTooltip(element, text) {
        this.hideTooltip();
        
        const tooltip = document.createElement('div');
        tooltip.className = 'help-tooltip';
        tooltip.textContent = text;
        
        document.body.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
        
        this.currentTooltip = tooltip;
    }
    
    hideTooltip() {
        if (this.currentTooltip) {
            this.currentTooltip.remove();
            this.currentTooltip = null;
        }
    }
    
    // ======= SMOOTH SCROLLING ======= 
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    // Clear search if navigating to FAQ sections
                    if (this.currentFilter && targetElement.classList.contains('faq-category')) {
                        this.clearSearch();
                    }
                    
                    const offsetTop = targetElement.offsetTop - 100;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Highlight the target section
                    targetElement.classList.add('highlight-section');
                    setTimeout(() => {
                        targetElement.classList.remove('highlight-section');
                    }, 2000);
                }
            });
        });
        
        console.log('🔗 Smooth scrolling initialized');
    }
    
    // ======= UTILITY FUNCTIONS ======= 
    isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // ======= INITIALIZATION LOGGING ======= 
    logInitialization() {
        console.log('🎯 Help Page JavaScript initialized successfully');
        console.log(`📊 Components loaded:
        - ${this.faqItems.length} FAQ items
        - ${this.quickLinks.length} Quick links  
        - ${this.faqCategories.length} FAQ categories
        - ${this.supportOptions.length} Support options
        - ${this.emergencyContacts.length} Emergency contacts
        - ${this.allContent.length} Searchable items`);
    }
}

// ======= ENHANCED CSS ANIMATIONS (injected via JavaScript) ======= 
function injectEnhancedStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Search UI Styles */
        .search-stats {
            background: linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%);
            border: 2px solid #2196f3;
            border-radius: var(--radius-xl);
            padding: var(--space-lg);
            margin-bottom: var(--space-2xl);
            animation: slideInDown 0.5s ease-out;
        }
        
        .search-stats-content {
            display: flex;
            align-items: center;
            gap: var(--space-md);
            flex-wrap: wrap;
        }
        
        .search-stats i {
            color: var(--color-primary);
            font-size: 1.1rem;
        }
        
        .clear-search {
            background: var(--color-primary);
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: var(--radius-lg);
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-left: auto;
        }
        
        .clear-search:hover {
            background: var(--color-secondary);
            transform: translateY(-1px);
        }
        
        .no-results {
            background: linear-gradient(135deg, #fff3e0 0%, #ffffff 100%);
            border: 2px solid #ff9800;
            border-radius: var(--radius-xl);
            padding: var(--space-2xl);
            margin-bottom: var(--space-2xl);
            text-align: center;
            animation: fadeInUp 0.5s ease-out;
        }
        
        .no-results-content i {
            font-size: 3rem;
            color: #ff9800;
            margin-bottom: var(--space-lg);
        }
        
        .no-results-suggestions {
            background: rgba(255, 152, 0, 0.1);
            border-radius: var(--radius-lg);
            padding: var(--space-lg);
            margin: var(--space-lg) 0;
            text-align: left;
        }
        
        .search-highlight {
            animation: pulseHighlight 2s ease-in-out;
            border-color: var(--color-primary) !important;
            box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
        }
        
        .search-highlight-text {
            background: linear-gradient(135deg, #ffeb3b, #ffc107);
            color: #333;
            padding: 0.1em 0.2em;
            border-radius: 3px;
            font-weight: 600;
        }
        
        /* Copy feedback */
        .copy-feedback {
            position: absolute;
            top: -40px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--color-success, #4caf50);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: var(--radius-lg);
            font-size: 0.875rem;
            animation: fadeInUp 0.3s ease-out;
            z-index: 1000;
        }
        
        /* Tooltip */
        .help-tooltip {
            position: absolute;
            background: rgba(45, 55, 72, 0.9);
            color: white;
            padding: 0.5rem 0.75rem;
            border-radius: var(--radius-md);
            font-size: 0.8rem;
            white-space: nowrap;
            z-index: 1000;
            animation: fadeIn 0.2s ease-out;
        }
        
        .help-tooltip::after {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border: 4px solid transparent;
            border-top-color: rgba(45, 55, 72, 0.9);
        }
        
        /* Section highlighting */
        .highlight-section {
            animation: sectionHighlight 2s ease-in-out;
        }
        
        /* Animations */
        @keyframes slideInDown {
            from {
                opacity: 0;
                transform: translateY(-30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes pulseHighlight {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
        }
        
        @keyframes sectionHighlight {
            0%, 100% { background: transparent; }
            50% { background: rgba(74, 144, 226, 0.05); }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    
    document.head.appendChild(style);
    console.log('🎨 Enhanced styles injected');
}

// ======= INITIALIZE HELP PAGE ======= 
let helpPage;

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Help Center DOM loaded, initializing...');
    
    // Inject enhanced styles first
    injectEnhancedStyles();
    
    // Small delay to ensure styles are applied
    setTimeout(() => {
        // Initialize help page
        helpPage = new HelpPage();
        
        // Make globally accessible
        window.helpPage = helpPage;
        
        console.log('🎯 Help Center fully initialized and ready');
    }, 100);
});

// Fallback initialization if DOMContentLoaded already fired
if (document.readyState === 'loading') {
    // DOM is still loading, wait for DOMContentLoaded
} else {
    // DOM already loaded
    console.log('� DOM already loaded, initializing Help Center...');
    
    if (!helpPage) {
        // Inject enhanced styles first
        injectEnhancedStyles();
        
        setTimeout(() => {
            helpPage = new HelpPage();
            window.helpPage = helpPage;
            console.log('🔄 Help Center initialized via fallback');
        }, 50);
    }
}

// ======= GLOBAL FUNCTIONS ======= 
// Make clearSearch available globally for onclick handlers
window.helpPage = null;

// Debug function to check if Help page is working
window.debugHelpPage = function() {
    console.log('🔍 Help Page Debug Info:');
    console.log('helpPage instance:', window.helpPage);
    console.log('Search input:', document.getElementById('help-search'));
    console.log('FAQ items:', document.querySelectorAll('.faq-item').length);
    console.log('Animation elements:', document.querySelectorAll('.card-animate, .category-animate, .support-animate').length);
    
    if (window.helpPage) {
        console.log('Search functionality:', typeof window.helpPage.performSearch);
        console.log('Cached elements:', {
            searchInput: !!window.helpPage.searchInput,
            faqItems: window.helpPage.faqItems.length,
            quickLinks: window.helpPage.quickLinks.length
        });
    }
};
