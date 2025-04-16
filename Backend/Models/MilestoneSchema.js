// models/Milestone.js
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const milestoneSchema = new Schema({
  project_id: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  milestone_name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  due_date: {
    type: Date
  },
  status: {
    type: String,
    enum: ['planned', 'in-progress', 'completed', 'delayed'],
    default: 'planned'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const Milestone = mongoose.model('Milestone', milestoneSchema);
export default Milestone;