// =============================================================================
// OPTIMIZED WEBSITE JAVASCRIPT - UNIFIED & PERFORMANCE-FOCUSED
// =============================================================================

// =============================================================================
// CORE UTILITIES
// =============================================================================

const Utils = {
    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Smooth scroll to target
    smoothScrollTo(target) {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    },

    // Format numbers with commas
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    // Show notification
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close" aria-label="Close notification">&times;</button>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#38b2ac' : type === 'error' ? '#e53e3e' : '#f97316'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });
        
        // Close functionality
        const closeBtn = notification.querySelector('.notification-close');
        const closeNotification = () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        };
        
        closeBtn.addEventListener('click', closeNotification);
        
        // Auto remove after 5 seconds
        setTimeout(closeNotification, 5000);
    }
};

// =============================================================================
// CONTACT FORM HANDLER
// =============================================================================

class ContactFormHandler {
    constructor() {
        this.form = document.getElementById("contact-form");
        this.scriptURL = "https://script.google.com/macros/s/AKfycbwnNVV2XKcaLur09pts3PLa-DWxg7LqsQGvCRz50ueWw6upy7ubm6ynd0VdmyPsj6pt/exec";
        this.statusDiv = document.getElementById("form-status");
        this.successMessage = document.getElementById("success-message");
        
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.form.addEventListener("submit", this.handleSubmit.bind(this));
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        // Basic validation
        const requiredFields = this.form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#e53e3e';
                field.setAttribute('aria-invalid', 'true');
            } else {
                field.style.borderColor = '';
                field.removeAttribute('aria-invalid');
            }
        });
        
        if (!isValid) {
            Utils.showNotification('Please fill in all required fields.', 'error');
            return;
        }

        this.showStatus("Sending...", "success");
        
        try {
            const formData = new FormData(this.form);
            const response = await fetch(this.scriptURL, {
                method: "POST",
                body: formData,
            });
            
            const result = await response.text();
            console.log("Form submission success:", result);
            
            this.form.reset();
            this.showSuccessMessage();
            this.trackFormSubmission();
            
        } catch (error) {
            console.error("Form submission error:", error);
            this.showStatus("❌ Failed to send message. Please try again.", "error");
        }
    }

    showStatus(message, type) {
        if (this.statusDiv) {
            this.statusDiv.innerText = message;
            this.statusDiv.className = `alert-${type}`;
            this.statusDiv.style.display = "block";
        }
    }

    showSuccessMessage() {
        if (this.successMessage) {
            this.successMessage.className = "alert-success";
            this.successMessage.style.display = "block";
            this.successMessage.innerText = "✅ Thank you! Your message was submitted.";
        }
        
        if (this.statusDiv) {
            this.statusDiv.style.display = "none";
        }

        // Auto-hide success after 5 seconds
        setTimeout(() => {
            if (this.successMessage) {
                this.successMessage.style.display = "none";
            }
        }, 5000);
    }

    trackFormSubmission() {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                form_name: 'contact_form'
            });
        }
    }
}

// =============================================================================
// MOBILE MENU HANDLER
// =============================================================================

class MobileMenuHandler {
    constructor() {
        this.toggleButton = document.getElementById('mobile-menu');
        this.navMenuWrapper = document.getElementById('nav-menu-wrapper');
        this.header = document.getElementById('header');
        this.isOpen = false;
        
        if (this.toggleButton && this.navMenuWrapper) {
            this.init();
        } else {
            console.warn('Mobile menu elements not found');
        }
    }

    init() {
        this.setupEventListeners();
        this.setupAccessibility();
        this.setupScrollEffect();
    }

