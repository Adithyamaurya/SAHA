// News Page JavaScript

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
  const newsCards = document.querySelectorAll(".news-card");
  const featuredNews = document.querySelector(".featured-news-card");

  categoryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      categoryButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      const category = this.getAttribute("data-category");

      // Show/hide news cards based on category
      newsCards.forEach((card) => {
        if (
          category === "all" ||
          card.getAttribute("data-category") === category
        ) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });

      // Show/hide featured news based on category
      if (featuredNews) {
        if (
          category === "all" ||
          featuredNews.getAttribute("data-category") === category
        ) {
          featuredNews.style.display = "block";
        } else {
          featuredNews.style.display = "none";
        }
      }
    });
  });

  // Search functionality
  const searchInput = document.getElementById("searchNews");
  const searchBtn = document.getElementById("searchBtn");

  if (searchInput && searchBtn) {
    const performSearch = function () {
      const searchTerm = searchInput.value.toLowerCase();

      if (!searchTerm) {
        // If search is empty, show all news
        newsCards.forEach((card) => {
          card.style.display = "flex";
        });
        if (featuredNews) {
          featuredNews.style.display = "block";
        }
        return;
      }

      // Filter news cards based on search term
      newsCards.forEach((card) => {
        const title = card.querySelector("h3 a").textContent.toLowerCase();
        const content = card
          .querySelector(".news-excerpt")
          .textContent.toLowerCase();
        const category = card
          .querySelector(".news-category")
          .textContent.toLowerCase();

        if (
          title.includes(searchTerm) ||
          content.includes(searchTerm) ||
          category.includes(searchTerm)
        ) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });

      // Filter featured news based on search term
      if (featuredNews) {
        const featuredTitle = featuredNews
          .querySelector("h2 a")
          .textContent.toLowerCase();
        const featuredContent = featuredNews
          .querySelector(".news-excerpt")
          .textContent.toLowerCase();
        const featuredCategory = featuredNews
          .querySelector(".featured-category")
          .textContent.toLowerCase();

        if (
          featuredTitle.includes(searchTerm) ||
          featuredContent.includes(searchTerm) ||
          featuredCategory.includes(searchTerm)
        ) {
          featuredNews.style.display = "block";
        } else {
          featuredNews.style.display = "none";
        }
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

  // Load more functionality
  const loadMoreBtn = document.getElementById("loadMoreBtn");

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", function () {
      // In a real application, you would fetch more news articles from the server
      // For this demo, we'll simulate loading more articles

      // Show loading state
      loadMoreBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Loading...';
      loadMoreBtn.disabled = true;

      // Simulate network delay
      setTimeout(() => {
        // Create new news cards
        const newsGrid = document.querySelector(".news-grid");

        // Sample data for new articles
        const newArticles = [
          {
            title:
              "Indian Government Launches New Initiative to Support Tech Startups",
            category: "industry",
            image: "https://via.placeholder.com/400x250",
            author: "Vikram Singh",
            date: "May 20, 2023",
            readTime: "5 min read",
            excerpt:
              "The Indian government has announced a new initiative aimed at supporting technology startups across the country, with a focus on AI, blockchain, and clean energy solutions...",
          },
          {
            title: "Remote Work Trends: How Indian Tech Companies Are Adapting",
            category: "industry",
            image: "https://via.placeholder.com/400x250",
            author: "Neha Gupta",
            date: "May 18, 2023",
            readTime: "6 min read",
            excerpt:
              "As remote work becomes increasingly normalized, Indian tech companies are implementing innovative strategies to maintain productivity and team cohesion while offering flexibility to employees...",
          },
          {
            title:
              "Upcoming Hackathon: Build Solutions for Sustainable Development",
            category: "events",
            image: "https://via.placeholder.com/400x250",
            author: "Admin Team",
            date: "May 15, 2023",
            readTime: "3 min read",
            excerpt:
              "Join developers from across India in a virtual hackathon focused on creating technological solutions for sustainable development challenges. Cash prizes and mentorship opportunities available...",
          },
          {
            title:
              "The Growing Importance of Cybersecurity Skills for Developers",
            category: "technology",
            image: "https://via.placeholder.com/400x250",
            author: "Rahul Verma",
            date: "May 12, 2023",
            readTime: "7 min read",
            excerpt:
              "With cyber threats becoming increasingly sophisticated, developers are finding that security knowledge is no longer optional but essential for career advancement and building robust applications...",
          },
        ];

        // Add new articles to the grid
        newArticles.forEach((article) => {
          const newsCard = document.createElement("div");
          newsCard.className = "news-card";
          newsCard.setAttribute("data-category", article.category);

          newsCard.innerHTML = `
              <div class="news-card-image">
                <img src="${article.image}" alt="${article.title}">
                <div class="news-category">${
                  article.category.charAt(0).toUpperCase() +
                  article.category.slice(1)
                }</div>
              </div>
              <div class="news-card-content">
                <h3><a href="#new-article">${article.title}</a></h3>
                <div class="news-meta">
                  <span class="news-author">By ${article.author}</span>
                  <span class="news-date">${article.date}</span>
                  <span class="news-read-time">${article.readTime}</span>
                </div>
                <p class="news-excerpt">
                  ${article.excerpt}
                </p>
                <a href="#new-article" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
              </div>
            `;

          newsGrid.appendChild(newsCard);
        });

        // Reset button state
        loadMoreBtn.innerHTML =
          '<i class="fas fa-sync-alt"></i> Load More Articles';
        loadMoreBtn.disabled = false;

        // Apply current category filter to new cards
        const activeCategory = document
          .querySelector(".category-btn.active")
          .getAttribute("data-category");
        if (activeCategory !== "all") {
          document.querySelectorAll(".news-card").forEach((card) => {
            if (card.getAttribute("data-category") !== activeCategory) {
              card.style.display = "none";
            }
          });
        }
      }, 1500);
    });
  }

  // Newsletter subscription form
  const newsletterForm = document.getElementById("newsletterForm");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("newsletterEmail").value;
      const frequency = document.getElementById("newsletterFrequency").value;

      if (!email) {
        alert("Please enter your email address.");
        return;
      }

      // In a real application, you would send this data to the server
      // For this demo, we'll just show a success message
      alert(`Thank you for subscribing to our ${frequency} newsletter!`);

      // Reset form
      newsletterForm.reset();
    });
  }

  // Subscribe to updates button
  const subscribeBtn = document.querySelector(".news-subscribe button");

  if (subscribeBtn) {
    subscribeBtn.addEventListener("click", function () {
      // Scroll to newsletter form
      document
        .getElementById("newsletterForm")
        .scrollIntoView({ behavior: "smooth" });
    });
  }
});
