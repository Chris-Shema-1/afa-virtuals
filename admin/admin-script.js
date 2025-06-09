// Admin Dashboard JavaScript with Authentication

// Sample data for demonstration
let contactSubmissions = [
  {
    id: 1,
    date: "2025-01-09",
    name: "John Smith",
    email: "john@example.com",
    phone: "+1234567890",
    service: "Administrative Support",
    message: "I need help with email management and calendar scheduling.",
    status: "new",
  },
  {
    id: 2,
    date: "2025-01-08",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1987654321",
    service: "Web Design",
    message: "Looking for a professional website for my business.",
    status: "read",
  },
]

let newsletterSubscribers = [
  {
    id: 1,
    email: "subscriber1@example.com",
    date: "2025-01-09",
    source: "Website Newsletter Form",
    status: "active",
  },
  {
    id: 2,
    email: "subscriber2@example.com",
    date: "2025-01-08",
    source: "Blog Page",
    status: "active",
  },
]

let blogPosts = [
  {
    id: 1,
    title: "Delegate to Elevate: Why Letting Go is the Smartest Growth Strategy",
    author: "Afanyu Emmanuel",
    category: "Business Growth",
    date: "2025-01-09",
    excerpt:
      "Think you need to do it all to succeed? Think again. Discover how delegating the right tasks can help you scale faster...",
    status: "published",
    featuredImage: "/placeholder.svg?height=200&width=300",
    additionalImages: [],
  },
  {
    id: 2,
    title: "From Burnout to Breakthrough: The Quiet Struggles of Today's Business Owners",
    author: "Binyu Gillian",
    category: "Productivity",
    date: "2025-01-08",
    excerpt:
      "Running a business often feels like a constant battle with time and stress. Many entrepreneurs quietly struggle...",
    status: "published",
    featuredImage: "/placeholder.svg?height=200&width=300",
    additionalImages: [],
  },
]

let teamMembers = [
  {
    id: 1,
    name: "Afanyu Emmanuel",
    position: "Lead VA",
    bio: "Software Engineer & Virtual Assistant. Afanyu combines technical expertise with a detail-oriented approach.",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Shema Christian",
    position: "Designer",
    bio: "Software Engineer & Graphic Designer. Christian is passionate about building digital solutions.",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Binyu Gillian",
    position: "Social Media Manager",
    bio: "Gillian brings a creative vision and strong communication skills.",
    image: "/placeholder.svg?height=80&width=80",
  },
]

// Sample portfolio data
let portfolioProjects = [
  {
    id: 1,
    title: "Website Design",
    category: "Website Design",
    image: "/placeholder.svg?height=200&width=300",
    problem:
      "The client lacked an online presence, making it difficult for potential customers to find or trust their business. There was no central place to direct leads or showcase services.",
    solution:
      "We designed a responsive, 4-page website/landing page with clear CTAs, basic SEO, and a professional look. It includes a contact/booking form and connects with email and social media.",
    order: 1,
    date: "2025-01-15",
  },
  {
    id: 2,
    title: "Social Media Setup",
    category: "Social Media Setup",
    image: "/placeholder.svg?height=200&width=300",
    problem:
      "The client either had no social media presence or had poorly optimized profiles with inconsistent branding, unclear bios, and low engagement.",
    solution:
      "We optimized all profiles, added branded visuals, wrote a professional bio, organized highlights, and scheduled a starter batch of branded posts for consistency and credibility.",
    order: 2,
    date: "2025-01-10",
  },
]

let testimonials = [
  {
    id: 1,
    name: "Jane M.",
    position: "Business Owner",
    photo: "/placeholder.svg?height=60&width=60",
    text: "Afa-Virtuals transformed our business operations. Their attention to detail and proactive approach made a huge difference!",
    order: 1,
  },
  {
    id: 2,
    name: "Delphine K.",
    position: "Startup Founder",
    photo: "/placeholder.svg?height=60&width=60",
    text: "Professional, reliable, and always delivers on time. Highly recommended for any business needing virtual support.",
    order: 2,
  },
]

// Initialize dashboard
document.addEventListener("DOMContentLoaded", () => {
  checkAuthentication()
  initializeDashboard()
  loadContactSubmissions()
  loadNewsletterSubscribers()
  loadBlogPosts()
  loadTeamMembers()
  loadPortfolioProjects()
  loadTestimonials()
  updateStats()
  setupImagePreviews()
  setupMobileMenu()

  // Load data from localStorage if available
  loadFromLocalStorage()
})

// Authentication check
function checkAuthentication() {
  const isAuthenticated = localStorage.getItem("admin-authenticated") === "true"

  if (!isAuthenticated) {
    window.location.href = "login.html"
    return
  }

  // Update user info in header
  const userData = JSON.parse(localStorage.getItem("admin-user") || "{}")
  const welcomeText = document.querySelector(".welcome-text")
  if (welcomeText && userData.name) {
    welcomeText.textContent = `Welcome, ${userData.name}`
  }
}

