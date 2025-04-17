document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation
  const hamburger = document.querySelector(".hamburger")
  const navLinks = document.querySelector(".nav-links")

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      this.classList.toggle("active")
      navLinks.classList.toggle("active")
    })
  }

  // Close mobile menu when clicking on a nav link
  const navItems = document.querySelectorAll(".nav-links a")
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navLinks.classList.remove("active")
    })
  })

  // Hero Slider
  const slides = document.querySelectorAll(".slide")
  const prevBtn = document.querySelector(".prev-btn")
  const nextBtn = document.querySelector(".next-btn")
  const dotsContainer = document.querySelector(".navigation-dots")

  let currentSlide = 0
  const slideInterval = 5000 // 5 seconds

  // Create dots based on number of slides
  if (slides.length > 0 && dotsContainer) {
    for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement("span")
      dot.classList.add("dot")
      if (i === 0) dot.classList.add("active")
      dot.addEventListener("click", () => {
        goToSlide(i)
        resetInterval()
      })
      dotsContainer.appendChild(dot)
    }
  }

  function goToSlide(n) {
    slides[currentSlide].classList.remove("active")
    currentSlide = (n + slides.length) % slides.length
    slides[currentSlide].classList.add("active")

    // Update dots
    const dots = document.querySelectorAll(".dot")
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentSlide)
    })
  }

  function nextSlide() {
    goToSlide(currentSlide + 1)
  }

  function prevSlide() {
    goToSlide(currentSlide - 1)
  }

  // Event listeners for next and prev buttons
  if (prevBtn)
    prevBtn.addEventListener("click", () => {
      prevSlide()
      resetInterval()
    })

  if (nextBtn)
    nextBtn.addEventListener("click", () => {
      nextSlide()
      resetInterval()
    })

  // Auto slide
  let slideTimer = setInterval(nextSlide, slideInterval)

  function resetInterval() {
    clearInterval(slideTimer)
    slideTimer = setInterval(nextSlide, slideInterval)
  }

  // Testimonial Slider
  const testimonials = document.querySelectorAll(".testimonial")
  const testimonialDotsContainer = document.querySelector(".testimonial-dots")

  let currentTestimonial = 0
  const testimonialInterval = 6000 // 6 seconds

  // Create dots based on number of testimonials
  if (testimonials.length > 0 && testimonialDotsContainer) {
    for (let i = 0; i < testimonials.length; i++) {
      const dot = document.createElement("span")
      dot.classList.add("dot")
      if (i === 0) dot.classList.add("active")
      dot.addEventListener("click", () => {
        goToTestimonial(i)
        resetTestimonialInterval()
      })
      testimonialDotsContainer.appendChild(dot)
    }
  }

  function goToTestimonial(n) {
    testimonials[currentTestimonial].classList.remove("active")
    currentTestimonial = (n + testimonials.length) % testimonials.length
    testimonials[currentTestimonial].classList.add("active")

    // Update dots
    const dots = testimonialDotsContainer.querySelectorAll(".dot")
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentTestimonial)
    })
  }

  function nextTestimonial() {
    goToTestimonial(currentTestimonial + 1)
  }

  // Auto slide testimonials
  let testimonialTimer = setInterval(nextTestimonial, testimonialInterval)

  function resetTestimonialInterval() {
    clearInterval(testimonialTimer)
    testimonialTimer = setInterval(nextTestimonial, testimonialInterval)
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item")

  if (faqItems.length > 0) {
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question")
      question.addEventListener("click", () => {
        item.classList.toggle("active")
      })
    })
  }

  // Menu Tabs
  const tabBtns = document.querySelectorAll(".tab-btn")
  const tabPanes = document.querySelectorAll(".tab-pane")

  if (tabBtns.length > 0) {
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Remove active class from all buttons and panes
        tabBtns.forEach((b) => b.classList.remove("active"))
        tabPanes.forEach((p) => p.classList.remove("active"))

        // Add active class to clicked button and corresponding pane
        btn.classList.add("active")
        const tabId = btn.getAttribute("data-tab")
        document.getElementById(tabId).classList.add("active")
      })
    })
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Form validation
  function validerFormulaire() {
    const typeChambre = document.getElementById("00NgK00000jK9wT").value
    const nbPersonnesValue = document.getElementById("00NgK00000jKuiT").value
    const nbPersonnes = nbPersonnesValue ? Number.parseInt(nbPersonnesValue) : 0

    // Conversion des dates à partir des valeurs texte
    const dateArriveeValue = document.getElementById("00NgK00000jK8tx").value
    const dateDepartValue = document.getElementById("00NgK00000jK8yn").value

    // Conversion des dates (format attendu jj/mm/aaaa)
    const dateArrivee = convertirDateFrancaiseEnDate(dateArriveeValue)
    const dateDepart = convertirDateFrancaiseEnDate(dateDepartValue)

    const messageErreur = document.getElementById("erreur-message")

    // Capacité maximale par type de chambre
    const capaciteMax = {
      "Chambre Single - Lit simple": 1,
      "Chambre Double - Lit double": 2,
      "Chambre Twin - 2 lits séparés": 2,
      "Chambre triple - 3 lits séparés": 3,
      "Chambre Single Vue Mer": 1,
      "Chambre Double Vue Mer": 2,
      "Chambre Triple Vue Mer": 3,
      "Suite Junior": 4,
      "Bungalow - 3 chambres": 6,
    }

    // Vérification que la date d'arrivée est aujourd'hui ou dans le futur
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Remise à zéro de l'heure pour comparaison
    if (dateArrivee < today) {
      messageErreur.textContent = "⚠️ La date d'arrivée souhaitée doit être aujourd'hui ou dans le futur."
      messageErreur.style.display = "block"
      return false
    }
    // Vérification que le nombre de personnes est un entier positif
    if (nbPersonnes < 1 || !Number.isInteger(nbPersonnes)) {
      messageErreur.textContent = "⚠️ Veuillez entrer un nombre de personnes valide."
      messageErreur.style.display = "block"
      return false
    }
    // Vérification que le type de chambre est sélectionné
    if (!typeChambre) {
      messageErreur.textContent = "⚠️ Veuillez sélectionner un type de chambre."
      messageErreur.style.display = "block"
      return false
    }
    // Vérification que les dates sont valides
    if (!dateArrivee || !dateDepart) {
      messageErreur.textContent = "⚠️ Veuillez entrer des dates valides au format jj/mm/aaaa."
      messageErreur.style.display = "block"
      return false
    }

    if (dateArrivee >= dateDepart) {
      messageErreur.textContent = "⚠️ La date de départ doit être postérieure à la date d'arrivée."
      messageErreur.style.display = "block"
      return false
    }

    if (typeChambre in capaciteMax && nbPersonnes > capaciteMax[typeChambre]) {
      messageErreur.textContent = `⚠️ Le type de chambre sélectionné ne peut pas accueillir plus de ${capaciteMax[typeChambre]} personne(s).`
      messageErreur.style.display = "block"
      return false
    }

    messageErreur.style.display = "none" // Tout est OK
    return true
  }

  // Fonction pour convertir une date au format français (jj/mm/aaaa) en objet Date
  function convertirDateFrancaiseEnDate(dateStr) {
    if (!dateStr) return null

    // Vérifier si la date est au format jj/mm/aaaa
    const regex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/
    const match = dateStr.match(regex)

    if (match) {
      const jour = Number.parseInt(match[1], 10)
      const mois = Number.parseInt(match[2], 10) - 1 // Les mois commencent à 0 en JavaScript
      const annee = Number.parseInt(match[3], 10)

      return new Date(annee, mois, jour)
    }

    // Si le format ne correspond pas, essayer de parser directement
    // (utile si l'utilisateur entre la date dans un autre format)
    return new Date(dateStr)
  }

  // Attach the validation function to the form
  const reservationForm = document.querySelector("form")
  if (reservationForm) {
    reservationForm.onsubmit = () => validerFormulaire()
  }

  // Scroll animation for sections
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  }

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate")
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section)
  })

  // Add animation classes to elements
  document.querySelectorAll(".room-card, .service-card, .gallery-item").forEach((item) => {
    item.classList.add("fade-in")
  })
})

