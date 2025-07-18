document.addEventListener("DOMContentLoaded", function () {
  // Initialize activity chart
  const activityChartCanvas = document.getElementById("activityChart");

  if (activityChartCanvas) {
    const ctx = activityChartCanvas.getContext("2d");

    // Sample data for the chart
    const labels = [
      "Apr 10",
      "Apr 11",
      "Apr 12",
      "Apr 13",
      "Apr 14",
      "Apr 15",
      "Apr 16",
      "Apr 17",
    ];
    const ideasData = [0, 1, 0, 2, 0, 1, 0, 1];
    const commentsData = [3, 2, 4, 1, 5, 3, 2, 4];
    const upvotesData = [5, 7, 3, 8, 6, 9, 4, 5];

    const activityChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Ideas",
            data: ideasData,
            borderColor: "#F97316",
            backgroundColor: "rgba(249, 115, 22, 0.1)",
            tension: 0.4,
            borderWidth: 2,
            pointBackgroundColor: "#F97316",
          },
          {
            label: "Comments",
            data: commentsData,
            borderColor: "#3B82F6",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            tension: 0.4,
            borderWidth: 2,
            pointBackgroundColor: "#3B82F6",
          },
          {
            label: "Upvotes",
            data: upvotesData,
            borderColor: "#10B981",
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            tension: 0.4,
            borderWidth: 2,
            pointBackgroundColor: "#10B981",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            align: "end",
            labels: {
              boxWidth: 12,
              usePointStyle: true,
              pointStyle: "circle",
            },
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              drawBorder: false,
            },
            ticks: {
              precision: 0,
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
        elements: {
          point: {
            radius: 3,
            hoverRadius: 5,
          },
        },
      },
    });
  }

  // Mark all notifications as read
  const markAllReadButton = document.querySelector(".mark-all-read");
  if (markAllReadButton) {
    markAllReadButton.addEventListener("click", function () {
      const unreadNotifications = document.querySelectorAll(
        ".notification-item.unread"
      );
      unreadNotifications.forEach((notification) => {
        notification.classList.remove("unread");
      });

      // Show toast notification
      showToast("All notifications marked as read");
    });
  }

  // Connect buttons functionality
  const connectButtons = document.querySelectorAll(".connection-item .btn");
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

  // RSVP buttons functionality
  const rsvpButtons = document.querySelectorAll(".event-item .btn");
  rsvpButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const originalText = this.innerHTML;
      this.innerHTML = '<i class="fas fa-check"></i> Going';
      this.classList.remove("btn-outline");
      this.classList.add("btn-primary");
      this.disabled = true;

      // In a real app, this would send a request to the server
      console.log("RSVP sent");

      // Show toast notification
      showToast("RSVP confirmed!");
    });
  });

  // Notification action buttons
  const notificationActions = document.querySelectorAll(".notification-action");
  notificationActions.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.stopPropagation();

      // Create dropdown menu
      const dropdown = document.createElement("div");
      dropdown.className = "notification-dropdown";
      dropdown.innerHTML = `
          <ul>
            <li><button class="mark-read">Mark as read</button></li>
            <li><button class="delete">Delete</button></li>
          </ul>
        `;

      // Position the dropdown
      const rect = this.getBoundingClientRect();
      dropdown.style.position = "absolute";
      dropdown.style.top = `${rect.bottom + window.scrollY}px`;
      dropdown.style.right = `${window.innerWidth - rect.right}px`;
      dropdown.style.zIndex = "1000";
      dropdown.style.backgroundColor = "var(--white)";
      dropdown.style.borderRadius = "var(--radius)";
      dropdown.style.boxShadow = "var(--shadow-md)";
      dropdown.style.overflow = "hidden";

      // Style the dropdown items
      const style = document.createElement("style");
      style.textContent = `
          .notification-dropdown ul {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          
          .notification-dropdown li {
            border-bottom: 1px solid var(--border-color);
          }
          
          .notification-dropdown li:last-child {
            border-bottom: none;
          }
          
          .notification-dropdown button {
            display: block;
            width: 100%;
            text-align: left;
            padding: 0.75rem 1rem;
            background: none;
            border: none;
            cursor: pointer;
            transition: var(--transition);
          }
          
          .notification-dropdown button:hover {
            background-color: var(--background-color);
          }
          
          .notification-dropdown .delete:hover {
            color: #EF4444;
          }
        `;
      document.head.appendChild(style);

      // Add the dropdown to the document
      document.body.appendChild(dropdown);

      // Handle dropdown actions
      const markReadButton = dropdown.querySelector(".mark-read");
      const deleteButton = dropdown.querySelector(".delete");
      const notificationItem = this.closest(".notification-item");

      markReadButton.addEventListener("click", function () {
        notificationItem.classList.remove("unread");
        document.body.removeChild(dropdown);
        showToast("Notification marked as read");
      });

      deleteButton.addEventListener("click", function () {
        notificationItem.style.opacity = "0";
        setTimeout(() => {
          notificationItem.remove();
        }, 300);
        document.body.removeChild(dropdown);
        showToast("Notification deleted");
      });

      // Close dropdown when clicking outside
      document.addEventListener("click", function closeDropdown(e) {
        if (!dropdown.contains(e.target) && e.target !== button) {
          document.body.removeChild(dropdown);
          document.removeEventListener("click", closeDropdown);
        }
      });
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
