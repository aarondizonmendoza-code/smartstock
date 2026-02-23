const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(
    user => user.email === email && user.password === password
  );

  if (user) {
    alert("Login successful!");
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid email or password!");
  }
});

// Show / Hide Password
const toggleLoginPassword = document.getElementById("toggleLoginPassword");
const loginPasswordField = document.getElementById("loginPassword");

toggleLoginPassword.addEventListener("change", function () {
  loginPasswordField.type = loginPasswordField.type === "password" ? "text" : "password";
});