    setupEventListeners() {
        // Toggle button click
        this.toggleButton.addEventListener('click', this.toggle.bind(this));
        
        // Close on navigation link clicks (including CTA button)
        const navLinks = this.navMenuWrapper.querySelectorAll('.nav-link, .mobile-cta');
        navLinks.forEach(link => {
            link.addEventListener('click', this.close.bind(this));
        });
        
        // Close on outside click
        document.addEventListener('click', (e) => {
            if (this.isOpen && 
                !this.toggleButton.contains(e.target) && 
                !this.navMenuWrapper.contains(e.target)) {
                this.close();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
                this.toggleButton.focus(); // Return focus to toggle button
            }
        });

        // Handle window resize - close menu if switching to desktop view
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.isOpen) {
                this.close();
            }
        });
    }

    setupAccessibility() {
        // Set up ARIA attributes
        this.toggleButton.setAttribute('aria-expanded', 'false');
        this.toggleButton.setAttribute('aria-controls', 'nav-menu-wrapper');
        this.toggleButton.setAttribute('aria-label', 'Toggle navigation menu');
        
        // Add role to nav wrapper
        this.navMenuWrapper.setAttribute('role', 'navigation');
        this.navMenuWrapper.setAttribute('aria-hidden', 'true');
    }

    setupScrollEffect() {
        // Header scroll effect
        let ticking = false;
        
        const updateHeader = () => {
            if (!this.header) return;
            
            if (window.scrollY > 100) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        });
    }

    toggle(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        this.isOpen = true;
        this.toggleButton.classList.add('active');
        this.navMenuWrapper.classList.add('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = 'hidden';
        
        // Update ARIA attributes
        this.toggleButton.setAttribute('aria-expanded', 'true');
        this.navMenuWrapper.setAttribute('aria-hidden', 'false');
        
        // Focus management - focus first nav link when menu opens
        setTimeout(() => {
            const firstNavLink = this.navMenuWrapper.querySelector('.nav-link');
            if (firstNavLink) {
                firstNavLink.focus();
            }
        }, 100);
        
        // Add animation class for enhanced effects (optional)
        this.navMenuWrapper.style.visibility = 'visible';
    }

    close() {
        this.isOpen = false;
        this.toggleButton.classList.remove('active');
        this.navMenuWrapper.classList.remove('active');
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Update ARIA attributes
        this.toggleButton.setAttribute('aria-expanded', 'false');
        this.navMenuWrapper.setAttribute('aria-hidden', 'true');
        
        // Hide menu after animation completes
        setTimeout(() => {
            if (!this.isOpen) {
                this.navMenuWrapper.style.visibility = 'hidden';
            }
        }, 400); // Match your CSS transition duration
    }

    // Public method to check if menu is open
    isMenuOpen() {
        return this.isOpen;
    }

    // Public method to programmatically close menu
    forceClose() {
        if (this.isOpen) {
            this.close();
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.mobileMenuHandler = new MobileMenuHandler();
});

// Export for module use (optional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MobileMenuHandler;
}

// =============================================================================
// MODAL HANDLER
// =============================================================================

class ModalHandler {
    constructor() {
        this.activeModal = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Video modal close
        const videoModal = document.getElementById('videoModal');
        if (videoModal) {
            videoModal.addEventListener('click', (e) => {
                if (e.target === videoModal) {
                    this.closeVideoModal();
                }
            });
        }

        // General modal close on outside click
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal(e.target);
            }
        });

        // Escape key handling
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }

    openModal(memberName) {
        const modal = document.getElementById(memberName + 'Modal');
        if (modal) {
            this.activeModal = modal;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Focus management
            const closeButton = modal.querySelector('.close');
            if (closeButton) {
                closeButton.focus();
            }
        }
    }

    closeModal(modal) {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            this.activeModal = null;
        }
    }

    closeVideoModal() {
        const modal = document.getElementById('videoModal');
        const iframe = document.getElementById('videoFrame');
        
        if (iframe) iframe.src = '';
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    closeAllModals() {
        this.closeVideoModal();
        
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                this.closeModal(modal);
            }
        });
    }
}

// =============================================================================
// FAQ HANDLER
// =============================================================================

class FAQHandler {
    constructor() {
        this.init();
    }