// Mobile menu functionality
function setupMobileMenu() {
  // Create mobile menu toggle if it doesn't exist
  let mobileToggle = document.querySelector(".mobile-menu-toggle")
  if (!mobileToggle) {
    mobileToggle = document.createElement("button")
    mobileToggle.className = "mobile-menu-toggle"
    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>'
    mobileToggle.onclick = toggleMobileMenu

    const adminNav = document.querySelector(".admin-nav")
    adminNav.insertBefore(mobileToggle, adminNav.firstChild)
  }

  // Create sidebar overlay
  let overlay = document.querySelector(".sidebar-overlay")
  if (!overlay) {
    overlay = document.createElement("div")
    overlay.className = "sidebar-overlay"
    overlay.onclick = closeMobileMenu
    document.body.appendChild(overlay)
  }

  // Close mobile menu when clicking nav links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", closeMobileMenu)
  })
}

function toggleMobileMenu() {
  const sidebar = document.querySelector(".admin-sidebar")
  const overlay = document.querySelector(".sidebar-overlay")
  const toggle = document.querySelector(".mobile-menu-toggle")

  sidebar.classList.toggle("active")
  overlay.classList.toggle("active")
  toggle.classList.toggle("active")

  // Prevent body scroll when menu is open
  document.body.style.overflow = sidebar.classList.contains("active") ? "hidden" : ""
}

function closeMobileMenu() {
  const sidebar = document.querySelector(".admin-sidebar")
  const overlay = document.querySelector(".sidebar-overlay")
  const toggle = document.querySelector(".mobile-menu-toggle")

  sidebar.classList.remove("active")
  overlay.classList.remove("active")
  toggle.classList.remove("active")
  document.body.style.overflow = ""
}

// Navigation functionality
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault()
    const section = this.getAttribute("data-section")
    showSection(section)

    // Update active nav link
    document.querySelectorAll(".nav-link").forEach((l) => l.classList.remove("active"))
    this.classList.add("active")
  })
})

function showSection(sectionId) {
  // Hide all sections
  document.querySelectorAll(".admin-section").forEach((section) => {
    section.classList.remove("active")
  })

  // Show target section
  const targetSection = document.getElementById(sectionId)
  if (targetSection) {
    targetSection.classList.add("active")
  }

  // Update nav link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("data-section") === sectionId) {
      link.classList.add("active")
    }
  })

  // Load section-specific data
  if (sectionId === "portfolio-management") {
    loadPortfolioProjects()
    loadTestimonials()
  }
}

function initializeDashboard() {
  // Set current date for blog form
  const today = new Date().toISOString().split("T")[0]
  const blogDateInput = document.getElementById("blog-date")
  if (blogDateInput) {
    blogDateInput.value = today
  }

  // Initialize blog editor
  initializeBlogEditor()

  // Initialize content management
  initializeContentManagement()

  // Initialize team management
  initializeTeamManagement()

  // Initialize portfolio management
  initializePortfolioManagement()
}

function initializePortfolioManagement() {
  // Setup form submissions
  const projectForm = document.getElementById("project-form")
  const testimonialForm = document.getElementById("testimonial-form")

  if (projectForm) {
    projectForm.addEventListener("submit", saveProject)
  }

  if (testimonialForm) {
    testimonialForm.addEventListener("submit", saveTestimonial)
  }
}

// Contact Submissions Management
function loadContactSubmissions() {
  const tableBody = document.getElementById("contact-table-body")
  if (!tableBody) return

  tableBody.innerHTML = ""

  contactSubmissions.forEach((submission) => {
    const row = document.createElement("tr")
    row.innerHTML = `
            <td>${formatDate(submission.date)}</td>
            <td>${submission.name}</td>
            <td>${submission.email}</td>
            <td>${submission.service}</td>
            <td><span class="status-badge status-${submission.status}">${submission.status}</span></td>
            <td class="table-actions">
                <button class="action-btn-sm btn-view" onclick="viewContact(${submission.id})">View</button>
                <button class="action-btn-sm btn-delete" onclick="deleteContact(${submission.id})">Delete</button>
            </td>
        `
    tableBody.appendChild(row)
  })
}

function viewContact(id) {
  const contact = contactSubmissions.find((c) => c.id === id)
  if (contact) {
    alert(
      `Contact Details:\n\nName: ${contact.name}\nEmail: ${contact.email}\nPhone: ${contact.phone}\nService: ${contact.service}\nMessage: ${contact.message}`,
    )

    // Mark as read
    contact.status = "read"
    loadContactSubmissions()
    updateStats()
    saveToLocalStorage()
  }
}

function deleteContact(id) {
  if (confirm("Are you sure you want to delete this contact submission?")) {
    contactSubmissions = contactSubmissions.filter((c) => c.id !== id)
    loadContactSubmissions()
    updateStats()
    saveToLocalStorage()
    showMessage("Contact submission deleted successfully", "success")
  }
}

function exportContacts() {
  const csv = convertToCSV(contactSubmissions)
  downloadCSV(csv, "contact-submissions.csv")
  showMessage("Contact submissions exported successfully", "success")
}

