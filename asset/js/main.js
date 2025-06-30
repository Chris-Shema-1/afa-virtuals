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

  window.addEventListener("scroll", toggleBackToTop)
  toggleBackToTop()

  // Enhanced FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")

    question.addEventListener("click", () => {
      // Close all other items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active")
        }
      })

      // Toggle current item
      item.classList.toggle("active")
    })
  })

  // Enhanced Testimonial Carousel
  const testimonialItems = document.querySelectorAll(".testimonial-item")
  const testimonialDots = document.querySelectorAll(".testimonial-dots .dot")
  const prevButton = document.getElementById("prev-testimonial")
  const nextButton = document.getElementById("next-testimonial")
  let currentTestimonial = 0

  function showTestimonial(index) {
    testimonialItems.forEach((item, i) => {
      item.classList.remove("active")
      if (i === index) {
        item.classList.add("active")
      }
    })

    testimonialDots.forEach((dot, i) => {
      dot.classList.remove("active")
      if (i === index) {
        dot.classList.add("active")
      }
    })

    currentTestimonial = index
  }

  // Next testimonial
  if (nextButton) {
    nextButton.addEventListener("click", () => {
      currentTestimonial = (currentTestimonial + 1) % testimonialItems.length
      showTestimonial(currentTestimonial)
    })
  }

  // Previous testimonial
  if (prevButton) {
    prevButton.addEventListener("click", () => {
      currentTestimonial = (currentTestimonial - 1 + testimonialItems.length) % testimonialItems.length
      showTestimonial(currentTestimonial)
    })
  }

  // Dot navigation
  testimonialDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showTestimonial(index)
    })
  })

  // Auto-rotate testimonials
  let testimonialInterval = setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonialItems.length
    showTestimonial(currentTestimonial)
  }, 5000)

  // Pause auto-rotation on hover
  const testimonialWrapper = document.querySelector(".testimonial-wrapper")
  if (testimonialWrapper) {
    testimonialWrapper.addEventListener("mouseenter", () => {
      clearInterval(testimonialInterval)
    })
    testimonialWrapper.addEventListener("mouseleave", () => {
      testimonialInterval = setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialItems.length
        showTestimonial(currentTestimonial)
      }, 5000)
    })
  }

  // Enhanced Team Section Horizontal Scroll
  const teamGrid = document.querySelector(".team-grid")
  const teamPrevBtn = document.getElementById("team-prev")
  const teamNextBtn = document.getElementById("team-next")
  let teamScrollPosition = 0

  if (teamPrevBtn && teamNextBtn && teamGrid) {
    const scrollAmount = 350 // Width of one team member card + gap

    teamNextBtn.addEventListener("click", () => {
      const maxScroll = teamGrid.scrollWidth - teamGrid.clientWidth
      teamScrollPosition = Math.min(teamScrollPosition + scrollAmount, maxScroll)
      teamGrid.style.transform = `translateX(-${teamScrollPosition}px)`
    })

    teamPrevBtn.addEventListener("click", () => {
      teamScrollPosition = Math.max(teamScrollPosition - scrollAmount, 0)
      teamGrid.style.transform = `translateX(-${teamScrollPosition}px)`
    })
  }

  // Enhanced Team Section with Portfolio Links
  const teamMembers = document.querySelectorAll(".team-member")

  teamMembers.forEach((member) => {
    // Add click handler for entire card
    member.addEventListener("click", (e) => {
      // Don't trigger if clicking on portfolio button directly
      if (!e.target.closest(".portfolio-btn") && !e.target.closest(".read-more-btn")) {
        const memberData = member.getAttribute("data-member")
        const portfolioUrl = `https://portfolio.afavirtuals.com/team/${memberData}`
        window.open(portfolioUrl, "_blank")
      }
    })

    // Enhanced hover effects
    member.addEventListener("mouseenter", () => {
      member.style.transform = "translateY(-10px) scale(1.02)"
    })

    member.addEventListener("mouseleave", () => {
      member.style.transform = "translateY(0) scale(1)"
    })
  })

  // Add click tracking for analytics (optional)
  document.querySelectorAll(".portfolio-btn, .read-more-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const memberName = e.target.closest(".team-member").querySelector("h3").textContent
      console.log(`Portfolio link clicked for: ${memberName}`)
      // Add your analytics tracking here if needed
    })
  })

  // Enhanced Service Cards Hover Effects
  const serviceCategories = document.querySelectorAll(".service-category")

  serviceCategories.forEach((category) => {
    category.addEventListener("mouseenter", () => {
      category.style.transform = "translateY(-8px) scale(1.02)"
    })

    category.addEventListener("mouseleave", () => {
      category.style.transform = "translateY(0) scale(1)"
    })
  })

  // Enhanced Intersection Observer for Scroll Animations
  const observerOptions = {
    root: null,
    rootMargin: "-50px",
    threshold: 0.1,
  }

  const handleIntersection = (entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          if (index % 2 === 0) {
            entry.target.classList.add("slide-in-left")
          } else {
            entry.target.classList.add("slide-in-right")
          }
          observer.unobserve(entry.target)
        }, index * 100)
      }
    })
  }

  const observer = new IntersectionObserver(handleIntersection, observerOptions)

  // Observe elements for staggered animations
  document
    .querySelectorAll(".service-category, .team-member, .testimonial-content, .faq-item, .feature")
    .forEach((el) => {
      observer.observe(el)
    })

  // Form Submission Enhancement
  const contactForm = document.getElementById("contact-form")
  const formStatus = document.getElementById("form-status")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Show loading state
      const submitButton = contactForm.querySelector('button[type="submit"]')
      const originalText = submitButton.innerHTML
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
      submitButton.disabled = true

      // Simulate form submission (replace with actual form handling)
      setTimeout(() => {
        // Show success message
        if (formStatus) {
          formStatus.innerHTML =
            '<div style="color: #38b2ac; padding: 1rem; background: rgba(56, 178, 172, 0.1); border-radius: 8px; margin: 1rem 0;"><i class="fas fa-check-circle"></i> Thank you for your message! We will get back to you soon.</div>'
        }

        // Reset form
        contactForm.reset()

        // Reset button
        submitButton.innerHTML = originalText
        submitButton.disabled = false

        // Hide success message after 5 seconds
        setTimeout(() => {
          if (formStatus) {
            formStatus.innerHTML = ""
          }
        }, 5000)
      }, 2000)
    })
  }

  // Enhanced Scroll Effects
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const parallaxElements = document.querySelectorAll(".hero-particles .particle")

    parallaxElements.forEach((element, index) => {
      const speed = 0.5 + index * 0.1
      element.style.transform = `translateY(${scrolled * speed}px)`
    })
  })

  // Add loading states for images
  const images = document.querySelectorAll("img")
  images.forEach((img) => {
    img.addEventListener("load", () => {
      img.style.opacity = "1"
    })

    img.addEventListener("error", () => {
      img.style.opacity = "0.5"
    })
  })

  // Initialize all animations and interactions
  console.log("Afa-Virtuals website loaded successfully!")
})

// Additional utility functions
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

// Smooth scroll performance optimization
const smoothScrollLinks = document.querySelectorAll('a[href^="#"]')
smoothScrollLinks.forEach((link) => {
  link.addEventListener(
    "click",
    debounce((e) => {
      e.preventDefault()
      const target = document.querySelector(link.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    }, 100),
  )
})
