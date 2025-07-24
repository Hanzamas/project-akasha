/**
 * PROJECT AKASHA - DEVELOPER SECTION JAVASCRIPT
 * JavaScript untuk Developer section dengan personal touch
 */

class DeveloperSection {
    constructor() {
        this.section = document.querySelector('.developer-section');
        this.codeContent = this.section?.querySelector('.code-content');
        this.codeLines = this.section?.querySelectorAll('.code-line');
        this.developerMessage = this.section?.querySelector('.developer-message');
        this.contactLink = this.section?.querySelector('.developer-link');
        this.codeSnippet = this.section?.querySelector('.code-snippet');
        
        // Code typing animation state
        this.isTypingStarted = false;
        this.currentLineIndex = 0;
        
        this.init();
    }

    init() {
        if (!this.section) return;
        
        this.setupDeveloperObserver();
        this.initCodeInteractions();
        this.initContactProtection();
        this.initPersonalMessageAnimation();
        this.prepareCodeAnimation();
        
        // Add keyboard navigation
        this.addKeyboardNavigation();
        
        console.log('Developer section initialized with typing animation and interactivity');
    }

    setupDeveloperObserver() {
        const observerOptions = {
            threshold: 0.4,
            rootMargin: '0px 0px -50px 0px'
        };

        const developerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.isTypingStarted) {
                    this.triggerDeveloperAnimations();
                    developerObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        if (this.codeSnippet) {
            developerObserver.observe(this.codeSnippet);
        }
    }

    triggerDeveloperAnimations() {
        // Animate personal message first
        setTimeout(() => {
            this.animatePersonalMessage();
        }, 300);
        
        // Start code typing animation
        setTimeout(() => {
            this.startCodeTypingAnimation();
        }, 800);
    }

    prepareCodeAnimation() {
        if (!this.codeLines) return;
        
        // Hide all code lines initially
        this.codeLines.forEach(line => {
            line.style.opacity = '0';
            line.style.transform = 'translateX(-20px)';
        });
        
        // Store original content for typing effect
        this.originalCodeContent = Array.from(this.codeLines).map(line => ({
            element: line,
            originalHTML: line.innerHTML,
            currentHTML: ''
        }));
    }

    startCodeTypingAnimation() {
        if (!this.originalCodeContent || this.isTypingStarted) return;
        
        this.isTypingStarted = true;
        this.currentLineIndex = 0;
        
        // Add typing sound effect (optional)
        this.playTypingSound();
        
        // Add terminal-like effects
        this.addTerminalEffects();
        
        this.typeNextLine();
    }

    typeNextLine() {
        if (this.currentLineIndex >= this.originalCodeContent.length) {
        // Add final interactive effects after typing is complete
        setTimeout(() => {
            this.addCodeInteractivity();
            this.makeCodeInteractive();
        }, 500);
    }        const lineData = this.originalCodeContent[this.currentLineIndex];
        const line = lineData.element;
        
        // Show the line container
        line.style.opacity = '1';
        line.style.transform = 'translateX(0)';
        line.style.transition = 'all 0.3s ease';
        
        // Start typing effect for this line
        this.typeLineContent(lineData, () => {
            // Move to next line after delay
            setTimeout(() => {
                this.currentLineIndex++;
                this.typeNextLine();
            }, 400);
        });
    }

    typeLineContent(lineData, onComplete) {
        const { element, originalHTML } = lineData;
        const plainText = this.stripHTML(originalHTML);
        let currentIndex = 0;
        
        // Clear the line content
        element.innerHTML = '';
        
        // Add typing cursor
        const cursor = document.createElement('span');
        cursor.style.cssText = `
            display: inline-block;
            width: 2px;
            height: 1em;
            background: var(--color-primary);
            animation: blink 1s infinite;
            margin-left: 2px;
        `;
        element.appendChild(cursor);
        
        const typeInterval = setInterval(() => {
            if (currentIndex <= plainText.length) {
                // Build the content progressively, but preserve HTML structure
                const currentText = plainText.substring(0, currentIndex);
                element.innerHTML = this.rebuildHTMLWithText(originalHTML, currentText);
                
                // Re-add cursor
                if (currentIndex < plainText.length) {
                    element.appendChild(cursor);
                }
                
                currentIndex++;
            } else {
                clearInterval(typeInterval);
                // Ensure final content is correct and remove cursor
                element.innerHTML = originalHTML;
                onComplete();
            }
        }, 45); // Slightly slower typing speed for better readability
    }

