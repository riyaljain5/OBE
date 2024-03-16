



// routes.js
const express = require('express');
const PsoModel = require('../models/model');
const PercentageModel = require('../models/percentage');

const router = express.Router();
// Fetch all PSOs
router.get('/', async (req, res) => {
    try {
      const data = await PsoModel.find({});
      res.json(data);
    } catch (error) {
      console.error('Error fetching data from MongoDB:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // Save or update a PSO
 router.post('/save', async (req, res) => {
    try {
      const { co, po, pso } = req.body;
  
      if (!co || !po || !pso) {
        return res.status(400).json({ message: 'Invalid request data' });
      }
  
      const existingPso = await PsoModel.findOne({ co });
  
      if (existingPso) {
        existingPso.po = po;
        existingPso.pso = pso;
        await existingPso.save();
      } else {
        const newPso = new PsoModel({ co, po, pso });
        await newPso.save();
      }
  
      res.status(201).json({ message: 'PSO saved successfully' });
    } catch (error) {
      console.error('Error saving data to MongoDB:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

module.exports = router;