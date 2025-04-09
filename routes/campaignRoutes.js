const express = require('express');
const router = express.Router();
const authMiddelware = require("../middleware/authMiddleware");
const {
    createCampaign,
    getAllCampaigns,
    getCampaignById,
    updateCampaign,
    deleteCampaign,
    assignVolunteers,
    addVolunteersToCampaign
} = require('../controllers/compaginController');

// Public routes
router.get('/getcampaigns', getAllCampaigns);
router.get('/:id', getCampaignById);

// Protected routes
router.post('/createcampaign',authMiddelware, createCampaign);
router.put('/updatecampaign/:id',authMiddelware, updateCampaign);
// POST /api/campaigns/:id/volunteers
router.post("/:id/volunteers/add-contacts",authMiddelware,addVolunteersToCampaign);

router.delete('/deletecampaign/:id',authMiddelware, deleteCampaign);
router.post('/campaign/:id/volunteers',authMiddelware, assignVolunteers);

module.exports = router;
