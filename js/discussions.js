// Discussions Page JavaScript

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
  const discussionItems = document.querySelectorAll(".discussion-item");

  categoryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      categoryButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      const category = this.getAttribute("data-category");

      // Show/hide discussion items based on category
      discussionItems.forEach((item) => {
        if (
          category === "all" ||
          item.getAttribute("data-category") === category
        ) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // Voting functionality
  const voteButtons = document.querySelectorAll(".vote-btn");

  voteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const voteCount = this.parentElement.querySelector(".vote-count");
      let count = parseInt(voteCount.textContent);

      if (this.classList.contains("upvote")) {
        // Check if already upvoted
        if (this.classList.contains("voted")) {
          count--;
          this.classList.remove("voted");
          this.style.color = "";
        } else {
          count++;
          this.classList.add("voted");
          this.style.color = "#6a11cb";

          // Remove downvote if exists
          const downvoteBtn = this.parentElement.querySelector(".downvote");
          if (downvoteBtn.classList.contains("voted")) {
            count++;
            downvoteBtn.classList.remove("voted");
            downvoteBtn.style.color = "";
          }
        }
      } else if (this.classList.contains("downvote")) {
        // Check if already downvoted
        if (this.classList.contains("voted")) {
          count++;
          this.classList.remove("voted");
          this.style.color = "";
        } else {
          count--;
          this.classList.add("voted");
          this.style.color = "#dc3545";

          // Remove upvote if exists
          const upvoteBtn = this.parentElement.querySelector(".upvote");
          if (upvoteBtn.classList.contains("voted")) {
            count--;
            upvoteBtn.classList.remove("voted");
            upvoteBtn.style.color = "";
          }
        }
      }

      voteCount.textContent = count;
    });
  });

  // Discussion form submission
  const discussionForm = document.getElementById("discussionForm");

  if (discussionForm) {
    discussionForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const title = document.getElementById("discussionTitle").value;
      const category = document.getElementById("discussionCategory").value;
      const tags = document.getElementById("discussionTags").value;
      const content = document.getElementById("discussionContent").value;

      // Validate form
      if (!title || !category || !content) {
        alert("Please fill in all required fields.");
        return;
      }

      // In a real application, you would send this data to the server
      // For this demo, we'll just show a success message
      alert("Your discussion has been posted successfully!");

      // Reset form
      discussionForm.reset();

      // Scroll to top of discussions list
      document
        .querySelector(".discussions-list")
        .scrollIntoView({ behavior: "smooth" });
    });
  }

  // Search functionality
  const searchInput = document.getElementById("searchDiscussions");
  const searchBtn = document.getElementById("searchBtn");

  if (searchInput && searchBtn) {
    const performSearch = function () {
      const searchTerm = searchInput.value.toLowerCase();

      if (!searchTerm) {
        // If search is empty, show all discussions
        discussionItems.forEach((item) => {
          item.style.display = "flex";
        });
        return;
      }

      // Filter discussions based on search term
      discussionItems.forEach((item) => {
        const title = item.querySelector("h3 a").textContent.toLowerCase();
        const content = item
          .querySelector(".discussion-preview p")
          .textContent.toLowerCase();
        const tags = Array.from(item.querySelectorAll(".tag")).map((tag) =>
          tag.textContent.toLowerCase()
        );

        if (
          title.includes(searchTerm) ||
          content.includes(searchTerm) ||
          tags.some((tag) => tag.includes(searchTerm))
        ) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
      });

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

  // Pagination functionality
  const paginationNumbers = document.querySelectorAll(".pagination-number");
  const paginationPrev = document.querySelector(".pagination-btn:first-child");
  const paginationNext = document.querySelector(".pagination-btn:last-child");

  if (paginationNumbers.length > 0) {
    paginationNumbers.forEach((number) => {
      number.addEventListener("click", function () {
        // Remove active class from all numbers
        paginationNumbers.forEach((num) => num.classList.remove("active"));

        // Add active class to clicked number
        this.classList.add("active");

        // Enable/disable prev/next buttons
        if (this.textContent === "1") {
          paginationPrev.disabled = true;
        } else {
          paginationPrev.disabled = false;
        }

        if (this.textContent === "12") {
          paginationNext.disabled = true;
        } else {
          paginationNext.disabled = false;
        }

        // In a real application, you would fetch the discussions for the selected page
        // For this demo, we'll just scroll to the top of the discussions list
        document
          .querySelector(".discussions-list")
          .scrollIntoView({ behavior: "smooth" });
      });
    });

    // Previous button
    paginationPrev.addEventListener("click", function () {
      if (!this.disabled) {
        const activeNumber = document.querySelector(
          ".pagination-number.active"
        );
        const prevNumber = activeNumber.previousElementSibling;

        if (prevNumber && prevNumber.classList.contains("pagination-number")) {
          prevNumber.click();
        }
      }
    });

    // Next button
    paginationNext.addEventListener("click", function () {
      if (!this.disabled) {
        const activeNumber = document.querySelector(
          ".pagination-number.active"
        );
        const nextNumber = activeNumber.nextElementSibling;

        if (nextNumber && nextNumber.classList.contains("pagination-number")) {
          nextNumber.click();
        }
      }
    });
  }
});
