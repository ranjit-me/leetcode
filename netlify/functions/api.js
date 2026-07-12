import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import serverless from 'serverless-http';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Mongoose Connection
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log('✅ Connected to MongoDB via Netlify Function');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
  }
};

// Mongoose Schema & Model
const ProgressSchema = new mongoose.Schema({
  userId: { type: String, default: 'default_user' },
  solvedIds: [{ type: Number }]
});
const Progress = mongoose.models.Progress || mongoose.model('Progress', ProgressSchema);

// API Routes
app.get('/api/progress', async (req, res) => {
  try {
    await connectDB();
    let progress = await Progress.findOne({ userId: 'default_user' });
    if (!progress) {
      progress = await Progress.create({ userId: 'default_user', solvedIds: [] });
    }
    res.json(progress.solvedIds);
  } catch (error) {
    console.error("GET error:", error);
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
});

app.post('/api/progress', async (req, res) => {
  try {
    await connectDB();
    const { solvedIds } = req.body;
    let progress = await Progress.findOne({ userId: 'default_user' });
    if (!progress) {
      progress = new Progress({ userId: 'default_user', solvedIds });
    } else {
      progress.solvedIds = solvedIds;
    }
    await progress.save();
    res.json({ success: true, solvedIds: progress.solvedIds });
  } catch (error) {
    console.error("POST error:", error);
    res.status(500).json({ error: 'Failed to update progress' });
  }
});

// We wrap the app for Netlify
export const handler = serverless(app);
