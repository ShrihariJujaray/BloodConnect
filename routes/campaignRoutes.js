const express = require('express');
const router = express.Router();
const { protect, checkRole } = require('../middlewares/authMiddleware');
const {
    createCampaign,
    getAllCampaigns,
    getCampaignById,
    updateCampaign,
    deleteCampaign,
    assignVolunteers
} = require('../controllers/compaginController');

// Public routes
router.get('/', getAllCampaigns);
router.get('/:id', getCampaignById);

// Protected routes
router.post('/', protect, checkRole('admin', 'hospital', 'organization'), createCampaign);
router.put('/:id', protect, checkRole('admin', 'hospital', 'organization'), updateCampaign);
router.delete('/:id', protect, checkRole('admin'), deleteCampaign);
router.post('/:id/volunteers', protect, checkRole('admin', 'organization'), assignVolunteers);

module.exports = router;
