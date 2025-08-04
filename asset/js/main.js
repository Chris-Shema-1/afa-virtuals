
// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}


//==============================================================================
// contact us function
//==============================================================================

  const form = document.getElementById("contact-form");
  const scriptURL = "https://script.google.com/macros/s/AKfycbwnNVV2XKcaLur09pts3PLa-DWxg7LqsQGvCRz50ueWw6upy7ubm6ynd0VdmyPsj6pt/exec";
  const statusDiv = document.getElementById("form-status");
  const successMessage = document.getElementById("success-message");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent default form submission

    // Show sending message
    statusDiv.innerText = "Sending...";
    statusDiv.className = "alert-success";
    statusDiv.style.display = "block";

    const formData = new FormData(form);

    fetch(scriptURL, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((result) => {
        console.log("Success:", result);
        form.reset();

        successMessage.className = "alert-success";
        successMessage.style.display = "block";
        successMessage.innerText = "✅ Thank you! Your message was submitted.";

        statusDiv.style.display = "none";

        // Auto-hide success after 5 seconds
        setTimeout(() => {
          successMessage.style.display = "none";
        }, 5000);
      })
      .catch((error) => {
        console.error("Error!", error.message);

        statusDiv.className = "alert-error";
        statusDiv.innerText = "❌ Failed to send message. Please try again.";
        statusDiv.style.display = "block";

        // Auto-hide error after 5 seconds
        setTimeout(() => {
          statusDiv.style.display = "none";
        }, 5000);
      });
  });

// =============================================================================
// MODAL FUNCTIONALITY
// =============================================================================

// Video Modal Functions
function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('videoFrame');
    if (iframe) iframe.src = '';
    if (modal) modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Team Member Modal Functions
function openModal(memberName) {
    const modal = document.getElementById(memberName + 'Modal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(memberName) {
    const modal = document.getElementById(memberName + 'Modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// =============================================================================
// FAQ FUNCTIONALITY
// =============================================================================

function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items first
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        const itemAnswer = item.querySelector('.faq-answer');
        if (itemAnswer) itemAnswer.classList.remove('active');
    });
    
    // If this item wasn't active, open it
    if (!isActive) {
        faqItem.classList.add('active');
        if (answer) answer.classList.add('active');
    }
}

// Enhanced FAQ functionality for services page
function initializeServicesFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                toggleFAQ(this);
            });

            // Accessibility improvements
            question.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
            
            question.setAttribute('tabindex', '0');
            question.setAttribute('role', 'button');
            question.setAttribute('aria-expanded', 'false');
        }
    });
}

// =============================================================================
// ANIMATION STYLES
// =============================================================================

function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInDown {
            from { opacity: 0; transform: translateY(-30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-50px); }
            to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
}

// =============================================================================
// INTERSECTION OBSERVERS
// =============================================================================