// Newsletter Subscribers Management
function loadNewsletterSubscribers() {
  const tableBody = document.getElementById("newsletter-table-body")
  if (!tableBody) return

  tableBody.innerHTML = ""

  newsletterSubscribers.forEach((subscriber) => {
    const row = document.createElement("tr")
    row.innerHTML = `
            <td>${formatDate(subscriber.date)}</td>
            <td>${subscriber.email}</td>
            <td>${subscriber.source}</td>
            <td><span class="status-badge status-${subscriber.status}">${subscriber.status}</span></td>
            <td class="table-actions">
                <button class="action-btn-sm btn-delete" onclick="deleteSubscriber(${subscriber.id})">Delete</button>
            </td>
        `
    tableBody.appendChild(row)
  })
}

function deleteSubscriber(id) {
  if (confirm("Are you sure you want to delete this subscriber?")) {
    newsletterSubscribers = newsletterSubscribers.filter((s) => s.id !== id)
    loadNewsletterSubscribers()
    updateStats()
    saveToLocalStorage()
    showMessage("Subscriber deleted successfully", "success")
  }
}

function exportSubscribers() {
  const csv = convertToCSV(newsletterSubscribers)
  downloadCSV(csv, "newsletter-subscribers.csv")
  showMessage("Newsletter subscribers exported successfully", "success")
}

// Blog Management
function initializeBlogEditor() {
  const blogForm = document.getElementById("blog-form")
  if (blogForm) {
    blogForm.addEventListener("submit", (e) => {
      e.preventDefault()
      publishBlogPost()
    })
  }

  // Setup featured image preview
  const featuredImageInput = document.getElementById("blog-featured-image")
  if (featuredImageInput) {
    featuredImageInput.addEventListener("input", function () {
      const previewContainer = document.getElementById("blog-featured-image-preview")
      if (this.value) {
        previewContainer.innerHTML = `<img src="${this.value}" alt="Preview" onerror="this.src='/placeholder.svg?height=100&width=100'; this.onerror=null;">`
      } else {
        previewContainer.innerHTML = ""
      }
    })
  }
}

function showBlogEditor() {
  document.getElementById("blog-editor").style.display = "block"
  document.getElementById("blog-list").style.display = "none"

  // Clear any existing additional image fields
  document.getElementById("blog-images-list").innerHTML = ""
}

function showBlogList() {
  document.getElementById("blog-editor").style.display = "none"
  document.getElementById("blog-list").style.display = "block"
}

function addBlogImageField() {
  const imagesList = document.getElementById("blog-images-list")
  const imageId = Date.now() // Unique ID for the image field

  const imageFieldHTML = `
    <div class="blog-image-field" id="image-field-${imageId}">
      <div class="form-row">
        <div class="form-group">
          <label>Image URL</label>
          <input type="url" class="blog-image-url" placeholder="Image URL">
        </div>
        <div class="form-group">
          <label>Image Caption</label>
          <input type="text" class="blog-image-caption" placeholder="Image caption or description">
        </div>
        <div class="form-group form-group-actions">
          <button type="button" class="btn btn-delete" onclick="removeBlogImageField('image-field-${imageId}')">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
      <div class="image-preview blog-additional-image-preview"></div>
    </div>
  `

  // Add the new image field
  const tempDiv = document.createElement("div")
  tempDiv.innerHTML = imageFieldHTML
  imagesList.appendChild(tempDiv.firstElementChild)

  // Setup image preview for this field
  const newImageField = document.getElementById(`image-field-${imageId}`)
  const imageUrlInput = newImageField.querySelector(".blog-image-url")
  const previewContainer = newImageField.querySelector(".blog-additional-image-preview")

  imageUrlInput.addEventListener("input", function () {
    if (this.value) {
      previewContainer.innerHTML = `<img src="${this.value}" alt="Preview" onerror="this.src='/placeholder.svg?height=100&width=100'; this.onerror=null;">`
    } else {
      previewContainer.innerHTML = ""
    }
  })
}

function removeBlogImageField(fieldId) {
  const field = document.getElementById(fieldId)
  if (field) {
    field.remove()
  }
}

function collectAdditionalImages() {
  const images = []
  const imageFields = document.querySelectorAll(".blog-image-field")

  imageFields.forEach((field) => {
    const url = field.querySelector(".blog-image-url").value
    const caption = field.querySelector(".blog-image-caption").value

    if (url) {
      images.push({
        url,
        caption,
      })
    }
  })

  return images
}

