const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const { defaultLimiter } = require('./middlewares/rateLimiter');
const { errorHandler, notFound } = require('./middlewares/errorHandler');
const logger = require('./utils/logger');

// Routes
const authRoutes = require('./routes/authRoutes');
const candidateRoutes = require('./routes/candidateRoutes');
const hrRoutes = require('./routes/hrRoutes');
const aiRoutes = require('./routes/aiRoutes');
const recruiterRoutes = require('./routes/recruiterRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// ─── Security ──────────────────────────────────────────────────────────────
app.use(helmet());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ─── Body parsing ──────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ─── Logging ───────────────────────────────────────────────────────────────
app.use(
  morgan('combined', {
    stream: { write: (msg) => logger.http(msg.trim()) },
  })
);

// ─── Rate limiting ─────────────────────────────────────────────────────────
app.use(defaultLimiter);

// ─── Health check ──────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'TalentFlow API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// ─── API Routes ────────────────────────────────────────────────────────────
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/candidate', candidateRoutes);
app.use('/api/v1/candidates', candidateRoutes); // alias for GET /candidates
app.use('/api/v1/hr', hrRoutes);
app.use('/api/v1/ai', aiRoutes);
app.use('/api/v1/recruiter', recruiterRoutes);
app.use('/api/v1/admin', adminRoutes);

// ─── 404 + Error handling ──────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

module.exports = app;
