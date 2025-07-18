document.addEventListener("DOMContentLoaded", function () {
  // Testimonial Slider
  const testimonialSlides = document.querySelectorAll(".testimonial-slide");
  const dots = document.querySelectorAll(".dot");
  const prevButton = document.getElementById("testimonialPrev");
  const nextButton = document.getElementById("testimonialNext");
  let currentSlide = 0;

  function showSlide(index) {
    // Hide all slides
    testimonialSlides.forEach((slide) => {
      slide.classList.remove("active");
    });

    // Remove active class from all dots
    dots.forEach((dot) => {
      dot.classList.remove("active");
    });

    // Show the current slide and activate the corresponding dot
    testimonialSlides[index].classList.add("active");
    dots[index].classList.add("active");

    // Update current slide index
    currentSlide = index;
  }

  // Next slide
  function nextSlide() {
    let nextIndex = currentSlide + 1;
    if (nextIndex >= testimonialSlides.length) {
      nextIndex = 0;
    }
    showSlide(nextIndex);
  }

  // Previous slide
  function prevSlide() {
    let prevIndex = currentSlide - 1;
    if (prevIndex < 0) {
      prevIndex = testimonialSlides.length - 1;
    }
    showSlide(prevIndex);
  }

  // Event listeners for controls
  if (prevButton) {
    prevButton.addEventListener("click", prevSlide);
  }

  if (nextButton) {
    nextButton.addEventListener("click", nextSlide);
  }

  // Event listeners for dots
  dots.forEach((dot) => {
    dot.addEventListener("click", function () {
      const slideIndex = parseInt(this.getAttribute("data-index"));
      showSlide(slideIndex);
    });
  });

  // Auto-advance slides every 5 seconds
  setInterval(nextSlide, 5000);

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for header
          behavior: "smooth",
        });
      }
    });
  });

  // Animate stats on scroll
  const statsSection = document.querySelector(".stats");
  const statNumbers = document.querySelectorAll(".stat-number");
  const statValues = [
    { id: "developerCount", value: 10000, suffix: "+" },
    { id: "ideasCount", value: 5000, suffix: "+" },
    { id: "projectsCount", value: 1200, suffix: "+" },
    { id: "citiesCount", value: 100, suffix: "+" },
  ];

  let statsAnimated = false;

  function animateStats() {
    if (statsAnimated) return;

    statValues.forEach((stat) => {
      const element = document.getElementById(stat.id);
      if (!element) return;

      let current = 0;
      const target = stat.value;
      const duration = 2000; // 2 seconds
      const increment = Math.ceil(target / (duration / 16)); // 60fps

      const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(counter);
        }
        element.textContent = current.toLocaleString() + stat.suffix;
      }, 16);
    });

    statsAnimated = true;
  }

  // Check if stats section is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }

  // Check if stats section is in viewport on scroll
  window.addEventListener("scroll", function () {
    if (statsSection && isInViewport(statsSection)) {
      animateStats();
    }
  });

  // Check on initial load as well
  if (statsSection && isInViewport(statsSection)) {
    animateStats();
  }
});
