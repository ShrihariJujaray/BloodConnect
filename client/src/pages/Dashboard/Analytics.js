import React, { useEffect, useState } from "react";
import Header from "../../components/shared/Layout/Header";
import API from "./../../services/API";
import moment from "moment";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{
          backgroundColor: '#fff',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <p className="label mb-2"><strong>{`Blood Group : ${label}`}</strong></p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.stroke }}>
              {`${entry.name} : ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <Header />
      <div className="container-fluid p-4">
        <div className="card shadow-lg border-0 rounded-4">
          <div className="card-header text-center py-2 rounded-top"
            style={{
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
           fontSize: '1rem',
           color: '#000',
           floating: 'left',
            }}>
            <h3 className="mb-0  text-uppercase">Blood Group Analytics</h3>
          </div>
          <div className="card-body p-4">
            <ResponsiveContainer width="100%" height={500}>
              <LineChart 
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis 
                  dataKey="bloodGroup" 
                  tick={{ fill: '#666' }}
                  tickLine={{ stroke: '#666' }}
                />
                <YAxis
                  tick={{ fill: '#666' }}
                  tickLine={{ stroke: '#666' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  wrapperStyle={{ 
                    paddingTop: '20px',
                    fontSize: '14px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="totalIn" 
                  stroke="#2ecc71" 
                  strokeWidth={2}
                  dot={{ fill: '#2ecc71', strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                  name="Total In (ml)" 
                />
                <Line 
                  type="monotone" 
                  dataKey="totalOut" 
                  stroke="#e74c3c" 
                  strokeWidth={2}
                  dot={{ fill: '#e74c3c', strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                  name="Total Out (ml)" 
                />
                <Line 
                  type="monotone" 
                  dataKey="availabeBlood" 
                  stroke="#3498db" 
                  strokeWidth={2}
                  dot={{ fill: '#3498db', strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                  name="Available (ml)" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-5">
          <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
            <div className="card-header text-black text-center py-4 rounded-top"
              style={{
            display : 'flex',
            justifyContent : 'start',
            alignItems : 'center',
            fontSize : '1rem',
            color : '#000',
            floating : 'left',
              }}>
              <h3 className="mb-0 text-uppercase">Recent Blood Logs</h3>
            </div>
            <div className="card-body p-3 overflow-auto">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr className="bg-light">
                      <th className="py-3 text-center">Blood Group</th>
                      <th className="py-3 text-center">Inventory Type</th>
                      <th className="py-3 text-center">Quantity</th>
                      <th className="py-3 text-center">Donor Email</th>
                      <th className="py-3 text-center">Date & Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventoryData?.map((record) => (
                      <tr
                        key={record._id}
                        className={`${
                          record.inventoryType.toLowerCase() === "in"
                            ? "table-success-subtle"
                            : "table-danger-subtle"
                        } text-center transition-row`}
                        style={{
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <td className="py-3">{record.bloodGroup}</td>
                        <td className="py-3">
                          <span className={`badge ${
                            record.inventoryType.toLowerCase() === "in"
                              ? "bg-success"
                              : "bg-danger"
                          }`}>
                            {record.inventoryType.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3">{record.quantity} ml</td>
                        <td className="py-3">{record.email}</td>
                        <td className="py-3">{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hover-shadow {
          transition: all 0.3s ease;
        }
        .hover-shadow:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.2) !important;
        }
        .transition-row:hover {
          transform: scale(1.01);
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
      `}</style>
    </>
  );
};

export default Analytics;
