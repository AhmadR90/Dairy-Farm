import BusinessMembership from "../Models/BussinessMembership.js";

// Create a new business membership
export const createMembership = async (req, res) => {
  try {
    const { business_id, user_id, role_id, status } = req.body;

    const existing = await BusinessMembership.findOne({ business_id, user_id });
    if (existing) {
      return res.status(400).json({ message: "Membership already exists for this user and business." });
    }

    const membership = new BusinessMembership({ business_id, user_id, role_id, status });
    await membership.save();
    res.status(201).json(membership);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all memberships
export const getAllMemberships = async (req, res) => {
  try {
    const memberships = await BusinessMembership.find()
      .populate("business_id user_id role_id");
    res.json(memberships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get membership by ID
export const getMembershipById = async (req, res) => {
  try {
    const membership = await BusinessMembership.findById(req.params.id)
      .populate("business_id user_id role_id");
    if (!membership) return res.status(404).json({ message: "Membership not found" });
    res.json(membership);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update membership by ID
export const updateMembership = async (req, res) => {
  try {
    const membership = await BusinessMembership.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!membership) return res.status(404).json({ message: "Membership not found" });
    res.json({message:"Membership Updated Siccessfuly",membership});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete membership by ID
export const deleteMembership = async (req, res) => {
  try {
    const result = await BusinessMembership.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: "Membership not found" });
    res.json({ message: "Membership deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
