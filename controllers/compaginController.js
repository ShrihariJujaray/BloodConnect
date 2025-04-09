const Campaign = require("../models/compaignModel");
const User = require("../models/userModel");
const { Volunteer } = require("../models/volunteerMOdel");  // Update import

// Create new campaign
const createCampaign = async (req, res) => {
  try {
    const {
      title,
      description,
      image,
      date,
      location,
      volunteerContacts,
    } = req.body;

    // Validate required fields
    if (!title || !description || !image || !date || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userId = req.body.userId; // from JWT middleware
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: Missing user ID" });
    }

    // Fetch user details
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const campaign = new Campaign({
      campaignAdmin: userId,
      title,
      description,
      image,
      date,
      location,
      createdBy: {
        role: user.role,
        refId: user._id,
        name: user.name,
      },
      volunteerContacts: volunteerContacts || [],
    });

    const savedCampaign = await campaign.save();

    res.status(201).json({
      success: true,
      message: "Campaign created successfully",
      data: savedCampaign,
    });
  } catch (error) {
    console.error("Campaign Creation Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create campaign",
      error: error.message,
    });
  }
};

// Get all campaigns
const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find()
      .populate("campaignAdmin", "name email")
      .populate("volunteerContacts", "name email phone");
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get campaign by ID
const getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id)
      .populate("campaignAdmin", "name email")
      .populate("volunteerContacts", "name email phone");
    if (!campaign)
      return res.status(404).json({ message: "Campaign not found" });
    res.status(200).json(campaign);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update campaign
const updateCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!campaign)
      return res.status(404).json({ message: "Campaign not found" });
    res.status(200).json(campaign);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addVolunteersToCampaign = async (req, res) => {
  try {
    const campaignId = req.params.id;

    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
        return res.status(404).json({ message: "Campaign not found" });
    }
    console.log(campaign);


    const { volunteerContacts } = req.body;

    if (!Array.isArray(volunteerContacts) || volunteerContacts.length === 0) {
      return res.status(400).json({ message: "No volunteer contacts provided" });
    }

    // Create volunteers one by one to handle validation
    const createdVolunteers = [];
    for (const volunteerData of volunteerContacts) {
      const volunteer = new Volunteer(volunteerData);
      const savedVolunteer = await volunteer.save();
      createdVolunteers.push(savedVolunteer);
    }

    // Add volunteer IDs to campaign
    const updatedCampaign = await Campaign.findByIdAndUpdate(
      campaignId,
      { $addToSet: { volunteerContacts: createdVolunteers.map(v => v._id) } },
      { new: true }
    ).populate('volunteerContacts');

    if (!updatedCampaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    res.status(200).json({
      success: true,
      message: "Volunteers added successfully",
      data: {
        campaign: updatedCampaign,
        addedVolunteers: createdVolunteers
      }
    });
  } catch (error) {
    console.error("Error adding volunteers:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add volunteers",
      error: error.message
    });
  }
};

// Delete campaign
const deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndDelete(req.params.id);
    if (!campaign)
      return res.status(404).json({ message: "Campaign not found" });
    res.status(200).json({ message: "Campaign deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Assign volunteers to campaign
const assignVolunteers = async (req, res) => {
  try {
    const { volunteerIds } = req.body;
    const campaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { volunteerContacts: { $each: volunteerIds } } },
      { new: true }
    );
    if (!campaign)
      return res.status(404).json({ message: "Campaign not found" });
    res.status(200).json(campaign);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
  assignVolunteers,
  addVolunteersToCampaign
};
