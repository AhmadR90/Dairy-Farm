import mongoose from "mongoose";
const Schema = mongoose.Schema;

const businessMembershipSchema = new Schema({
  business_id: {
    type: Schema.Types.ObjectId,
    ref: 'Business',
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
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending'],
    default: 'pending',
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



// Create a compound index to ensure a user can have only one membership per business
// businessMembershipSchema.index({ business_id: 1, user_id: 1 }, { unique: true });

const BusinessMembership = mongoose.model('BusinessMembership', businessMembershipSchema);
export default BusinessMembership;