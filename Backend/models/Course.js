const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  topic: { type: String },
  difficulty: { type: String },
  duration: { type: String },
  creator: { type: String, required: true },
  isEnriched: { type: Boolean, default: false },
  tags: [{ type: String }],
  thumbnail: { type: String, default: null }, // 👈 add this
  modules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Module' }],
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);