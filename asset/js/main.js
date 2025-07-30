// ===== CASE STUDY CAROUSEL LOGIC =====
document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.getElementById('caseStudyCarousel');
  if (!carousel) return;
  const slides = carousel.querySelectorAll('.case-study-slide');
  const prevBtn = document.getElementById('caseStudyPrev');
  const nextBtn = document.getElementById('caseStudyNext');
  let current = 0;
  let autoScrollTimer = null;

  function showSlide(idx) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === idx);
    });
    carousel.style.transform = `translateX(-${idx * 100}%)`;
    current = idx;
  }

  function nextSlide() {
    showSlide((current + 1) % slides.length);
    resetAutoScroll();
  }
  function prevSlide() {
    showSlide((current - 1 + slides.length) % slides.length);
    resetAutoScroll();
  }

  function resetAutoScroll() {
    if (autoScrollTimer) clearInterval(autoScrollTimer);
    autoScrollTimer = setInterval(() => {
      showSlide((current + 1) % slides.length);
    }, 30000);
  }

  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);

  // Touch/drag support (optional, basic)
  let startX = null;
  carousel.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });
  carousel.addEventListener('touchend', e => {
    if (startX === null) return;
    let endX = e.changedTouches[0].clientX;
    if (endX - startX > 50) prevSlide();
    else if (startX - endX > 50) nextSlide();
    startX = null;
  });

  showSlide(0);
  resetAutoScroll();
});
// ===== RESULTS SECTION ANIMATION =====
document.addEventListener('DOMContentLoaded', function() {
  // Clients Served
  var elClients = document.getElementById('clientsCount');
  var targetClients = 4;
  var duration = 1200;
  var startClients = 0;
  var startTimeClients = null;
  function animateClients(ts) {
    if (!startTimeClients) startTimeClients = ts;
    var progress = Math.min((ts - startTimeClients) / duration, 1);
    var value = Math.floor(progress * (targetClients - startClients) + startClients);
    elClients.textContent = value;
    if (progress < 1) {
      requestAnimationFrame(animateClients);
    } else {
      elClients.textContent = targetClients;
    }
  }
  if (elClients) requestAnimationFrame(animateClients);

  // Success Rate
  var elSuccess = document.getElementById('successRate');
  var targetSuccess = 98;
  var startSuccess = 0;
  var startTimeSuccess = null;
  function animateSuccess(ts) {
    if (!startTimeSuccess) startTimeSuccess = ts;
    var progress = Math.min((ts - startTimeSuccess) / duration, 1);
    var value = Math.floor(progress * (targetSuccess - startSuccess) + startSuccess);
    elSuccess.textContent = value + '%';
    if (progress < 1) {
      requestAnimationFrame(animateSuccess);
    } else {
      elSuccess.textContent = targetSuccess + '%';
    }
  }
  if (elSuccess) requestAnimationFrame(animateSuccess);

  // Hours Saved
  var elHours = document.getElementById('hoursSaved');
  var targetHours = 500;
  var startHours = 0;
  var startTimeHours = null;
  function animateHours(ts) {
    if (!startTimeHours) startTimeHours = ts;
    var progress = Math.min((ts - startTimeHours) / duration, 1);
    var value = Math.floor(progress * (targetHours - startHours) + startHours);
    elHours.textContent = value;
    if (progress < 1) {
      requestAnimationFrame(animateHours);
    } else {
      elHours.textContent = targetHours;
    }
  }
  if (elHours) requestAnimationFrame(animateHours);
});
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