    stripHTML(html) {
        const temp = document.createElement('div');
        temp.innerHTML = html;
        return temp.textContent || temp.innerText || '';
    }

    rebuildHTMLWithText(originalHTML, currentText) {
        // Simple approach: progressively reveal text while maintaining HTML structure
        const temp = document.createElement('div');
        temp.innerHTML = originalHTML;
        
        let textIndex = 0;
        const walker = document.createTreeWalker(
            temp,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        
        let node;
        while (node = walker.nextNode()) {
            const nodeLength = node.textContent.length;
            if (textIndex + nodeLength <= currentText.length) {
                // Keep full text
                textIndex += nodeLength;
            } else if (textIndex < currentText.length) {
                // Partial text
                const partialLength = currentText.length - textIndex;
                node.textContent = node.textContent.substring(0, partialLength);
                textIndex = currentText.length;
                break;
            } else {
                // Remove remaining text
                node.textContent = '';
            }
        }
        
        return temp.innerHTML;
    }

    addCodeInteractivity() {
        if (!this.codeSnippet) return;
        
        // Add copy-to-clipboard functionality
        this.addCopyButton();
        
        // Add hover effects for code elements
        this.addCodeHoverEffects();
        
        // Add click tracking
        this.addCodeClickTracking();
        
        // Add easter eggs
        this.addEasterEggs();
    }

    addCopyButton() {
        const copyButton = document.createElement('button');
        copyButton.className = 'code-copy-btn';
        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
        copyButton.setAttribute('aria-label', 'Copy code to clipboard');
        
        copyButton.style.cssText = `
            position: absolute;
            top: var(--space-sm);
            right: var(--space-sm);
            background: var(--color-primary);
            color: white;
            border: none;
            border-radius: var(--radius-md);
            padding: var(--space-xs) var(--space-sm);
            font-size: 0.8rem;
            cursor: pointer;
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 2;
        `;
        
        this.codeSnippet.style.position = 'relative';
        this.codeSnippet.appendChild(copyButton);
        
        // Show button on hover
        this.codeSnippet.addEventListener('mouseenter', () => {
            copyButton.style.opacity = '1';
        });
        
        this.codeSnippet.addEventListener('mouseleave', () => {
            copyButton.style.opacity = '0';
        });
        
        // Copy functionality
        copyButton.addEventListener('click', () => {
            this.copyCodeToClipboard(copyButton);
        });
    }

    copyCodeToClipboard(button) {
        const codeText = this.codeContent?.textContent || '';
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(codeText).then(() => {
                this.showCopySuccess(button);
            }).catch(() => {
                this.fallbackCopy(codeText, button);
            });
        } else {
            this.fallbackCopy(codeText, button);
        }
    }

