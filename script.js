// toggle icon navbar
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

// scroll section active link
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  let top = window.scrollY;

  sections.forEach((sec) => {
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });

  // Sticky Navbar
  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 100);

  // remove toggle icon and navbar when click navbar link(scroll)
  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");

  // Back-to-top button show/hide
  let backToTop = document.querySelector("#back-to-top");
  if (backToTop) {
    backToTop.style.display = window.scrollY > 500 ? "block" : "none";
  }

  // Scroll progress bar
  let progressBar = document.querySelector("#progress-bar");
  if (progressBar) {
    let scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    let scrollProgress = (window.scrollY / scrollHeight) * 100;
    progressBar.style.width = scrollProgress + "%";
  }
};

// scroll reveal
ScrollReveal({
  distance: "80px",
  duration: 2000,
  delay: 200,
});

ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
ScrollReveal().reveal(
  ".home-img, .skills-container, .portfolio-box, .contact form",
  { origin: "bottom" }
);
ScrollReveal().reveal(".home-content h1, .about-img", { origin: "left" });
ScrollReveal().reveal(".home-content p, .about-content", { origin: "right" });

// typed js
const typed = new Typed(".multiple-text", {
  strings: [
    "Full Stack Developer",
    "Front End Developer",
    "Back End Developer",
    "Problem Solver",
  ],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});

// Smooth scroll for navbar links
document.querySelectorAll(".navbar a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Back to top button logic
let backToTopBtn = document.createElement("button");
backToTopBtn.id = "back-to-top";
backToTopBtn.innerHTML = "⬆";
backToTopBtn.style.cssText =
  "position:fixed;bottom:20px;right:20px;display:none;padding:10px 15px;font-size:18px;border:none;border-radius:50%;background:#0ef;color:#111;cursor:pointer;box-shadow:0 0 10px rgba(0,0,0,0.5);transition:0.3s;";
document.body.appendChild(backToTopBtn);

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Progress bar on top
let progressBar = document.createElement("div");
progressBar.id = "progress-bar";
progressBar.style.cssText =
  "position:fixed;top:0;left:0;height:4px;width:0;background:#0ef;z-index:200;";
document.body.appendChild(progressBar);

// Contact form validation + EmailJS
document.querySelector("#contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  let name = document.querySelector("#name").value.trim();
  let email = document.querySelector("#email").value.trim();
  let message = document.querySelector("#message").value.trim();

  if (name === "" || email === "" || message === "") {
    alert("⚠️ Please fill in all fields.");
    return;
  }

  // Simple email check
  let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailPattern)) {
    alert("⚠️ Please enter a valid email address.");
    return;
  }

  // Send email using EmailJS
  emailjs
    .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
      from_name: name,
      from_email: email,
      message: message,
    })
    .then(
      function (response) {
        alert("✅ Message sent successfully!");
        document.querySelector("#contact-form").reset();
      },
      function (error) {
        alert("❌ Failed to send message. Try again later.");
        console.log("FAILED...", error);
      }
    );
});


// Dark/Light mode toggle
let themeToggle = document.createElement("button");
themeToggle.id = "theme-toggle";
themeToggle.innerHTML = "🌙";
themeToggle.style.cssText =
  "position:fixed;bottom:20px;left:20px;padding:8px 12px;border:none;border-radius:50%;background:#0ef;color:#111;font-size:18px;cursor:pointer;box-shadow:0 0 10px rgba(0,0,0,0.5);";
document.body.appendChild(themeToggle);

themeToggle.onclick = () => {
  document.body.classList.toggle("light-mode");
  themeToggle.innerHTML = document.body.classList.contains("light-mode")
    ? "☀️"
    : "🌙";
};
