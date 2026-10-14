// Добавьте номер в международном формате, только цифры: например, 77011234567.
// Один номер будет использоваться для WhatsApp и обычного звонка.
const CONTACT_PHONE = "77086109921";

const phoneDigits = CONTACT_PHONE.replace(/\D/g, "");
const hasPhone = phoneDigits.length >= 10;
const whatsappText = encodeURIComponent("Здравствуйте! Хочу обсудить укладку брусчатки.");
const toast = document.querySelector(".contact-toast");
const contactHint = document.querySelector("#contact-hint");
let toastTimer;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3600);
}

document.querySelectorAll("[data-contact]").forEach((link) => {
  const type = link.dataset.contact;

  if (hasPhone) {
    link.href = type === "whatsapp"
      ? `https://wa.me/${phoneDigits}?text=${whatsappText}`
      : `tel:+${phoneDigits}`;
    if (type === "whatsapp") {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
    link.removeAttribute("aria-disabled");
    return;
  }

  link.setAttribute("aria-disabled", "true");
  link.addEventListener("click", (event) => {
    event.preventDefault();
    showToast("Чтобы включить связь, добавьте номер в script.js перед публикацией.");
  });
});

if (contactHint && hasPhone) {
  contactHint.textContent = "Связь по телефону или в WhatsApp.";
}

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Открыть меню" : "Закрыть меню");
    mainNav.classList.toggle("is-open", !isOpen);
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Открыть меню");
      mainNav.classList.remove("is-open");
    });
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = String(new Date().getFullYear());