    init() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            if (question) {
                this.setupQuestionEventListeners(question);
                this.setupAccessibility(question);
            }
        });
    }

    setupQuestionEventListeners(question) {
        question.addEventListener('click', () => this.toggle(question));
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggle(question);
            }
        });
    }

    setupAccessibility(question) {
        question.setAttribute('tabindex', '0');
        question.setAttribute('role', 'button');
        question.setAttribute('aria-expanded', 'false');
    }

    toggle(questionElement) {
        // Handle both direct element and event target
        const question = questionElement.target || questionElement;
        const faqItem = question.closest('.faq-item');
        
        if (!faqItem) {
            console.warn('FAQ item not found');
            return;
        }
        
        const answer = faqItem.querySelector('.faq-answer');
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items first
        this.closeAll();
        
        // If this item wasn't active, open it
        if (!isActive) {
            faqItem.classList.add('active');
            if (answer) answer.classList.add('active');
            question.setAttribute('aria-expanded', 'true');
            
            // Add visual feedback
            const icon = question.querySelector('i, .faq-icon');
            if (icon) {
                icon.style.transform = 'rotate(180deg)';
            }
        }
    }

    closeAll() {
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
            
            const answer = item.querySelector('.faq-answer');
            const question = item.querySelector('.faq-question');
            const icon = question ? question.querySelector('i, .faq-icon') : null;
            
            if (answer) answer.classList.remove('active');
            if (question) question.setAttribute('aria-expanded', 'false');
            if (icon) icon.style.transform = 'rotate(0deg)';
        });
    }
}

// =============================================================================
// ANIMATION SYSTEM
// =============================================================================

class AnimationSystem {
    constructor() {
        this.observers = new Map();
        this.init();
    }

    init() {
        this.addAnimationStyles();
        this.setupScrollRevealAnimations();
        this.setupLoadingAnimations();
        this.setupHoverEffects();
    }

    addAnimationStyles() {
        if (document.getElementById('animation-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'animation-styles';
        style.textContent = `
            @keyframes slideInDown {
                from { opacity: 0; transform: translateY(-20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes slideInLeft {
                from { opacity: 0; transform: translateX(-30px); }
                to { opacity: 1; transform: translateX(0); }
            }
            @keyframes slideInUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            .scroll-reveal {
                opacity: 0;
                transform: translateY(15px);
                transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            .scroll-reveal.revealed {
                opacity: 1;
                transform: translateY(0);
            }
            /* Performance optimizations */
            * {
                will-change: auto;
            }
            .animating {
                will-change: transform, opacity;
            }
        `;
        document.head.appendChild(style);
    }

    setupScrollRevealAnimations() {
        const observerOptions = {
            threshold: 0.15, // Trigger earlier
            rootMargin: '0px 0px -20px 0px' // Reduced margin for faster trigger
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Use requestAnimationFrame for smoother performance
                    requestAnimationFrame(() => {
                        entry.target.classList.add('revealed');
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    });
                    // Stop observing once animated to improve performance
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements that should animate on scroll
        const selectors = [
            '.trust-metric', '.success-indicator-card', '.solution-service-card',
            '.pain-point-card', '.service-card', '.step', '.testimonial-card',
            '.pricing-card', '.faq-item', '.result-card', '.scroll-reveal'
        ];

        selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach((element, index) => {
                if (!element.style.opacity) {
                    element.style.opacity = '0';
                    element.style.transform = 'translateY(20px)'; // Reduced distance
                    element.style.transition = `all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.05}s`; // Faster, smoother easing
                }
                observer.observe(element);
            });
        });

        this.observers.set('scroll-reveal', observer);
    }

    setupLoadingAnimations() {
        window.addEventListener('load', () => {
            const animations = [
                { selector: '.transformation-badge', animation: 'slideInDown 0.4s ease-out' },
                { selector: '.main-headline', animation: 'slideInLeft 0.5s ease-out 0.1s both' },
                { selector: '.problem-focused-subtitle', animation: 'slideInLeft 0.5s ease-out 0.2s both' },
                { selector: '.strategy-cta-container', animation: 'slideInUp 0.5s ease-out 0.3s both' },
                { selector: '.expertise-badge', animation: 'slideInDown 0.4s ease-out' },
                { selector: '.solutions-primary-title', animation: 'slideInUp 0.5s ease-out 0.1s both' },
                { selector: '.solutions-description', animation: 'slideInUp 0.5s ease-out 0.2s both' }
            ];

            animations.forEach(({ selector, animation }) => {
                const element = document.querySelector(selector);
                if (element) {
                    element.style.animation = animation;
                    // Remove will-change after animation completes
                    element.addEventListener('animationend', () => {
                        element.style.willChange = 'auto';
                    }, { once: true });
                }
            });
        });
    }

    setupHoverEffects() {
        // Service cards
        document.querySelectorAll('.solution-service-card, .service-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
                
                const icon = card.querySelector('.primary-service-icon');
                const title = card.querySelector('.service-title-header');
                
                if (icon) icon.style.transform = 'scale(1.1) rotate(5deg)';
                if (title) title.style.color = 'var(--primary-orange, #f97316)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                
                const icon = card.querySelector('.primary-service-icon');
                const title = card.querySelector('.service-title-header');
                
                if (icon) icon.style.transform = 'scale(1) rotate(0deg)';
                if (title) title.style.color = 'var(--dark-slate, #334155)';
            });
        });

        // Button hover effects
        document.querySelectorAll('.cta-primary, .cta-secondary, .btn-primary, .pricing-cta, .cta-button').forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-3px) scale(1.02)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
}

