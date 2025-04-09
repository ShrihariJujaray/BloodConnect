const express = require("express");
const router = express.Router();
const authMiddelware = require("../middleware/authMiddleware");
const {
  createVolunteer,
  getAllVolunteers,
  getVolunteerById,
  updateVolunteer,
  deleteVolunteer,
  updateVolunteerStatus,
} = require("../controllers/volunteerController");

// Protected routes
router.post("/", authMiddelware, createVolunteer);
router.get("/", authMiddelware, getAllVolunteers);
router.get("/:id", authMiddelware, getVolunteerById);
router.put("/:id", authMiddelware, updateVolunteer);
router.delete("/:id", authMiddelware, deleteVolunteer);
router.patch("/:id/status", authMiddelware, updateVolunteerStatus);

module.exports = router;
