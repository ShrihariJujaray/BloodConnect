const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createBloodRequest,
  getAllBloodRequests,
  getMyBloodRequests,
  scheduleDonation,
  updateRequestStatus,
  completeRequest,
} = require("../controllers/bloodRequestController");

const router = express.Router();

// Routes with proper controller functions
router.post("/create", authMiddleware, createBloodRequest);
router.get("/all", authMiddleware, getAllBloodRequests);
router.get("/my-requests", authMiddleware, getMyBloodRequests);
router.post("/schedule/:requestId", authMiddleware, scheduleDonation);
router.put("/status/:requestId", authMiddleware, updateRequestStatus);
router.post("/complete/:requestId", authMiddleware, completeRequest);

module.exports = router;
