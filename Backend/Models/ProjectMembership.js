// models/ProjectMembership.js
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const projectMembershipSchema = new Schema({
  project_id: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  role_id: {
    type: Schema.Types.ObjectId,
    ref: 'Role',
    required: true
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

projectMembershipSchema.index({ project_id: 1, user_id: 1 }, { unique: true });

const ProjectMembership = mongoose.model('ProjectMembership', projectMembershipSchema);
module.exports = ProjectMembership;