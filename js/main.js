// Mobile menu toggle
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", function () {
      mobileMenu.classList.toggle("active");

      // Change icon based on menu state
      const icon = menuToggle.querySelector("i");
      if (mobileMenu.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });
  }

  // Set current year in footer
  const currentYearElements = document.querySelectorAll("#currentYear");
  const currentYear = new Date().getFullYear();

  currentYearElements.forEach((element) => {
    element.textContent = currentYear;
  });
});
