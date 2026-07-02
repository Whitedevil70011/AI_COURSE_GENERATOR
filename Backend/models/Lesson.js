// const mongoose = require('mongoose');

// const lessonSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   objectives: [{ type: String }],
//   content: [{ type: mongoose.Schema.Types.Mixed }],
//   isEnriched: { type: Boolean, default: false },
//   videoSearchQuery: { type: String },
//   videoUrl: { type: String, default: null },
//   module: { type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true }
// }, { timestamps: true });

// module.exports = mongoose.model('Lesson', lessonSchema);

const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  objectives: [{ type: String }],
  content: [{ type: mongoose.Schema.Types.Mixed }],
  isEnriched: { type: Boolean, default: false },
  videoSearchQuery: { type: String },
  videoUrl: { type: String, default: null },
  module: { type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true },
  completed: { type: Boolean, default: false },
  completedAt: { type: Date, default: null }
}, { timestamps: true });

module.exports = mongoose.model('Lesson', lessonSchema);