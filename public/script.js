const form = document.getElementById('reservation-form');
const statusEl = document.getElementById('form-status');
const navToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

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

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  statusEl.textContent = 'Sending reservation...';

  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());

  try {
    const response = await fetch('/api/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Could not send reservation.');
    }

    statusEl.textContent = result.message;
    form.reset();
  } catch (error) {
    statusEl.textContent = error.message;
  }
});
