// models/Project.js
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  business_id: {
    type: Schema.Types.ObjectId,
    ref: 'Business',
    required: true
  },
  team_id: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  project_name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['planning', 'in-progress', 'completed', 'on-hold'],
    default: 'planning'
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

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;