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

  // Category filtering
  const categoryButtons = document.querySelectorAll(".category-btn");
  const projectCards = document.querySelectorAll(".project-card");
  const featuredProject = document.querySelector(".featured-project-card");

  categoryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      categoryButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      const category = this.getAttribute("data-category");

      // Show/hide project cards based on category
      projectCards.forEach((card) => {
        if (
          category === "all" ||
          card.getAttribute("data-category") === category
        ) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });

      // Show/hide featured project based on category
      if (featuredProject) {
        if (
          category === "all" ||
          featuredProject.getAttribute("data-category") === category
        ) {
          featuredProject.style.display = "block";
        } else {
          featuredProject.style.display = "none";
        }
      }
    });
  });

  // Search functionality
  const searchInput = document.getElementById("searchProjects");
  const searchBtn = document.getElementById("searchBtn");

  if (searchInput && searchBtn) {
    const performSearch = function () {
      const searchTerm = searchInput.value.toLowerCase();

      if (!searchTerm) {
        // If search is empty, show all projects
        projectCards.forEach((card) => {
          card.style.display = "flex";
        });
        if (featuredProject) {
          featuredProject.style.display = "block";
        }
        return;
      }

      // Filter project cards based on search term
      projectCards.forEach((card) => {
        const title = card.querySelector("h3 a").textContent.toLowerCase();
        const content = card
          .querySelector(".project-excerpt")
          .textContent.toLowerCase();
        const category = card
          .querySelector(".project-category")
          .textContent.toLowerCase();
        const tech = Array.from(
          card.querySelectorAll(".project-tech span")
        ).map((span) => span.textContent.toLowerCase());

        if (
          title.includes(searchTerm) ||
          content.includes(searchTerm) ||
          category.includes(searchTerm) ||
          tech.some((t) => t.includes(searchTerm))
        ) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });

      // Filter featured project based on search term
      if (featuredProject) {
        const featuredTitle = featuredProject
          .querySelector("h2 a")
          .textContent.toLowerCase();
        const featuredContent = featuredProject
          .querySelectorAll(".project-excerpt")
          .forEach((excerpt) => excerpt.textContent.toLowerCase());
        const featuredCategory = featuredProject
          .querySelector(".featured-category")
          .textContent.toLowerCase();

        let featuredMatch = false;

        if (
          featuredTitle.includes(searchTerm) ||
          featuredCategory.includes(searchTerm)
        ) {
          featuredMatch = true;
        }

        // Check all excerpts
        featuredProject
          .querySelectorAll(".project-excerpt")
          .forEach((excerpt) => {
            if (excerpt.textContent.toLowerCase().includes(searchTerm)) {
              featuredMatch = true;
            }
          });

        // Check all goals
        featuredProject
          .querySelectorAll(".project-goals li p")
          .forEach((goal) => {
            if (goal.textContent.toLowerCase().includes(searchTerm)) {
              featuredMatch = true;
            }
          });

        // Check all features
        featuredProject
          .querySelectorAll(".feature-card p")
          .forEach((feature) => {
            if (feature.textContent.toLowerCase().includes(searchTerm)) {
              featuredMatch = true;
            }
          });

        featuredProject.style.display = featuredMatch ? "block" : "none";
      }

      // Reset category buttons
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      document.querySelector('[data-category="all"]').classList.add("active");
    };

    searchBtn.addEventListener("click", performSearch);

    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        performSearch();
      }
    });
  }

  // Sort functionality
  const sortSelect = document.getElementById("sortProjects");

  if (sortSelect) {
    sortSelect.addEventListener("change", function () {
      const sortValue = this.value;
      const projectsGrid = document.querySelector(".projects-grid");
      const projects = Array.from(
        projectsGrid.querySelectorAll(".project-card")
      );

      // Sort projects based on selected option
      projects.sort((a, b) => {
        if (sortValue === "newest") {
          // Sort by date (newest first)
          const dateA = new Date(a.querySelector(".project-date").textContent);
          const dateB = new Date(b.querySelector(".project-date").textContent);
          return dateB - dateA;
        } else if (sortValue === "popular") {
          // For demo purposes, we'll use a random sort for "popular"
          return Math.random() - 0.5;
        } else if (sortValue === "trending") {
          // For demo purposes, we'll use a random sort for "trending"
          return Math.random() - 0.5;
        }

        return 0;
      });

      // Remove all projects from the grid
      projects.forEach((project) => {
        projectsGrid.removeChild(project);
      });

      // Add sorted projects back to the grid
      projects.forEach((project) => {
        projectsGrid.appendChild(project);
      });
    });
  }

  // Load more functionality
  const loadMoreBtn = document.getElementById("loadMoreBtn");

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", function () {
      // In a real application, you would fetch more projects from the server
      // For this demo, we'll simulate loading more projects

      // Show loading state
      loadMoreBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Loading...';
      loadMoreBtn.disabled = true;

      // Simulate network delay
      setTimeout(() => {
        // Create new project cards
        const projectsGrid = document.querySelector(".projects-grid");

        // Sample data for new projects
        const newProjects = [
          {
            title: "Sustainable Energy Monitoring",
            category: "iot",
            image: "https://via.placeholder.com/400x250",
            author: "GreenTech Solutions",
            date: "April 5, 2023",
            excerpt:
              "IoT-based solution for monitoring and optimizing energy consumption in residential and commercial buildings, helping reduce carbon footprint and electricity costs.",
            tech: ["Arduino", "MQTT", "React"],
          },
          {
            title: "Mental Health Support App",
            category: "mobile",
            image: "https://via.placeholder.com/400x250",
            author: "Mindful Tech Collective",
            date: "March 28, 2023",
            excerpt:
              "A mobile application providing accessible mental health resources, guided meditation, mood tracking, and anonymous peer support for users in underserved communities.",
            tech: ["React Native", "Firebase", "TensorFlow Lite"],
          },
          {
            title: "Digital Identity Verification",
            category: "blockchain",
            image: "https://via.placeholder.com/400x250",
            author: "SecureID Foundation",
            date: "March 15, 2023",
            excerpt:
              "Blockchain-based solution for secure and privacy-preserving digital identity verification, reducing fraud and simplifying KYC processes for financial institutions.",
            tech: ["Solidity", "Zero-knowledge Proofs", "React"],
          },
          {
            title: "Language Learning Platform",
            category: "web",
            image: "https://via.placeholder.com/400x250",
            author: "Polyglot Innovations",
            date: "March 8, 2023",
            excerpt:
              "Interactive web platform for learning Indian languages, featuring speech recognition, personalized learning paths, and cultural context for more effective language acquisition.",
            tech: ["Vue.js", "Node.js", "WebSpeech API"],
          },
        ];

        // Add new projects to the grid
        newProjects.forEach((project) => {
          const projectCard = document.createElement("div");
          projectCard.className = "project-card";
          projectCard.setAttribute("data-category", project.category);

          projectCard.innerHTML = `
              <div class="project-card-image">
                <img src="${project.image}" alt="${project.title}">
                <div class="project-category">${
                  project.category.charAt(0).toUpperCase() +
                  project.category.slice(1)
                }</div>
              </div>
              <div class="project-card-content">
                <h3><a href="#project-detail">${project.title}</a></h3>
                <div class="project-meta">
                  <span class="project-author">By ${project.author}</span>
                  <span class="project-date">${project.date}</span>
                </div>
                <p class="project-excerpt">
                  ${project.excerpt}
                </p>
                <div class="project-footer">
                  <a href="#project-detail" class="read-more">View Project <i class="fas fa-arrow-right"></i></a>
                  <div class="project-tech">
                    ${project.tech
                      .map((tech) => `<span>${tech}</span>`)
                      .join("")}
                  </div>
                </div>
              </div>
            `;

          projectsGrid.appendChild(projectCard);
        });

        // Reset button state
        loadMoreBtn.innerHTML =
          '<i class="fas fa-sync-alt"></i> Load More Projects';
        loadMoreBtn.disabled = false;

        // Apply current category filter to new cards
        const activeCategory = document
          .querySelector(".category-btn.active")
          .getAttribute("data-category");
        if (activeCategory !== "all") {
          document.querySelectorAll(".project-card").forEach((card) => {
            if (card.getAttribute("data-category") !== activeCategory) {
              card.style.display = "none";
            }
          });
        }

        // If we've loaded enough projects, hide the load more button
        if (document.querySelectorAll(".project-card").length >= 14) {
          loadMoreBtn.style.display = "none";
        }
      }, 1500);
    });
  }

  // Project submission form
  const projectForm = document.getElementById("projectForm");

  if (projectForm) {
    projectForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const title = document.getElementById("projectTitle").value;
      const category = document.getElementById("projectCategory").value;
      const description = document.getElementById("projectDescription").value;
      const goals = document.getElementById("projectGoals").value;
      const features = document.getElementById("projectFeatures").value;
      const contactInfo = document.getElementById("contactInfo").value;

      // Validate form
      if (
        !title ||
        !category ||
        !description ||
        !goals ||
        !features ||
        !contactInfo
      ) {
        alert("Please fill in all required fields.");
        return;
      }

      // In a real application, you would send this data to the server
      // For this demo, we'll just show a success message
      alert(
        "Your project has been submitted successfully! Our team will review it and get back to you soon."
      );

      // Reset form
      projectForm.reset();

      // Scroll to top of page
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      if (targetId !== "#" && document.querySelector(targetId)) {
        e.preventDefault();

        document.querySelector(targetId).scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
});
