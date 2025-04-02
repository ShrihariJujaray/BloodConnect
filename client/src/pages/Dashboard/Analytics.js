import React, { useEffect, useState } from "react";
import Header from "../../components/shared/Layout/Header";
import API from "./../../services/API";
import moment from "moment";

const Analytics = () => {
  const [data, setData] = useState([]);
  const [inventoryData,setInventoryData] = useState([]);
  const colors = ['#98D8FF','#FF8080','#F8F0E5','#F6FDC3', '#CDFAD5','#CDF0EA', '#F6C6EA', '#DFCCFB']


  const getBloodRecords= async()=>{
    try {
      const {data} = await API.get('/inventory/get-recent-inventory');
      if(data?.success){
        setInventoryData(data?.inventory);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getBloodRecords();
  },[])

  const getBloodGroupData = async () => {
    try {
      const { data } = await API.get("/analytics/bloodGroups-data");
      if (data?.success) {
        setData(data?.bloodGroupData);
        console.log(data)
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
          {data.map((record,i) => (
            <div className="card shadow-lg" style={{ width: "20rem", borderRadius: '15px' ,backgroundColor:`${colors[i]}`, transition: 'transform 0.2s' }} 
                 onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                 onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
              <div className="card-body p-4">
                <h1 className="card-title display-4 text-center mb-4">{record.bloodGroup}</h1>
                <div className="d-flex justify-content-between mb-3">
                  <span>Total In:</span>
                  <span className="fw-bold">{record.totalIn} ml</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Total Out:</span>
                  <span className="fw-bold">{record.totalOut} ml</span>
                </div>
              </div>
              <div className="card-footer text-light bg-dark text-center py-3 rounded-bottom">
                Available: <span className="fw-bold">{record.availabeBlood} ml</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-5">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h2 className="mb-0">Recent Blood Logs</h2>
            </div>
            <div className="card-body">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Blood Groud</th>
                    <th scope="col">InventoryType</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Donar Email</th>
                    <th scope="col">Time Date</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryData?.map((record)=>(
                    <tr className={(record.inventoryType.toLowerCase() === 'in') ? 'table-success' : 'table-danger'} key={record._id}>
                      <td>{record.bloodGroup}</td>
                      <td>{record.inventoryType.toUpperCase()}</td>
                      <td>{record.quantity} ml</td>
                      <td>{record.email}</td>
                      <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
