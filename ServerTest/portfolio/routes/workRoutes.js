// workRoutes.js

const express = require('express');
const router = express.Router();
const WorkModel = require('../models/work');
const cors = require('cors'); // Importe o CORS

// Adicione o middleware CORS para as rotas de /work
router.use(cors());

// GET all works
router.get('/work', async (req, res) => {
  try {
    const works = await WorkModel.find();
    res.json({ success: true, data: works });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET one work by ID
router.get('/work/:id', async (req, res) => {
  try {
    const work = await WorkModel.findById(req.params.id);
    if (!work) {
      return res.status(404).json({ success: false, error: 'Work not found' });
    }
    res.json({ success: true, data: work });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST create new work
router.post('/work', async (req, res) => {
  try {
    const newWork = await WorkModel.create(req.body);
    res.status(201).json({ success: true, data: newWork });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT update work by ID
router.put('/work/:id', async (req, res) => {
  try {
    const updatedWork = await WorkModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedWork) {
      return res.status(404).json({ success: false, error: 'Work not found' });
    }
    res.json({ success: true, data: updatedWork });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE work by ID
router.delete('/work/:id', async (req, res) => {
  try {
    const deletedWork = await WorkModel.findByIdAndDelete(req.params.id);
    if (!deletedWork) {
      return res.status(404).json({ success: false, error: 'Work not found' });
    }
    res.json({ success: true, data: deletedWork });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});


module.exports = router;
