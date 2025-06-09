// Authentication JavaScript

// Demo credentials
const DEMO_CREDENTIALS = {
  email: "admin@afavirtuals.com",
  password: "admin123",
}

// Initialize authentication
document.addEventListener("DOMContentLoaded", () => {
  initializeAuth()
  checkAuthStatus()
})

function initializeAuth() {
  const loginForm = document.getElementById("login-form")
  const forgotPasswordForm = document.getElementById("forgot-password-form")

  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin)
  }

  if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener("submit", handleForgotPassword)
  }

  // Check for saved credentials
  const savedEmail = localStorage.getItem("remembered-email")
  const rememberMe = localStorage.getItem("remember-me") === "true"

  if (savedEmail && rememberMe) {
    document.getElementById("email").value = savedEmail
    document.getElementById("remember-me").checked = true
  }
}

function checkAuthStatus() {
  const isAuthenticated = localStorage.getItem("admin-authenticated") === "true"
  const currentPage = window.location.pathname

  // If on login page and already authenticated, redirect to dashboard
  if (currentPage.includes("login.html") && isAuthenticated) {
    window.location.href = "admin-index.html"
  }

  // If on dashboard and not authenticated, redirect to login
  if (currentPage.includes("admin-index.html") && !isAuthenticated) {
    window.location.href = "login.html"
  }
}

async function handleLogin(e) {
  e.preventDefault()

  const email = document.getElementById("email").value
  const password = document.getElementById("password").value
  const rememberMe = document.getElementById("remember-me").checked

  // Show loading state
  setLoadingState(true)

  try {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Validate credentials
    if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
      // Successful login
      localStorage.setItem("admin-authenticated", "true")
      localStorage.setItem(
        "admin-user",
        JSON.stringify({
          email: email,
          name: "Admin User",
          loginTime: new Date().toISOString(),
        }),
      )

      // Handle remember me
      if (rememberMe) {
        localStorage.setItem("remembered-email", email)
        localStorage.setItem("remember-me", "true")
      } else {
        localStorage.removeItem("remembered-email")
        localStorage.removeItem("remember-me")
      }

      showMessage("Login successful! Redirecting...", "success")

      // Redirect to dashboard after short delay
      setTimeout(() => {
        window.location.href = "admin-index.html"
      }, 1000)
    } else {
      throw new Error("Invalid email or password")
    }
  } catch (error) {
    showMessage(error.message, "error")
    setLoadingState(false)
  }
}

async function handleForgotPassword(e) {
  e.preventDefault()

  const email = document.getElementById("reset-email").value

  // Show loading state
  setLoadingState(true)

  try {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    showMessage("Password reset link sent to your email!", "success")

    // Go back to login form after delay
    setTimeout(() => {
      showLoginForm()
      setLoadingState(false)
    }, 2000)
  } catch (error) {
    showMessage("Error sending reset link. Please try again.", "error")
    setLoadingState(false)
  }
}

function setLoadingState(loading) {
  const loginBtn = document.getElementById("login-btn")
  const btnText = loginBtn.querySelector(".btn-text")
  const btnLoader = loginBtn.querySelector(".btn-loader")

  if (loading) {
    loginBtn.classList.add("loading")
    loginBtn.disabled = true
    btnText.style.opacity = "0"
    btnLoader.style.display = "block"
  } else {
    loginBtn.classList.remove("loading")
    loginBtn.disabled = false
    btnText.style.opacity = "1"
    btnLoader.style.display = "none"
  }
}

function togglePassword() {
  const passwordInput = document.getElementById("password")
  const passwordEye = document.getElementById("password-eye")

  if (passwordInput.type === "password") {
    passwordInput.type = "text"
    passwordEye.classList.remove("fa-eye")
    passwordEye.classList.add("fa-eye-slash")
  } else {
    passwordInput.type = "password"
    passwordEye.classList.remove("fa-eye-slash")
    passwordEye.classList.add("fa-eye")
  }
}

function fillDemoCredentials() {
  document.getElementById("email").value = DEMO_CREDENTIALS.email
  document.getElementById("password").value = DEMO_CREDENTIALS.password

  // Add visual feedback
  const demoBtn = document.querySelector(".demo-btn")
  const originalText = demoBtn.innerHTML

  demoBtn.innerHTML = '<i class="fas fa-check"></i> Credentials Filled!'
  demoBtn.style.background = "var(--success-color)"

  setTimeout(() => {
    demoBtn.innerHTML = originalText
    demoBtn.style.background = "var(--info-color)"
  }, 2000)
}

function showForgotPassword() {
  document.getElementById("login-form").style.display = "none"
  document.getElementById("forgot-password-form").style.display = "block"

  // Update header
  document.querySelector(".auth-header h1").textContent = "Reset Password"
  document.querySelector(".auth-header p").textContent = "Enter your email to receive a reset link"
}

function showLoginForm() {
  document.getElementById("login-form").style.display = "block"
  document.getElementById("forgot-password-form").style.display = "none"

  // Reset header
  document.querySelector(".auth-header h1").textContent = "Admin Dashboard"
  document.querySelector(".auth-header p").textContent = "Sign in to manage your virtual assistant business"
}

function showMessage(message, type = "info") {
  const container = document.getElementById("auth-message-container")
  const messageDiv = document.createElement("div")
  messageDiv.className = `message ${type}`
  messageDiv.textContent = message

  container.appendChild(messageDiv)

  // Auto remove after 5 seconds
  setTimeout(() => {
    messageDiv.remove()
  }, 5000)
}

// Logout function (to be called from dashboard)
function logout() {
  localStorage.removeItem("admin-authenticated")
  localStorage.removeItem("admin-user")
  showMessage("Logged out successfully", "info")
  window.location.href = "login.html"
}

// Session timeout (30 minutes)
function startSessionTimeout() {
  const TIMEOUT_DURATION = 30 * 60 * 1000 // 30 minutes

  let timeoutId = setTimeout(() => {
    showMessage("Session expired. Please login again.", "info")
    logout()
  }, TIMEOUT_DURATION)

  // Reset timeout on user activity
  ;["mousedown", "mousemove", "keypress", "scroll", "touchstart"].forEach((event) => {
    document.addEventListener(
      event,
      () => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          showMessage("Session expired. Please login again.", "info")
          logout()
        }, TIMEOUT_DURATION)
      },
      true,
    )
  })
}

// Start session timeout if authenticated
if (localStorage.getItem("admin-authenticated") === "true") {
  startSessionTimeout()
}

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  // Enter key on demo button
  if (e.key === "Enter" && e.target.classList.contains("demo-btn")) {
    fillDemoCredentials()
  }

  // Escape key to close forms
  if (e.key === "Escape") {
    if (document.getElementById("forgot-password-form").style.display === "block") {
      showLoginForm()
    }
  }
})

// Form validation
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function validatePassword(password) {
  return password.length >= 6
}

// Real-time validation
document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("email")
  const passwordInput = document.getElementById("password")

  if (emailInput) {
    emailInput.addEventListener("blur", () => {
      if (emailInput.value && !validateEmail(emailInput.value)) {
        emailInput.style.borderColor = "var(--error-color)"
        showMessage("Please enter a valid email address", "error")
      } else {
        emailInput.style.borderColor = "#e5e7eb"
      }
    })
  }

  if (passwordInput) {
    passwordInput.addEventListener("blur", () => {
      if (passwordInput.value && !validatePassword(passwordInput.value)) {
        passwordInput.style.borderColor = "var(--error-color)"
        showMessage("Password must be at least 6 characters", "error")
      } else {
        passwordInput.style.borderColor = "#e5e7eb"
      }
    })
  }
})
