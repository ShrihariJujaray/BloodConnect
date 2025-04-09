const express = require('express');
const router = express.Router();
const { protect, checkRole } = require('../middlewares/authMiddleware');
const {
    createVolunteer,
    getAllVolunteers,
    getVolunteerById,
    updateVolunteer,
    deleteVolunteer,
    updateVolunteerStatus
} = require('../controllers/volunteerController');

// Protected routes
router.post('/', protect, createVolunteer);
router.get('/', protect, checkRole('admin', 'organization'), getAllVolunteers);
router.get('/:id', protect, getVolunteerById);
router.put('/:id', protect, updateVolunteer);
router.delete('/:id', protect, checkRole('admin'), deleteVolunteer);
router.patch('/:id/status', protect, checkRole('admin', 'organization'), updateVolunteerStatus);

module.exports = router;
