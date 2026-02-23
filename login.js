// ensure login system works
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  // get users from localStorage
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // find match
  const user = users.find(
    user => user.email === email && user.password === password
  );

  if (user) {
    localStorage.setItem("loggedIn", "true");
    alert("Login successful!");
    window.location.href = "index.html";
  } else {
    alert("Invalid login! Try signup or use admin/admin");
  }
});

// toggle password visibility (optional)
const toggleLoginPassword = document.getElementById("toggleLoginPassword");
const loginPasswordField = document.getElementById("loginPassword");

if (toggleLoginPassword) {
  toggleLoginPassword.addEventListener("change", function () {
    loginPasswordField.type =
      loginPasswordField.type === "password" ? "text" : "password";
  });
}
