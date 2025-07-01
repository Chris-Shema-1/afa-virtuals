// Services Redesigned JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // Tab functionality for tools section
  const tabButtons = document.querySelectorAll(".tab-btn")
  const tabContents = document.querySelectorAll(".tab-content")

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetTab = button.getAttribute("data-tab")

      // Remove active class from all buttons and contents
      tabButtons.forEach((btn) => btn.classList.remove("active"))
      tabContents.forEach((content) => content.classList.remove("active"))

      // Add active class to clicked button and corresponding content
      button.classList.add("active")
      document.getElementById(targetTab).classList.add("active")
    })
  })

  // Pricing toggle functionality
  const pricingToggle = document.getElementById("pricing-toggle")
  const priceAmounts = document.querySelectorAll(".amount")

  if (pricingToggle) {
    pricingToggle.addEventListener("change", function () {
      const isYearly = this.checked

      priceAmounts.forEach((amount) => {
        const monthlyPrice = amount.getAttribute("data-monthly")
        const yearlyPrice = amount.getAttribute("data-yearly")

        if (isYearly) {
          amount.textContent = yearlyPrice
        } else {
          amount.textContent = monthlyPrice
        }
      })
    })
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Add scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animateElements = document.querySelectorAll(".service-card-modern, .tool-card-modern, .package-modern")
  animateElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })

  // Mobile menu functionality (if needed)
  const mobileMenu = document.getElementById("mobile-menu")
  const navMenu = document.querySelector(".nav-menu")

  if (mobileMenu && navMenu) {
    mobileMenu.addEventListener("click", () => {
      mobileMenu.classList.toggle("active")
      navMenu.classList.toggle("active")
    })
  }
})
