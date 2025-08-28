// =============================================================================
// OPTIMIZED WEBSITE JAVASCRIPT - PERFORMANCE ENHANCED WITH FIXED MOBILE NAV
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

    // Enhanced smooth scroll with header offset
    smoothScrollTo(target) {
        const element = typeof target === 'string' ? document.querySelector(target) : target;
        if (element) {
            const headerHeight = document.getElementById('header')?.offsetHeight || 80;
            const elementPosition = element.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
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

// ================================================================================
// PRE LOADER CONTENT 
// ================================================================================

  class PreloaderManager {
            constructor() {
                this.preloader = document.getElementById('preloader');
                this.mainContent = document.getElementById('mainContent');
                this.loadingDuration = 3500; // 3.5 seconds
                
                this.init();
            }

            init() {
                this.createParticles();
                this.startLoading();
            }

            createParticles() {
                const particlesContainer = document.getElementById('particles');
                const particleCount = 15;

                for (let i = 0; i < particleCount; i++) {
                    const particle = document.createElement('div');
                    particle.className = 'particle';
                    particle.style.left = Math.random() * 100 + '%';
                    particle.style.animationDelay = Math.random() * 8 + 's';
                    particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
                    particlesContainer.appendChild(particle);
                }
            }

            startLoading() {
                // Auto-hide preloader after loading duration
                setTimeout(() => {
                    this.hidePreloader();
                }, this.loadingDuration);
            }

            hidePreloader() {
                this.preloader.classList.add('fade-out');
                
                setTimeout(() => {
                    this.preloader.style.display = 'none';
                    this.mainContent.classList.add('show');
                    document.body.style.overflow = 'auto';
                }, 800);
            }

            showPreloader() {
                this.preloader.style.display = 'flex';
                this.preloader.classList.remove('fade-out');
                this.mainContent.classList.remove('show');
                document.body.style.overflow = 'hidden';
                
                // Restart animations
                const progressFill = document.querySelector('.progress-fill');
                progressFill.style.animation = 'none';
                progressFill.offsetHeight; // Trigger reflow
                progressFill.style.animation = 'progressFill 3s ease-in-out';
                
                this.startLoading();
            }
        }

      

        // Initialize when page loads
        document.addEventListener('DOMContentLoaded', function() {
            window.preloaderManager = new PreloaderManager();
        });

        // Simulate real loading scenarios
        window.addEventListener('load', function() {
            // Additional loading simulation for resources
            console.log('All resources loaded');
        });

// =============================================================================
// CONTACT FORM HANDLER - Preserved & Optimized
// =============================================================================

// Removed duplicate Utils class declaration.
// If you want to show notifications in the form-status div, add a method to the Utils object above, or use Utils.showNotification as already defined.

        // Contact Form Handler Class
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
                
                // Validate multi-select dropdown
                if (selectedValues.size === 0) {
                    isValid = false;
                    Utils.showNotification('Please select at least one service.', 'error');
                    return;
                }
                
                requiredFields.forEach(field => {
                    if (field.type !== 'hidden' && !field.value.trim()) {
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
                    
                    // Add selected services to form data
                    const selectedServices = Array.from(selectedValues);
                    formData.set('service', selectedServices.join(', '));
                    
                    const response = await fetch(this.scriptURL, {
                        method: "POST",
                        body: formData,
                    });
                    
                    const result = await response.text();
                    console.log("Form submission success:", result);
                    
                    this.form.reset();
                    this.resetMultiSelect();
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

            resetMultiSelect() {
                selectedValues.clear();
                const options = document.querySelectorAll('.select-items div[data-value]');
                options.forEach(opt => opt.classList.remove('selected-option'));
                updateSelectedDisplay();
            }

            trackFormSubmission() {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submit', {
                        form_name: 'contact_form'
                    });
                }
            }
        }

        // Custom multi-select dropdown functionality
        let selectedValues = new Set();
        
        function initCustomSelect() {
            const customSelects = document.querySelectorAll('.custom-select');
            
            customSelects.forEach(function(customSelect) {
                const selectSelected = customSelect.querySelector('.select-selected');
                const selectItems = customSelect.querySelector('.select-items');
                const originalSelect = customSelect.querySelector('select');
                const options = selectItems.querySelectorAll('div[data-value]');
                
                // Initialize display
                updateSelectedDisplay();
                
                // Toggle dropdown
                selectSelected.addEventListener('click', function(e) {
                    e.stopPropagation();
                    closeAllSelect(customSelect);
                    selectItems.classList.toggle('select-hide');
                    selectSelected.classList.toggle('select-arrow-active');
                });
                
                // Handle option selection
                options.forEach(function(option) {
                    option.addEventListener('click', function(e) {
                        e.stopPropagation();
                        const value = this.getAttribute('data-value');
                        
                        // Toggle selection
                        if (selectedValues.has(value)) {
                            selectedValues.delete(value);
                            this.classList.remove('selected-option');
                        } else {
                            selectedValues.add(value);
                            this.classList.add('selected-option');
                        }
                        
                        // Update display and hidden select
                        updateSelectedDisplay();
                        updateHiddenSelect();
                        
                        // Don't close dropdown for multi-select
                        // Keep dropdown open for additional selections
                    });
                });
            });
        }
        
        function updateSelectedDisplay() {
            const selectSelected = document.querySelector('.select-selected');
            const selectedCount = selectedValues.size;
            
            if (selectedCount === 0) {
                selectSelected.innerHTML = '<span class="placeholder-text">Select Your Services</span><i class="fas fa-chevron-down select-arrow"></i>';
            } else {
                const tagsContainer = document.createElement('div');
                tagsContainer.className = 'selected-tags';
                
                Array.from(selectedValues).forEach(value => {
                    const tag = document.createElement('span');
                    tag.className = 'selected-tag';
                    tag.innerHTML = `${value} <span class="remove-tag" data-value="${value}">×</span>`;
                    tagsContainer.appendChild(tag);
                });
                
                selectSelected.innerHTML = '';
                selectSelected.appendChild(tagsContainer);
                
                const arrow = document.createElement('i');
                arrow.className = 'fas fa-chevron-down select-arrow';
                selectSelected.appendChild(arrow);
                
                // Add remove tag functionality
                const removeTags = selectSelected.querySelectorAll('.remove-tag');
                removeTags.forEach(removeTag => {
                    removeTag.addEventListener('click', function(e) {
                        e.stopPropagation();
                        const value = this.getAttribute('data-value');
                        selectedValues.delete(value);
                        
                        // Update option visual state
                        const option = document.querySelector(`[data-value="${value}"]`);
                        if (option) option.classList.remove('selected-option');
                        
                        updateSelectedDisplay();
                        updateHiddenSelect();
                    });
                });
            }
        }
        
        function updateHiddenSelect() {
            const originalSelect = document.querySelector('#service');
            const options = originalSelect.querySelectorAll('option');
            
            // Clear all selections
            options.forEach(option => option.selected = false);
            
            // Set selected options
            selectedValues.forEach(value => {
                const option = originalSelect.querySelector(`option[value="${value}"]`);
                if (option) option.selected = true;
            });
            
            // Trigger change event
            originalSelect.dispatchEvent(new Event('change'));
        }
        
        // Close all dropdowns except the current one
        function closeAllSelect(elmnt) {
            const selectItems = document.querySelectorAll('.select-items');
            const selectSelected = document.querySelectorAll('.select-selected');
            
            selectItems.forEach(function(item, index) {
                if (elmnt && elmnt.querySelector('.select-items') === item) return;
                item.classList.add('select-hide');
                selectSelected[index].classList.remove('select-arrow-active');
            });
        }
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            closeAllSelect();
        });
        
        // Initialize everything when page loads
        document.addEventListener('DOMContentLoaded', function() {
            initCustomSelect();
            new ContactFormHandler();
        });

