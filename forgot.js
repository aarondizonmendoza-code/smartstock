const forgotForm = document.getElementById("forgotForm");

forgotForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("resetEmail").value;
  const newPassword = document.getElementById("newPassword").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const userIndex = users.findIndex(user => user.email === email);

  if (userIndex === -1) {
    alert("Email not found!");
    return;
  }

  users[userIndex].password = newPassword;

  localStorage.setItem("users", JSON.stringify(users));

  alert("Password updated successfully!");
  window.location.href = "login.html";
});
