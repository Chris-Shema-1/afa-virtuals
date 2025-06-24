// Blog functionality
document.addEventListener("DOMContentLoaded", () => {
  // Search functionality
  const searchInput = document.querySelector(".search-input")
  const searchBtn = document.querySelector(".search-btn")

  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      const searchTerm = searchInput.value.trim()
      if (searchTerm) {
        // Implement search functionality
        console.log("Searching for:", searchTerm)
        // This would typically make an API call or filter articles
      }
    })
  }

  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const searchTerm = searchInput.value.trim()
        if (searchTerm) {
          console.log("Searching for:", searchTerm)
        }
      }
    })
  }

  // Category filter functionality
  const categoryCards = document.querySelectorAll(".category-card")
  categoryCards.forEach((card) => {
    card.addEventListener("click", () => {
      const category = card.getAttribute("data-category")
      console.log("Filtering by category:", category)
      // Implement category filtering
    })
  })

  // Load more articles functionality
  const loadMoreBtn = document.querySelector(".load-more-btn")
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      // Implement load more functionality
      console.log("Loading more articles...")
      // This would typically make an API call to fetch more articles
    })
  }

  // Newsletter signup
  const newsletterForm = document.querySelector(".signup-form")
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const email = newsletterForm.querySelector('input[type="email"]').value
      if (email) {
        console.log("Newsletter signup:", email)
        // Implement newsletter signup
        alert("Thank you for subscribing!")
      }
    })
  }

  // Mobile menu toggle
  const mobileMenu = document.getElementById("mobile-menu")
  const navMenu = document.querySelector(".nav-menu")

  if (mobileMenu) {
    mobileMenu.addEventListener("click", () => {
      navMenu.classList.toggle("active")
    })
  }

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
    })
  })

  // Header scroll effect
  window.addEventListener("scroll", () => {
    const header = document.getElementById("header")
    if (window.scrollY > 100) {
      header.style.background = "rgba(255, 255, 255, 0.98)"
      header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
    } else {
      header.style.background = "rgba(255, 255, 255, 0.95)"
      header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.05)"
    }
  })

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

  // Article engagement tracking
  const articleCards = document.querySelectorAll(".article-card")
  articleCards.forEach((card) => {
    card.addEventListener("click", () => {
      // Track article clicks
      console.log("Article clicked")
    })
  })
})
