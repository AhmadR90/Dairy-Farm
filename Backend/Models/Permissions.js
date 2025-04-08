// models/Permission.js
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const permissionSchema = new Schema({
  permission_name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
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

const Permission = mongoose.model('Permission', permissionSchema);
module.exports = Permission;