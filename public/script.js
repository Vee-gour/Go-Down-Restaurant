const body = document.body;
const yearEl = document.getElementById('year');
const navToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.getElementById('theme-toggle');
const reservationForm = document.getElementById('reservation-form');
const statusEl = document.getElementById('form-status');
const bookingPopup = document.getElementById('booking-popup');
const bookingPopupClose = document.getElementById('popup-close');

if (yearEl) yearEl.textContent = new Date().getFullYear();

const applyTheme = (theme) => {
  body.setAttribute('data-theme', theme);
  if (themeToggle) themeToggle.textContent = theme === 'light' ? 'Dark Mode' : 'Light Mode';
};

applyTheme(localStorage.getItem('godown-theme') || 'dark');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    localStorage.setItem('godown-theme', nextTheme);
    applyTheme(nextTheme);
  });
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

const revealItems = document.querySelectorAll('.reveal');
if (revealItems.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
}

const closePopup = (popup) => {
  if (!popup) return;
  popup.classList.remove('show');
  popup.setAttribute('aria-hidden', 'true');
};

const openPopup = (popup) => {
  if (!popup) return;
  popup.classList.add('show');
  popup.setAttribute('aria-hidden', 'false');
};

if (bookingPopup && bookingPopupClose) {
  bookingPopupClose.addEventListener('click', () => closePopup(bookingPopup));
  bookingPopup.addEventListener('click', (event) => {
    if (event.target === bookingPopup) closePopup(bookingPopup);
  });
}

if (reservationForm) {
  reservationForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (statusEl) statusEl.textContent = 'Confirming your reservation...';
    await new Promise((resolve) => setTimeout(resolve, 600));
    if (statusEl) statusEl.textContent = 'Reservation confirmed.';
    reservationForm.reset();
    openPopup(bookingPopup);
  });
}

window.GoDownUI = { openPopup, closePopup };