    fallbackCopy(text, button) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.showCopySuccess(button);
        } catch (err) {
            console.error('Copy failed:', err);
        }
        
        document.body.removeChild(textArea);
    }

    showCopySuccess(button) {
        const originalContent = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.style.background = 'var(--color-success)';
        
        setTimeout(() => {
            button.innerHTML = originalContent;
            button.style.background = 'var(--color-primary)';
        }, 2000);
        
        // Track copy event
        this.trackCodeCopy();
    }

    addCodeHoverEffects() {
        const codeElements = this.section?.querySelectorAll('.code-keyword, .code-function, .code-variable');
        if (!codeElements) return;
        
        codeElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'scale(1.05)';
                element.style.transition = 'transform 0.2s ease';
                element.style.cursor = 'pointer';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'scale(1)';
            });
        });
    }

    addCodeClickTracking() {
        if (!this.codeSnippet) return;
        
        this.codeSnippet.addEventListener('click', () => {
            console.log('Code snippet clicked');
            
            // Analytics tracking
            if (typeof gtag !== 'undefined') {
                gtag('event', 'code_snippet_interaction', {
                    'event_category': 'engagement',
                    'event_label': 'developer_section',
                    'section': 'developer'
                });
            }
        });
    }

    initCodeInteractions() {
        if (!this.codeSnippet) return;
        
        // Enhanced hover effect for entire code snippet
        this.codeSnippet.addEventListener('mouseenter', () => {
            this.codeSnippet.style.transform = 'translateY(-5px) scale(1.02)';
            this.codeSnippet.style.boxShadow = '0 20px 50px rgba(45, 55, 72, 0.15)';
            this.codeSnippet.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        this.codeSnippet.addEventListener('mouseleave', () => {
            this.codeSnippet.style.transform = 'translateY(0) scale(1)';
            this.codeSnippet.style.boxShadow = '0 15px 40px rgba(45, 55, 72, 0.08)';
        });
    }

    initContactProtection() {
        if (!this.contactLink) return;
        
        // Enhanced contact link interactions
        this.contactLink.addEventListener('mouseenter', () => {
            this.contactLink.style.transform = 'translateY(-3px) scale(1.05)';
            this.contactLink.style.boxShadow = '0 8px 20px rgba(74, 144, 226, 0.2)';
            
            const icon = this.contactLink.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        this.contactLink.addEventListener('mouseleave', () => {
            this.contactLink.style.transform = 'translateY(0) scale(1)';
            this.contactLink.style.boxShadow = '';
            
            const icon = this.contactLink.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
        
        // Track contact clicks
        this.contactLink.addEventListener('click', () => {
            this.trackContactClick();
        });
    }

    animatePersonalMessage() {
        if (!this.developerMessage) return;
        
        const paragraphs = this.developerMessage.querySelectorAll('p');
        
        paragraphs.forEach((p, index) => {
            setTimeout(() => {
                p.style.opacity = '0';
                p.style.transform = 'translateY(20px)';
                p.style.transition = 'all 0.8s ease-out';
                
                setTimeout(() => {
                    p.style.opacity = '1';
                    p.style.transform = 'translateY(0)';
                }, 100);
                
            }, index * 400);
        });
    }

    initPersonalMessageAnimation() {
        if (!this.developerMessage) return;
        
        // Prepare paragraphs for animation
        const paragraphs = this.developerMessage.querySelectorAll('p');
        paragraphs.forEach(p => {
            p.style.opacity = '1'; // Keep visible by default
            p.style.transform = 'translateY(0)';
        });
    }

    trackCodeCopy() {
        console.log('Code copied to clipboard');
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'code_copy', {
                'event_category': 'engagement',
                'event_label': 'developer_code_snippet',
                'section': 'developer'
            });
        }
    }

    trackContactClick() {
        console.log('Developer contact clicked');
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'developer_contact_click', {
                'event_category': 'engagement',
                'event_label': 'personal_message',
                'section': 'developer'
            });
        }
    }

    // Public methods
    refreshAnimations() {
        this.isTypingStarted = false;
        this.currentLineIndex = 0;
        this.prepareCodeAnimation();
        this.triggerDeveloperAnimations();
    }

    resetCodeAnimation() {
        this.isTypingStarted = false;
        this.currentLineIndex = 0;
        this.prepareCodeAnimation();
    }
    
    // Additional interactive methods
    playTypingSound() {
        // Create subtle typing sound effect using Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Create a subtle clicking sound
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.01, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (e) {
            // Audio not supported, continue silently
            console.log('Audio context not available');
        }
    }
    
    addTerminalEffects() {
        if (!this.codeSnippet) return;
        
        // Add terminal-like glow effect during typing
        this.codeSnippet.style.boxShadow = '0 0 20px rgba(74, 144, 226, 0.3)';
        this.codeSnippet.style.border = '1px solid rgba(74, 144, 226, 0.5)';
        
        // Remove effects after typing is complete
        setTimeout(() => {
            this.codeSnippet.style.boxShadow = '0 15px 40px rgba(45, 55, 72, 0.08)';
            this.codeSnippet.style.border = '1px solid var(--color-gray-200)';
        }, (this.originalCodeContent?.length || 0) * 500 + 2000);
    }
    
    // Enhanced interactive code clicking
    makeCodeInteractive() {
        if (!this.codeContent) return;
        
        // Add click handlers to each syntax element
        const interactiveElements = this.codeContent.querySelectorAll('.code-keyword, .code-function, .code-variable, .code-string');
        
        interactiveElements.forEach(element => {
            element.style.cursor = 'pointer';
            element.title = `Click to highlight all ${element.className.split('-')[1]}s`;
            
            element.addEventListener('click', () => {
                this.highlightSimilarElements(element);
            });
        });
    }
    
    highlightSimilarElements(clickedElement) {
        const className = clickedElement.className;
        const allSimilar = this.codeContent.querySelectorAll(`.${className}`);
        
        // Remove previous highlights
        this.codeContent.querySelectorAll('.highlighted').forEach(el => {
            el.classList.remove('highlighted');
        });
        
        // Add highlight to similar elements
        allSimilar.forEach(el => {
            el.classList.add('highlighted');
        });
        
        // Remove highlights after 3 seconds
        setTimeout(() => {
            allSimilar.forEach(el => {
                el.classList.remove('highlighted');
            });
        }, 3000);
    }
    
    // Fun easter eggs for interaction
    addEasterEggs() {
        if (!this.section) return;
        
        // Konami code easter egg
        let konamiCode = [];
        const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
        
        document.addEventListener('keydown', (e) => {
            konamiCode.push(e.code);
            if (konamiCode.length > konamiSequence.length) {
                konamiCode.shift();
            }
            
            if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
                this.triggerEasterEgg();
            }
        });
        
        // Double-click on developer message for special effect
        if (this.developerMessage) {
            this.developerMessage.addEventListener('dblclick', () => {
                this.showSpecialMessage();
            });
        }
        
        // Code snippet shake on triple-click
        if (this.codeSnippet) {
            let clickCount = 0;
            this.codeSnippet.addEventListener('click', () => {
                clickCount++;
                setTimeout(() => { clickCount = 0; }, 500);
                
                if (clickCount === 3) {
                    this.shakeCodeSnippet();
                }
            });
        }
    }
    
    triggerEasterEgg() {
        // Matrix-style rain effect
        this.createMatrixEffect();
        
        // Show secret message
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            color: #00ff00;
            padding: 2rem;
            border-radius: 10px;
            font-family: monospace;
            font-size: 1.2rem;
            z-index: 10000;
            animation: fadeInScale 0.5s ease-out;
        `;
        message.innerHTML = `
            <h3>🎉 Konami Code Detected! 🎉</h3>
            <p>You found the secret developer mode!</p>
            <p>Keep being awesome! ✨</p>
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    }
    
    createMatrixEffect() {
        const canvas = document.createElement('canvas');
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 9999;
            pointer-events: none;
        `;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const ctx = canvas.getContext('2d');
        const chars = 'アカシャプロジェクト01';
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);
        
        document.body.appendChild(canvas);
        
        let frameCount = 0;
        const animate = () => {
            if (frameCount++ > 300) { // Stop after 5 seconds
                canvas.remove();
                return;
            }
            
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#0F0';
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
            
            requestAnimationFrame(animate);
        };
        animate();
    }
    
    showSpecialMessage() {
        const specialMsg = document.createElement('div');
        specialMsg.style.cssText = `
            position: absolute;
            top: -50px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
            color: white;
            padding: 1rem 2rem;
            border-radius: 25px;
            font-size: 0.9rem;
            white-space: nowrap;
            animation: bounceIn 0.6s ease-out;
        `;
        specialMsg.innerHTML = '💝 Thank you for reading my story!';
        
        this.developerMessage.style.position = 'relative';
        this.developerMessage.appendChild(specialMsg);
        
        setTimeout(() => {
            specialMsg.remove();
        }, 3000);
    }
    
    shakeCodeSnippet() {
        if (!this.codeSnippet) return;
        
        this.codeSnippet.style.animation = 'shake 0.5s ease-in-out';
        
        setTimeout(() => {
            this.codeSnippet.style.animation = '';
        }, 500);
    }
    
    // Keyboard navigation and accessibility
    addKeyboardNavigation() {
        if (!this.section) return;
        
        // Make code snippet focusable
        if (this.codeSnippet) {
            this.codeSnippet.setAttribute('tabindex', '0');
            this.codeSnippet.setAttribute('role', 'region');
            this.codeSnippet.setAttribute('aria-label', 'Interactive code snippet - Press Enter to copy, Space to restart animation');
            
            this.codeSnippet.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    // Copy code to clipboard
                    const copyBtn = this.codeSnippet.querySelector('.code-copy-btn');
                    if (copyBtn) {
                        this.copyCodeToClipboard(copyBtn);
                    }
                } else if (e.key === ' ') {
                    e.preventDefault();
                    // Restart typing animation
                    this.refreshAnimations();
                }
            });
        }
        
        // Make developer link more accessible
        if (this.contactLink) {
            this.contactLink.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.contactLink.click();
                }
            });
        }
    }
}

// Initialize Developer section when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Delay initialization to ensure other scripts are loaded
    setTimeout(() => {
        window.developerSection = new DeveloperSection();
    }, 100);
});

// Export untuk penggunaan di index.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DeveloperSection;
}
