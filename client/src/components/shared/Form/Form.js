import React, { useState } from "react";
import InputType from "./InputType";
import { Link } from "react-router-dom";
import { handleLogin, handleRegister } from "../../../services/authService";

const Form = ({ formType, submitBtn, formTitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donar");
  const [name, setName] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div
      style={{
        background: "linear-gradient(120deg, #f0f4f8, #d9e2ec)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        borderRadius: "25px",
      }}
    >
      <form
        onSubmit={(e) => {
          if (formType === "login")
            return handleLogin(e, email, password, role);
          else if (formType === "register")
            return handleRegister(
              e,
              name,
              role,
              email,
              password,
              organisationName,
              hospitalName,
              website,
              address,
              phone
            );
        }}
        style={{
          width: "100%",
          maxWidth: "500px",
          background: "#ffffff",
          padding: "2rem",
          borderRadius: "30px",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2
          className="fw-normal mb-3 text-center"
          style={{ letterSpacing: 1, color: "#333" }}
        >
          {formTitle}
        </h2>
        <hr style={{ borderTop: "1px solid #ccc" }} />

        <div className="d-flex flex-wrap justify-content-center gap-3 p-3 rounded-3 shadow-sm ">
          {["donar", "admin", "hospital", "organisation"].map((type) => (
            <div key={type} className="form-check form-check-inline">
              <input
                type="radio"
                className="btn-check"
                name="role"
                id={`${type}Radio`}
                value={type}
                onChange={(e) => setRole(e.target.value)}
                defaultChecked={type === "donar"}
              />
              <label
                className="btn btn-outline-primary rounded-pill px-4 py-2 text-capitalize"
                htmlFor={`${type}Radio`}
              >
                {type}
              </label>
            </div>
          ))}
        </div>

        {(() => {
          switch (formType) {
            case "login":
              return (
                <>
                  <InputType
                    labelText="Email"
                    lableForm="forEmail"
                    inputType="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType
                    labelText="Password"
                    lableForm="forPassword"
                    inputType="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </>
              );
            case "register":
              return (
                <>
                  {(role === "donar" || role === "admin") && (
                    <InputType
                      labelText="Name"
                      lableForm="forName"
                      inputType="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  )}
                  {role === "hospital" && (
                    <InputType
                      labelText="Hospital Name"
                      lableForm="forHospitalName"
                      inputType="text"
                      name="hospitalName"
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
                    />
                  )}
                  {role === "organisation" && (
                    <InputType
                      labelText="Organisation Name"
                      lableForm="forOrganisationName"
                      inputType="text"
                      name="organisationName"
                      value={organisationName}
                      onChange={(e) => setOrganisationName(e.target.value)}
                    />
                  )}
                  <InputType
                    labelText="Email"
                    lableForm="forEmail"
                    inputType="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType
                    labelText="Password"
                    lableForm="forPassword"
                    inputType="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputType
                    labelText="Website"
                    lableForm="forWebsite"
                    inputType="text"
                    name="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                  <InputType
                    labelText="Address"
                    lableForm="forAddress"
                    inputType="text"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <InputType
                    labelText="Phone No."
                    lableForm="forPhone"
                    inputType="text"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </>
              );
          }
        })()}

        <div className="pt-3 mt-3 d-flex flex-column align-items-center gap-2">
          <button
            className="btn btn-primary btn-lg w-100"
            type="submit"
            style={{ borderRadius: "6px", fontWeight: "500" }}
          >
            {submitBtn}
          </button>

          <p className="mt-2 text-center" style={{ fontSize: "0.9rem" }}>
            {formType === "login" ? (
              <>
                Don't have an account? <Link to="/register">Register</Link>
              </>
            ) : (
              <>
                Already have an account? <Link to="/login">Login</Link>
              </>
            )}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Form;
