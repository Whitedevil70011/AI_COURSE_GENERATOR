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
  modules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Module' }], // 👈 add this
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);