import ProjectMembership from "../Models/ProjectMembership.js";

// Create a new project membership
export const createMembership = async (req, res) => {
  try {
    const { project_id, user_id, role_id } = req.body;

    const membership = new ProjectMembership({
      project_id,
      user_id,
      role_id
    });

    await membership.save();
    res.status(201).json(membership);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all memberships
export const getAllMemberships = async (req, res) => {
  try {
    const memberships = await ProjectMembership.find()
      .populate("project_id")
      .populate("user_id")
      .populate("role_id");

    res.status(200).json(memberships);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get memberships by project ID
export const getMembershipsByProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const memberships = await ProjectMembership.find({ project_id: projectId })
      .populate("user_id")
      .populate("role_id");

    res.status(200).json(memberships);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete membership
export const deleteMembership = async (req, res) => {
  try {
    const { id } = req.params;

    const membership = await ProjectMembership.findByIdAndDelete(id);

    if (!membership) {
      return res.status(404).json({ error: "Membership not found" });
    }

    res.status(200).json({ message: "Membership deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update membership role
export const updateMembershipRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role_id } = req.body;

    const membership = await ProjectMembership.findByIdAndUpdate(
      id,
      { role_id },
      { new: true }
    );

    if (!membership) {
      return res.status(404).json({ error: "Membership not found" });
    }

    res.status(200).json(membership);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
