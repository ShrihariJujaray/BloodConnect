const BloodRequest = require("../models/bloodRequestModel");
const inventoryModel = require("../models/inventoryModel");

// Create blood request
const createBloodRequest = async (req, res) => {
  try {
    const { bloodGroup, quantity, urgency, description } = req.body;

    // Validate required fields
    if (!bloodGroup || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Blood group and quantity are required",
      });
    }

    const request = new BloodRequest({
      requester: req.body.userId,
      bloodGroup,
      quantity,
      urgency: urgency || "normal",
      description,
    });

    await request.save();

    return res.status(201).json({
      success: true,
      message: "Blood request created successfully",
      request,
    });
  } catch (error) {
    console.log("Blood request creation error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Error in creating blood request",
      error,
    });
  }
};

// Get all blood requests
const getAllBloodRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find()
      .populate("requester", "name hospitalName organisationName email phone")
      .populate("scheduledDonor.donor", "name email phone")
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "Blood requests fetched successfully",
      requests,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in fetching blood requests",
      error,
    });
  }
};

// Get my blood requests
const getMyBloodRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find({ requester: req.body.userId })
      .populate("requester", "name hospitalName organisationName email phone")
      .populate("scheduledDonor.donor", "name email phone")
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "My blood requests fetched successfully",
      requests,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in fetching blood requests",
      error,
    });
  }
};

// Schedule donation
const scheduleDonation = async (req, res) => {
  try {
    const {
      scheduledDate,
      scheduledTime,
      contactNumber,
      alternateNumber,
      additionalNotes,
    } = req.body;
    const request = await BloodRequest.findById(req.params.requestId);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Blood request not found",
      });
    }

    request.status = "scheduled";
    request.scheduledDonor = {
      donor: req.body.userId,
      scheduledDate,
      scheduledTime,
      contactNumber,
      alternateNumber,
      additionalNotes,
      status: "scheduled",
    };

    await request.save();

    return res.status(200).json({
      success: true,
      message: "Donation scheduled successfully",
      request,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in scheduling donation",
      error,
    });
  }
};

// Update request status
const updateRequestStatus = async (req, res) => {
  try {
    const request = await BloodRequest.findByIdAndUpdate(
      req.params.requestId,
      { status: req.body.status },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Request status updated successfully",
      request,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating request status",
      error,
    });
  }
};

// Complete request
const completeRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const request = await BloodRequest.findById(requestId)
      .populate("scheduledDonor.donor")
      .populate("requester");

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    // Create inventory entry
    const inventoryData = {
      inventoryType: "in",
      bloodGroup: request.bloodGroup,
      quantity: request.quantity,
      email: request.scheduledDonor.donor.email,
      organisation: request.requester._id,
      donar: request.scheduledDonor.donor._id,
    };

    const inventory = new inventoryModel(inventoryData);
    await inventory.save();

    // Update request status
    request.status = "completed";
    request.scheduledDonor.status = "completed";
    await request.save();

    return res.status(200).json({
      success: true,
      message: "Request completed and inventory updated",
      request,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in completing request",
      error,
    });
  }
};

module.exports = {
  createBloodRequest,
  getAllBloodRequests,
  getMyBloodRequests,
  scheduleDonation,
  updateRequestStatus,
  completeRequest,
};
