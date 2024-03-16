// routes.js
const express = require('express');
const PsoModel = require('../models/model');
const PercentageModel = require('../models/percentage');

const route = express.Router();

  // Update the /calculatePercentage endpoint
  
  route.all('/calculatePercentage', async (req, res) => {
      try {
          const { co } = req.body;
  
          if (req.method === 'GET') {
              // If it's a GET request, use query parameters
              const queryParams = req.query;
              if (queryParams.co) {
                  // If a specific CO is provided in the query parameters, calculate percentages for that CO only
                  co = queryParams.co;
              }
          }
  
          let query = {};
  
          if (co) {
              // If a specific CO is provided, calculate percentages for that CO only
              query = { co };
          }
  
          const percentageData = await Promise.all(
              (await PsoModel.find(query)).map(async (item) => {
                  // Custom percentage calculation for each PO column
                  const customPercentages = item.po.map((value, index) => {
                      switch (index) {
                          case 0: // For PO1
                              return (value / 14) * 100;
                          case 1: // For PO2
                              return (value / 6) * 100;
                          // Add more cases for other PO columns if needed
                          default:
                              return (value / 10) * 100; // Default formula for other PO columns
                      }
                  });
  
                  // Save the custom percentage data to PercentageModel
                  const customPercentageModel = new PercentageModel({
                      co: item.co,
                      percentage_po: customPercentages, // Update the field name
                  });
  
                  await customPercentageModel.save();
  
                  return {
                      co: item.co,
                      poPercentage: customPercentages,
                  };
              })
          );
  
          res.json(percentageData);
      } catch (error) {
          console.error('Error calculating and saving percentages:', error);
          res.status(500).json({ message: 'Internal server error' });
      }
  });
  
module.exports = route;