// CREATE DEFAULT ADMIN ACCOUNT
let users = JSON.parse(localStorage.getItem("users")) || [];

const adminExists = users.find(user => user.email === "admin");

if (!adminExists) {
  users.push({
    username: "Administrator",
    email: "admin",
    password: "admin"
  });
  localStorage.setItem("users", JSON.stringify(users));
}

// GET FORM
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
    localStorage.setItem("loggedIn", "true");
    alert("Login successful!");
    window.location.href = "index.html";
  } else {
    alert("Invalid login! Try admin / admin");
  }
});

// Show / Hide Password
const toggleLoginPassword = document.getElementById("toggleLoginPassword");
const loginPasswordField = document.getElementById("loginPassword");

if (toggleLoginPassword) {
  toggleLoginPassword.addEventListener("change", function () {
    loginPasswordField.type =
      loginPasswordField.type === "password" ? "text" : "password";
  });
}
