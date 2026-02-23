const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const existingUser = users.find(user => user.email === email);

  if (existingUser) {
    alert("Email already registered!");
    return;
  }

  users.push({
    username: username,
    email: email,
    password: password
  });

  localStorage.setItem("users", JSON.stringify(users));

  alert("Signup successful! Please login.");

  window.location.href = "login.html";
});

// optional show/hide password
const togglePassword = document.getElementById("togglePassword");
const passwordField = document.getElementById("password");

if (togglePassword) {
  togglePassword.addEventListener("change", function () {
    passwordField.type =
      passwordField.type === "password" ? "text" : "password";
  });
}
