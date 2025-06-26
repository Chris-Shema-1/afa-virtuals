// Mobile Navigation Toggle
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }),
)

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)"
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    navbar.style.boxShadow = "none"
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

// Initialize AOS (Animate On Scroll)
const AOS = window.AOS // Declare the AOS variable
document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    offset: 100,
  })
})

// Form submission handling (if using custom form instead of Google Forms)
const contactForm = document.getElementById("contact-form")
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    // Get form data
    const formData = new FormData(this)
    const data = Object.fromEntries(formData)

    // Here you would typically send the data to your backend
    console.log("Form submitted:", data)

    // Show success message
    alert("Thank you for your message! We'll get back to you within 24 hours.")

    // Reset form
    this.reset()
  })
}

// Add loading states to buttons
document.querySelectorAll(".btn-primary, .btn-secondary").forEach((button) => {
  button.addEventListener("click", function (e) {
    if (this.href && this.href.includes("#")) {
      return // Don't add loading state for anchor links
    }

    const originalText = this.innerHTML
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...'
    this.style.pointerEvents = "none"

    // Reset after 2 seconds (adjust based on your needs)
    setTimeout(() => {
      this.innerHTML = originalText
      this.style.pointerEvents = "auto"
    }, 2000)
  })
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate")
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".service-card, .testimonial-card, .case-study-card").forEach((el) => {
  observer.observe(el)
})

// Add scroll-to-top functionality
const scrollToTopBtn = document.createElement("button")
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>'
scrollToTopBtn.className = "scroll-to-top"
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--primary-color);
    color: white;
    border: none;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`

document.body.appendChild(scrollToTopBtn)

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.style.opacity = "1"
    scrollToTopBtn.style.visibility = "visible"
  } else {
    scrollToTopBtn.style.opacity = "0"
    scrollToTopBtn.style.visibility = "hidden"
  }
})

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// Add hover effects to service cards
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
  })
})

// Preload critical images
const criticalImages = [
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf",
]

criticalImages.forEach((src) => {
  const img = new Image()
  img.src = src
})

// Add performance monitoring
window.addEventListener("load", () => {
  const loadTime = performance.now()
  console.log(`Page loaded in ${Math.round(loadTime)}ms`)
})

// Case Studies Tabs
function initializeTabs() {
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

      // Filter case studies if not "all"
      if (targetTab !== "all") {
        filterCaseStudies(targetTab)
      } else {
        showAllCaseStudies()
      }
    })
  })
}

// Filter case studies by category
function filterCaseStudies(category) {
  const caseStudyCards = document.querySelectorAll(".case-study-card")
  caseStudyCards.forEach((card) => {
    if (card.getAttribute("data-category") === category) {
      card.style.display = "block"
    } else {
      card.style.display = "none"
    }
  })
}

// Show all case studies
function showAllCaseStudies() {
  const caseStudyCards = document.querySelectorAll(".case-study-card")
  caseStudyCards.forEach((card) => {
    card.style.display = "block"
  })
}

// Sample Works Filter
function initializeWorkFilter() {
  const filterBtns = document.querySelectorAll(".work-filter-btn")
  const workItems = document.querySelectorAll(".work-item")

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter")

      // Remove active class from all filter buttons
      filterBtns.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")

      // Filter work items
      workItems.forEach((item) => {
        if (filter === "all" || item.getAttribute("data-category") === filter) {
          item.style.display = "block"
        } else {
          item.style.display = "none"
        }
      })
    })
  })
}

// Case Study Modal
function openCaseStudyModal(caseStudyId) {
  const modal = document.getElementById("caseStudyModal")
  const modalContent = document.getElementById("modalContent")

  // Sample content - replace with actual case study data
  const caseStudyData = {
    abe: {
      title: "Abe Pride — Personal Brand System for a Multi-Niche Coach",
      challenge:
        "Abe came to Afa-Virtuals with a common creative problem: he had three passions — coaching, design, and psychology — and no clear way to communicate them without overwhelming visitors. His Instagram presence was inconsistent, and he didn’t have a central brand hub to direct people to. He wanted a clean, confident personal brand that would allow him to grow professionally while offering different services without confusion.",
      solution:
        "We guided Abe through a brand discovery process, then created a visual and structural identity around a clean, calming personal brand. Here’s what we delivered:<ul><li>Brand alignment across coaching, design, and psych-based content</li><li>Landing page with segmented navigation (Coaching | Design | Psychology)</li><li>Visual identity: color palette, custom Canva templates, Instagram mockups</li><li>Copy support to articulate what he does, for whom, and why it matters</li><li>Setup of booking funnel with embedded Calendly</li></ul>",
      results: [
        "Website launched in under 2 weeks",
        "3x more time spent on page compared to previous site link",
        "Clients understood his offer immediately  “It finally feels like me.”",
        "Booked 2 new discovery calls in first week via his new link-in-bio funnel"
      ],
      images: [
        "../asset/img/project/pride-1.png",
        "../asset/img/project/pride-2.png"
      ],
    },
    smarthub: {
      title: "SmartHub Technologies",
      challenge:
        "As Smarthub expanded rapidly, their internal systems couldn’t keep up. Without a centralized workflow or clear operational structure, their remote team struggled with disorganized emails, scattered tasks, and inconsistent communication. This inefficiency slowed progress and risked project deadlines, impacting overall team morale and output.",
      solution:
        "Afa-Virtuals designed and deployed a comprehensive admin and operations system built specifically for Smarthub’s remote-first approach. The solution included:<ul><li>An integrated admin and operations platform tailored for distributed teams</li><li>Optimized email management systems reducing clutter and improving response times</li><li>A centralized Notion dashboard consolidating tasks, calendars, and communication channels</li><li>Custom workflows automating recurring operations, ensuring nothing falls through the cracks</li><li>Organized workspace hierarchy promoting clarity and accountability</li></ul>This system enabled Smarthub’s team to coordinate seamlessly across time zones and projects, increasing transparency and efficiency.",
      results: [
        "Full system implemented within 4 weeks, with zero downtime",
        "50% reduction in email chaos and response delays",
        "Streamlined task management improved completion rates by 35%",
        "Increased team productivity and satisfaction as workflows became clearer",
        "Supported smooth remote collaboration, enabling Smarthub to maintain fast growth without operational bottlenecks"
      ],
      images: [
        "../asset/img/project/smarthub-1.png",
        "../asset/img/project/smartubub-2.png"
      ],
    },
    smartaccademy: {
      title: "Smart Academy",
      challenge:
        "The client was starting fresh but faced challenges with disorganized communication, no clear scheduling system, and ineffective task tracking. Without these essentials, the risk of missed deadlines and confusion among team members was high, threatening smooth business operations.",
      solution:
        "Afa-Virtuals delivered a turnkey admin services setup tailored to the client’s unique needs, including:<ul><li>Centralized email setup with filters and folders for better inbox management</li><li>Calendar integration across the team for synchronized scheduling and reminders</li><li>Task management system setup for tracking assignments and deadlines</li><li>Training sessions to onboard the client’s team on the new tools and workflows</li><li>Custom reporting templates for regular progress updates and accountability</li></ul>Here’s an image illustrating the dashboard and workflow setup we implemented:",
      results: [
        "Admin operations organized and fully functional within 2 weeks",
        "Improved scheduling accuracy and reduced missed appointments by 70%",
        "Enhanced team collaboration and task completion rates",
        "Client gained confidence in managing daily admin tasks with clear visibility and control"
      ],
     images: [
        "../asset/img/project/smart-accademy-2.png",
        "../asset/img/project/smart-accademy.png"
      ],
    },
  }

  const data = caseStudyData[caseStudyId]
  if (data) {
    modalContent.innerHTML = `
      <h2>${data.title}</h2>
      <div class="modal-section">
        <h3>Challenge</h3>
        <p>${data.challenge}</p>
      </div>
      <div class="modal-section">
        <h3>Solution</h3>
        <p>${data.solution}</p>
      </div>
      <div class="modal-section">
        <h3>Results</h3>
        <ul>
          ${data.results.map((result) => `<li>${result}</li>`).join("")}
        </ul>
      </div>
      <div class="modal-section">
        <h3>Project Highlights</h3>
        <div class="modal-images">
          ${data.images.map((img) => `<img src="${img}" alt="Project highlight" style="width: 100%; max-width: 300px; margin: 0.5rem; border-radius: 0.5rem;">`).join("")}
        </div>
      </div>
    `
  }

  modal.style.display = "block"
}

function closeCaseStudyModal() {
  document.getElementById("caseStudyModal").style.display = "none"
}

// Work Modal
function openWorkModal(workId) {
  const modal = document.getElementById("workModal")
  const modalContent = document.getElementById("workModalContent")

  // Sample content - replace with actual work data
  modalContent.innerHTML = `
    <h2>Work Sample</h2>
    <p>Detailed information about ${workId} would go here.</p>
    <img src="https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Work sample" style="width: 100%; border-radius: 0.5rem;">
  `

  modal.style.display = "block"
}

function closeWorkModal() {
  document.getElementById("workModal").style.display = "none"
}

// Certificate Viewing
function viewCertificate(certId) {
  const modal = document.getElementById("certificateModal")
  const modalContent = document.getElementById("certificateContent")

  // Certificate data for each team member
  const certificates = {
    'sarah-alx': {
      name: 'Afanyu Emmanuel Delonie',
      title: 'ALX Virtual Assistant Certification',
      img: '/asset/img/va-cirtificate.jpg',
      desc: 'Certified by ALX for excellence in virtual assistance, business operations, and client management.'
    },
    'michael-alx': {
      name: 'Shema Christian',
      title: 'ALX Creative Virtual Assistant Certification',
      img: '/asset/img/va-chris.png',
      desc: 'Certified by ALX for creative virtual assistance, design, and digital marketing.'
    },
    'priya-alx': {
      name: 'Binyu Gillian Renyu',
      title: 'ALX Virtual Assistant Certification',
      img: '/asset/img/va-gill.jpg',
      desc: 'Certified by ALX for administrative support, social media management, and team leadership.'
    }
  }

  const cert = certificates[certId]
  if (cert) {
    modalContent.innerHTML = `
      <h2>${cert.title}</h2>
      <div style="text-align: center;">
        <img src="${cert.img}" alt="${cert.title}" style="width: 100%; max-width: 500px; border-radius: 0.5rem;">
        <p style="margin-top: 1rem; color: var(--text-light);">${cert.desc}</p>
        <p style="margin-top: 0.5rem; font-weight: 600; color: var(--primary-color);">${cert.name}</p>
      </div>
    `
  } else {
    modalContent.innerHTML = `<p>Certificate not found.</p>`
  }

  modal.style.display = "block"
}

function closeCertificateModal() {
  document.getElementById("certificateModal").style.display = "none"
}

// Contact form handling for both forms
function initializeContactForms() {
  const forms = document.querySelectorAll("#contactForm, #quickContactForm")

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault()

      const formData = new FormData(this)
      const data = Object.fromEntries(formData)

      const submitBtn = this.querySelector(".submit-btn")
      const originalText = submitBtn.innerHTML
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
      submitBtn.disabled = true

      // Simulate form submission
      setTimeout(() => {
        alert("Thank you for your message! We'll get back to you within 24 hours.")
        this.reset()
        submitBtn.innerHTML = originalText
        submitBtn.disabled = false
      }, 2000)
    })
  })
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Existing AOS initialization
  const AOS = window.AOS // Declare the AOS variable
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    offset: 100,
  })

  // Initialize new functionality
  initializeTabs()
  initializeWorkFilter()
  initializeContactForms()

  // Close modals when clicking outside
  window.addEventListener("click", (e) => {
    const modals = document.querySelectorAll(".modal")
    modals.forEach((modal) => {
      if (e.target === modal) {
        modal.style.display = "none"
      }
    })
  })
})
