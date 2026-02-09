const form = document.getElementById("loginForm");
const error = document.getElementById("error");

// DEMO ACCOUNT
const correctUsername = "admin";
const correctPassword = "1234";

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === correctUsername && password === correctPassword) {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "index.html";
  } else {
    error.textContent = "Invalid username or password";
  }
});