// =============================================================================
// SCROLL EFFECTS SYSTEM
// =============================================================================

class ScrollEffectsSystem {
    constructor() {
        this.init();
    }

    init() {
        this.setupSmoothScrolling();
        this.setupScrollEffects();
        this.setupParallaxEffects();
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', Utils.debounce((e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    Utils.smoothScrollTo(anchor.getAttribute('href'));
                }
            }, 100));
        });
    }

    setupScrollEffects() {
        const handleScroll = Utils.debounce(() => {
            // Header scroll effect
            const header = document.getElementById('header');
            if (header) {
                header.classList.toggle('scrolled', window.scrollY > 50); // Reduced threshold
            }
            
            // Back to top button
            const backToTop = document.getElementById('back-to-top');
            if (backToTop) {
                backToTop.classList.toggle('active', window.scrollY > 200); // Earlier appearance
            }
        }, 5); // Faster debounce for more responsive feel
        
        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    setupParallaxEffects() {
        const handleParallax = Utils.debounce(() => {
            const scrolled = window.pageYOffset;
            
            // Decorative elements
            document.querySelectorAll('.decorative-gradient-orb').forEach((orb, index) => {
                const speed = 0.3 + (index * 0.1);
                orb.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
            });

            document.querySelectorAll('.floating-icon-element').forEach((icon, index) => {
                const speed = 0.2 + (index * 0.05);
                icon.style.transform = `translateY(${scrolled * speed}px)`;
            });

            // Results section parallax
            const resultsParallax = document.querySelector('.results-bg-parallax');
            if (resultsParallax) {
                resultsParallax.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        }, 16); // ~60fps
        
        window.addEventListener('scroll', handleParallax);
    }
}

// =============================================================================
// ANALYTICS & TRACKING
// =============================================================================

class AnalyticsTracker {
    constructor() {
        this.init();
    }

    init() {
        this.trackPageLoad();
        this.trackCTAClicks();
        this.trackFormInteractions();
    }

    trackPageLoad() {
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            console.log('Page loaded in', Math.round(loadTime), 'milliseconds');
            
            this.trackEvent('page_load_time', { value: Math.round(loadTime) });
        });
    }

    trackCTAClicks() {
        const ctaSelectors = '.cta-primary, .btn-primary, .cta-secondary, .pricing-cta, .cta-button, .cta-button-white';
        
        document.querySelectorAll(ctaSelectors).forEach(button => {
            button.addEventListener('click', () => {
                const buttonText = button.textContent.trim();
                const section = button.closest('section')?.className || 'unknown';
                
                console.log('CTA clicked:', buttonText);
                this.trackEvent('cta_click', {
                    button_text: buttonText,
                    button_location: section
                });
            });
        });
    }

    trackFormInteractions() {
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', () => {
                this.trackEvent('form_submit', {
                    form_name: form.id || 'unknown_form'
                });
            });
        });
    }

    trackEvent(eventName, eventData = {}) {
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, eventData);
        }
        
        // Could also send to other analytics platforms here
        console.log('Event tracked:', eventName, eventData);
    }
}

