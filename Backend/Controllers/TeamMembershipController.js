 import TeamMembership from "../Models/TeamMembership.js";

// Create a new team membership
export const createTeamMembership = async (req, res) => {
  try {
    const { team_id, user_id, role_id } = req.body;

    const existing = await TeamMembership.findOne({ team_id, user_id });
    if (existing) {
      return res.status(400).json({ message: "Membership already exists for this user and team." });
    }

    const membership = new TeamMembership({ team_id, user_id, role_id });
    await membership.save();
    res.status(201).json(membership);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all team memberships
export const getAllTeamMemberships = async (req, res) => {
  try {
    const memberships = await TeamMembership.find()
      .populate("team_id user_id role_id");
    res.json(memberships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single team membership by ID
export const getTeamMembershipById = async (req, res) => {
  try {
    const membership = await TeamMembership.findById(req.params.id)
      .populate("team_id user_id role_id");
    if (!membership) {
      return res.status(404).json({ message: "Membership not found" });
    }
    res.json(membership);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update team membership by ID
export const updateTeamMembership = async (req, res) => {
  try {
    const membership = await TeamMembership.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!membership) {
      return res.status(404).json({ message: "Membership not found" });
    }
    res.json(membership);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete team membership by ID
export const deleteTeamMembership = async (req, res) => {
  try {
    const result = await TeamMembership.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Membership not found" });
    }
    res.json({ message: "Membership deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

