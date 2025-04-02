import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "react-loader-spinner";
import Layout from "../components/shared/Layout/Layout";
import Modal from "../components/shared/modal/Modal";
import API from "../services/API";
import moment from 'moment'

const HomePage = () => {
  const [data,setData] = useState([]);
  const { loading, error,user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const getBloodRecords= async()=>{
    try {
      const {data} = await API.get('/inventory/get-inventory');
      if(data?.success){
        setData(data?.inventory);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getBloodRecords();
  },[])

  return (
    <Layout>
      {user?.role === 'admin' && navigate('/admin')}
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
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
        <div className="container py-4">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Blood Inventory</h4>
              <button
                className="btn btn-light"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                <i className="fa-regular fa-square-plus"></i> Add New Record
              </button>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th scope="col">Blood Group</th>
                      <th scope="col">Type</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Donor Email</th>
                      <th scope="col">Date & Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((record) => (
                      <tr 
                        key={record._id}
                        className={`${
                          record.inventoryType.toLowerCase() === 'in'
                            ? 'table-success'
                            : 'table-danger'
                        } hover-shadow`}
                      >
                        <td className="fw-bold">{record.bloodGroup}</td>
                        <td>
                          <span className={`badge ${
                            record.inventoryType.toLowerCase() === 'in'
                              ? 'bg-success'
                              : 'bg-danger'
                          }`}>
                            {record.inventoryType.toUpperCase()}
                          </span>
                        </td>
                        <td>{record.quantity} ml</td>
                        <td>
                          <small>{record.email}</small>
                        </td>
                        <td>
                          <small>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</small>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Modal />
        </div>
      )}
    </Layout>
  );
};

export default HomePage;
