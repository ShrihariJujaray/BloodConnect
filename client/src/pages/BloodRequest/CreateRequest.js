import React, { useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CreateRequest = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bloodGroup: "",
    quantity: "",
    urgency: "normal",
    description: "",
    location: {
      address: "",
      city: "",
      state: "",
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/blood-requests/create", formData);
      if (data?.success) {
        toast.success("Blood request created successfully");
        navigate("/blood-requests");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating request");
    }
  };

  return (
    <Layout>
      <div className="container mt-4">
        <div className="card shadow">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">Create Blood Request</h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <select
                    className="form-select"
                    value={formData.bloodGroup}
                    onChange={(e) =>
                      setFormData({ ...formData, bloodGroup: e.target.value })
                    }
                    required
                  >
                    <option value="">Select Blood Group</option>
                    {["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"].map(
                      (group) => (
                        <option key={group} value={group}>
                          {group}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div className="col-md-6">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Quantity (ml)"
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData({ ...formData, quantity: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-12">
                  <select
                    className="form-select"
                    value={formData.urgency}
                    onChange={(e) =>
                      setFormData({ ...formData, urgency: e.target.value })
                    }
                  >
                    <option value="normal">Normal</option>
                    <option value="moderate">Moderate</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div className="col-12">
                  <textarea
                    className="form-control"
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateRequest;