function publishBlogPost() {
  const form = document.getElementById("blog-form")
  const formData = new FormData(form)

  const newPost = {
    id: blogPosts.length + 1,
    title: formData.get("title"),
    author: formData.get("author"),
    category: formData.get("category"),
    date: formData.get("date"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    tags: formData.get("tags"),
    featuredImage: document.getElementById("blog-featured-image").value,
    additionalImages: collectAdditionalImages(),
    status: "published",
  }

  blogPosts.unshift(newPost)
  loadBlogPosts()
  updateStats()
  saveToLocalStorage()

  // Reset form and hide editor
  form.reset()
  document.getElementById("blog-featured-image-preview").innerHTML = ""
  document.getElementById("blog-images-list").innerHTML = ""
  document.getElementById("blog-editor").style.display = "none"
  document.getElementById("blog-list").style.display = "block"

  showMessage("Blog post published successfully!", "success")
}

function loadBlogPosts() {
  const grid = document.getElementById("blog-posts-grid")
  if (!grid) return

  grid.innerHTML = ""

  blogPosts.forEach((post) => {
    const card = document.createElement("div")
    card.className = "blog-post-card"
    card.innerHTML = `
      <div class="blog-post-image">
        ${
          post.featuredImage
            ? `<img src="${post.featuredImage}" alt="${post.title}" style="width: 100%; height: 100%; object-fit: cover;">`
            : `<i class="fas fa-image"></i><span>Blog Image</span>`
        }
      </div>
      <div class="blog-post-content">
        <div class="blog-post-meta">
          <span><i class="fas fa-user"></i> ${post.author}</span>
          <span><i class="fas fa-calendar"></i> ${formatDate(post.date)}</span>
          <span><i class="fas fa-tag"></i> ${post.category}</span>
        </div>
        <h3 class="blog-post-title">${post.title}</h3>
        <p class="blog-post-excerpt">${post.excerpt}</p>
        <div class="blog-post-actions">
          <button class="action-btn-sm btn-view" onclick="editBlogPost(${post.id})">Edit</button>
          <button class="action-btn-sm btn-delete" onclick="deleteBlogPost(${post.id})">Delete</button>
        </div>
      </div>
    `
    grid.appendChild(card)
  })
}

function editBlogPost(id) {
  const post = blogPosts.find((p) => p.id === id)
  if (post) {
    // Populate form with post data
    document.getElementById("blog-title").value = post.title
    document.getElementById("blog-author").value = post.author
    document.getElementById("blog-category").value = post.category
    document.getElementById("blog-date").value = post.date
    document.getElementById("blog-excerpt").value = post.excerpt
    document.getElementById("blog-content").value = post.content || ""
    document.getElementById("blog-tags").value = post.tags || ""
    document.getElementById("blog-featured-image").value = post.featuredImage || ""

    // Show featured image preview
    const featuredImagePreview = document.getElementById("blog-featured-image-preview")
    if (post.featuredImage) {
      featuredImagePreview.innerHTML = `<img src="${post.featuredImage}" alt="Preview">`
    } else {
      featuredImagePreview.innerHTML = ""
    }

    // Clear and populate additional images
    const imagesList = document.getElementById("blog-images-list")
    imagesList.innerHTML = ""

    if (post.additionalImages && post.additionalImages.length > 0) {
      post.additionalImages.forEach((image) => {
        const imageId = Date.now() + Math.floor(Math.random() * 1000)
        const imageFieldHTML = `
          <div class="blog-image-field" id="image-field-${imageId}">
            <div class="form-row">
              <div class="form-group">
                <label>Image URL</label>
                <input type="url" class="blog-image-url" value="${image.url}" placeholder="Image URL">
              </div>
              <div class="form-group">
                <label>Image Caption</label>
                <input type="text" class="blog-image-caption" value="${image.caption || ""}" placeholder="Image caption or description">
              </div>
              <div class="form-group form-group-actions">
                <button type="button" class="btn btn-delete" onclick="removeBlogImageField('image-field-${imageId}')">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
            <div class="image-preview blog-additional-image-preview">
              <img src="${image.url}" alt="Preview">
            </div>
          </div>
        `

        const tempDiv = document.createElement("div")
        tempDiv.innerHTML = imageFieldHTML
        imagesList.appendChild(tempDiv.firstElementChild)
      })
    }

    showBlogEditor()
  }
}

function deleteBlogPost(id) {
  if (confirm("Are you sure you want to delete this blog post?")) {
    blogPosts = blogPosts.filter((p) => p.id !== id)
    loadBlogPosts()
    updateStats()
    saveToLocalStorage()
    showMessage("Blog post deleted successfully", "success")
  }
}

function insertImage() {
  const textarea = document.getElementById("blog-content")
  const start = textarea.selectionStart
  const imageMarkdown = "\n![Image description](image-url)\n"

  textarea.value = textarea.value.substring(0, start) + imageMarkdown + textarea.value.substring(start)
  textarea.focus()
}

// Portfolio Management Functions
function showPortfolioTab(tabName) {
  // Hide all portfolio tabs
  document.querySelectorAll(".portfolio-tab").forEach((tab) => {
    tab.classList.remove("active")
  })

  // Show the selected tab
  document.getElementById(tabName + "-tab").classList.add("active")

  // Update tab buttons
  document.querySelectorAll(".portfolio-tabs .tab-btn").forEach((btn) => {
    btn.classList.remove("active")
  })
  event.target.classList.add("active")
}

// Projects Management
function loadPortfolioProjects() {
  const tableBody = document.getElementById("projects-table-body")
  if (!tableBody) return

  tableBody.innerHTML = ""

  portfolioProjects
    .sort((a, b) => a.order - b.order)
    .forEach((project) => {
      const row = document.createElement("tr")
      row.innerHTML = `
      <td><img src="${project.image}" alt="${project.title}" class="table-image"></td>
      <td>${project.title}</td>
      <td>${project.category}</td>
      <td>${formatDate(project.date)}</td>
      <td class="table-actions">
        <button class="action-btn-sm btn-view" onclick="editProject(${project.id})">Edit</button>
        <button class="action-btn-sm btn-delete" onclick="deleteProject(${project.id})">Delete</button>
      </td>
    `
      tableBody.appendChild(row)
    })
}

function showAddProjectModal() {
  document.getElementById("project-modal-title").textContent = "Add New Project"
  document.getElementById("project-id").value = ""
  document.getElementById("project-form").reset()
  document.getElementById("project-image-preview").innerHTML = ""
  document.getElementById("project-modal").style.display = "flex"
}

function closeProjectModal() {
  document.getElementById("project-modal").style.display = "none"
}

function editProject(id) {
  const project = portfolioProjects.find((p) => p.id === id)
  if (project) {
    document.getElementById("project-modal-title").textContent = "Edit Project"
    document.getElementById("project-id").value = project.id
    document.getElementById("project-title").value = project.title
    document.getElementById("project-category").value = project.category
    document.getElementById("project-image").value = project.image
    document.getElementById("project-problem").value = project.problem
    document.getElementById("project-solution").value = project.solution
    document.getElementById("project-order").value = project.order

    // Show image preview
    document.getElementById("project-image-preview").innerHTML = `
      <img src="${project.image}" alt="${project.title}">
    `

    document.getElementById("project-modal").style.display = "flex"
  }
}

function saveProject(e) {
  e.preventDefault()

  const projectId = document.getElementById("project-id").value
  const newProject = {
    id: projectId ? Number.parseInt(projectId) : Date.now(),
    title: document.getElementById("project-title").value,
    category: document.getElementById("project-category").value,
    image: document.getElementById("project-image").value,
    problem: document.getElementById("project-problem").value,
    solution: document.getElementById("project-solution").value,
    order: Number.parseInt(document.getElementById("project-order").value),
    date: new Date().toISOString().split("T")[0],
  }

  if (projectId) {
    // Update existing project
    const index = portfolioProjects.findIndex((p) => p.id === Number.parseInt(projectId))
    if (index !== -1) {
      portfolioProjects[index] = { ...portfolioProjects[index], ...newProject }
    }
  } else {
    // Add new project
    portfolioProjects.push(newProject)
  }

  saveToLocalStorage()
  loadPortfolioProjects()
  closeProjectModal()
  showMessage(projectId ? "Project updated successfully!" : "Project added successfully!", "success")
}

function deleteProject(id) {
  if (confirm("Are you sure you want to delete this project?")) {
    portfolioProjects = portfolioProjects.filter((p) => p.id !== id)
    saveToLocalStorage()
    loadPortfolioProjects()
    showMessage("Project deleted successfully", "success")
  }
}

// Testimonials Management
function loadTestimonials() {
  const tableBody = document.getElementById("testimonials-table-body")
  if (!tableBody) return

  tableBody.innerHTML = ""

  testimonials
    .sort((a, b) => a.order - b.order)
    .forEach((testimonial) => {
      const row = document.createElement("tr")
      row.innerHTML = `
      <td>${testimonial.name}</td>
      <td><img src="${testimonial.photo}" alt="${testimonial.name}" class="table-image"></td>
      <td>${testimonial.position}</td>
      <td class="truncate-text">${testimonial.text.substring(0, 50)}...</td>
      <td class="table-actions">
        <button class="action-btn-sm btn-view" onclick="editTestimonial(${testimonial.id})">Edit</button>
        <button class="action-btn-sm btn-delete" onclick="deleteTestimonial(${testimonial.id})">Delete</button>
      </td>
    `
      tableBody.appendChild(row)
    })
}

function showAddTestimonialModal() {
  document.getElementById("testimonial-modal-title").textContent = "Add New Testimonial"
  document.getElementById("testimonial-id").value = ""
  document.getElementById("testimonial-form").reset()
  document.getElementById("client-photo-preview").innerHTML = ""
  document.getElementById("testimonial-modal").style.display = "flex"
}

function closeTestimonialModal() {
  document.getElementById("testimonial-modal").style.display = "none"
}

function editTestimonial(id) {
  const testimonial = testimonials.find((t) => t.id === id)
  if (testimonial) {
    document.getElementById("testimonial-modal-title").textContent = "Edit Testimonial"
    document.getElementById("testimonial-id").value = testimonial.id
    document.getElementById("client-name").value = testimonial.name
    document.getElementById("client-position").value = testimonial.position
    document.getElementById("client-photo").value = testimonial.photo
    document.getElementById("testimonial-text").value = testimonial.text
    document.getElementById("testimonial-order").value = testimonial.order

    // Show image preview
    document.getElementById("client-photo-preview").innerHTML = `
      <img src="${testimonial.photo}" alt="${testimonial.name}">
    `

    document.getElementById("testimonial-modal").style.display = "flex"
  }
}

function saveTestimonial(e) {
  e.preventDefault()

  const testimonialId = document.getElementById("testimonial-id").value
  const newTestimonial = {
    id: testimonialId ? Number.parseInt(testimonialId) : Date.now(),
    name: document.getElementById("client-name").value,
    position: document.getElementById("client-position").value,
    photo: document.getElementById("client-photo").value,
    text: document.getElementById("testimonial-text").value,
    order: Number.parseInt(document.getElementById("testimonial-order").value),
  }

  if (testimonialId) {
    // Update existing testimonial
    const index = testimonials.findIndex((t) => t.id === Number.parseInt(testimonialId))
    if (index !== -1) {
      testimonials[index] = { ...testimonials[index], ...newTestimonial }
    }
  } else {
    // Add new testimonial
    testimonials.push(newTestimonial)
  }

  saveToLocalStorage()
  loadTestimonials()
  closeTestimonialModal()
  showMessage(testimonialId ? "Testimonial updated successfully!" : "Testimonial added successfully!", "success")
}

function deleteTestimonial(id) {
  if (confirm("Are you sure you want to delete this testimonial?")) {
    testimonials = testimonials.filter((t) => t.id !== id)
    saveToLocalStorage()
    loadTestimonials()
    showMessage("Testimonial deleted successfully", "success")
  }
}

// Image preview functions
function setupImagePreviews() {
  // Project image preview
  const projectImageInput = document.getElementById("project-image")
  if (projectImageInput) {
    projectImageInput.addEventListener("input", function () {
      const previewContainer = document.getElementById("project-image-preview")
      if (this.value) {
        previewContainer.innerHTML = `<img src="${this.value}" alt="Preview" onerror="this.src='/placeholder.svg?height=100&width=100'; this.onerror=null;">`
      } else {
        previewContainer.innerHTML = ""
      }
    })
  }

  // Client photo preview
  const clientPhotoInput = document.getElementById("client-photo")
  if (clientPhotoInput) {
    clientPhotoInput.addEventListener("input", function () {
      const previewContainer = document.getElementById("client-photo-preview")
      if (this.value) {
        previewContainer.innerHTML = `<img src="${this.value}" alt="Preview" onerror="this.src='/placeholder.svg?height=100&width=100'; this.onerror=null;">`
      } else {
        previewContainer.innerHTML = ""
      }
    })
  }
}

// Content Management
function initializeContentManagement() {
  // Content tab switching
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const tabName = this.getAttribute("onclick").match(/'([^']+)'/)[1]
      showContentTab(tabName)
    })
  })
}

