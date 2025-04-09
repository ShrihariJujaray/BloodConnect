import moment from "moment";
import React, { useEffect, useState } from "react";
import Layout from "../components/shared/Layout/Layout";
import API from "../services/API";
import { useSelector } from "react-redux";
import { ProgressBar } from "react-loader-spinner";

const Donation = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [temp, setTemp] = useState(false);
  //find donar records
  const getDonars = async () => {
    try {
      const { data } = await API.post("/inventory/get-inventory-hospital", {
        filters: {
          inventoryType: "in",
          donar: user?._id,
        },
      });
      if (data?.success) {
        setData(data?.inventory);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTemp(false);
    }
  };

  useEffect(() => {
    setTemp(true);
    getDonars();
  }, []);

  return (
    <Layout>
      {temp ? (
        <div className="d-flex justify-content-center align-items-center">
          <ProgressBar
            visible={true}
            height="200"
            width="200"
            color="#4fa94d"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <div className="container mt-5">
          <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
            <div
              className="card-header text-white py-4 px-5"
              style={{
                background: "linear-gradient(135deg, #2e86de, #48c6ef)",
              }}
            >
              <h3
                className="mb-0 text-center fw-semibold text-uppercase"
                style={{
                  fontFamily: "Segoe UI, sans-serif",
                  letterSpacing: "1px",
                }}
              >
                Donation History
              </h3>
            </div>

            <div className="card-body bg-light p-4">
              <div className="table-responsive">
                <table className="table table-hover table-striped text-center align-middle mb-0">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">Blood Group</th>
                      <th scope="col">Donated To</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Email</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((record) => (
                      <tr key={record._id}>
                        <td>{record?.bloodGroup || "N/A"}</td>
                        <td>{record?.organisation?.email || "N/A"}</td>
                        <td>{record?.quantity} ml</td>
                        <td>{record?.email || "N/A"}</td>
                        <td>
                          {moment(record?.createdAt).format(
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
      )}
    </Layout>
  );
};

export default Donation;
