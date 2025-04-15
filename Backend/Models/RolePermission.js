// models/RolePermission.js
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const rolePermissionSchema = new Schema(
  {
    role_id: {
      type: Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    permission_id: {
      type: Schema.Types.ObjectId,
      ref: "Permissions",
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

rolePermissionSchema.index({ role_id: 1, permission_id: 1 }, { unique: true });

const RolePermission = mongoose.model("RolePermission", rolePermissionSchema);
export default RolePermission;