function showContentTab(tabName) {
  // Hide all content tabs
  document.querySelectorAll(".content-tab").forEach((tab) => {
    tab.classList.remove("active")
  })

  // Show target tab
  const targetTab = document.getElementById(tabName + "-content")
  if (targetTab) {
    targetTab.classList.add("active")
  }

  // Update tab buttons
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active")
  })
  event.target.classList.add("active")
}

// Page Content Management
function showPageContent(pageName) {
  // Hide all page contents
  document.querySelectorAll(".page-content").forEach((content) => {
    content.classList.remove("active")
  })

  // Show target page content
  const targetContent = document.getElementById(pageName + "-page-content")
  if (targetContent) {
    targetContent.classList.add("active")
  }

  // Update page tab buttons
  document.querySelectorAll(".page-tab-btn").forEach((btn) => {
    btn.classList.remove("active")
  })
  event.target.classList.add("active")
}

// Section Toggle Functions
function toggleSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    if (section.style.display === "none" || section.style.display === "") {
      section.style.display = "block"
      // Scroll to section
      section.scrollIntoView({ behavior: "smooth", block: "nearest" })
    } else {
      section.style.display = "none"
    }
  }
}

// Home Page Content Updates
function updateHomeHero() {
  const heroData = {
    title: document.getElementById("home-hero-title").value,
    subtitle: document.getElementById("home-hero-subtitle").value,
    background: document.getElementById("home-hero-bg").value,
    cta1: document.getElementById("home-hero-cta1").value,
    cta2: document.getElementById("home-hero-cta2").value,
  }

  localStorage.setItem("home-hero-content", JSON.stringify(heroData))
  showMessage("Home hero section updated successfully!", "success")
  markFormAsUpdated("home-hero")
}

