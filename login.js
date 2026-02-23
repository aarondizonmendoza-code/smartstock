const form = document.getElementById("loginForm");
const error = document.getElementById("error");

// DEMO ACCOUNT (still works)
const demoUsername = "admin";
const demoPassword = "1234";

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Get stored signup account
  const storedUsername = localStorage.getItem("username");
  const storedPassword = localStorage.getItem("password");

  // Check demo account OR signed-up account
  if (
    (username === demoUsername && password === demoPassword) ||
    (username === storedUsername && password === storedPassword)
  ) {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "index.html";
  } else {
    error.textContent = "Invalid username or password";
  }
});