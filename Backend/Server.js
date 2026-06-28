require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require('express');
const cors = require('cors');
const connectDB = require('./utils/db');
const courseRoutes = require('./routes/courseRoutes');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/courses', courseRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});