// =============================================================================
// MOBILE MENU HANDLER - FIXED VERSION
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
        // Mobile menu toggle
        this.toggleButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggle();
        });
        
        // Services dropdown for mobile
        if (this.servicesDropdown) {
            const servicesLink = this.servicesDropdown.querySelector('.nav-link');
            if (servicesLink) {
                servicesLink.addEventListener('click', (e) => {
                    if (window.innerWidth <= 991) {
                        e.preventDefault();
                        this.servicesDropdown.classList.toggle('mobile-dropdown-active');
                    }
                });
            }
        }
        
        // Handle navigation link clicks (excluding services dropdown)
        const navLinks = this.navMenuWrapper.querySelectorAll('.nav-link:not(#services-dropdown .nav-link)');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 991) {
                    const href = link.getAttribute('href');
                    
                    // If it's an anchor link (starts with #), handle smooth scrolling
                    if (href && href.startsWith('#') && href !== '#') {
                        e.preventDefault();
                        this.close();
                        
                        // Wait for menu to close before scrolling
                        setTimeout(() => {
                            const targetElement = document.querySelector(href);
                            if (targetElement) {
                                Utils.smoothScrollTo(targetElement);
                            }
                        }, 400); // Match the CSS transition duration
                    } else {
                        // For regular page navigation, just close the menu
                        this.close();
                    }
                    
                    // Close services dropdown if open
                    if (this.servicesDropdown) {
                        this.servicesDropdown.classList.remove('mobile-dropdown-active');
                    }
                }
            });
        });

        // Handle dropdown links
        const dropdownLinks = this.navMenuWrapper.querySelectorAll('.dropdown-link');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 991) {
                    this.close();
                    if (this.servicesDropdown) {
                        this.servicesDropdown.classList.remove('mobile-dropdown-active');
                    }
                }
            });
        });

        // Handle mobile CTA button
        const mobileCTA = this.navMenuWrapper.querySelector('.mobile-cta');
        if (mobileCTA) {
            mobileCTA.addEventListener('click', (e) => {
                if (window.innerWidth <= 991) {
                    const href = mobileCTA.getAttribute('href');
                    if (href && href.startsWith('#') && href !== '#') {
                        e.preventDefault();
                        this.close();
                        
                        setTimeout(() => {
                            const targetElement = document.querySelector(href);
                            if (targetElement) {
                                Utils.smoothScrollTo(targetElement);
                            }
                        }, 400);
                    } else {
                        this.close();
                    }
                }
            });
        }
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && 
                !this.toggleButton.contains(e.target) && 
                !this.navMenuWrapper.contains(e.target)) {
                this.close();
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
                this.toggleButton.focus();
            }
        });

        // Close menu when window is resized to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 991 && this.isOpen) {
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

    toggle() {
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
        
        // Focus management
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
        
        // Close services dropdown
        if (this.servicesDropdown) {
            this.servicesDropdown.classList.remove('mobile-dropdown-active');
        }
        
        document.body.style.overflow = '';
        this.toggleButton.setAttribute('aria-expanded', 'false');
        this.navMenuWrapper.setAttribute('aria-hidden', 'true');
        
        // Hide after animation completes
        setTimeout(() => {
            if (!this.isOpen) {
                this.navMenuWrapper.style.visibility = 'hidden';
            }
        }, 400);
    }

    // Public methods for external use
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
        // Handle all anchor links globally
        document.addEventListener('click', (e) => {
            const anchor = e.target.closest('a[href^="#"]');
            if (!anchor) return;
            
            const href = anchor.getAttribute('href');
            if (!href || href === '#' || href.length <= 1) return;
            
            // Skip if this is handled by mobile menu (will be handled there)
            if (window.innerWidth <= 991 && anchor.closest('#nav-menu-wrapper')) return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                Utils.smoothScrollTo(target);
            }
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