const Campaign = require("../models/compaignModel");

// Create new campaign
const createCampaign = async (req, res) => {
    try {
        const {title, description, image, date, location, volunteerContacts} = req.body;
        const campaign = new Campaign({
            campaignAdmin: req.user._id,
            title,
            description,
            image,
            date,
            location,
            createdBy: {
                role: req.user.role,
                refId: req.user._id
            },
            volunteerContacts
        });
        await campaign.save();
        res.status(201).json(campaign);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all campaigns
const getAllCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find()
            .populate('campaignAdmin', 'name email')
            .populate('volunteerContacts', 'name email phone');
        res.status(200).json(campaigns);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get campaign by ID
const getCampaignById = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id)
            .populate('campaignAdmin', 'name email')
            .populate('volunteerContacts', 'name email phone');
        if (!campaign) return res.status(404).json({ message: "Campaign not found" });
        res.status(200).json(campaign);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update campaign
const updateCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!campaign) return res.status(404).json({ message: "Campaign not found" });
        res.status(200).json(campaign);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete campaign
const deleteCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.findByIdAndDelete(req.params.id);
        if (!campaign) return res.status(404).json({ message: "Campaign not found" });
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
        if (!campaign) return res.status(404).json({ message: "Campaign not found" });
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
    assignVolunteers
};
