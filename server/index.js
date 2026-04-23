const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// CORS configuration
app.use(cors({
  origin: "*"
}));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Resume Builder API is running',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api', require('./routes/authRoutes'));
app.use('/api/resumes', require('./routes/resumeRoutes'));
app.use('/api/portfolio', require('./routes/portfolioRoutes'));
app.use('/api/templates', require('./routes/templateRoutes'));

// Serve static assets
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve static assets in production
if (process.env.NODE_ENV === 'production' || process.env.SERVE_CLIENT === 'true') {
  const clientBuildPath = path.join(__dirname, '..', 'client', 'dist');
  
  // Check if build exists
  const fs = require('fs');
  if (fs.existsSync(clientBuildPath)) {
    app.use(express.static(clientBuildPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(clientBuildPath, 'index.html'));
    });
  } else {
    console.warn('⚠️  Warning: Client build not found at', clientBuildPath);
    app.get('*', (req, res) => {
      if (req.path.startsWith('/api')) {
        return res.status(404).json({ success: false, message: 'API route not found' });
      }
      res.status(500).send('Client build is missing. Please run "npm run build" in the client directory.');
    });
  }
} else {
  // 404 handler for dev (only for API routes)
  app.use('/api', (req, res) => {
    res.status(404).json({
      success: false,
      message: `API Route ${req.originalUrl} not found`,
    });
  });

  // Fallback for non-API routes in dev
  app.get('*', (req, res) => {
    res.status(404).send(`Route ${req.originalUrl} not found. In development, please use the Vite dev server (usually http://localhost:5173).`);
  });
}

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`📋 API Health: http://localhost:${PORT}/api/health`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}\n`);
});
