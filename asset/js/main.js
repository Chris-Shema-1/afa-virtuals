// =============================================================================
// OPTIMIZED WEBSITE JAVASCRIPT - PERFORMANCE ENHANCED
// Target: Sub 1-second loading while preserving all functionality
// =============================================================================

// =============================================================================
// CORE UTILITIES - Optimized
// =============================================================================

const Utils = {
    // More efficient debounce
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

    // Cached viewport check
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    smoothScrollTo(target) {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    },

    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    // Simplified notification system
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close" aria-label="Close notification">&times;</button>
            </div>
        `;
        
        const colors = {
            success: '#38b2ac',
            error: '#e53e3e',
            info: '#f97316'
        };
        
        notification.style.cssText = `
            position: fixed; top: 20px; right: 20px; z-index: 1000;
            background: ${colors[type] || colors.info}; color: white;
            padding: 1rem 1.5rem; border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transform: translateX(100%); transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });
        
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
        setTimeout(closeNotification, 5000);
    }
};

// =============================================================================
// CONTACT FORM HANDLER - Preserved & Optimized
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
            this.showStatus("Failed to send message. Please try again.", "error");
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
            this.successMessage.innerText = "Thank you! Your message was submitted.";
        }
        
        if (this.statusDiv) {
            this.statusDiv.style.display = "none";
        }

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
// MOBILE MENU HANDLER - Preserved & Optimized
// =============================================================================

class MobileMenuHandler {
    constructor() {
        this.toggleButton = document.getElementById('mobile-menu');
        this.navMenuWrapper = document.getElementById('nav-menu-wrapper');
        this.header = document.getElementById('header');
        this.servicesDropdown = document.getElementById('services-dropdown');
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
        this.toggleButton.addEventListener('click', this.toggle.bind(this));
        
        if (this.servicesDropdown) {
            this.servicesDropdown.addEventListener('click', (e) => {
                if (window.innerWidth <= 991) {
                    e.preventDefault();
                    this.servicesDropdown.classList.toggle('mobile-dropdown-active');
                }
            });
        }
        
        const navLinks = this.navMenuWrapper.querySelectorAll('.nav-link, .mobile-cta, .dropdown-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 991) {
                    this.close();
                    if (this.servicesDropdown) {
                        this.servicesDropdown.classList.remove('mobile-dropdown-active');
                    }
                }
            });
        });
        
        document.addEventListener('click', (e) => {
            if (this.isOpen && 
                !this.toggleButton.contains(e.target) && 
                !this.navMenuWrapper.contains(e.target)) {
                this.close();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
                this.toggleButton.focus();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.isOpen) {
                this.close();
            }
        });
    }

    setupAccessibility() {
        this.toggleButton.setAttribute('aria-expanded', 'false');
        this.toggleButton.setAttribute('aria-controls', 'nav-menu-wrapper');
        this.toggleButton.setAttribute('aria-label', 'Toggle navigation menu');
        this.navMenuWrapper.setAttribute('role', 'navigation');
        this.navMenuWrapper.setAttribute('aria-hidden', 'true');
    }

    setupScrollEffect() {
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
        }, { passive: true });
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
        document.body.style.overflow = 'hidden';
        this.toggleButton.setAttribute('aria-expanded', 'true');
        this.navMenuWrapper.setAttribute('aria-hidden', 'false');
        this.navMenuWrapper.style.visibility = 'visible';
        
        setTimeout(() => {
            const firstNavLink = this.navMenuWrapper.querySelector('.nav-link');
            if (firstNavLink) {
                firstNavLink.focus();
            }
        }, 100);
    }

    close() {
        this.isOpen = false;
        this.toggleButton.classList.remove('active');
        this.navMenuWrapper.classList.remove('active');
        
        if (this.servicesDropdown) {
            this.servicesDropdown.classList.remove('mobile-dropdown-active');
        }
        
        document.body.style.overflow = '';
        this.toggleButton.setAttribute('aria-expanded', 'false');
        this.navMenuWrapper.setAttribute('aria-hidden', 'true');
        
        setTimeout(() => {
            if (!this.isOpen) {
                this.navMenuWrapper.style.visibility = 'hidden';
            }
        }, 400);
    }

    isMenuOpen() { return this.isOpen; }
    forceClose() { if (this.isOpen) this.close(); }
    isDropdownActive() { return this.servicesDropdown ? this.servicesDropdown.classList.contains('mobile-dropdown-active') : false; }
    closeDropdown() { if (this.servicesDropdown) this.servicesDropdown.classList.remove('mobile-dropdown-active'); }
}

