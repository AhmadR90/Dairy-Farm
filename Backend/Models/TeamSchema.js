import mongoose from "mongoose";
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  team_name: {
    type: String,
    required: true,
    trim: true
  },
  business_id: {
    type: Schema.Types.ObjectId,
    ref: 'Business',
    required: true
  },
 
}, {
  timestamps: true
});

// MongoDB will automatically create the _id field which serves as the PK (team_id)

const Team = mongoose.model('Team', teamSchema);
module.exports = Team;