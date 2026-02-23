document.getElementById("signupForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("newUsername").value;
    const password = document.getElementById("newPassword").value;

    // Save user to localStorage
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    alert("Account created successfully!");

    window.location.href = "login.html";
});