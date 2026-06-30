require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require('express');
const cors = require('cors');
const connectDB = require('./utils/db');
const courseRoutes = require('./routes/courseRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Serve static files from uploads directory
const uploadsPath = require('path').join(__dirname, 'uploads');
console.log('📁 Static uploads path:', uploadsPath);
app.use('/uploads', express.static(uploadsPath));
console.log('✅ Serving /uploads route from:', uploadsPath);

app.use('/api/courses', courseRoutes);
app.use('/api/users', userRoutes);

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});