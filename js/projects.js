// Projects Page JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", function () {
      mobileMenu.classList.toggle("active");
      menuToggle.classList.toggle("active");
    });
  }

  // Set current year in footer
  const currentYearElement = document.getElementById("currentYear");
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  // Initialize carousel
  const carouselTrack = document.querySelector('.carousel-track');
  const carouselItems = document.querySelectorAll('.project-card.featured');
  const prevBtn = document.querySelector('.carousel-arrow.prev');
  const nextBtn = document.querySelector('.carousel-arrow.next');
  const itemWidth = 350; // Width of each carousel item (including gap)
  let currentPosition = 0;
  let maxPosition = carouselItems.length > 0 ? -((carouselItems.length - 1) * itemWidth) : 0;

  // Update carousel position
  function updateCarousel() {
    if (carouselTrack) {
      carouselTrack.style.transform = `translateX(${currentPosition}px)`;
      
      // Update button states
      if (prevBtn) {
        prevBtn.disabled = currentPosition === 0;
        prevBtn.style.opacity = currentPosition === 0 ? '0.5' : '1';
      }
      
      if (nextBtn) {
        nextBtn.disabled = currentPosition <= maxPosition;
        nextBtn.style.opacity = currentPosition <= maxPosition ? '0.5' : '1';
      }
    }
  }

  // Set initial position
  updateCarousel();

  // Previous button click
  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      currentPosition = Math.min(currentPosition + itemWidth, 0);
      updateCarousel();
    });
  }

  // Next button click
  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      currentPosition = Math.max(currentPosition - itemWidth, maxPosition);
      updateCarousel();
    });
  }

  // Category filtering
  const categoryButtons = document.querySelectorAll(".category-btn");
  const projectCards = document.querySelectorAll(".project-card:not(.featured)");

  categoryButtons.forEach((button) => {
    button.addEventListener("click", function() {
      // Remove active class from all buttons
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      
      // Add active class to clicked button
      this.classList.add("active");
      
      const category = this.textContent.toLowerCase();
      
      // Show/hide project cards based on category
      projectCards.forEach((card) => {
        if (category === "all") {
          card.style.display = "block";
        } else {
          const cardCategories = card.getAttribute("data-categories") || "";
          if (cardCategories.toLowerCase().includes(category)) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        }
      });
    });
  });

  // Search functionality
  const searchInput = document.querySelector('.search-bar input');
  const searchBtn = document.querySelector('.search-bar button');

  if (searchInput && searchBtn) {
    const performSearch = function() {
      const searchTerm = searchInput.value.trim().toLowerCase();
      
      if (!searchTerm) {
        // If search is empty, show all projects
        document.querySelectorAll('.project-card').forEach(card => {
          card.style.display = 'block';
        });
        return;
      }
      
      // Search in all project cards
      document.querySelectorAll('.project-card').forEach(card => {
        const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
        const description = card.querySelector('.project-description')?.textContent.toLowerCase() || '';
        const tags = Array.from(card.querySelectorAll('.project-meta span')).map(span => span.textContent.toLowerCase());
        
        if (title.includes(searchTerm) || 
            description.includes(searchTerm) || 
            tags.some(tag => tag.includes(searchTerm))) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    };
    
    searchBtn.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        performSearch();
      }
    });
  }
  
  // View options (grid/list view)
  const viewOptions = document.querySelectorAll('.view-option');
  const projectsGrid = document.querySelector('.projects-grid');
  
  if (viewOptions.length && projectsGrid) {
    viewOptions.forEach(option => {
      option.addEventListener('click', function() {
        viewOptions.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        if (this.querySelector('.fa-th-large')) {
          projectsGrid.classList.remove('list-view');
        } else {
          projectsGrid.classList.add('list-view');
        }
      });
    });
  }
  
  // Pagination
  const pageButtons = document.querySelectorAll('.page-btn:not(.next)');
  const nextButton = document.querySelector('.page-btn.next');
  let currentPage = 1;
  
  if (pageButtons.length) {
    pageButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        pageButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Update current page
        currentPage = parseInt(this.textContent);
        
        // In a real app, you would fetch the corresponding page of projects here
        console.log(`Loading page ${currentPage}...`);
      });
    });
  }
  
  // Next page button
  if (nextButton && pageButtons.length) {
    nextButton.addEventListener('click', function() {
      // Find the next page number
      const nextPage = currentPage + 1;
      
      // In a real app, you would fetch the next page of projects here
      console.log(`Loading page ${nextPage}...`);
      
      // Update active button (for demo purposes, we're just cycling through the pages)
      const nextButtonToActivate = Array.from(pageButtons).find(
        btn => parseInt(btn.textContent) === (nextPage > pageButtons.length ? 1 : nextPage)
      );
      
      if (nextButtonToActivate) {
        pageButtons.forEach(btn => btn.classList.remove('active'));
        nextButtonToActivate.classList.add('active');
        currentPage = nextPage > pageButtons.length ? 1 : nextPage;
      }
    });
  }
});