// Team Management
function initializeTeamManagement() {
  const teamForm = document.getElementById("team-form")
  if (teamForm) {
    teamForm.addEventListener("submit", (e) => {
      e.preventDefault()
      addTeamMember()
    })
  }
}

function loadTeamMembers() {
  const grid = document.getElementById("team-grid")
  if (!grid) return

  grid.innerHTML = ""

  teamMembers.forEach((member) => {
    const card = document.createElement("div")
    card.className = "team-member-card"
    card.innerHTML = `
            <div class="member-avatar">
                ${member.image ? `<img src="${member.image}" alt="${member.name}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">` : '<i class="fas fa-user"></i>'}
            </div>
            <h3 class="member-name">${member.name}</h3>
            <p class="member-position">${member.position}</p>
            <p class="member-bio">${member.bio}</p>
            <div class="member-actions">
                <button class="action-btn-sm btn-view" onclick="editTeamMember(${member.id})">Edit</button>
                <button class="action-btn-sm btn-delete" onclick="deleteTeamMember(${member.id})">Delete</button>
            </div>
        `
    grid.appendChild(card)
  })
}

function showAddTeamMember() {
  document.getElementById("team-modal").style.display = "flex"
}

function closeTeamModal() {
  document.getElementById("team-modal").style.display = "none"
  document.getElementById("team-form").reset()
}

