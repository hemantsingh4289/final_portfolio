// === NAV TOGGLE ===
const openBtn = document.querySelector('#open-menu-btn');
const closeBtn = document.querySelector('#close-menu-btn');
const dropdown = document.querySelector('#dropdown');
emailjs.init("QN86YGc9clPlk-UVT");

if (openBtn && closeBtn && dropdown) {
  openBtn.addEventListener('click', () => {
    dropdown.style.display = 'flex';
    dropdown.style.flexDirection = 'column';
    dropdown.style.padding = '2rem';
  });

  closeBtn.addEventListener('click', () => {
    dropdown.style.display = 'none';
  });
}

// === TYPEWRITER EFFECT ===
const typewriterSpan = document.getElementById('typewriter-text');
const words = [
  "Full Stack Developer",
  "Java Specialist",
  "Flutter Dev",
  "Backend Engineer",
  "Mobile App Creator"
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  if (!typewriterSpan) return;

  const currentWord = words[wordIndex];
  const currentText = isDeleting
    ? currentWord.substring(0, charIndex--)
    : currentWord.substring(0, charIndex++);

  typewriterSpan.textContent = currentText;

  if (!isDeleting && charIndex === currentWord.length + 1) {
    isDeleting = true;
    setTimeout(type, 1000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(type, 300);
  } else {
    setTimeout(type, isDeleting ? 40 : 100);
  }
}

document.addEventListener('DOMContentLoaded', type);

// === EMAILJS CONTACT FORM ===
const form = document.getElementById("contact-form");

if (form) {
  const successMessage = document.createElement("div");
  successMessage.id = "success-message";
  successMessage.style.marginTop = "10px";
  successMessage.style.color = "green";
  form.appendChild(successMessage);

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const message = document.querySelector("#message").value.trim();

    if (!name || !email || !message) {
      alert("❌ Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      alert("❌ Please enter a valid email.");
      return;
    }

    emailjs.sendForm("service_84224mr", "template_85xhbnm", this)
      .then(() => {
        successMessage.textContent = "✅ Thank you! Your message has been sent.";
        successMessage.style.display = "block";
        this.reset();

        setTimeout(() => {
          successMessage.style.display = "none";
        }, 4000);
      })
      .catch((error) => {
        console.error("❌ Failed to send:", error);
        alert("❌ Message sending failed. Please try again.");
      });
  });
}

function validateEmail(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
  return re.test(email);
}

console.log('%c🔥 Hemant Portfolio JS Loaded & Email Ready', 'color: #6d4300; font-size: 14px; font-weight: bold;');
