import React, { useEffect, useState } from "react";
import { MdOutlineBloodtype } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";
import { FaUserAlt, FaStethoscope } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  //logout handler
  const handleLogout = () => {
    localStorage.clear();
    alert("Logout Successful !");
    window.location.reload();
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <>
      <nav
        className="navbar shadow-lg"
        style={{
          background: "linear-gradient(to right, #1a1a2e, #16213e)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div
          className="container-fluid"
          style={{
            background: "linear-gradient(to right, #1a1a2e, #16213e)",
          }}
        >
          <div className="navbar-brand d-flex justify-content-center align-items-center ms-3 cursor-pointer">
            <Link to="/" className="text-decoration-none text-white d-flex align-items-center">
              <FaStethoscope className="me-2" style={{ color: '#ff4d4d', fontSize: '24px' }} />
              <span className="fs-3">RED BLOOD</span>
            </Link>
          </div>

          <div className="position-relative">
            <button
              onClick={toggleDropdown}
              style={{
                background: "rgba(255,255,255,0.08)",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "4px",
                padding: "8px 12px",
                transition: "all 0.3s ease",
                display: "flex",
              }}
            >
              <FaUserAlt  style={{ color: "#ff4d4d" }} />
              {/* <span className="me-2">{user?.name || user?.hospitalName || user?.organisationName}</span>
              <span className="badge rounded-pill" style={{
                background: "rgba(255,77,77,0.1)",
                color: "#ff4d4d",
                border: "1px solid #ff4d4d",
              }}>{user?.role}</span> */}
            </button>

            {isOpen && (
              <div className="position-absolute end-0 mt-2 py-2" style={{
                background: "linear-gradient(to right, #1a1a2e, #16213e)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "4px",
                minWidth: "200px",
                zIndex: 1000,
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
              }}>
                <div className=" dropdown-header d-flex align-items-center px-3 py-2" style={{
                  background: "rgba(255,255,255,0.08)",
                  color: "#ffffff",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  borderTopLeftRadius: "4px",
                  borderTopRightRadius: "4px",
                  }}>
                  <span className="me-2">{user?.name || user?.hospitalName || user?.organisationName}</span>
              <span className="badge rounded-pill" style={{
                background: "white",

                color: "#000",
                padding: "2px 6px",
                border: "1px solid #00ff00",
              }}>{user?.role}</span>
              </div>
                <Link
                  to={location.pathname === "/" || location.pathname === "/donar" || location.pathname === "/hospital" ? "/analytics" : "/"}
                  className="dropdown-item d-flex align-items-center px-3 py-2"
                  style={{
                    color: "#ff4d4d",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) => e.target.style.background = "rgba(255,77,77,0.1)"}
                  onMouseOut={(e) => e.target.style.background = "transparent"}
                >
                  {location.pathname === "/" || location.pathname === "/donar" || location.pathname === "/hospital" ? "Analytics" : "Home"}
                </Link>

                <button
                  onClick={handleLogout}
                  className="dropdown-item d-flex align-items-center px-3 py-2 w-100 text-start"
                  style={{
                    color: "#ffffff",
                    border: "none",
                    background: "transparent",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) => e.target.style.background = "rgba(255,255,255,0.1)"}
                  onMouseOut={(e) => e.target.style.background = "transparent"}
                >
                  <HiOutlineLogout className="me-2" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
