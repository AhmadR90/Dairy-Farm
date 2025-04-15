import Permission from "../Models/Permissions.js";

// Create a new permission
export const createPermission = async (req, res) => {
  try {
    const { permission_name, description } = req.body;

    const existingPermission = await Permission.findOne({ permission_name });
    if (existingPermission) {
      return res.status(400).json({ message: "Permission already exists" });
    }

    const permission = new Permission({ permission_name, description });
    await permission.save();

    res.status(201).json({ message: "Permission created", permission });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all permissions
export const getAllPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find();
    res.status(200).json(permissions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get a single permission by ID
export const getPermissionById = async (req, res) => {
  try {
    const { id } = req.params;
    const permission = await Permission.findById(id);

    if (!permission) {
      return res.status(404).json({ message: "Permission not found" });
    }

    res.status(200).json(permission);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update a permission
export const updatePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const { permission_name, description } = req.body;

    const updated = await Permission.findByIdAndUpdate(
      id,
      { permission_name, description },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Permission not found" });
    }

    res.status(200).json({ message: "Permission updated", updated });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete a permission
export const deletePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Permission.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Permission not found" });
    }

    res.status(200).json({ message: "Permission deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
