// Legal page functionality
document.addEventListener("DOMContentLoaded", () => {
  // Tab functionality
  const tabBtns = document.querySelectorAll(".tab-btn")
  const tabContents = document.querySelectorAll(".tab-content")

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetTab = btn.getAttribute("data-tab")

      // Remove active class from all tabs and contents
      tabBtns.forEach((b) => b.classList.remove("active"))
      tabContents.forEach((c) => c.classList.remove("active"))

      // Add active class to clicked tab and corresponding content
      btn.classList.add("active")
      document.getElementById(targetTab).classList.add("active")

      // Update URL hash
      window.history.pushState(null, null, `#${targetTab}`)
    })
  })

  // Handle URL hash on page load
  const hash = window.location.hash.substring(1)
  if (hash && document.getElementById(hash)) {
    tabBtns.forEach((b) => b.classList.remove("active"))
    tabContents.forEach((c) => c.classList.remove("active"))

    document.querySelector(`[data-tab="${hash}"]`).classList.add("active")
    document.getElementById(hash).classList.add("active")
  }

  // Mobile menu functionality
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const navMenu = document.querySelector(".nav-menu")
  const menuIcon = document.getElementById("menuIcon")

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      navMenu.classList.toggle("active")

      if (navMenu.classList.contains("active")) {
        menuIcon.classList.remove("fa-bars")
        menuIcon.classList.add("fa-times")
      } else {
        menuIcon.classList.remove("fa-times")
        menuIcon.classList.add("fa-bars")
      }
    })
  }

  // Cookie management
  initializeCookies()

  // Help popup functionality
  initializeHelpPopup()

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
})

// Cookie Management Functions
function initializeCookies() {
  // Check if user has already made cookie choices
  const cookieConsent = getCookie("cookieConsent")
  const analyticsConsent = getCookie("analyticsConsent")
  const marketingConsent = getCookie("marketingConsent")

  if (!cookieConsent) {
    // Show cookie banner after 2 seconds
    setTimeout(() => {
      showCookieBanner()
    }, 2000)
  } else {
    // Set toggle states based on saved preferences
    const analyticsToggle = document.getElementById("analytics-cookies")
    const marketingToggle = document.getElementById("marketing-cookies")

    if (analyticsToggle) analyticsToggle.checked = analyticsConsent === "true"
    if (marketingToggle) marketingToggle.checked = marketingConsent === "true"
  }
}

function showCookieBanner() {
  const banner = document.getElementById("cookieBanner")
  if (banner) {
    banner.classList.add("show")
  }
}

function hideCookieBanner() {
  const banner = document.getElementById("cookieBanner")
  if (banner) {
    banner.classList.remove("show")
  }
}

function acceptAllCookies() {
  setCookie("cookieConsent", "true", 365)
  setCookie("analyticsConsent", "true", 365)
  setCookie("marketingConsent", "true", 365)

  // Update toggles
  const analyticsToggle = document.getElementById("analytics-cookies")
  const marketingToggle = document.getElementById("marketing-cookies")

  if (analyticsToggle) analyticsToggle.checked = true
  if (marketingToggle) marketingToggle.checked = true

  hideCookieBanner()
  showNotification("Cookie preferences saved successfully!", "success")

  // Initialize analytics and marketing scripts
  initializeAnalytics()
  initializeMarketing()
}

function showCookieSettings() {
  hideCookieBanner()
  // Switch to cookies tab
  const cookiesTab = document.querySelector('[data-tab="cookies"]')
  if (cookiesTab) {
    cookiesTab.click()
  }
  // Scroll to cookies section
  setTimeout(() => {
    document.getElementById("cookies").scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }, 100)
}

function saveCookiePreferences() {
  const analyticsToggle = document.getElementById("analytics-cookies")
  const marketingToggle = document.getElementById("marketing-cookies")

  const analyticsConsent = analyticsToggle ? analyticsToggle.checked : false
  const marketingConsent = marketingToggle ? marketingToggle.checked : false

  setCookie("cookieConsent", "true", 365)
  setCookie("analyticsConsent", analyticsConsent.toString(), 365)
  setCookie("marketingConsent", marketingConsent.toString(), 365)

  hideCookieBanner()
  showNotification("Cookie preferences saved successfully!", "success")

  // Initialize or remove scripts based on consent
  if (analyticsConsent) {
    initializeAnalytics()
  } else {
    removeAnalytics()
  }

  if (marketingConsent) {
    initializeMarketing()
  } else {
    removeMarketing()
  }
}