function addTeamMember() {
  const form = document.getElementById("team-form")
  const formData = new FormData(form)

  const newMember = {
    id: teamMembers.length + 1,
    name: formData.get("name") || document.getElementById("member-name").value,
    position: formData.get("position") || document.getElementById("member-position").value,
    bio: formData.get("bio") || document.getElementById("member-bio").value,
    image: formData.get("image") || document.getElementById("member-image").value,
  }

  teamMembers.push(newMember)
  loadTeamMembers()
  closeTeamModal()
  saveToLocalStorage()

  showMessage("Team member added successfully!", "success")
}

function editTeamMember(id) {
  const member = teamMembers.find((m) => m.id === id)
  if (member) {
    document.getElementById("member-name").value = member.name
    document.getElementById("member-position").value = member.position
    document.getElementById("member-bio").value = member.bio
    document.getElementById("member-image").value = member.image || ""

    showAddTeamMember()
  }
}

function deleteTeamMember(id) {
  if (confirm("Are you sure you want to delete this team member?")) {
    teamMembers = teamMembers.filter((m) => m.id !== id)
    loadTeamMembers()
    saveToLocalStorage()
    showMessage("Team member deleted successfully", "success")
  }
}

// Utility Functions
function updateStats() {
  // Update dashboard stats
  document.getElementById("total-contacts").textContent = contactSubmissions.length
  document.getElementById("total-subscribers").textContent = newsletterSubscribers.length
  document.getElementById("total-posts").textContent = blogPosts.length

  // Update notification badges
  const newContacts = contactSubmissions.filter((c) => c.status === "new").length
  const contactBadge = document.getElementById("contact-badge")
  if (contactBadge) {
    contactBadge.textContent = newContacts
    contactBadge.style.display = newContacts > 0 ? "inline" : "none"
  }

  const newsletterBadge = document.getElementById("newsletter-badge")
  if (newsletterBadge) {
    newsletterBadge.textContent = newsletterSubscribers.length
    newsletterBadge.style.display = newsletterSubscribers.length > 0 ? "inline" : "none"
  }
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

function showMessage(message, type = "info") {
  const container = document.getElementById("message-container")
  const messageDiv = document.createElement("div")
  messageDiv.className = `message ${type}`
  messageDiv.textContent = message

  container.appendChild(messageDiv)

  // Auto remove after 5 seconds
  setTimeout(() => {
    messageDiv.remove()
  }, 5000)
}

function convertToCSV(data) {
  if (data.length === 0) return ""

  const headers = Object.keys(data[0])
  const csvContent = [
    headers.join(","),
    ...data.map((row) => headers.map((header) => `"${row[header] || ""}"`).join(",")),
  ].join("\n")

  return csvContent
}

function downloadCSV(csv, filename) {
  const blob = new Blob([csv], { type: "text/csv" })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.setAttribute("hidden", "")
  a.setAttribute("href", url)
  a.setAttribute("download", filename)
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

function saveToLocalStorage() {
  localStorage.setItem("admin-contacts", JSON.stringify(contactSubmissions))
  localStorage.setItem("admin-subscribers", JSON.stringify(newsletterSubscribers))
  localStorage.setItem("admin-blog-posts", JSON.stringify(blogPosts))
  localStorage.setItem("admin-team-members", JSON.stringify(teamMembers))
  localStorage.setItem("admin-portfolio-projects", JSON.stringify(portfolioProjects))
  localStorage.setItem("admin-testimonials", JSON.stringify(testimonials))
}

function loadFromLocalStorage() {
  const savedContacts = localStorage.getItem("admin-contacts")
  if (savedContacts) {
    contactSubmissions = JSON.parse(savedContacts)
    loadContactSubmissions()
  }

  const savedSubscribers = localStorage.getItem("admin-subscribers")
  if (savedSubscribers) {
    newsletterSubscribers = JSON.parse(savedSubscribers)
    loadNewsletterSubscribers()
  }

  const savedPosts = localStorage.getItem("admin-blog-posts")
  if (savedPosts) {
    blogPosts = JSON.parse(savedPosts)
    loadBlogPosts()
  }

  const savedTeam = localStorage.getItem("admin-team-members")
  if (savedTeam) {
    teamMembers = JSON.parse(savedTeam)
    loadTeamMembers()
  }

  const savedProjects = localStorage.getItem("admin-portfolio-projects")
  if (savedProjects) {
    portfolioProjects = JSON.parse(savedProjects)
    loadPortfolioProjects()
  }

  const savedTestimonials = localStorage.getItem("admin-testimonials")
  if (savedTestimonials) {
    testimonials = JSON.parse(savedTestimonials)
    loadTestimonials()
  }

  updateStats()
}

function logout() {
  if (confirm("Are you sure you want to logout?")) {
    localStorage.removeItem("admin-authenticated")
    localStorage.removeItem("admin-user")
    showMessage("Logged out successfully", "info")
    window.location.href = "login.html"
  }
}

function markFormAsUpdated(formId) {
  const form = document.getElementById(formId)
  if (form) {
    // Add success styling to all form groups
    const formGroups = form.querySelectorAll(".form-group")
    formGroups.forEach((group) => {
      group.classList.add("success")
      setTimeout(() => {
        group.classList.remove("success")
      }, 3000)
    })
  }
}

// Text formatting functions for blog editor
function formatText(command) {
  const textarea = document.getElementById("blog-content")
  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const selectedText = textarea.value.substring(start, end)

  let formattedText = ""
  switch (command) {
    case "bold":
      formattedText = `**${selectedText}**`
      break
    case "italic":
      formattedText = `*${selectedText}*`
      break
    case "underline":
      formattedText = `<u>${selectedText}</u>`
      break
  }

  textarea.value = textarea.value.substring(0, start) + formattedText + textarea.value.substring(end)
  textarea.focus()
}

function insertHeading() {
  const textarea = document.getElementById("blog-content")
  const start = textarea.selectionStart
  const heading = "\n## Heading\n"

  textarea.value = textarea.value.substring(0, start) + heading + textarea.value.substring(start)
  textarea.focus()
}

function insertList() {
  const textarea = document.getElementById("blog-content")
  const start = textarea.selectionStart
  const list = "\n- List item 1\n- List item 2\n- List item 3\n"

  textarea.value = textarea.value.substring(0, start) + list + textarea.value.substring(start)
  textarea.focus()
}

function insertLink() {
  const textarea = document.getElementById("blog-content")
  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const selectedText = textarea.value.substring(start, end)
  const link = selectedText ? `[${selectedText}](URL)` : "[Link Text](URL)"

  textarea.value = textarea.value.substring(0, start) + link + textarea.value.substring(end)
  textarea.focus()
}

function saveDraft() {
  const form = document.getElementById("blog-form")
  const formData = new FormData(form)

  const draft = {
    id: "draft-" + Date.now(),
    title: formData.get("title"),
    author: formData.get("author"),
    category: formData.get("category"),
    date: formData.get("date"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    tags: formData.get("tags"),
    status: "draft",
  }

  // Save to localStorage
  localStorage.setItem("blog-draft", JSON.stringify(draft))
  showMessage("Draft saved successfully!", "info")
}

function cancelBlogEdit() {
  if (confirm("Are you sure you want to cancel? Any unsaved changes will be lost.")) {
    document.getElementById("blog-form").reset()
    document.getElementById("blog-editor").style.display = "none"
    document.getElementById("blog-list").style.display = "block"
  }
}

// Simulate receiving new data (for demonstration)
function simulateNewSubmission() {
  const newSubmission = {
    id: contactSubmissions.length + 1,
    date: new Date().toISOString().split("T")[0],
    name: "Demo User",
    email: "demo@example.com",
    phone: "+1234567890",
    service: "Administrative Support",
    message: "This is a demo submission.",
    status: "new",
  }

  contactSubmissions.unshift(newSubmission)
  loadContactSubmissions()
  updateStats()
  saveToLocalStorage()
  showMessage("New contact submission received!", "info")
}

function simulateNewSubscriber() {
  const newSubscriber = {
    id: newsletterSubscribers.length + 1,
    email: `demo${Date.now()}@example.com`,
    date: new Date().toISOString().split("T")[0],
    source: "Website Newsletter Form",
    status: "active",
  }

  newsletterSubscribers.unshift(newSubscriber)
  loadNewsletterSubscribers()
  updateStats()
  saveToLocalStorage()
  showMessage("New newsletter subscriber!", "info")
}

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  // Ctrl/Cmd + B for bold in blog editor
  if ((e.ctrlKey || e.metaKey) && e.key === "b" && document.getElementById("blog-content") === document.activeElement) {
    e.preventDefault()
    formatText("bold")
  }

  // Ctrl/Cmd + I for italic in blog editor
  if ((e.ctrlKey || e.metaKey) && e.key === "i" && document.getElementById("blog-content") === document.activeElement) {
    e.preventDefault()
    formatText("italic")
  }

  // Escape to close modals
  if (e.key === "Escape") {
    const openModals = document.querySelectorAll('.modal[style*="flex"]')
    openModals.forEach((modal) => {
      modal.style.display = "none"
    })
    closeMobileMenu()
  }
})

// Window resize handler for mobile menu
window.addEventListener("resize", () => {
  if (window.innerWidth > 1024) {
    closeMobileMenu()
  }
})

// Add demo buttons for testing (remove in production)
setTimeout(() => {
  const demoButton1 = document.createElement("button")
  demoButton1.textContent = "Simulate Contact"
  demoButton1.className = "btn btn-secondary"
  demoButton1.style.position = "fixed"
  demoButton1.style.bottom = "20px"
  demoButton1.style.left = "20px"
  demoButton1.style.zIndex = "9999"
  demoButton1.onclick = simulateNewSubmission
  document.body.appendChild(demoButton1)

  const demoButton2 = document.createElement("button")
  demoButton2.textContent = "Simulate Subscriber"
  demoButton2.className = "btn btn-secondary"
  demoButton2.style.position = "fixed"
  demoButton2.style.bottom = "20px"
  demoButton2.style.left = "150px"
  demoButton2.style.zIndex = "9999"
  demoButton2.onclick = simulateNewSubscriber
  document.body.appendChild(demoButton2)
}, 1000)
