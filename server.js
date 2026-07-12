import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Mongoose Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Mongoose Schema & Model
const ProgressSchema = new mongoose.Schema({
  userId: { type: String, default: 'default_user' },
  solvedIds: [{ type: Number }]
});

const Progress = mongoose.model('Progress', ProgressSchema);

// API Routes
app.get('/api/progress', async (req, res) => {
  try {
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
