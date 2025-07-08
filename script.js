// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS (Animate On Scroll) if you want to add it later
  initializeAnimations()

  // Handle navigation clicks
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href")
      if (href.startsWith("#")) {
        e.preventDefault()
        const target = document.querySelector(href)
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }

        // Close mobile menu if open
        const navbarCollapse = document.querySelector(".navbar-collapse")
        if (navbarCollapse.classList.contains("show")) {
          const navbarToggler = document.querySelector(".navbar-toggler")
          navbarToggler.click()
        }
      }
    })
  })

  // Add scroll effect to navbar
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar")
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Add loading states to buttons
  const buttons = document.querySelectorAll(".btn")
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      if (this.textContent.includes("Book") || this.textContent.includes("Call")) {
        addLoadingState(this)
      }
    })
  })
})

// Book consultation function
function bookConsultation() {
  // Show loading state
  const button = event.target
  const originalText = button.innerHTML
  button.innerHTML = '<span class="loading"></span> Booking...'
  button.disabled = true

  // Simulate booking process
  setTimeout(() => {
    // In a real application, this would redirect to a booking system
    // For demo purposes, we'll show an alert
    alert("Thank you for your interest! You will be redirected to our booking system.")

    // Reset button
    button.innerHTML = originalText
    button.disabled = false

    // In a real application, redirect to booking system
    // window.location.href = 'https://your-booking-system.com';
  }, 2000)
}

// Add loading state to buttons
function addLoadingState(button) {
  const originalText = button.innerHTML
  button.innerHTML = '<span class="loading"></span> Loading...'
  button.disabled = true

  setTimeout(() => {
    button.innerHTML = originalText
    button.disabled = false
  }, 2000)
}

// Initialize animations
function initializeAnimations() {
  // Add fade-in animation to elements when they come into view
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up")
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animateElements = document.querySelectorAll(".process-step, .feature-item, .medication-card, .service-item")
  animateElements.forEach((el) => {
    observer.observe(el)
  })
}

// Contact form handling (if you add a contact form later)
function handleContactForm(event) {
  event.preventDefault()

  const form = event.target
  const formData = new FormData(form)
  const submitButton = form.querySelector('button[type="submit"]')

  // Show loading state
  const originalText = submitButton.innerHTML
  submitButton.innerHTML = '<span class="loading"></span> Sending...'
  submitButton.disabled = true

  // Simulate form submission
  setTimeout(() => {
    alert("Thank you for your message! We will get back to you soon.")
    form.reset()

    // Reset button
    submitButton.innerHTML = originalText
    submitButton.disabled = false
  }, 2000)
}

// Phone number formatting
function formatPhoneNumber(input) {
  const value = input.value.replace(/\D/g, "")
  const formattedValue = value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")
  input.value = formattedValue
}

// Email validation
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

// BMI Calculator (if you want to add this feature)
function calculateBMI(weight, height) {
  const bmi = (weight / (height * height)) * 703 // for pounds and inches
  return Math.round(bmi * 10) / 10
}

// Scroll to top function
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

// Add scroll to top button
document.addEventListener("DOMContentLoaded", () => {
  // Create scroll to top button
  const scrollButton = document.createElement("button")
  scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>'
  scrollButton.className = "btn btn-primary position-fixed"
  scrollButton.style.cssText = `
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        display: none;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `
  scrollButton.onclick = scrollToTop
  document.body.appendChild(scrollButton)

  // Show/hide scroll button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollButton.style.display = "block"
    } else {
      scrollButton.style.display = "none"
    }
  })
})

// Service item hover effects
document.addEventListener("DOMContentLoaded", () => {
  const serviceItems = document.querySelectorAll(".service-item")
  serviceItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)"
    })

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })
  })
})

// Mobile menu handling
document.addEventListener("DOMContentLoaded", () => {
  const navbarToggler = document.querySelector(".navbar-toggler")
  const navbarCollapse = document.querySelector(".navbar-collapse")

  // Close mobile menu when clicking outside
  document.addEventListener("click", (event) => {
    const isClickInsideNav = navbarCollapse.contains(event.target) || navbarToggler.contains(event.target)

    if (!isClickInsideNav && navbarCollapse.classList.contains("show")) {
      navbarToggler.click()
    }
  })
})

// Lazy loading for images
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll('img[src*="placeholder"]')

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        // In a real application, you would replace with actual image URLs
        img.classList.add("loaded")
        observer.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
})

// Form validation utilities
function validateForm(form) {
  const inputs = form.querySelectorAll("input[required], textarea[required], select[required]")
  let isValid = true

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      showFieldError(input, "This field is required")
      isValid = false
    } else if (input.type === "email" && !validateEmail(input.value)) {
      showFieldError(input, "Please enter a valid email address")
      isValid = false
    } else {
      clearFieldError(input)
    }
  })

  return isValid
}

function showFieldError(input, message) {
  clearFieldError(input)

  const errorDiv = document.createElement("div")
  errorDiv.className = "invalid-feedback d-block"
  errorDiv.textContent = message

  input.classList.add("is-invalid")
  input.parentNode.appendChild(errorDiv)
}

function clearFieldError(input) {
  input.classList.remove("is-invalid")
  const errorDiv = input.parentNode.querySelector(".invalid-feedback")
  if (errorDiv) {
    errorDiv.remove()
  }
}

// Analytics tracking (placeholder for Google Analytics or other tracking)
function trackEvent(eventName, eventData = {}) {
  // In a real application, you would send this to your analytics service
  console.log("Event tracked:", eventName, eventData)

  // Example for Google Analytics 4
  // gtag('event', eventName, eventData);
}

// Track button clicks
document.addEventListener("click", (event) => {
  if (event.target.matches(".btn")) {
    const buttonText = event.target.textContent.trim()
    trackEvent("button_click", {
      button_text: buttonText,
      page_location: window.location.href,
    })
  }
})