// =============================================================================
// PERFORMANCE OPTIMIZER
// =============================================================================

class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.setupLazyLoading();
        this.setupErrorHandling();
        this.setupPerformanceMonitoring();
        this.setupMobileOptimizations();
    }

    setupLazyLoading() {
        // Enhanced lazy loading for images
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Fade in animation
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.3s ease';
                    
                    img.onload = () => {
                        img.style.opacity = '1';
                    };
                    
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });
        
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    setupErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('JavaScript Error:', e.error);
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'js_error', {
                    error_message: e.error?.message || 'Unknown error',
                    error_file: e.filename,
                    error_line: e.lineno
                });
            }
        });
    }

    setupPerformanceMonitoring() {
        if ('PerformanceObserver' in window) {
            // Largest Contentful Paint
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                
                if (lastEntry.startTime > 2500) {
                    console.warn('LCP is slow:', lastEntry.startTime);
                }
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
            
            // First Input Delay
            const fidObserver = new PerformanceObserver((list) => {
                list.getEntries().forEach(entry => {
                    const fid = entry.processingStart - entry.startTime;
                    if (fid > 100) {
                        console.warn('FID is slow:', fid);
                    }
                });
            });
            fidObserver.observe({ entryTypes: ['first-input'] });
        }
    }

    setupMobileOptimizations() {
        // Touch feedback for mobile
        const touchElements = document.querySelectorAll('.btn, .nav-link, .card, button');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                element.style.transform = 'scale(0.95)';
            }, { passive: true });
            
            element.addEventListener('touchend', () => {
                element.style.transform = 'scale(1)';
            }, { passive: true });
        });
    }
}

// =============================================================================
// MAIN WEBSITE CLASS
// =============================================================================

class Website {
    constructor() {
        this.components = {};
        this.init();
    }

    init() {
        // Initialize all components
        this.components.contactForm = new ContactFormHandler();
        this.components.mobileMenu = new MobileMenuHandler();
        this.components.modal = new ModalHandler();
        this.components.faq = new FAQHandler();
        this.components.animation = new AnimationSystem();
        this.components.scrollEffects = new ScrollEffectsSystem();
        this.components.analytics = new AnalyticsTracker();
        this.components.performance = new PerformanceOptimizer();
        
        console.log('Website initialized successfully');
    }

    // Expose methods for global use
    openModal(memberName) {
        this.components.modal.openModal(memberName);
    }

    closeModal(memberName) {
        const modal = document.getElementById(memberName + 'Modal');
        this.components.modal.closeModal(modal);
    }

    closeVideoModal() {
        this.components.modal.closeVideoModal();
    }

    toggleFAQ(element) {
        this.components.faq.toggle(element);
    }

    openConsultationForm() {
        // Replace with your actual booking system
        // Examples:
        // window.open('https://calendly.com/your-booking-page', '_blank');
        // or show a modal with embedded calendar
        alert('This would open your booking calendar (integrate with Calendly, Acuity, etc.)');
        
        this.components.analytics.trackEvent('consultation_request', {
            source: 'cta_button'
        });
    }
}

// =============================================================================
// INITIALIZATION
// =============================================================================

// Initialize website when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.website = new Website();
});

// Expose utilities globally
window.Utils = Utils;

// Legacy function compatibility (for existing HTML)
window.openModal = (memberName) => window.website?.openModal(memberName);
window.closeModal = (memberName) => window.website?.closeModal(memberName);
window.closeVideoModal = () => window.website?.closeVideoModal();
window.openConsultationForm = () => window.website?.openConsultationForm();