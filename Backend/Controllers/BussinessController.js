// controllers/businessController.js

import Business from "../Models/BussinessSchema.js"; // Adjust path if necessary

// Create a new business
export const createBusiness = async (req, res) => {
  try {
    const { business_name, business_type, super_admin_user_id } = req.body;

    if (!business_name || !business_type || !super_admin_user_id) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBusiness = new Business({
      business_name,
      business_type,
      super_admin_user_id,
    });
    await newBusiness.save();

    res.status(201).json({
      message: "Business created successfully",
      business: newBusiness,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create business", error: error.message });
  }
};

// Get all businesses
export const getAllBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find()
      .populate("super_admin_user_id")
      .lean();
    res.status(200).json(businesses);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch businesses", error: error.message });
  }
};

// Get business by ID
export const getBusinessById = async (req, res) => {
  try {
    const { id } = req.params;
    const business = await Business.findById(id).populate(
      "super_admin_user_id"
    );

    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }

    res.status(200).json(business);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch business", error: error.message });
  }
};

// Update business
export const updateBusiness = async (req, res) => {
  try {
    const { id } = req.params;
    const { business_name, business_type, super_admin_user_id } = req.body;

    const updatedBusiness = await Business.findByIdAndUpdate(
      id,
      { business_name, business_type, super_admin_user_id },
      { new: true, runValidators: true }
    );

    if (!updatedBusiness) {
      return res.status(404).json({ message: "Business not found" });
    }

    res.status(200).json({
      message: "Business updated successfully",
      business: updatedBusiness,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update business", error: error.message });
  }
};

// Delete business
export const deleteBusiness = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBusiness = await Business.findByIdAndDelete(id);

    if (!deletedBusiness) {
      return res.status(404).json({ message: "Business not found" });
    }

    res.status(200).json({ message: "Business deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete business", error: error.message });
  }
};
