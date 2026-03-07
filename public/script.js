const form = document.getElementById('reservation-form');
const statusEl = document.getElementById('form-status');
const navToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const popup = document.getElementById('booking-popup');
const popupClose = document.getElementById('popup-close');

document.getElementById('year').textContent = new Date().getFullYear();

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

if (popupClose) {
  popupClose.addEventListener('click', () => popup.classList.remove('show'));
}

if (popup) {
  popup.addEventListener('click', (event) => {
    if (event.target === popup) popup.classList.remove('show');
  });
}

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    statusEl.textContent = 'Confirming your reservation...';

    await new Promise((resolve) => setTimeout(resolve, 700));

    statusEl.textContent = 'Success!';
    popup.classList.add('show');
    form.reset();
  });
}
