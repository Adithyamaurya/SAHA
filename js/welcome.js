document.addEventListener("DOMContentLoaded", function () {
  // Set user name (would normally come from server/API)
  const userNameElement = document.getElementById("userName");
  if (userNameElement) {
    // For demo purposes, we'll use a hardcoded name
    // In a real app, this would come from the user's session
    const userName = "Vikram";
    userNameElement.textContent = userName;
  }

  // Handle checkbox changes for progress tracking
  const checkboxes = document.querySelectorAll(
    '.step-checklist input[type="checkbox"]'
  );
  const progressFill = document.getElementById("progressFill");
  const progressPercent = document.getElementById("progressPercent");

  function updateProgress() {
    const totalTasks = checkboxes.length;
    let completedTasks = 0;

    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        completedTasks++;
      }
    });

    // Calculate progress percentage (minimum 25%)
    const baseProgress = 25; // Starting progress
    const additionalProgress = (completedTasks / totalTasks) * 75; // Remaining 75% based on tasks
    const totalProgress = Math.round(baseProgress + additionalProgress);

    // Update progress bar
    if (progressFill) {
      progressFill.style.width = `${totalProgress}%`;
    }

    if (progressPercent) {
      progressPercent.textContent = `${totalProgress}%`;
    }

    // Save progress to localStorage (would normally be saved to server)
    localStorage.setItem("onboardingProgress", totalProgress);

    // If all tasks are completed, update the status badge
    if (completedTasks === totalTasks) {
      const step1Status = document.querySelector("#step1 .status-badge");
      if (step1Status) {
        step1Status.textContent = "Completed";
        step1Status.classList.remove("current");
        step1Status.classList.add("completed");
      }

      // Unlock step 2
      const step2 = document.getElementById("step2");
      if (step2) {
        const step2Status = step2.querySelector(".status-badge");
        if (step2Status) {
          step2Status.textContent = "Ready";
          step2Status.classList.remove("locked");
        }

        const step2Button = step2.querySelector("button");
        if (step2Button) {
          step2Button.disabled = false;
          step2Button.classList.remove("btn-outline");
          step2Button.classList.add("btn-primary");
        }
      }
    }
  }

  // Add event listeners to checkboxes
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", updateProgress);

    // Check if there's saved progress in localStorage
    const savedProgress = localStorage.getItem(`onboarding_${checkbox.id}`);
    if (savedProgress === "true") {
      checkbox.checked = true;
    }

    // Save individual checkbox state
    checkbox.addEventListener("change", function () {
      localStorage.setItem(`onboarding_${checkbox.id}`, checkbox.checked);
    });
  });

  // Initialize progress on page load
  updateProgress();

  // Popular content tabs
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const tabId = tab.getAttribute("data-tab");

      // Remove active class from all tabs and contents
      tabs.forEach((t) => t.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked tab and corresponding content
      tab.classList.add("active");
      document.getElementById(tabId).classList.add("active");
    });
  });

  // Connect buttons functionality
  const connectButtons = document.querySelectorAll(".connection-card .btn");

  connectButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const originalText = this.innerHTML;
      this.innerHTML = '<i class="fas fa-check"></i> Connected';
      this.classList.remove("btn-outline");
      this.classList.add("btn-primary");
      this.disabled = true;

      // In a real app, this would send a request to the server
      console.log("Connection request sent");

      // Show toast notification
      showToast("Connection request sent!");
    });
  });

  // Simple toast notification function
  function showToast(message) {
    // Check if a toast container already exists
    let toastContainer = document.querySelector(".toast-container");

    // If not, create one
    if (!toastContainer) {
      toastContainer = document.createElement("div");
      toastContainer.className = "toast-container";
      document.body.appendChild(toastContainer);
    }

    // Create toast element
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;

    // Add toast to container
    toastContainer.appendChild(toast);

    // Show toast
    setTimeout(() => {
      toast.classList.add("show");
    }, 100);

    // Remove toast after 3 seconds
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => {
        toastContainer.removeChild(toast);
      }, 300);
    }, 3000);
  }

  // Add toast styles dynamically
  const style = document.createElement("style");
  style.textContent = `
      .toast-container {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        z-index: 1000;
      }
      
      .toast {
        background-color: var(--primary-color);
        color: white;
        padding: 0.75rem 1.5rem;
        border-radius: var(--radius);
        margin-top: 0.5rem;
        box-shadow: var(--shadow-md);
        transform: translateY(1rem);
        opacity: 0;
        transition: transform 0.3s, opacity 0.3s;
      }
      
      .toast.show {
        transform: translateY(0);
        opacity: 1;
      }
    `;
  document.head.appendChild(style);
});
