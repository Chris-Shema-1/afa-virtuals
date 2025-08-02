// ===== REDESIGNED BLOG JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== BLOG POSTS DATA =====
    const blogPosts = [
        {
            id: 1,
            title: "From Burnout to Breakthrough: The Quiet Struggles of Today's Business Owners",
            excerpt: "Running a business often feels like a constant battle with time and stress. Many entrepreneurs quietly struggle with burnout, not realizing that small changes can lead to massive breakthroughs.",
            category: "productivity",
            image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            date: "May 15, 2025",
            readTime: "5 min read",
            url: "blog-1.html",
            featured: true
        },
        {
            id: 2,
            title: "The 5-Minute Rule That Transformed My Client's Business",
            excerpt: "Discover how implementing a simple 5-minute daily practice helped one of our clients increase their productivity by 300% and reduce stress levels significantly.",
            category: "business-growth",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            date: "May 12, 2025",
            readTime: "4 min read",
            url: "blog-2.html"
        },
        {
            id: 3,
            title: "Why Your Website Might Be Losing You Money (And How to Fix It)",
            excerpt: "Your website is often the first impression potential clients have of your business. Learn the common mistakes that could be costing you conversions and how to fix them.",
            category: "web-design",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            date: "May 10, 2025",
            readTime: "6 min read",
            url: "blog-3.html"
        },
        {
            id: 4,
            title: "The Social Media Strategy That Actually Works in 2025",
            excerpt: "Stop wasting time on social media tactics that don't work. Here's the proven strategy that's helping our clients grow their audience and increase engagement.",
            category: "social-media",
            image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            date: "May 8, 2025",
            readTime: "7 min read",
            url: "blog-4.html"
        },
        {
            id: 5,
            title: "Automation Tools That Save 10+ Hours Per Week",
            excerpt: "Discover the automation tools and workflows that are helping busy entrepreneurs reclaim their time and focus on what truly matters for their business.",
            category: "tech-solutions",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            date: "May 5, 2025",
            readTime: "8 min read",
            url: "blog-5.html"
        },
        {
            id: 6,
            title: "The Psychology Behind High-Converting Landing Pages",
            excerpt: "Understanding the psychology of your visitors can dramatically improve your conversion rates. Learn the principles that make landing pages irresistible.",
            category: "business-growth",
            image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            date: "May 3, 2025",
            readTime: "6 min read",
            url: "blog-6.html"
        },
        {
            id: 7,
            title: "How to Build a Client Management System That Scales",
            excerpt: "As your business grows, managing clients manually becomes impossible. Learn how to build a scalable client management system that grows with you.",
            category: "productivity",
            image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            date: "May 1, 2025",
            readTime: "9 min read",
            url: "blog-7.html"
        },
        {
            id: 8,
            title: "The Email Marketing Strategy That Converts",
            excerpt: "Email marketing is still one of the most effective ways to nurture leads and drive sales. Here's the strategy that's working for our clients.",
            category: "business-growth",
            image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            date: "April 28, 2025",
            readTime: "5 min read",
            url: "blog-8.html"
        },
        {
            id: 9,
            title: "Content Creation: Quality vs Quantity Debate Settled",
            excerpt: "Should you focus on creating more content or better content? The answer might surprise you, and it's backed by real data from successful businesses.",
            category: "social-media",
            image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            date: "April 25, 2025",
            readTime: "7 min read",
            url: "blog-9.html"
        },
        {
            id: 10,
            title: "The Hidden Costs of DIY Website Management",
            excerpt: "While managing your own website might seem cost-effective, the hidden costs can be staggering. Learn when to DIY and when to delegate.",
            category: "tech-solutions",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            date: "April 22, 2025",
            readTime: "6 min read",
            url: "blog-10.html"
        },
        {
            id: 11,
            title: "Time Management Techniques That Actually Work",
            excerpt: "Stop trying to manage time and start managing your energy. These proven techniques will help you accomplish more in less time.",
            category: "productivity",
            image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            date: "April 20, 2025",
            readTime: "8 min read",
            url: "blog-11.html"
        },
        {
            id: 12,
            title: "Building Trust Through Consistent Branding",
            excerpt: "Consistent branding isn't just about aesthetics—it's about building trust with your audience. Learn how to create a brand that people trust and remember.",
            category: "productivity",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            date: "April 18, 2025",
            readTime: "5 min read",
            url: "blog-12.html"
        }
    ];
    
    // ===== STATE MANAGEMENT =====
    let currentCategory = 'all';
    let currentSearch = '';
    let displayedPosts = 6;
    let filteredPosts = [...blogPosts];
    
    // ===== DOM ELEMENTS =====
    const postsGrid = document.getElementById('posts-grid');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const searchInput = document.getElementById('blog-search');
    const searchBtn = document.querySelector('.search-btn');
    const categoryCards = document.querySelectorAll('.category-card');
    
    // ===== UTILITY FUNCTIONS =====
    
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
    
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    // ===== POST CARD CREATION =====
    function createPostCard(post) {
        return `
            <article class="post-card" data-category="${post.category}" data-id="${post.id}">
                <div class="post-image">
                    <img src="${post.image}" alt="${post.title}" loading="lazy">
                </div>
                <div class="post-content">
                    <div class="post-meta">
                        <span class="category">${getCategoryDisplayName(post.category)}</span>
                        <span class="date">${post.date}</span>
                        <span class="read-time">${post.readTime}</span>
                    </div>
                    <h3>${post.title}</h3>
                    <p>${post.excerpt}</p>
                    <a href="${post.url}" class="read-more">
                        Read More
                        <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </article>
        `;
    }
    
    function getCategoryDisplayName(category) {
        const categoryMap = {
            'productivity': 'Productivity',
            'business-growth': 'Business Growth',
            'tech-solutions': 'Tech Solutions',
            'social-media': 'Social Media',
            'web-design': 'Web Design'
        };
        return categoryMap[category] || category;
    }
    
    // ===== FILTERING AND SEARCH =====
    function filterPosts() {
        filteredPosts = blogPosts.filter(post => {
            const matchesCategory = currentCategory === 'all' || post.category === currentCategory;
            const matchesSearch = currentSearch === '' || 
                post.title.toLowerCase().includes(currentSearch.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(currentSearch.toLowerCase());
            
            return matchesCategory && matchesSearch;
        });
        
        displayedPosts = 6;
        renderPosts();
        updateLoadMoreButton();
    }
    
    function renderPosts() {
        const postsToShow = filteredPosts.slice(0, displayedPosts);
        postsGrid.innerHTML = postsToShow.map(post => createPostCard(post)).join('');
        
        // Add animation to new posts
        const newPosts = postsGrid.querySelectorAll('.post-card');
        newPosts.forEach((post, index) => {
            post.style.opacity = '0';
            post.style.transform = 'translateY(20px)';
            setTimeout(() => {
                post.style.transition = 'all 0.5s ease';
                post.style.opacity = '1';
                post.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    function updateLoadMoreButton() {
        if (displayedPosts >= filteredPosts.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-flex';
        }
    }
    
    // ===== EVENT LISTENERS =====
    
    // Category filtering
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            categoryCards.forEach(c => c.classList.remove('active'));
            // Add active class to clicked card
            this.classList.add('active');
            
            currentCategory = this.dataset.category;
            filterPosts();
            
            // Track category selection
            if (typeof gtag !== 'undefined') {
                gtag('event', 'blog_category_filter', {
                    category: currentCategory
                });
            }
        });
    });
    
    // Search functionality
    const debouncedSearch = debounce(function(searchTerm) {
        currentSearch = searchTerm;
        filterPosts();
        
        // Track search
        if (typeof gtag !== 'undefined' && searchTerm) {
            gtag('event', 'blog_search', {
                search_term: searchTerm
            });
        }
    }, 300);
    
    searchInput.addEventListener('input', function() {
        debouncedSearch(this.value);
    });
    
    searchBtn.addEventListener('click', function() {
        debouncedSearch(searchInput.value);
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            debouncedSearch(this.value);
        }
    });
    
    // Load more posts
    loadMoreBtn.addEventListener('click', function() {
        displayedPosts += 6;
        renderPosts();
        updateLoadMoreButton();
        
        // Track load more
        if (typeof gtag !== 'undefined') {
            gtag('event', 'blog_load_more', {
                posts_loaded: displayedPosts
            });
        }
    });
    
    // ===== NEWSLETTER FORM =====
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            // Track newsletter signup
            if (typeof gtag !== 'undefined') {
                gtag('event', 'newsletter_signup', {
                    email: email
                });
            }
            
            // Show success message
            showNotification('Thank you for subscribing! Check your email for confirmation.', 'success');
            
            // Reset form
            this.reset();
        });
    }
    
    // ===== NOTIFICATION SYSTEM =====
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#38b2ac' : '#f97316'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
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
    
    // ===== INTERSECTION OBSERVER FOR LAZY LOADING =====
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });
    
    // Observe all images
    function observeImages() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => imageObserver.observe(img));
    }
    
    // ===== INITIALIZATION =====
    function init() {
        filterPosts();
        observeImages();
        
        // Track page view
        if (typeof gtag !== 'undefined') {
            gtag('event', 'blog_page_view');
        }
        
        console.log('Blog redesigned JavaScript loaded successfully');
    }
    
    // Initialize when DOM is ready
    init();
    
    // Re-observe images after content changes
    const observer = new MutationObserver(() => {
        observeImages();
    });
    
    observer.observe(postsGrid, {
        childList: true,
        subtree: true
    });
});

// ===== EXPORT FOR GLOBAL USE =====
window.BlogRedesigned = {
    filterPosts: function(category) {
        // Can be called from other scripts
        currentCategory = category;
        filterPosts();
    },
    
    searchPosts: function(query) {
        // Can be called from other scripts
        currentSearch = query;
        filterPosts();
    }
}; 