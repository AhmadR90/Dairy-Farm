
// controllers/roleController.js
import Role from "../Models/RoleSchema.js";

// Create a new role
export const createRole = async (req, res) => {
  try {
    const { role_name, scope } = req.body;

    if (!role_name || !scope) {
      return res.status(400).json({ message: "role_name and scope are required" });
    }

    const newRole = new Role({ role_name, scope });
    await newRole.save();

    res.status(201).json({ message: "Role created successfully", role: newRole });
  } catch (error) {
    res.status(500).json({ message: "Failed to create role", error: error.message });
  }
};

// Get all roles
export const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find().lean();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch roles", error: error.message });
  }
};

// Get role by ID
export const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findById(id);

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch role", error: error.message });
  }
};

// Update role
export const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role_name, scope } = req.body;

    const updatedRole = await Role.findByIdAndUpdate(
      id,
      { role_name, scope },
      { new: true, runValidators: true }
    );

    if (!updatedRole) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.status(200).json({ message: "Role updated successfully", role: updatedRole });
  } catch (error) {
    res.status(500).json({ message: "Failed to update role", error: error.message });
  }
};

// Delete role
export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRole = await Role.findByIdAndDelete(id);

    if (!deletedRole) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.status(200).json({ message: "Role deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete role", error: error.message });
  }
};
