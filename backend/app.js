require('dotenv').config();
const frontendBaseUrl = process.env.REACT_APP_FRONTEND_BASE_URL;
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const quizRoutes = require('./routes/quizRoutes');


const corsOptions = {
  origin: 'https://quiz-fullstack.vercel.app', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

const app = express();
app.use(cors(corsOptions));
// app.use(cors());
// const allowedOrigins = ['https://your-frontend-domain.com', frontendBaseUrl]; 
// app.use(cors({
//   origin: allowedOrigins,
//   credentials: true,  
// }));
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/app', quizRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
