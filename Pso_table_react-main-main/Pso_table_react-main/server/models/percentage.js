const mongoose = require('mongoose');

const percentageSchema = new mongoose.Schema({
  co: {
    type: String,
    required: true,
  },
  percentage_po: {
    type: [Number],
    default: [],
  },
  percentage_pso: {
    type: [Number],
    default: [],
  },
});

const PercentageModel = mongoose.model('PercentageModel', percentageSchema);

module.exports = PercentageModel;