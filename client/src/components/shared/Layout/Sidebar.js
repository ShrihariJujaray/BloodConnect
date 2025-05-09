import React from "react";
// import { userMenu } from './Menus/userMenu'
import { Link, useLocation } from "react-router-dom";
import "../../../styles/Layout.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import ChatBox from "../../ChatBox/ChatBox";

const Sidebar = () => {
  const location = useLocation();

  const [showChat, setShowChat] = useState(false);

  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <div className="sidebar">
        <div className="menu">
          <div className={`menu-item ${location.pathname === "/" && "active"}`}>
            <i className="fa-solid fa-house"></i>
            <Link to="/">Home</Link>
          </div>

          {user?.role === "organisation" && (
            <>
              <div
                className={`menu-item ${location.pathname === "/" && "active"}`}
              >
                <i className="fa-solid fa-cubes"></i>
                <Link to="/">Inventory</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/donar" && "active"
                }`}
              >
                <i className="fa-solid fa-hand-holding-medical"></i>
                <Link to="/donar">Donars</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/hospital" && "active"
                }`}
              >
                <i className="fa-solid fa-truck-medical"></i>
                <Link to="/hospital">Hospitals</Link>
              </div>
            </>
          )}

          {user?.role === "admin" && (
            <>
              <div
                className={`menu-item ${
                  location.pathname === "/donar-list" && "active"
                }`}
              >
                <i className="fa-solid fa-hand-holding-medical"></i>
                <Link to="/donar-list">Donar List</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/hospital-list" && "active"
                }`}
              >
                <i className="fa-solid fa-truck-medical"></i>
                <Link to="/hospital-list">Hospital List</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/org-list" && "active"
                }`}
              >
                <i className="fa-solid fa-hospital"></i>
                <Link to="/org-list">Organisation List</Link>
              </div>
            </>
          )}

          {user?.role === "donar" && (
            <>
              <div
                className={`menu-item ${
                  location.pathname === "/organisation" && "active"
                }`}
              >
                <i className="fa-solid fa-building-ngo"></i>
                <Link to="/organisation">Organisations</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/blood-requests" && "active"
                }`}
              >
                <i className="fa-solid fa-hand-holding-medical"></i>
                <Link to="/blood-requests">Blood Requests</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/donation" && "active"
                }`}
              >
                <i className="fa-solid fa-book-medical"></i>
                <Link to="/donation">Donations Log</Link>
              </div>
            </>
          )}

          {(user?.role === "hospital" || user?.role === "organisation") && (
            <>
              <div
                className={`menu-item ${
                  location.pathname === "/analytics" && "active"
                }`}
              >
                <i className="fa-solid fa-chart-line"></i>
                <Link to="/analytics">Analytics</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/createcampaign" && "active"
                }`}
              >
                <i className="fa-solid fa-calendar-plus"></i>
                <Link to="/createcampaign">Create Campaign</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/blood-requests" && "active"
                }`}
              >
                <i className="fa-solid fa-hand-holding-medical"></i>
                <Link to="/blood-requests">Blood Requests</Link>
              </div>
            </>
          )}

          {user?.role === "hospital" && (
            <div
              className={`menu-item ${
                location.pathname === "/consumer" && "active"
              }`}
            >
              <i className="fa-solid fa-users-between-lines"></i>
              <Link to="/consumer">Consumer</Link>
            </div>
          )}

          <div className="menu-item" onClick={() => setShowChat(!showChat)}>
            <i className="fa-solid fa-robot"></i>
            <span>AI Chat Assist</span>
          </div>

          {showChat && <ChatBox onClose={() => setShowChat(false)} />}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
