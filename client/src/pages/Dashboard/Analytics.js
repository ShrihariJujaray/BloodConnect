import React, { useEffect, useState } from "react";
import Header from "../../components/shared/Layout/Header";
import API from "./../../services/API";
import moment from "moment";

const Analytics = () => {
  const [data, setData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const colors = [
    "#FFE4E1",
    "#E0FFFF",
    "#E6E6FA",
    "#FFFACD",
    "#D8BFD8",
    "#98FB98",
    "#FFDAB9",
    "#AFEEEE",
  ];

  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-recent-inventory");
      if (data?.success) {
        setInventoryData(data?.inventory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodRecords();
  }, []);

  const getBloodGroupData = async () => {
    try {
      const { data } = await API.get("/analytics/bloodGroups-data");
      if (data?.success) {
        setData(data?.bloodGroupData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodGroupData();
  }, []);

  return (
    <>
      <Header />
      <div className="container-fluid p-4">
        <div className="d-flex flex-row flex-wrap align-items-center justify-content-center gap-4">
          {data.map((record, i) => (
            <div
              key={i}
              className="card shadow-lg border-0"
              style={{
                width: "20rem",
                borderRadius: "15px",
                backgroundColor: colors[i % colors.length],
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.02)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <div className="card-body p-4">
                <h1 className="card-title display-4 text-center mb-4">
                  {record.bloodGroup}
                </h1>
                <div className="d-flex justify-content-between mb-3">
                  <span className="fw-semibold">Total In:</span>
                  <span className="fw-bold">{record.totalIn} ml</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="fw-semibold">Total Out:</span>
                  <span className="fw-bold">{record.totalOut} ml</span>
                </div>
              </div>
              <div
                className="card-footer text-white text-center py-3"
                style={{
                  backgroundColor: "#343a40",
                  borderBottomLeftRadius: "15px",
                  borderBottomRightRadius: "15px",
                }}
              >
                Available:{" "}
                <span className="fw-bold">{record.availabeBlood} ml</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <div className="card shadow border-0 rounded-4">
            <div
              className="card-header text-white text-center py-4 rounded-top"
              style={{
                backgroundColor: "rgba(230, 49, 97, 0.81)", // Bootstrap Primary Blue or use '#1e3d59' for a deep custom tone
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                letterSpacing: "1px",
              }}
            >
              <h3 className="mb-0 fw-semibold text-uppercase">
                Recent Blood Logs
              </h3>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0 table table-hover table-striped">
                  <thead className="table-dark text-center">
                    <tr>
                      <th>Blood Group</th>
                      <th>Inventory Type</th>
                      <th>Quantity</th>
                      <th>Donor Email</th>
                      <th>Date & Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventoryData?.map((record) => (
                      <tr
                        key={record._id}
                        className={
                          record.inventoryType.toLowerCase() === "in"
                            ? "table-success text-center"
                            : "table-danger text-center"
                        }
                      >
                        <td>{record.bloodGroup}</td>
                        <td>{record.inventoryType.toUpperCase()}</td>
                        <td>{record.quantity} ml</td>
                        <td>{record.email}</td>
                        <td>
                          {moment(record.createdAt).format(
                            "DD/MM/YYYY hh:mm A"
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