// === Team Member Modal Logic ===
const teamMembers = {
    afanyu: {
        name: "Afanyu Emmanuel",
        role: "Lead Admin VA | Web Designer",
        image: "/asset/img/afa.jpg",
        bio: "Experienced Virtual Assistant and Web Designer with over 5 years in the industry. Specializes in administrative tasks, client management, and creating stunning web experiences. ALX certified professional with a passion for helping businesses streamline their operations.",
        experience: "Over 5 years of experience in virtual assistance and web design. Has worked with 50+ clients across various industries including e-commerce, healthcare, and technology. Expert in project management, client communication, and digital marketing strategies.",
        skills: [
            "Administrative Support",
            "Web Design",
            "Project Management",
            "Client Relations",
            "Digital Marketing",
            "Content Creation",
            "Email Management",
            "Data Entry"
        ],
        certificates: [
            {
                name: "ALX Virtual Assistant Certification",
                issuer: "ALX Africa",
                image: "/asset/img/va-cirtificate.jpg"
            },
        ],
        contact: {
            email: "afanyu@afavirtuals.com",
            phone: "+250 788 123 456",
            linkedin: "linkedin.com/in/afanyu-emmanuel"
        }
    },
    binyu: {
        name: "Binyu Gillian",
        role: "Admin VA | Social Media Manager",
        image: "/asset/img/index.jpg",
        bio: "Creative Social Media Manager and Administrative Virtual Assistant with expertise in content creation, community management, and brand development. ALX certified with a keen eye for trends and audience engagement strategies.",
        experience: "4+ years of experience in social media management and virtual assistance. Has managed social media accounts for 30+ brands, increasing engagement by an average of 150%. Skilled in content strategy, community building, and digital marketing campaigns.",
        skills: [
            "Social Media Management",
            "Content Creation",
            "Community Management",
            "Brand Development",
            "Graphic Design",
            "Analytics & Reporting",
            "Customer Service",
            "Administrative Support"
        ],
        certificates: [
            {
                name: "ALX Social Media Certification",
                issuer: "ALX Africa",
                image: "/asset/img/va-gill.jpg"
            },
        ],
        contact: {
            email: "binyu@afavirtuals.com",
            phone: "+250 788 234 567",
            linkedin: "linkedin.com/in/binyu-gillian"
        }
    },
    shema: {
        name: "Shema Christian",
        role: "Lead Designer | Web Developer",
        image: "/asset/img/chris.jpg",
        bio: "Full-stack developer and creative designer with expertise in modern web technologies and user experience design. ALX certified professional passionate about creating innovative digital solutions that drive business growth.",
        experience: "6+ years of experience in web development and design. Has developed 100+ websites and applications for clients worldwide. Expert in full-stack development, UI/UX design, and digital transformation strategies.",
        skills: [
            "Web Development",
            "UI/UX Design",
            "Full-Stack Development",
            "Mobile App Development",
            "Database Management",
            "API Development",
            "Cloud Computing",
            "DevOps"
        ],
        certificates: [
            {
                name: "ALX Full-Stack Development",
                issuer: "ALX Africa",
                image: "/asset/img/va-chris.png"
            },
        ],
        contact: {
            email: "shema@afavirtuals.com",
            phone: "+250 788 345 678",
            linkedin: "linkedin.com/in/shema-christian"
        }
    }
};

function openModal(memberKey) {
    const member = teamMembers[memberKey];
    const modal = document.getElementById('memberModal');
    // Populate modal content
    document.getElementById('modalMemberImage').src = member.image;
    document.getElementById('modalMemberImage').alt = member.name;
    document.getElementById('modalMemberName').textContent = member.name;
    document.getElementById('modalMemberRole').textContent = member.role;
    document.getElementById('modalMemberBio').textContent = member.bio;
    document.getElementById('modalMemberExperience').textContent = member.experience;
    // Populate skills
    const skillsContainer = document.getElementById('modalMemberSkills');
    skillsContainer.innerHTML = '';
    member.skills.forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        skillItem.innerHTML = `<strong>${skill}</strong>`;
        skillsContainer.appendChild(skillItem);
    });
    // Populate certificates
    const certificatesContainer = document.getElementById('modalMemberCertificates');
    certificatesContainer.innerHTML = '';
    member.certificates.forEach(cert => {
        const certItem = document.createElement('div');
        certItem.className = 'certificate-item';
        certItem.innerHTML = `
            <img src="${cert.image}" alt="${cert.name}" class="certificate-image">
            <div class="certificate-name">${cert.name}</div>
            <div class="certificate-issuer">${cert.issuer}</div>
        `;
        certificatesContainer.appendChild(certItem);
    });
    // Populate contact info
    const contactContainer = document.getElementById('modalMemberContact');
    contactContainer.innerHTML = `
        <div class="contact-item">
            <i class="fas fa-envelope"></i>
            <span>${member.contact.email}</span>
        </div>
        <div class="contact-item">
            <i class="fas fa-phone"></i>
            <span>${member.contact.phone}</span>
        </div>
        <div class="contact-item">
            <i class="fab fa-linkedin"></i>
            <span>${member.contact.linkedin}</span>
        </div>
    `;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('memberModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}
// Close modal when clicking outside
if (document.getElementById('memberModal')) {
    document.getElementById('memberModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
}
// Close modal with Escape key
if (typeof document !== 'undefined') {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

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
