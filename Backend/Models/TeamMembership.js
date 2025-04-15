// models/TeamMembership.js
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const teamMembershipSchema = new Schema({
  team_id: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
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

teamMembershipSchema.index({ team_id: 1, user_id: 1 }, { unique: true });

const TeamMembership = mongoose.model('TeamMembership', teamMembershipSchema);
export default TeamMembership;