function clearAllCookies() {
  // Get all cookies
  const cookies = document.cookie.split(";")

  // Clear each cookie
  cookies.forEach((cookie) => {
    const eqPos = cookie.indexOf("=")
    const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim()
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
  })

  // Reset toggles
  const analyticsToggle = document.getElementById("analytics-cookies")
  const marketingToggle = document.getElementById("marketing-cookies")

  if (analyticsToggle) analyticsToggle.checked = false
  if (marketingToggle) marketingToggle.checked = false

  showNotification("All cookies cleared successfully!", "success")

  // Remove analytics and marketing scripts
  removeAnalytics()
  removeMarketing()

  // Show cookie banner again
  setTimeout(() => {
    showCookieBanner()
  }, 1000)
}

// Cookie utility functions
function setCookie(name, value, days) {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
}

function getCookie(name) {
  const nameEQ = name + "="
  const ca = document.cookie.split(";")
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === " ") c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

// Analytics and Marketing Functions
function initializeAnalytics() {
  // Google Analytics initialization
  window.dataLayer = window.dataLayer || []
  function gtag() {
    window.dataLayer.push(arguments)
  }
  if (typeof window.gtag === "undefined") {
    const script = document.createElement("script")
    script.async = true
    script.src = "https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
    document.head.appendChild(script)

    script.onload = () => {
      window.gtag("js", new Date())
      window.gtag("config", "GA_MEASUREMENT_ID")
    }
  }
  console.log("Analytics initialized")
}

function removeAnalytics() {
  // Remove Google Analytics
  const scripts = document.querySelectorAll('script[src*="googletagmanager"]')
  scripts.forEach((script) => script.remove())

  // Clear dataLayer
  if (window.dataLayer) {
    window.dataLayer = []
  }
  console.log("Analytics removed")
}

function initializeMarketing() {
  // Initialize marketing pixels/scripts
  console.log("Marketing scripts initialized")
}

function removeMarketing() {
  // Remove marketing scripts
  console.log("Marketing scripts removed")
}

// Help Popup Functions
function initializeHelpPopup() {
  // Show help popup after 30 seconds if user hasn't interacted much
  let interactionCount = 0

  document.addEventListener("click", () => {
    interactionCount++
  })

  document.addEventListener("scroll", () => {
    interactionCount++
  })

  setTimeout(() => {
    if (interactionCount < 5 && !getCookie("helpPopupShown")) {
      showHelpPopup()
      setCookie("helpPopupShown", "true", 1) // Show once per day
    }
  }, 30000)
}

function showHelpPopup() {
  const popup = document.getElementById("helpPopup")
  if (popup) {
    popup.classList.add("show")
    document.body.style.overflow = "hidden"
  }
}

function closeHelpPopup() {
  const popup = document.getElementById("helpPopup")
  if (popup) {
    popup.classList.remove("show")
    document.body.style.overflow = ""
  }
}

// Notification function
function showNotification(message, type = "success") {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <i class="fas fa-${type === "success" ? "check-circle" : "exclamation-circle"}"></i>
            <span>${message}</span>
        </div>
    `
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "#28a745" : "#dc3545"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        z-index: 10002;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        max-width: 300px;
    `

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.opacity = "1"
    notification.style.transform = "translateX(0)"
  }, 100)

  setTimeout(() => {
    notification.style.opacity = "0"
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification)
      }
    }, 300)
  }, 4000)
}

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  // ESC to close help popup
  if (e.key === "Escape") {
    closeHelpPopup()
  }

  // Ctrl/Cmd + K to open help
  if ((e.ctrlKey || e.metaKey) && e.key === "k") {
    e.preventDefault()
    showHelpPopup()
  }
})

// Performance optimization
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

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
  const header = document.querySelector(".header")
  if (window.scrollY > 50) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }
}, 10)

window.addEventListener("scroll", optimizedScrollHandler)