// =============================================================================
// MODAL HANDLER - Preserved
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
        const videoModal = document.getElementById('videoModal');
        if (videoModal) {
            videoModal.addEventListener('click', (e) => {
                if (e.target === videoModal) {
                    this.closeVideoModal();
                }
            });
        }

        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal(e.target);
            }
        });

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
// FAQ HANDLER - Preserved
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
        const question = questionElement.target || questionElement;
        const faqItem = question.closest('.faq-item');
        
        if (!faqItem) {
            console.warn('FAQ item not found');
            return;
        }
        
        const answer = faqItem.querySelector('.faq-answer');
        const isActive = faqItem.classList.contains('active');
        
        this.closeAll();
        
        if (!isActive) {
            faqItem.classList.add('active');
            if (answer) answer.classList.add('active');
            question.setAttribute('aria-expanded', 'true');
            
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
// OPTIMIZED ANIMATION SYSTEM - Fast Loading with Preserved Effects
// =============================================================================

class OptimizedAnimationSystem {
    constructor() {
        this.observers = new Map();
        this.init();
    }

    init() {
        // Defer animations until page is loaded
        if (document.readyState === 'complete') {
            this.setupAnimations();
        } else {
            window.addEventListener('load', () => this.setupAnimations(), { once: true });
        }
    }

    setupAnimations() {
        this.addMinimalAnimationStyles();
        this.setupOptimizedScrollReveal();
        this.setupHoverEffects();
    }

    addMinimalAnimationStyles() {
        if (document.getElementById('animation-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'animation-styles';
        style.textContent = `
            .scroll-reveal {
                opacity: 0;
                transform: translateY(15px);
                transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            .scroll-reveal.revealed {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }

    setupOptimizedScrollReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '20px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    requestAnimationFrame(() => {
                        entry.target.classList.add('revealed');
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Only animate key elements
        const selectors = [
            '.service-card', '.testimonial-card', '.pricing-card', 
            '.step', '.result-card', '.faq-item'
        ];

        selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach((element, index) => {
                element.classList.add('scroll-reveal');
                element.style.transitionDelay = `${index * 0.1}s`;
                observer.observe(element);
            });
        });

        this.observers.set('scroll-reveal', observer);
    }

    setupHoverEffects() {
        // Optimized hover effects using CSS transforms
        document.querySelectorAll('.solution-service-card, .service-card').forEach(card => {
            card.style.transition = 'transform 0.2s ease';
            
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });

        document.querySelectorAll('.cta-primary, .cta-secondary, .btn-primary, .pricing-cta').forEach(button => {
            button.style.transition = 'transform 0.2s ease';
            
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-2px)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0)';
            });
        });
    }
}

// =============================================================================
// OPTIMIZED SCROLL EFFECTS SYSTEM
// =============================================================================

class OptimizedScrollEffectsSystem {
    constructor() {
        this.init();
    }

    init() {
        this.setupSmoothScrolling();
        this.setupScrollEffects();
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (!href || href === '#' || href.length <= 1) {
                    return;
                }
                
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    Utils.smoothScrollTo(href);
                }
            });
        });
    }

    setupScrollEffects() {
        const handleScroll = Utils.debounce(() => {
            const backToTop = document.getElementById('back-to-top');
            if (backToTop) {
                backToTop.classList.toggle('active', window.scrollY > 200);
            }
        }, 100);
        
        window.addEventListener('scroll', handleScroll, { passive: true });
    }
}

// =============================================================================
// LIGHTWEIGHT ANALYTICS & TRACKING
// =============================================================================

class LightweightAnalyticsTracker {
    constructor() {
        this.init();
    }

    init() {
        this.trackCTAClicks();
        this.trackFormInteractions();
    }

    trackCTAClicks() {
        const ctaSelectors = '.cta-primary, .btn-primary, .cta-secondary, .pricing-cta, .cta-button';
        
        document.querySelectorAll(ctaSelectors).forEach(button => {
            button.addEventListener('click', () => {
                const buttonText = button.textContent.trim();
                
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'cta_click', {
                        button_text: buttonText
                    });
                }
            });
        });
    }

    trackFormInteractions() {
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', () => {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submit', {
                        form_name: form.id || 'unknown_form'
                    });
                }
            });
        });
    }
}

// =============================================================================
// MAIN WEBSITE CLASS - Optimized
// =============================================================================

class Website {
    constructor() {
        this.components = {};
        this.init();
    }

    init() {
        // Initialize critical components immediately
        this.components.contactForm = new ContactFormHandler();
        this.components.mobileMenu = new MobileMenuHandler();
        this.components.modal = new ModalHandler();
        this.components.faq = new FAQHandler();
        this.components.scrollEffects = new OptimizedScrollEffectsSystem();
        
        // Defer non-critical components
        requestIdleCallback(() => {
            this.components.animation = new OptimizedAnimationSystem();
            this.components.analytics = new LightweightAnalyticsTracker();
        });
        
        console.log('Website initialized successfully');
    }

    // Expose methods for global use
    openModal(memberName) { this.components.modal.openModal(memberName); }
    closeModal(memberName) { const modal = document.getElementById(memberName + 'Modal'); this.components.modal.closeModal(modal); }
    closeVideoModal() { this.components.modal.closeVideoModal(); }
    toggleFAQ(element) { this.components.faq.toggle(element); }

    openConsultationForm() {
        // Replace with your actual booking system
        alert('This would open your booking calendar (integrate with Calendly, Acuity, etc.)');
        
        if (this.components.analytics && typeof gtag !== 'undefined') {
            gtag('event', 'consultation_request', { source: 'cta_button' });
        }
    }
}

// =============================================================================
// INITIALIZATION - Optimized for Speed
// =============================================================================

// Initialize website when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.website = new Website();
    });
} else {
    window.website = new Website();
}

// Expose utilities globally
window.Utils = Utils;

// Legacy function compatibility (for existing HTML)
window.openModal = (memberName) => window.website?.openModal(memberName);
window.closeModal = (memberName) => window.website?.closeModal(memberName);
window.closeVideoModal = () => window.website?.closeVideoModal();
window.openConsultationForm = () => window.website?.openConsultationForm();