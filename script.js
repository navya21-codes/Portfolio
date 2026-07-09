/* ── LOADER ── */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.classList.add("hide");
  }, 2000);
});

/* ── CUSTOM CURSOR ── */
const cursorDot = document.getElementById("cursor-dot");
const cursorRing = document.getElementById("cursor-ring");
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = `${mouseX}px`;
  cursorDot.style.top = `${mouseY}px`;
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;
  cursorRing.style.left = `${ringX}px`;
  cursorRing.style.top = `${ringY}px`;
  requestAnimationFrame(animateRing);
}
animateRing();

/* ── NAV HAMBURGER ── */
function toggleMenu() {
  document.getElementById("nav-links").classList.toggle("open");
}

// Close mobile menu after clicking a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    document.getElementById("nav-links").classList.remove("open");
  });
});

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 }
);
revealEls.forEach((el) => revealObserver.observe(el));

/* ── SKILL BAR FILL ANIMATION ── */
const skillBars = document.querySelectorAll(".skill-bar-fill");
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const pct = bar.getAttribute("data-pct");
        bar.style.width = `${pct}%`;
        skillObserver.unobserve(bar);
      }
    });
  },
  { threshold: 0.3 }
);
skillBars.forEach((bar) => skillObserver.observe(bar));

/* ── PARTICLE CANVAS BACKGROUND ── */
const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const colors = ["#4f46e5", "#818cf8", "#ec4899", "#06b6d4", "#f59e0b"];

function createParticles(count) {
  particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.8 + 0.4,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.1,
    });
  }
}
createParticles(90);

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.x += p.speedX;
    p.y += p.speedY;

    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.opacity;
    ctx.fill();
  });
  ctx.globalAlpha = 1;
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ── CONTACT FORM (EmailJS) ── */
// Replace these with your own EmailJS service/template/public key
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

if (window.emailjs) {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

function sendEmail(event) {
  event.preventDefault();

  const sendBtn = document.getElementById("sendBtn");
  const formMsg = document.getElementById("formMsg");

  const params = {
    from_name: document.getElementById("from_name").value,
    from_email: document.getElementById("from_email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  };

  sendBtn.disabled = true;
  sendBtn.textContent = "Sending...";
  formMsg.textContent = "";
  formMsg.className = "form-msg";

  emailjs
    .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params)
    .then(() => {
      formMsg.textContent = "Message sent successfully! 🎉";
      formMsg.classList.add("success");
      document.getElementById("contactForm").reset();
    })
    .catch(() => {
      formMsg.textContent = "Something went wrong. Please try again.";
      formMsg.classList.add("error");
    })
    .finally(() => {
      sendBtn.disabled = false;
      sendBtn.textContent = "Send Message 🚀";
    });

  return false;
}