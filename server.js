const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const reservations = [];

app.post('/api/reservations', (req, res) => {
  const { name, email, phone, date, time, guests, message } = req.body;

  if (!name || !email || !phone || !date || !time || !guests) {
    return res.status(400).json({
      success: false,
      message: 'Please fill in all required fields.'
    });
  }

  const reservation = {
    id: reservations.length + 1,
    name,
    email,
    phone,
    date,
    time,
    guests: Number(guests),
    message: message || '',
    createdAt: new Date().toISOString()
  };

  reservations.push(reservation);

  return res.status(201).json({
    success: true,
    message: 'Reservation received. We will contact you shortly.',
    reservationId: reservation.id
  });
});

app.get('/api/reservations', (req, res) => {
  res.json({ count: reservations.length, data: reservations });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
