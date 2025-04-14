import mongoose from "mongoose";
const Schema = mongoose.Schema;

const businessSchema = new Schema(
  {
    business_name: {
      type: String,
      required: true,
      trim: true,
    },
    business_type: {
      type: String,
      required: true,
      enum: [
        "Factory",
        "Shop",
        "Dairy Farm",
        "School",
        "Data Engineer",
        "Other",
      ],
    },
    super_admin_user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

// MongoDB will automatically create the _id field which serves as the PK (business_id)

const Business = mongoose.model("Business", businessSchema);
export default Business;
