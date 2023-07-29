import React, { useState } from "react";
import axios from "axios";
import { Link, useLocation, Navigate } from "react-router-dom";

import "./style1.css";

export default function Signup() {
  const location = useLocation();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    repeatPassword: "",
    agreedToTerms: false,
  });

  const [error, setError] = useState({
    type: "",
    message: "",
  });
  const [user, setUser] = useState(null);

  const handleInputChange = (event) => {
    setError({ type: "", message: "" });
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (formData.password.length < 8 || !/\d/.test(formData.password)) {
      setError({
        type: "password",
        message:
          "Password must be at least 8 characters long and contain at least one number",
      });
      return;
    }

    if (formData.password !== formData.repeatPassword) {
      setError({ type: "mismatch", message: "Passwords do not match" });
      return;
    }
    const sendingData = {
      username: formData.username,
      password: formData.password,
    };
    try {
      const response = await axios.post(
        "http://localhost:8080/user/signup",
        sendingData
      );
      setUser(response.data);
      setError({ type: "success", message: "User registration successful." });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError({ type: "username", message: "Username already exists." });
      } else {
        setError({ type: "server", message: "Server error." });
      }
    }
  };

  const json = localStorage.getItem("token");
  if (json != null) {
    return <Navigate to="/" />;
  } else {
    return (
      <div>
        <title>Signup</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
          integrity="sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog=="
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href="style1.css" />
        <div className="container">
          <div className="myCard">
            <div className="row">
              <div className="col-md-6">
                <div className="myLeftCtn">
                  <form
                    className="myForm text-center"
                    onSubmit={handleFormSubmit}
                  >
                    <header>Create new account</header>
                    <div className="form-group">
                      <i className="fas fa-user" />
                      <input
                        className="myInput"
                        type="text"
                        placeholder="Username"
                        id="username"
                        required
                        value={formData.username}
                        onChange={handleInputChange}
                        autoComplete="off"
                      />
                      <div></div>
                      {error.type == "username" && (
                        <div>
                          <strong style={{ color: "red" }}>
                            {error.message}
                          </strong>
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <i className="fas fa-lock" />
                      <input
                        className="myInput"
                        type="password"
                        id="password"
                        placeholder="Password"
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                      {error.type == "password" && (
                        <div>
                          <strong style={{ color: "red" }}>
                            {error.message}
                          </strong>
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <i className="fas fa-lock" />
                      <input
                        className="myInput"
                        type="password"
                        id="repeatPassword"
                        placeholder="Repeat Password"
                        required
                        value={formData.repeatPassword}
                        onChange={handleInputChange}
                      />
                      {error.type == "mismatch" && (
                        <div>
                          <strong style={{ color: "red" }}>
                            {error.message}
                          </strong>
                        </div>
                      )}
                    </div>
                    <input
                      type="submit"
                      className="butt"
                      defaultValue="CREATE ACCOUNT"
                    />
                    {error.type == "success" && (
                      <div>
                        <strong style={{ color: "green" }}>
                          {error.message}
                        </strong>
                      </div>
                    )}
                  </form>
                </div>
              </div>
              <div className="col-md-6">
                <div className="myRightCtn">
                  <div className="box">
                    <header>Existing user?</header>
                    <p>Please click on button below to go to login page.</p>
                    <Link to="/login">
                      <input
                        type="button"
                        className="butt_out"
                        defaultValue="Login"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
