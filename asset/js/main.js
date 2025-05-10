document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    setTimeout(function() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.transition = 'opacity 0.5s ease';
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }
    }, 1500);

    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    navMenu.classList.remove('active');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Sticky Header
    const header = document.getElementById('header');
    const scrollThreshold = 100;
    
    function toggleStickyHeader() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', toggleStickyHeader);
    toggleStickyHeader(); // Initial check

    // Back to Top Button
    const backToTop = document.querySelector('.back-to-top');
    
    function toggleBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    }
    
    window.addEventListener('scroll', toggleBackToTop);
    toggleBackToTop(); // Initial check

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Testimonial Slider
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
    const prevButton = document.getElementById('prev-testimonial');
    const nextButton = document.getElementById('next-testimonial');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        // Hide all testimonials
        testimonialItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // Remove active class from all dots
        testimonialDots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the selected testimonial
        testimonialItems[index].classList.add('active');
        testimonialDots[index].classList.add('active');
        currentTestimonial = index;
    }
    
    // Next testimonial
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
            showTestimonial(currentTestimonial);
        });
    }
    
    // Previous testimonial
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial - 1 + testimonialItems.length) % testimonialItems.length;
            showTestimonial(currentTestimonial);
        });
    }
    
    // Dot navigation
    testimonialDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'));
            showTestimonial(index);
        });
    });

    // Auto-rotate testimonials
    let testimonialInterval = setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
        showTestimonial(currentTestimonial);
    }, 5000);
    
    // Pause auto-rotation on hover
    const testimonialWrapper = document.querySelector('.testimonial-wrapper');
    if (testimonialWrapper) {
        testimonialWrapper.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });
        
        testimonialWrapper.addEventListener('mouseleave', () => {
            testimonialInterval = setInterval(() => {
                currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
                showTestimonial(currentTestimonial);
            }, 5000);
        });
    }

    // Portfolio Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Skill Bar Animation
    const skillBars = document.querySelectorAll('.skill-per');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const percentage = bar.getAttribute('per');
            bar.style.width = percentage + '%';
        });
    }
    
    // Animate skill bars when they come into view
    const skillsSection = document.querySelector('.skills');
    
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(skillsSection);
    }

    // Animate elements when they come into view
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.getAttribute('data-aos-delay') || 0;
                
                setTimeout(() => {
                    element.classList.add('fade-in');
                    elementObserver.unobserve(element);
                }, delay);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        elementObserver.observe(element);
    });

    // Counter Animation for Stats
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }
    
    if (statNumbers.length > 0) {
        const statsSection = document.querySelector('.stats-counter');
        
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    statNumbers.forEach(number => {
                        const target = parseInt(number.getAttribute('data-count'));
                        animateCounter(number, target, 2000);
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        statsObserver.observe(statsSection);
    }

    // Form Submission
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real implementation, you would send the form data to your server
            // This is a simulation for demonstration purposes
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Show success message
                if (formStatus) {
                    formStatus.textContent = 'Thank you for your message! I will get back to you soon.';
                    formStatus.className = 'success';
                    formStatus.style.display = 'block';
                }
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    if (formStatus) {
                        formStatus.style.display = 'none';
                    }
                }, 5000);
            }, 1500);
        });
    }

    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real implementation, you would send the form data to your server
            // This is a simulation for demonstration purposes
            
            // Show loading state
            const submitButton = newsletterForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Subscribing...';
            submitButton.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Show success message
                const input = newsletterForm.querySelector('input[type="email"]');
                const formNote = newsletterForm.querySelector('.form-note');
                
                formNote.textContent = 'Thank you for subscribing! Check your email for confirmation.';
                formNote.style.color = '#fff';
                
                // Reset form
                input.value = '';
                
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // Reset message after 5 seconds
                setTimeout(() => {
                    formNote.textContent = 'By subscribing, you agree to receive emails from Afa-Virtuals. You can unsubscribe at any time.';
                    formNote.style.color = 'rgba(255, 255, 255, 0.7)';
                }, 5000);
            }, 1500);
        });
    }

    // Add SEO-focused meta tags dynamically
    const head = document.querySelector('head');
    
    // Add canonical URL
    const canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    canonicalLink.href = window.location.href.split('?')[0].split('#')[0];
    head.appendChild(canonicalLink);
    
    // Add hreflang tags for international targeting
    const hreflangEN = document.createElement('link');
    hreflangEN.rel = 'alternate';
    hreflangEN.hreflang = 'en';
    hreflangEN.href = 'https://afa-virtuals.com/en/';
    head.appendChild(hreflangEN);
    
    const hreflangFR = document.createElement('link');
    hreflangFR.rel = 'alternate';
    hreflangFR.hreflang = 'fr';
    hreflangFR.href = 'https://afa-virtuals.com/fr/';
    head.appendChild(hreflangFR);
    
    const hreflangDE = document.createElement('link');
    hreflangDE.rel = 'alternate';
    hreflangDE.hreflang = 'de';
    hreflangDE.href = 'https://afa-virtuals.com/de/';
    head.appendChild(hreflangDE);
    
    const hreflangX = document.createElement('link');
    hreflangX.rel = 'alternate';
    hreflangX.hreflang = 'x-default';
    hreflangX.href = 'https://afa-virtuals.com/';
    head.appendChild(hreflangX);
});


// google form codes

// Add this script to your website
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Change button text to show loading
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = 'Sending...';
    
    // Show sending message
    formStatus.innerHTML = '<p class="sending">Sending your message...</p>';
    
    // Collect form data
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    
    // Send form data to Google Apps Script
    fetch(form.action, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'no-cors'
    })
    .then(response => {
      // Since we're using no-cors mode, we can't access the response content
      // Show success message based on expected behavior
      formStatus.innerHTML = '<p class="success">Thank you! Your message has been sent successfully.</p>';
      form.reset();
    })
    .catch(error => {
      formStatus.innerHTML = '<p class="error">Oops! There was a problem sending your message. Please try again later.</p>';
      console.error('Form submission error:', error);
    })
    .finally(() => {
      // Reset button
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonText;
      
      // Clear status message after 5 seconds
      setTimeout(() => {
        formStatus.innerHTML = '';
      }, 5000);
    });
  });
});