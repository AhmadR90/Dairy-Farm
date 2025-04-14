import Team from "../Models/TeamSchema.js"; // Adjust path if necessary

// Create a new team
export const createTeam = async (req, res) => {
  try {
    const { team_name, business_id } = req.body;

    const newTeam = new Team({ team_name, business_id });
    await newTeam.save();

    res
      .status(201)
      .json({ message: "Team created successfully", team: newTeam });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create team", error: error.message });
  }
};

// Get all teams
export  const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find().populate("business_id");
    res.status(200).json(teams);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch teams", error: error.message });
  }
};

// Get a single team by ID
export  const getTeamById = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findById(id).populate("business_id");

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.status(200).json(team);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch team", error: error.message });
  }
};

// Update a team
export const updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const { team_name, business_id } = req.body;

    const updatedTeam = await Team.findByIdAndUpdate(
      id,
      { team_name, business_id },
      { new: true, runValidators: true }
    );

    if (!updatedTeam) {
      return res.status(404).json({ message: "Team not found" });
    }

    res
      .status(200)
      .json({ message: "Team updated successfully", team: updatedTeam });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update team", error: error.message });
  }
};

// Delete a team
export  const deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTeam = await Team.findByIdAndDelete(id);

    if (!deletedTeam) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.status(200).json({ message: "Team deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete team", error: error.message });
  }
};