function initializeObservers() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Main observer for general animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // FAQ observer
    const faqObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Procedure observer
    const procedureObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Team observer
    const teamObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    // Observe various elements
    document.querySelectorAll('.trust-metric, .success-indicator-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    document.querySelectorAll('.solution-service-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease-out ${index * 0.15}s`;
        observer.observe(card);
    });

    // Services page elements
    const animateElements = document.querySelectorAll('.pain-point-card, .service-card, .step, .testimonial-card, .pricing-card');
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // FAQ items
    document.querySelectorAll('.faq-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        faqObserver.observe(item);
    });

    // Procedure steps
    document.querySelectorAll('.step').forEach(step => {
        procedureObserver.observe(step);
    });

    // Team members
    document.querySelectorAll('.team-member').forEach(member => {
        teamObserver.observe(member);
    });

    // Result cards
    const resultObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.result-card').forEach(card => {
        resultObserver.observe(card);
    });
}

// =============================================================================
// LOADING ANIMATIONS
// =============================================================================

function initializeLoadingAnimations() {
    window.addEventListener('load', () => {
        // Hero section animations
        const transformationBadge = document.querySelector('.transformation-badge');
        const mainHeadline = document.querySelector('.main-headline');
        const problemSubtitle = document.querySelector('.problem-focused-subtitle');
        const ctaContainer = document.querySelector('.strategy-cta-container');

        if (transformationBadge) transformationBadge.style.animation = 'slideInDown 0.8s ease-out';
        if (mainHeadline) mainHeadline.style.animation = 'slideInLeft 1s ease-out 0.2s both';
        if (problemSubtitle) problemSubtitle.style.animation = 'slideInLeft 1s ease-out 0.4s both';
        if (ctaContainer) ctaContainer.style.animation = 'slideInUp 1s ease-out 0.6s both';

        // Solutions section animations
        const expertiseBadge = document.querySelector('.expertise-badge');
        const solutionsTitle = document.querySelector('.solutions-primary-title');
        const solutionsDescription = document.querySelector('.solutions-description');

        if (expertiseBadge) expertiseBadge.style.animation = 'slideInDown 0.8s ease-out';
        if (solutionsTitle) solutionsTitle.style.animation = 'slideInUp 1s ease-out 0.2s both';
        if (solutionsDescription) solutionsDescription.style.animation = 'slideInUp 1s ease-out 0.4s both';
    });
}

// =============================================================================
// HOVER EFFECTS
// =============================================================================

function initializeHoverEffects() {
    // Service cards hover effects
    document.querySelectorAll('.solution-service-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.primary-service-icon');
            const title = card.querySelector('.service-title-header');
            
            if (icon) icon.style.transform = 'scale(1.1) rotate(5deg)';
            if (title) title.style.color = 'var(--primary-orange)';
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.primary-service-icon');
            const title = card.querySelector('.service-title-header');
            
            if (icon) icon.style.transform = 'scale(1) rotate(0deg)';
            if (title) title.style.color = 'var(--dark-slate)';
        });
    });

    // Enhanced service cards hover effects
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Procedure steps hover effects
    document.querySelectorAll('.step').forEach(step => {
        step.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        step.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Team members hover effects
    document.querySelectorAll('.team-member').forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        member.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Enhanced CTA interactions
    const ctaButtons = document.querySelectorAll('.cta-primary, .cta-secondary, .btn-primary, .pricing-cta');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Pricing card interactions
    document.querySelectorAll('.pricing-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(-5px) scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
}

// =============================================================================
// SCROLL EFFECTS
// =============================================================================

function initializeScrollEffects() {
    // Smooth scroll for anchor links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach((link) => {
        link.addEventListener(
            "click",
            debounce((e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute("href"));
                if (target) {
                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                }
            }, 100)
        );
    });

    // Parallax effects
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const orbs = document.querySelectorAll('.decorative-gradient-orb');
        const floatingIcons = document.querySelectorAll('.floating-icon-element');
        const resultsParallax = document.querySelector('.results-bg-parallax');
        
        orbs.forEach((orb, index) => {
            const speed = 0.3 + (index * 0.1);
            orb.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });

        floatingIcons.forEach((icon, index) => {
            const speed = 0.2 + (index * 0.05);
            icon.style.transform = `translateY(${scrolled * speed}px)`;
        });

        // Results section parallax
        if (resultsParallax) {
            const speed = scrolled * 0.3;
            resultsParallax.style.transform = `translateY(${speed}px)`;
        }
    });
}

// =============================================================================
// EVENT LISTENERS
// =============================================================================

function initializeEventListeners() {
    // Video modal events
    const videoModal = document.getElementById('videoModal');
    if (videoModal) {
        videoModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeVideoModal();
            }
        });
    }

    // Team modal events
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };

    // Keyboard events
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close video modal
            closeVideoModal();
            
            // Close FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                const answer = item.querySelector('.faq-answer');
                if (answer) answer.classList.remove('active');
            });
            
            // Close team modals
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                if (modal.style.display === 'block') {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });

    // FAQ keyboard navigation
    document.querySelectorAll('.faq-question').forEach(question => {
        question.setAttribute('tabindex', '0');
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFAQ(question);
            }
        });
    });

    // Click analytics (optional)
    document.querySelectorAll('.solution-service-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const title = card.querySelector('.service-title-header');
            if (title) {
                console.log('Service card clicked:', title.textContent);
            }
        });
    });

    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            console.log('CTA clicked: Book Discovery Call');
        });
    }
}

// =============================================================================
// ADVANCED FEATURES FOR SERVICES PAGE
// =============================================================================

// Stats counter animation
function initializeStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateStats = () => {
        statNumbers.forEach(stat => {
            const target = stat.textContent;
            const isNumber = !isNaN(target);
            
            if (isNumber) {
                const finalNumber = parseInt(target);
                let currentNumber = 0;
                const increment = finalNumber / 50;
                
                const timer = setInterval(() => {
                    currentNumber += increment;
                    if (currentNumber >= finalNumber) {
                        currentNumber = finalNumber;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(currentNumber) + '+';
                }, 30);
            }
        });
    };

    // Trigger stats animation when hero section is visible
    const heroSection = document.querySelector('.services-hero');
    const heroObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (heroSection) {
        heroObserver.observe(heroSection);
    }
}

// Testimonial carousel functionality
function initializeTestimonialCarousel() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;

    const showTestimonial = (index) => {
        testimonialCards.forEach((card, i) => {
            card.style.display = i === index ? 'block' : 'none';
        });
    };

    // Auto-rotate testimonials on mobile
    if (window.innerWidth <= 768 && testimonialCards.length > 1) {
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }
}

// Enhanced form validation
function initializeFormValidation() {
    const contactForms = document.querySelectorAll('form');
    
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#e53e3e';
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (isValid) {
                // Track form submission
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submit', {
                        form_name: form.id || 'contact_form'
                    });
                }
                
                // Show success message
                showNotification('Thank you! We\'ll get back to you soon.', 'success');
            } else {
                showNotification('Please fill in all required fields.', 'error');
            }
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
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
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// =============================================================================
// FIXED MOBILE MENU FUNCTIONALITY
// =============================================================================

// Simple and reliable mobile menu function
function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!mobileMenuToggle) {
        console.error('Mobile menu toggle not found! Make sure element has id="mobile-menu"');
        return;
    }
    
    if (!navMenu) {
        console.error('Navigation menu not found! Make sure element has class="nav-menu"');
        return;
    }
    
    console.log('Mobile menu elements found successfully');
    
    // Add click event to mobile menu toggle
    mobileMenuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('Mobile menu toggle clicked');
        
        // Toggle active class on both elements
        const isCurrentlyActive = this.classList.contains('active');
        
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Toggle body overflow to prevent scrolling when menu is open
        if (!isCurrentlyActive) {
            document.body.style.overflow = 'hidden';
            console.log('Menu opened');
        } else {
            document.body.style.overflow = '';
            console.log('Menu closed');
        }
        
        // Update aria-expanded for accessibility
        this.setAttribute('aria-expanded', !isCurrentlyActive);
    });
    
    // Close menu when clicking on navigation links
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Navigation link clicked, closing menu');
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            if (mobileMenuToggle.classList.contains('active')) {
                console.log('Clicked outside menu, closing');
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });
    
    // Close menu with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenuToggle.classList.contains('active')) {
            console.log('Escape key pressed, closing menu');
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Set initial aria attributes
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    mobileMenuToggle.setAttribute('aria-controls', 'navigation-menu');
    navMenu.setAttribute('id', 'navigation-menu');
    
    console.log('Mobile menu initialized successfully');
}

// Initialize mobile menu when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeMobileMenu();
});

// Also initialize on window load as backup
window.addEventListener('load', function() {
    // Check if mobile menu is working, if not try to initialize again
    const mobileMenuToggle = document.getElementById('mobile-menu');
    if (mobileMenuToggle && !mobileMenuToggle.hasAttribute('aria-expanded')) {
        console.log('Reinitializing mobile menu on window load');
        initializeMobileMenu();
    }
});

// =============================================================================
// PERFORMANCE OPTIMIZATIONS & ADVANCED FEATURES
// =============================================================================

// Enhanced lazy loading for images
function initializeLazyLoading() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                
                // Add loading animation
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
                img.onload = function() {
                    img.style.opacity = '1';
                };
                
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
}

// Header scroll effects and back-to-top button
function initializeScrollOptimizations() {
    const handleScroll = debounce(() => {
        // Header scroll effect
        const header = document.getElementById('header');
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        // Back to top button
        const backToTop = document.getElementById('back-to-top');
        if (backToTop) {
            if (window.scrollY > 300) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        }
    }, 10);
    
    window.addEventListener('scroll', handleScroll);
}

// Mobile touch optimizations
function initializeMobileOptimizations() {
    const touchElements = document.querySelectorAll('.btn, .nav-link, .category-card');
    
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        element.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Enhanced accessibility features
function initializeAccessibilityFeatures() {
    // Focus management
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary-color)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
}

// Additional accessibility improvements for services page
function initializeEnhancedAccessibility() {
    // Focus management for escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.click();
            }
            
            // Close FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                const question = item.querySelector('.faq-question');
                if (question) {
                    question.setAttribute('aria-expanded', 'false');
                }
            });
        }
    });
}

// Analytics tracking
function initializeAnalytics() {
    function trackEvent(eventName, eventData = {}) {
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, eventData);
        }
    }
    
    // Track CTA clicks
    const ctaButtons = document.querySelectorAll('.cta-primary, .btn-primary, .cta-secondary, .pricing-cta');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            trackEvent('cta_click', {
                button_text: this.textContent.trim(),
                button_location: this.closest('section')?.className || 'unknown'
            });
        });
    });
    
    // Track form submissions
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            trackEvent('form_submit', {
                form_name: 'contact_form'
            });
        });
    }
}

// Performance monitoring
function initializePerformanceMonitoring() {
    if ('PerformanceObserver' in window) {
        // Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.startTime);
            
            if (lastEntry.startTime > 2500) {
                console.warn('LCP is too slow:', lastEntry.startTime);
            }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        
        // First Input Delay
        const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
                console.log('FID:', entry.processingStart - entry.startTime);
                
                if (entry.processingStart - entry.startTime > 100) {
                    console.warn('FID is too slow:', entry.processingStart - entry.startTime);
                }
            });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
        
        // Cumulative Layout Shift
        const clsObserver = new PerformanceObserver((list) => {
            let clsValue = 0;
            const entries = list.getEntries();
            entries.forEach(entry => {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            });
            console.log('CLS:', clsValue);
            
            if (clsValue > 0.1) {
                console.warn('CLS is too high:', clsValue);
            }
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
    }
}

// Error handling
function initializeErrorHandling() {
    window.addEventListener('error', function(e) {
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

// Preloader handling
function initializePreloader() {
    window.addEventListener('load', function() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 300);
        }
    });
}

// Service worker registration (future)
function initializeServiceWorker() {
    if ('serviceWorker' in navigator) {
        // Uncomment when service worker is ready
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    }
}

// =============================================================================
// UTILITY FUNCTIONS FOR GLOBAL USE
// =============================================================================

// Smooth scroll to anchor links
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Format numbers with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// =============================================================================
// INITIALIZATION
// =============================================================================

function initializeWebsite() {
    addAnimationStyles();
    initializeObservers();
    initializeLoadingAnimations();
    initializeHoverEffects();
    initializeScrollEffects();
    initializeEventListeners();
    
    // Performance optimizations
    initializeLazyLoading();
    initializeScrollOptimizations();
    initializeMobileOptimizations();
    initializeAccessibilityFeatures();
    initializeAnalytics();
    initializePerformanceMonitoring();
    initializeErrorHandling();
    initializePreloader();
    initializeServiceWorker();
    
    console.log('Optimized JavaScript loaded successfully');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeWebsite);

// Initialize again when window loads (for any elements that might load later)
window.addEventListener('load', () => {
    // Reinitialize observers for any dynamically loaded content
    setTimeout(initializeObservers, 100);
});

// Export functions for global use
window.AfaVirtuals = {
    smoothScrollTo,
    formatNumber,
    isInViewport,
    showNotification,
    debounce
};