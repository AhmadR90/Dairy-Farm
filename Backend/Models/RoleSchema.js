// models/Role.js
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  role_name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  scope: {
    type: String,
    enum: ['business', 'team', 'project'],
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

const Role = mongoose.model('Role', roleSchema);
module.exports = Role;