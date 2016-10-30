var mongoose = require('mongoose');

exports.PollSchema = new mongoose.Schema({
  question: { type: String, required: true },
  choices: [{
    text: String,
    votes: [{ ip: 'String' }]
    }]
});