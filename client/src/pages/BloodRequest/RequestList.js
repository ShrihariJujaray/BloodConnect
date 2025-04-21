import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ProgressBar } from "react-loader-spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./RequestList.css";

const RequestList = () => {
  const [requests, setRequests] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [scheduleForm, setScheduleForm] = useState({
    date: null,
    time: "",
    contactNumber: "",
    alternateNumber: "",
    preferredContactTime: "",
    additionalNotes: "",
  });

  const getRequests = async () => {
    try {
      const { data } = await API.get("/blood-requests/all");
      if (data?.success) {
        setRequests(data.requests);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSchedule = async (requestId) => {
    try {
      if (!scheduleForm.date || !scheduleForm.contactNumber) {
        return toast.error("Date and contact number are required");
      }

      const { data } = await API.post(`/blood-requests/schedule/${requestId}`, {
        scheduledDate: scheduleForm.date,
        scheduledTime: scheduleForm.time,
        contactNumber: scheduleForm.contactNumber,
        alternateNumber: scheduleForm.alternateNumber,
        additionalNotes: scheduleForm.additionalNotes,
      });

      if (data?.success) {
        toast.success("Donation scheduled successfully");
        setShowDatePicker(false);
        setScheduleForm({
          date: null,
          time: "",
          contactNumber: "",
          alternateNumber: "",
          additionalNotes: "",
        });
        getRequests();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error scheduling donation");
    }
  };

  const handleCompleteRequest = async (requestId) => {
    try {
      const { data } = await API.post(`/blood-requests/complete/${requestId}`);
      if (data?.success) {
        toast.success("Request completed successfully");
        getRequests();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error completing request");
    }
  };

  const handleScheduleClick = (requestId) => {
    setSelectedRequestId(requestId);
    setShowDatePicker(true);
  };

  const renderDonorDetails = (request) => {
    if (
      !request.scheduledDonor ||
      !(user?.role === "hospital" || user?.role === "organisation")
    ) {
      return null;
    }

    return (
      <div className="donor-details mt-3">
        <h6 className="donor-section-title">
          <i className="fas fa-user-clock me-2"></i>
          Scheduled Donor Details
        </h6>
        <div className="donor-info">
          <div className="info-item">
            <i className="fas fa-user me-2"></i>
            <span>{request.scheduledDonor.donor?.name}</span>
          </div>
          <div className="info-item">
            <i className="fas fa-calendar-alt me-2"></i>
            <span>
              {moment(request.scheduledDonor.scheduledDate).format(
                "MMM D, YYYY"
              )}
            </span>
          </div>
          <div className="info-item">
            <i className="fas fa-clock me-2"></i>
            <span>
              {request.scheduledDonor.scheduledTime || "Not specified"}
            </span>
          </div>
          <div className="info-item">
            <i className="fas fa-phone-alt me-2"></i>
            <span>{request.scheduledDonor.contactNumber}</span>
          </div>
          {request.scheduledDonor.alternateNumber && (
            <div className="info-item">
              <i className="fas fa-phone me-2"></i>
              <span>{request.scheduledDonor.alternateNumber}</span>
            </div>
          )}
          {request.scheduledDonor.additionalNotes && (
            <div className="info-item notes">
              <i className="fas fa-sticky-note me-2"></i>
              <span>{request.scheduledDonor.additionalNotes}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  useEffect(() => {
    getRequests();
  }, []);

  return (
    <Layout>
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "60vh" }}
        >
          <ProgressBar
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="loading"
          />
        </div>
      ) : (
        <div className="container mt-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-primary fw-bold">Blood Requests</h2>
            {(user?.role === "hospital" || user?.role === "organisation") && (
              <button
                className="btn btn-primary px-4 py-2 d-flex align-items-center"
                onClick={() => navigate("/create-request")}
              >
                <i className="fas fa-plus-circle me-2"></i>
                Create Request
              </button>
            )}
          </div>
          <div className="row g-4">
            {requests.map((request) => (
              <div key={request._id} className="col-md-6 col-lg-4">
                <div className={`blood-request-card ${request.urgency}`}>
                  <div className="card-header">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="blood-group">{request.bloodGroup}</h5>
                      <span className={`status-badge ${request.status}`}>
                        {request.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="quantity-badge">
                      <i className="fas fa-tint me-2"></i>
                      {request.quantity} ml
                    </div>
                  </div>

                  <div className="card-body">
                    <p className="description">{request.description}</p>
                    <div className="requester-info">
                      <i className="fas fa-hospital me-2"></i>
                      <span>
                        {request.requester.name ||
                          request.requester.hospitalName ||
                          request.requester.organisationName}
                      </span>
                    </div>

                    <div className="time-info">
                      <i className="far fa-clock me-2"></i>
                      {moment(request.createdAt).fromNow()}
                    </div>

                    {user?.role === "donar" && request.status === "pending" && (
                      <button
                        className="btn btn-schedule mt-3 w-100"
                        onClick={() => handleScheduleClick(request._id)}
                      >
                        <i className="far fa-calendar-alt me-2"></i>
                        Schedule Donation
                      </button>
                    )}

                    {renderDonorDetails(request)}

                    {request.scheduledDonor &&
                      (user?.role === "hospital" ||
                        user?.role === "organisation") &&
                      request.status === "scheduled" && (
                        <div className="action-buttons mt-3">
                          <button
                            className="btn btn-success w-100"
                            onClick={() => handleCompleteRequest(request._id)}
                          >
                            <i className="fas fa-check-circle me-2"></i>
                            Complete Donation
                          </button>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {showDatePicker && (
        <div
          className="modal"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Schedule Donation</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDatePicker(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <DatePicker
                      selected={scheduleForm.date}
                      onChange={(date) =>
                        setScheduleForm({ ...scheduleForm, date })
                      }
                      minDate={new Date()}
                      dateFormat="MMMM d, yyyy"
                      className="form-control"
                      inline
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Preferred Time</label>
                      <input
                        type="time"
                        className="form-control"
                        value={scheduleForm.time}
                        onChange={(e) =>
                          setScheduleForm({
                            ...scheduleForm,
                            time: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Contact Number*</label>
                      <input
                        type="tel"
                        className="form-control"
                        required
                        value={scheduleForm.contactNumber}
                        onChange={(e) =>
                          setScheduleForm({
                            ...scheduleForm,
                            contactNumber: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Alternate Number</label>
                      <input
                        type="tel"
                        className="form-control"
                        value={scheduleForm.alternateNumber}
                        onChange={(e) =>
                          setScheduleForm({
                            ...scheduleForm,
                            alternateNumber: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Additional Notes</label>
                      <textarea
                        className="form-control"
                        value={scheduleForm.additionalNotes}
                        onChange={(e) =>
                          setScheduleForm({
                            ...scheduleForm,
                            additionalNotes: e.target.value,
                          })
                        }
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDatePicker(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleSchedule(selectedRequestId)}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default RequestList;
