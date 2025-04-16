import Milestone from "../Models/MilestoneSchema.js";
import mongoose from "mongoose";
// Create Milestone
export const createMilestone = async (req, res) => {
  try {
    const milestone = new Milestone(req.body);
    const savedMilestone = await milestone.save();
    res.status(201).json({ message: "Milestone created", data: savedMilestone });
  } catch (error) {
    res.status(500).json({ message: "Error creating milestone", error: error.message });
  }
};

// Get All Milestones (optional filter by project_id)

export const getMilestones = async (req, res) => {
  try {
    const { project_id } = req.query;

    if (!project_id) {
      return res.status(400).json({ message: "project_id is required" });
    }

    const milestones = await Milestone.find({
      project_id: new mongoose.Types.ObjectId(project_id)
    }).sort({ due_date: 1 });

    res.status(200).json({ data: milestones });
  } catch (error) {
    res.status(500).json({ message: "Error fetching milestones", error: error.message });
  }
};


// Get Single Milestone by ID
// export const getMilestoneById = async (req, res) => {
//   try {
//     const milestone = await Milestone.findById(req.params.project_id);
//     if (!milestone) return res.status(404).json({ message: "Milestone not found" });
//     res.status(200).json({ data: milestone });
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching milestone", error: error.message });
//   }
// };
export const getMilestonesByProject = async (req, res) => {
    try {
      const { projectId } = req.params;
  
      const milestones = await Milestone.findById({ project_id: projectId }).sort({ due_date: 1 });
  
      res.status(200).json({ data: milestones.data });
    } catch (error) {
      res.status(500).json({ message: "Error fetching milestones", error: error.message });
    }
  };

// Update Milestone
export const updateMilestone = async (req, res) => {
  try {
    const updated = await Milestone.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Milestone not found" });
    res.status(200).json({ message: "Milestone updated", data: updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating milestone", error: error.message });
  }
};

// Delete Milestone
export const deleteMilestone = async (req, res) => {
  try {
    const deleted = await Milestone.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Milestone not found" });
    res.status(200).json({ message: "Milestone deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting milestone", error: error.message });
  }
};
