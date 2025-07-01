// Blog Post JavaScript Enhancement
document.addEventListener('DOMContentLoaded', function() {
    
    // Preloader functionality
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 300);
            }, 1000);
        });
    }

    // Mobile menu toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scroll for anchor links with debugging
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            console.log('Clicked link:', targetId);
            console.log('Target element found:', targetElement);
            
            if (targetElement) {
                const headerHeight = document.getElementById('header')?.offsetHeight || 80;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                console.log('Scrolling to position:', targetPosition);
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Highlight the target section temporarily
                targetElement.style.transition = 'background-color 0.3s ease';
                targetElement.style.backgroundColor = 'rgba(102, 126, 234, 0.1)';
                setTimeout(() => {
                    targetElement.style.backgroundColor = '';
                }, 2000);
            } else {
                console.error('Target element not found for:', targetId);
                // Try alternative selectors
                const alternativeTarget = document.getElementById(targetId.substring(1));
                if (alternativeTarget) {
                    console.log('Found alternative target:', alternativeTarget);
                    alternativeTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // Back to top button
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Header scroll effect
    const header = document.getElementById('header');
    if (header) {
        let lastScrollTop = 0;
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Hide/show header on scroll
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            lastScrollTop = scrollTop;
        });
    }

    // Share buttons functionality
    const shareButtons = document.querySelectorAll('.share-button');
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.classList.contains('twitter') ? 'twitter' : 
                           this.classList.contains('facebook') ? 'facebook' : 'linkedin';
            
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            
            let shareUrl;
            switch(platform) {
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                    break;
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                    break;
            }
            
            window.open(shareUrl, '_blank', 'width=600,height=400');
        });
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                // Simulate form submission
                const button = this.querySelector('button');
                const originalText = button.textContent;
                button.textContent = 'Subscribing...';
                button.disabled = true;
                
                setTimeout(() => {
                    button.textContent = 'Subscribed!';
                    button.style.backgroundColor = '#10b981';
                    
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.disabled = false;
                        button.style.backgroundColor = '';
                        this.reset();
                    }, 2000);
                }, 1000);
            }
        });
    }

    // Search form functionality
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = this.querySelector('input').value;
            if (searchTerm) {
                // Simulate search - in real implementation, this would redirect to search results
                console.log('Searching for:', searchTerm);
                alert(`Searching for: "${searchTerm}"`);
            }
        });
    }

    // Reading progress indicator
    function createReadingProgress() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
            z-index: 9999;
            transition: width 0.3s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', function() {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }
    
    createReadingProgress();

    // Floating animations for hero section
    function animateFloatingElements() {
        const particles = document.querySelectorAll('.particle');
        const shapes = document.querySelectorAll('.shape');
        const icons = document.querySelectorAll('.floating-icon');
        
        particles.forEach((particle, index) => {
            particle.style.animationDelay = `${index * 0.5}s`;
        });
        
        shapes.forEach((shape, index) => {
            shape.style.animationDelay = `${index * 0.3}s`;
        });
        
        icons.forEach((icon, index) => {
            icon.style.animationDelay = `${index * 0.7}s`;
        });
    }
    
    animateFloatingElements();

    // Image lazy loading
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Table of contents highlighting with debugging
    const tocLinks = document.querySelectorAll('.table-of-contents a');
    const sections = document.querySelectorAll('.post-section[id]');
    
    console.log('TOC Links found:', tocLinks.length);
    console.log('Sections found:', sections.length);
    
    // Debug: Log all section IDs
    sections.forEach(section => {
        console.log('Section ID:', section.id);
    });
    
    // If sections are not found, try alternative selectors
    if (sections.length === 0) {
        const alternativeSections = document.querySelectorAll('[id^="week"], [id^="benefits"], [id^="getting-started"]');
        console.log('Alternative sections found:', alternativeSections.length);
        alternativeSections.forEach(section => {
            console.log('Alternative section ID:', section.id);
        });
    }
    
    if (tocLinks.length && sections.length) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const activeId = entry.target.getAttribute('id');
                    console.log('Active section:', activeId);
                    tocLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${activeId}`) {
                            link.classList.add('active');
                            console.log('Activated TOC link for:', activeId);
                        }
                    });
                }
            });
        }, {
            rootMargin: '-20% 0px -70% 0px'
        });

        sections.forEach(section => sectionObserver.observe(section));
    }
    
    // Force visibility check for sections
    function checkSectionVisibility() {
        const allSections = document.querySelectorAll('div[id]');
        console.log('All elements with IDs:', allSections.length);
        allSections.forEach(section => {
            if (section.id.startsWith('week') || section.id === 'benefits' || section.id === 'getting-started') {
                console.log(`Section ${section.id}:`, {
                    display: getComputedStyle(section).display,
                    visibility: getComputedStyle(section).visibility,
                    height: section.offsetHeight,
                    position: section.offsetTop
                });
            }
        });
    }
    
    // Run visibility check after a short delay
    setTimeout(checkSectionVisibility, 1000);

    // Copy link functionality
    function addCopyLinkButtons() {
        const headings = document.querySelectorAll('h2[id], h3[id]');
        headings.forEach(heading => {
            const copyBtn = document.createElement('button');
            copyBtn.innerHTML = '<i class="fas fa-link"></i>';
            copyBtn.className = 'copy-link-btn';
            copyBtn.style.cssText = `
                opacity: 0;
                margin-left: 10px;
                background: none;
                border: none;
                color: #667eea;
                cursor: pointer;
                transition: opacity 0.3s ease;
            `;
            
            heading.appendChild(copyBtn);
            
            heading.addEventListener('mouseenter', () => {
                copyBtn.style.opacity = '1';
            });
            
            heading.addEventListener('mouseleave', () => {
                copyBtn.style.opacity = '0';
            });
            
            copyBtn.addEventListener('click', () => {
                const url = `${window.location.origin}${window.location.pathname}#${heading.id}`;
                navigator.clipboard.writeText(url).then(() => {
                    copyBtn.innerHTML = '<i class="fas fa-check"></i>';
                    setTimeout(() => {
                        copyBtn.innerHTML = '<i class="fas fa-link"></i>';
                    }, 1000);
                });
            });
        });
    }
    
    // Add debugging and ensure sections are visible
    function ensureSectionsVisible() {
        // Check if sections exist and are properly structured
        const weekSections = ['week1', 'week2', 'week3', 'week4', 'benefits', 'getting-started'];
        
        weekSections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                console.log(`✓ Section ${sectionId} found`);
                // Ensure section is visible
                section.style.display = 'block';
                section.style.visibility = 'visible';
                section.style.opacity = '1';
            } else {
                console.warn(`✗ Section ${sectionId} not found`);
                // Try to find by class or data attribute
                const alternativeSection = document.querySelector(`[data-section="${sectionId}"], .${sectionId}`);
                if (alternativeSection) {
                    console.log(`Found alternative for ${sectionId}:`, alternativeSection);
                }
            }
        });
        
        // Check if post-section class exists
        const postSections = document.querySelectorAll('.post-section');
        console.log('Post sections found:', postSections.length);
        postSections.forEach((section, index) => {
            console.log(`Post section ${index}:`, section.id || 'No ID', section.tagName);
        });
    }
    
    // Run after DOM is fully loaded
    setTimeout(ensureSectionsVisible, 500);
    
    // Add manual scroll functionality as fallback
    function addManualScrollButtons() {
        const tocContainer = document.querySelector('.table-of-contents');
        if (tocContainer) {
            const sections = ['week1', 'week2', 'week3', 'week4', 'benefits', 'getting-started'];
            
            sections.forEach(sectionId => {
                const link = tocContainer.querySelector(`a[href="#${sectionId}"]`);
                if (link && !document.getElementById(sectionId)) {
                    // If link exists but section doesn't, add a warning
                    link.style.color = '#ef4444';
                    link.title = `Section ${sectionId} not found in DOM`;
                    console.warn(`TOC link exists but section ${sectionId} not found`);
                }
            });
        }
    }
    
    addManualScrollButtons();

    // Tip box animations
    const tipBoxes = document.querySelectorAll('.tip-box');
    const tipObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.6s ease forwards';
            }
        });
    });

    tipBoxes.forEach(box => tipObserver.observe(box));

    // Form validation enhancement
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (!this.value.trim()) {
                    this.classList.add('error');
                } else {
                    this.classList.remove('error');
                }
            });
        });
    });

    // Print functionality
    function addPrintButton() {
        const printBtn = document.createElement('button');
        printBtn.innerHTML = '<i class="fas fa-print"></i> Print Article';
        printBtn.className = 'print-btn';
        printBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 80px;
            background: #667eea;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 25px;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
            z-index: 1000;
            display: none;
        `;
        
        document.body.appendChild(printBtn);
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                printBtn.style.display = 'block';
            } else {
                printBtn.style.display = 'none';
            }
        });
        
        printBtn.addEventListener('click', () => {
            window.print();
        });
    }
    
    addPrintButton();
});

// CSS animations to be added via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
    }
    
    @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    .particle {
        animation: float 3s ease-in-out infinite;
    }
    
    .shape {
        animation: rotate 20s linear infinite;
    }
    
    .floating-icon {
        animation: float 4s ease-in-out infinite;
    }
    
    .back-to-top {
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }
    
    .back-to-top.show {
        opacity: 1;
        visibility: visible;
    }
    
    #header {
        transition: transform 0.3s ease, background-color 0.3s ease;
    }
    
    #header.scrolled {
        background-color: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
    
    .table-of-contents a.active {
        color: #667eea;
        font-weight: 600;
    }
    
    input.error {
        border-color: #ef4444;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
    
    @media print {
        .header, .footer, .share-section, .related-posts, 
        .newsletter, .cta, .post-sidebar, .back-to-top, .print-btn {
            display: none !important;
        }
        
        .post-main {
            width: 100% !important;
            max-width: none !important;
        }
    }
`;

document.head.appendChild(style);