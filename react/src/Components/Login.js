import { Link, useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./style1.css";

export default function Login() {
  const history = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState({
    type: "",
    message: "",
  });

  const handleInputChange = (event) => {
    setError({ type: "", message: "" });
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://fine-puce-chicken-fez.cyclic.app/user/login",
        formData
      );
      localStorage.setItem("token", formData.username);
      localStorage.setItem("id", response.data.id);
      history("/", { state: { id: formData.username } });
    } catch (error) {
      setError({ type: "username", message: "Invalid credentials." });
    }
  };
  const json = localStorage.getItem("token");
  if (json != null) {
    return <Navigate to="/" />;
  } else {
    return (
      <div>
        <title>Login</title>
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
                    <header>Login to account</header>
                    <div className="form-group">
                      <i className="fas fa-user" />
                      <input
                        className="myInput"
                        type="text"
                        placeholder="Username"
                        id="username"
                        required
                        autoComplete="off"
                        value={formData.username}
                        onChange={handleInputChange}
                      />
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
                      {error.type == "username" && (
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
                      defaultValue="Login"
                    />
                  </form>
                </div>
              </div>
              <div className="col-md-6">
                <div className="myRightCtn">
                  <div className="box">
                    <header>New user?</header>
                    <p>Please click on button below to go to signup page.</p>
                    <Link to="/signup">
                      <input
                        type="button"
                        className="butt_out"
                        defaultValue="Signup"
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
