const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const methodOverride = require('method-override');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(methodOverride('_method'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/jukebox', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const Track = require('./models/Track');

// Create a new track
app.post('/tracks', async (req, res) => {
  try {
    const newTrack = await Track.create(req.body);
    res.status(201).json(newTrack);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all tracks
app.get('/tracks', async (req, res) => {
  try {
    const tracks = await Track.find();
    res.status(200).json(tracks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single track by ID
app.get('/tracks/:id', async (req, res) => {
  try {
    const track = await Track.findById(req.params.id);
    if (!track) return res.status(404).json({ error: 'Track not found' });
    res.status(200).json(track);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a track
app.put('/tracks/:id', async (req, res) => {
  try {
    const updatedTrack = await Track.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTrack) return res.status(404).json({ error: 'Track not found' });
    res.status(200).json(updatedTrack);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a track
app.delete('/tracks/:id', async (req, res) => {
  try {
    const deletedTrack = await Track.findByIdAndDelete(req.params.id);
    if (!deletedTrack) return res.status(404).json({ error: 'Track not found' });
    res.status(200).json(deletedTrack);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
