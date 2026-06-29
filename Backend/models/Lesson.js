const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: [{ type: mongoose.Schema.Types.Mixed }],
  isEnriched: { type: Boolean, default: false },
  videoSearchQuery: { type: String }, 
  videoUrl: { type: String, default: null },
  module: { type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Lesson', lessonSchema);