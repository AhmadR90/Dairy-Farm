import RolePermission from '../Models/RolePermission.js';

// Assign a permission to a role
export const assignPermission = async (req, res) => {
  try {
    const { role_id, permission_id } = req.body;

    const existing = await RolePermission.findOne({ role_id, permission_id });
    if (existing) {
      return res.status(400).json({ message: "Permission already assigned to this role" });
    }

    const newAssignment = new RolePermission({ role_id, permission_id });
    await newAssignment.save();

    res.status(201).json({ message: "Permission assigned successfully", data: newAssignment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all role-permission assignments
export const getAllRolePermissions = async (req, res) => {
  try {
    const all = await RolePermission.find()
      .populate('role_id', 'role_name')
      .populate('permission_id', 'permission_name');

    res.status(200).json(all);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all permissions for a specific role
export const getPermissionsByRole = async (req, res) => {
  try {
    const { roleId } = req.params;

    const permissions = await RolePermission.find({ role_id: roleId })
      .populate('permission_id', 'permission_name');

    res.status(200).json(permissions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Remove a permission from a role
export const removePermission = async (req, res) => {
  try {
    const { roleId, permissionId } = req.params;

    const deleted = await RolePermission.findOneAndDelete({
      role_id: roleId,
      permission_id: permissionId
    });

    if (!deleted) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.status(200).json({ message: "Permission removed from role" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
