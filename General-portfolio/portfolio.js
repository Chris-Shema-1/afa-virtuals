

// === Animated Zig-Zag Roadmap for Process Section (Car Animation) ===
document.addEventListener('DOMContentLoaded', function() {
  var processGrid = document.querySelector('.process-grid');
  if (!processGrid) return;
  var steps = Array.from(processGrid.querySelectorAll('.process-step'));
  if (steps.length < 2) return;
  // Insert SVG road between card edges (zig-zag)
  var road = document.createElement('div');
  road.className = 'process-roadmap-road';
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('stroke-width', '8');
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke-linecap', 'round');
  svg.appendChild(path);
  road.appendChild(svg);
  processGrid.appendChild(road);
  // Insert car icon
  var car = document.createElement('div');
  car.className = 'process-roadmap-car';
  car.innerHTML = '<i class="fas fa-car"></i>';
  processGrid.appendChild(car);
  // Calculate card edge positions and draw curved zig-zag road
  function updateRoad() {
    var gridRect = processGrid.getBoundingClientRect();
    var points = steps.map(function(step, i) {
      var rect = step.getBoundingClientRect();
      var x = (i % 2 === 0) ? rect.left - gridRect.left : rect.right - gridRect.left;
      var y = rect.top - gridRect.top + rect.height/2;
      return {x: x, y: y};
    });
    // Build a curved zig-zag path
    var d = '';
    for (var i = 0; i < points.length; i++) {
      if (i === 0) {
        d += 'M' + points[i].x + ',' + points[i].y;
      } else {
        // Use cubic Bezier for curve between points
        var prev = points[i-1];
        var midX = (prev.x + points[i].x)/2;
        var midY = (prev.y + points[i].y)/2 + ((i%2===0)?-40:40);
        d += ' Q' + midX + ',' + midY + ' ' + points[i].x + ',' + points[i].y;
      }
    }
    path.setAttribute('d', d);
    // Store points for car animation
    car._roadPoints = points;
  }
  window.addEventListener('resize', updateRoad);
  setTimeout(updateRoad, 100);
  // Animation logic
  var current = 0;
  function activateStep(idx) {
    steps.forEach(function(step, i) {
      step.classList.toggle('active', i === idx);
    });
    // Move the car to the edge of the active step
    var points = car._roadPoints || [];
    if (points.length === steps.length) {
      var pt = points[idx];
      car.style.left = pt.x - 24 + 'px';
      car.style.top = pt.y - 24 + 'px';
    }
  }
  activateStep(current);
  setInterval(function() {
    current = (current + 1) % steps.length;
    activateStep(current);
  }, 20000);
});
// ===== PORTFOLIO HOMEPAGE JAVASCRIPT =====
document.addEventListener("DOMContentLoaded", () => {
  // Preloader
  setTimeout(() => {
    const preloader = document.getElementById("preloader")
    if (preloader) {
      preloader.style.opacity = "0"
      preloader.style.transition = "opacity 0.5s ease"
      setTimeout(() => {
        preloader.style.display = "none"
      }, 500)
    }
  }, 1500)

  // Mobile Menu Toggle
  const mobileMenu = document.getElementById("mobile-menu")
  const navMenu = document.querySelector(".nav-menu")

  if (mobileMenu) {
    mobileMenu.addEventListener("click", function () {
      this.classList.toggle("active")
      navMenu.classList.toggle("active")
    })
  }

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        // Close mobile menu if open
        if (mobileMenu && mobileMenu.classList.contains("active")) {
          mobileMenu.classList.remove("active")
          navMenu.classList.remove("active")
        }

        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })

  // Enhanced Sticky Header with Transparency
  const header = document.getElementById("header")
  const scrollThreshold = 50

  function toggleStickyHeader() {
    if (window.scrollY > scrollThreshold) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  }

  window.addEventListener("scroll", toggleStickyHeader)
  toggleStickyHeader()

  // Back to Top Button
  const backToTop = document.querySelector(".back-to-top")

  function toggleBackToTop() {
    if (window.scrollY > 500) {
      backToTop.classList.add("active")
    } else {
      backToTop.classList.remove("active")
    }
  }

  // ===== HERO ANIMATIONS =====
  function initHeroAnimations() {
    const heroContent = document.querySelector(".hero-content")
    const heroVisual = document.querySelector(".hero-visual")
    const floatingCards = document.querySelectorAll(".floating-card")

    // Stagger animation for floating cards
    floatingCards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.5}s`
    })

    // Add intersection observer for hero section
    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    if (heroContent) heroObserver.observe(heroContent)
    if (heroVisual) heroObserver.observe(heroVisual)
  }

  // ===== SCROLL ANIMATIONS =====
  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
      ".service-card, .case-study-card, .simple-testimonial, .value-point",
    )

    const scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = "1"
              entry.target.style.transform = "translateY(0)"
            }, index * 100)
            scrollObserver.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "-50px",
      },
    )

    animatedElements.forEach((element) => {
      element.style.opacity = "0"
      element.style.transform = "translateY(30px)"
      element.style.transition = "opacity 0.6s ease, transform 0.6s ease"
      scrollObserver.observe(element)
    })
  }

  // ===== STATS COUNTER ANIMATION =====
  function initStatsCounter() {
    const statNumbers = document.querySelectorAll(".stat-number")

    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target
            const finalValue = target.textContent
            const isPercentage = finalValue.includes("%")
            const isTime = finalValue.includes("h")
            const numericValue = Number.parseInt(finalValue.replace(/[^\d]/g, ""))

            animateCounter(target, 0, numericValue, 2000, isPercentage, isTime)
            statsObserver.unobserve(target)
          }
        })
      },
      { threshold: 0.5 },
    )

    statNumbers.forEach((stat) => {
      statsObserver.observe(stat)
    })
  }

  function animateCounter(element, start, end, duration, isPercentage = false, isTime = false) {
    const startTime = performance.now()

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const current = Math.floor(start + (end - start) * easeOutQuart(progress))

      let displayValue = current.toString()
      if (isPercentage) displayValue += "%"
      if (isTime) displayValue += "h"

      element.textContent = displayValue

      if (progress < 1) {
        requestAnimationFrame(updateCounter)
      }
    }

    requestAnimationFrame(updateCounter)
  }

  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4)
  }

  // ===== CONTACT FORM HANDLING =====
  function initContactForm() {
    const contactForm = document.getElementById("contactForm")

    if (contactForm) {
      contactForm.addEventListener("submit", handleFormSubmit)
    }
  }

  async function handleFormSubmit(e) {
    e.preventDefault()

    const form = e.target
    const submitBtn = form.querySelector(".submit-btn")
    const originalBtnText = submitBtn.innerHTML

    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
    submitBtn.disabled = true

    try {
      // Simulate form submission (replace with actual endpoint)
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Show success message
      showNotification("Message sent successfully! We'll get back to you soon.", "success")
      form.reset()
    } catch (error) {
      console.error("Form submission error:", error)
      showNotification("Sorry, there was an error sending your message. Please try again.", "error")
    } finally {
      // Reset button
      submitBtn.innerHTML = originalBtnText
      submitBtn.disabled = false
    }
  }

  // ===== NOTIFICATION SYSTEM =====
  function showNotification(message, type = "info") {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll(".notification")
    existingNotifications.forEach((notification) => notification.remove())

    // Create notification element
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === "success" ? "fa-check-circle" : type === "error" ? "fa-exclamation-circle" : "fa-info-circle"}"></i>
                <span>${message}</span>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `

    // Add styles
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#3b82f6"};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
        `

    notification.querySelector(".notification-content").style.cssText = `
            display: flex;
            align-items: center;
            gap: 1rem;
        `

    notification.querySelector(".notification-close").style.cssText = `
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 0;
            margin-left: auto;
        `

    // Add to DOM
    document.body.appendChild(notification)

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)"
    }, 100)

    // Auto remove after 5 seconds
    setTimeout(() => {
      removeNotification(notification)
    }, 5000)

    // Close button functionality
    notification.querySelector(".notification-close").addEventListener("click", () => {
      removeNotification(notification)
    })
  }

  function removeNotification(notification) {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 300)
  }

  // ===== SMOOTH SCROLLING FOR ALL ANCHOR LINKS =====
  function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const targetId = this.getAttribute("href")
        const targetElement = document.querySelector(targetId)

        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 80
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          })
        }
      })
    })
  }

  // ===== PERFORMANCE OPTIMIZATIONS =====
  function initPerformanceOptimizations() {
    // Lazy load images
    const images = document.querySelectorAll("img[data-src]")
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          img.removeAttribute("data-src")
          imageObserver.unobserve(img)
        }
      })
    })

    images.forEach((img) => imageObserver.observe(img))

    // Debounce scroll events
    let scrollTimeout
    window.addEventListener("scroll", () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
      scrollTimeout = setTimeout(handleNavbarScroll, 10)
    })
  }

  // ===== ACCESSIBILITY ENHANCEMENTS =====
  function initAccessibility() {
    // Add keyboard navigation for mobile menu
    hamburger.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        toggleMobileMenu()
      }
    })

    // Add focus management for mobile menu
    navMenu.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeMobileMenu()
        hamburger.focus()
      }
    })

    // Add skip to content link
    const skipLink = document.createElement("a")
    skipLink.href = "#main-content"
    skipLink.textContent = "Skip to main content"
    skipLink.className = "skip-link"
    skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--primary-color);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 10001;
            transition: top 0.3s;
        `

    skipLink.addEventListener("focus", () => {
      skipLink.style.top = "6px"
    })

    skipLink.addEventListener("blur", () => {
      skipLink.style.top = "-40px"
    })

    document.body.insertBefore(skipLink, document.body.firstChild)
  }

  // ===== INITIALIZE ALL FUNCTIONALITY =====
  function init() {
    initHeroAnimations()
    initScrollAnimations()
    initStatsCounter()
    initContactForm()
    initSmoothScrolling()
    initPerformanceOptimizations()
    initAccessibility()

    // Initialize AOS if available
    const AOS = window.AOS // Declare AOS variable
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 800,
        easing: "ease-out-cubic",
        once: true,
        offset: 100,
      })
    }

    console.log("Afa-Virtuals Portfolio initialized successfully!")
  }

  // Start initialization
  init()

  // ===== UTILITY FUNCTIONS =====
  function debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  function throttle(func, limit) {
    let inThrottle
    return function () {
      const args = arguments
      
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  }

  // ===== EXPORT FOR TESTING =====
  window.PortfolioApp = {
    init,
    showNotification,
    toggleMobileMenu,
    closeMobileMenu,
  }
})

// ===== SERVICE WORKER REGISTRATION (OPTIONAL) =====
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}
