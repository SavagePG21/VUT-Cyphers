// Set current year in footer
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
});

// Toggle mobile menu
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Set current year in footer
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
});

// Toggle mobile menu
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});


function toggleForms() {
  const login = document.getElementById("loginForm");
  const signup = document.getElementById("signupForm");
  if (login.style.display === "block") {
    login.style.display = "none";
    signup.style.display = "block";
  } else {
    login.style.display = "block";
    signup.style.display = "none";
  }
}

document.getElementById("loginBtn").addEventListener("click", function() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  if (username === "admin" && password === "1234") {
    window.location.href = "../static/html/cyphersbank.html"; // redirect
  } else {
    alert("Incorrect username or password");
  }
});

document.getElementById("signupBtn").addEventListener("click", function() {
  const fullNames = document.getElementById("signupName").value.trim();
  const username = document.getElementById("signupUsername").value.trim();
  const password = document.getElementById("signupPassword").value.trim();
  const emergencyPin = document.getElementById("signupEmergencyPin").value.trim();


  alert("Signup successful (demo)");
  window.location.href = "login.html"; 
});

