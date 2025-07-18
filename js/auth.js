document.addEventListener("DOMContentLoaded", function () {
  // Login form submission
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Normally you would send this to a server
      console.log("Login attempt:", { email, password });

      // For demo purposes, simulate successful login
      alert("Login successful! Redirecting to dashboard...");
      window.location.href = "index.html";
    });
  }

  // Signup form submission
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const termsAccepted = document.getElementById("terms").checked;

      if (!termsAccepted) {
        alert("Please accept the terms of service and privacy policy.");
        return;
      }

      // Normally you would send this to a server
      console.log("Signup attempt:", { firstName, lastName, email, password });

      // For demo purposes, simulate successful signup
      alert("Account created successfully! Redirecting to dashboard...");
      window.location.href = "index.html";
    });
  }

  // Social auth buttons
  const socialButtons = document.querySelectorAll(".social-btn");
  socialButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const provider = button.textContent.trim();
      alert(`Redirecting to ${provider} authentication...`);
    });
  });
});