// Add global function for form validation
function validerFormulaire() {
  const typeChambre = document.getElementById("00NgK00000jK9wT").value
  const nbPersonnesValue = document.getElementById("00NgK00000jKuiT").value
  const nbPersonnes = nbPersonnesValue ? Number.parseInt(nbPersonnesValue) : 0

  // Conversion des dates à partir des valeurs texte
  const dateArriveeValue = document.getElementById("00NgK00000jK8tx").value
  const dateDepartValue = document.getElementById("00NgK00000jK8yn").value

  // Conversion des dates (format attendu jj/mm/aaaa)
  const dateArrivee = convertirDateFrancaiseEnDate(dateArriveeValue)
  const dateDepart = convertirDateFrancaiseEnDate(dateDepartValue)

  const messageErreur = document.getElementById("erreur-message")

  // Capacité maximale par type de chambre
  const capaciteMax = {
    "Chambre Single - Lit simple": 1,
    "Chambre Double - Lit double": 2,
    "Chambre Twin - 2 lits séparés": 2,
    "Chambre triple - 3 lits séparés": 3,
    "Chambre Single Vue Mer": 1,
    "Chambre Double Vue Mer": 2,
    "Chambre Triple Vue Mer": 3,
    "Suite Junior": 4,
    "Bungalow - 3 chambres": 6,
  }

  // Vérification que les dates sont valides
  if (!dateArrivee || !dateDepart) {
    messageErreur.textContent = "⚠️ Veuillez entrer des dates valides au format jj/mm/aaaa."
    messageErreur.style.display = "block"
    return false
  }

  if (dateArrivee >= dateDepart) {
    messageErreur.textContent = "⚠️ La date de départ doit être postérieure à la date d'arrivée."
    messageErreur.style.display = "block"
    return false
  }

  if (typeChambre in capaciteMax && nbPersonnes > capaciteMax[typeChambre]) {
    messageErreur.textContent = `⚠️ Le type de chambre sélectionné ne peut pas accueillir plus de ${capaciteMax[typeChambre]} personne(s).`
    messageErreur.style.display = "block"
    return false
  }

  messageErreur.style.display = "none" // Tout est OK
  return true
}

// Fonction pour convertir une date au format français (jj/mm/aaaa) en objet Date
function convertirDateFrancaiseEnDate(dateStr) {
  if (!dateStr) return null

  // Vérifier si la date est au format jj/mm/aaaa
  const regex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/
  const match = dateStr.match(regex)

  if (match) {
    const jour = Number.parseInt(match[1], 10)
    const mois = Number.parseInt(match[2], 10) - 1 // Les mois commencent à 0 en JavaScript
    const annee = Number.parseInt(match[3], 10)

    return new Date(annee, mois, jour)
  }

  // Si le format ne correspond pas, essayer de parser directement
  // (utile si l'utilisateur entre la date dans un autre format)
  return new Date(dateStr)
}
