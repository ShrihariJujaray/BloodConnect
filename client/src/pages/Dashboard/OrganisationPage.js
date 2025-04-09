import React, { useEffect, useState } from "react";
import Layout from "./../../components/shared/Layout/Layout";
import moment from "moment";
import { useSelector } from "react-redux";
import API from "../../services/API";
import { ProgressBar } from "react-loader-spinner";

const OrganisationPage = () => {
  // get current user
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [temp,setTemp] = useState(false);
  //find org records
  const getOrg = async () => {
    try {
        if(user?.role === 'donar'){
          const { data } = await API.get("/inventory/get-organisation");
          
          if (data?.success) {
          setData(data?.organisations);
          }
        }

      // if (user?.role === "hospital") {
      //   const { data } = await API.get(
      //     "/inventory/get-organisation-for-hospital"
      //   );
      //   //   console.log(data);
      //   if (data?.success) {
      //     setData(data?.organisations);
      //   }
      // }
    } catch (error) {
      console.log(error);

    }
    finally{
        setTemp(false);
    }
  };

  useEffect(() => {
      setTemp(true);
      getOrg();
  }, [user]);

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
            background: "linear-gradient(135deg, #2d98da, #74b9ff)",
          }}
        >
          <h3
            className="mb-0 text-center fw-semibold text-uppercase"
            style={{
              fontFamily: "Segoe UI, sans-serif",
              letterSpacing: "1px",
            }}
          >
            Organization Records
          </h3>
        </div>

        <div className="card-body bg-light p-4">
          <div className="table-responsive">
            <table className="table table-hover table-striped text-center align-middle mb-0">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Address</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((record) => (
                  <tr key={record._id}>
                    <td>{record.organisationName}</td>
                    <td>{record.email}</td>
                    <td>{record.phone}</td>
                    <td>{record.address}</td>
                    <td>
                      {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
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

export default OrganisationPage;