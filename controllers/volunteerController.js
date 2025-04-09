const Volunteer = require("../models/volunteerMOdel");

// Create new volunteer
const createVolunteer = async (req, res) => {
    try {
        const volunteer = new Volunteer(req.body);
        await volunteer.save();
        res.status(201).json(volunteer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all volunteers
const getAllVolunteers = async (req, res) => {
    try {
        const volunteers = await Volunteer.find()
            .populate('organisation', 'organisationName email');
        res.status(200).json(volunteers);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get volunteer by ID
const getVolunteerById = async (req, res) => {
    try {
        const volunteer = await Volunteer.findById(req.params.id)
            .populate('organisation', 'organisationName email');
        if (!volunteer) return res.status(404).json({ message: "Volunteer not found" });
        res.status(200).json(volunteer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update volunteer
const updateVolunteer = async (req, res) => {
    try {
        const volunteer = await Volunteer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!volunteer) return res.status(404).json({ message: "Volunteer not found" });
        res.status(200).json(volunteer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete volunteer
const deleteVolunteer = async (req, res) => {
    try {
        const volunteer = await Volunteer.findByIdAndDelete(req.params.id);
        if (!volunteer) return res.status(404).json({ message: "Volunteer not found" });
        res.status(200).json({ message: "Volunteer deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update volunteer status
const updateVolunteerStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const volunteer = await Volunteer.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!volunteer) return res.status(404).json({ message: "Volunteer not found" });
        res.status(200).json(volunteer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createVolunteer,
    getAllVolunteers,
    getVolunteerById,
    updateVolunteer,
    deleteVolunteer,
    updateVolunteerStatus
};
