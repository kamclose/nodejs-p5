import React, { useState, useEffect } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";

import "./style1.css";
import Question from "./Question";

export default function Home() {
  const [categories, setCategories] = useState([]);
  
  const [view,setView] = useState({
    userId :"",
    id : "",
    name : "",
    display : false
  })
  const navigate = useNavigate();
  const myComponent = {
    width: "300px",
    height: "400px",
    overflowX: "hidden",
    overflowY: "scroll",
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    navigate("/");
  };
  const handleDoubleClick = async (category) => {
    setView({
      userId :  localStorage.getItem("token"),
      id: category._id,
      name: category.name,
      display: true
    });
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://fine-puce-chicken-fez.cyclic.app/category");
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);
  const json = localStorage.getItem("token");
  if (json == null) {
    return <Navigate to="/login" />;
  } else {
    return (
      <div>
        <title>Homepage</title>
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
        <div className="m-5 d-flex justify-content-between">
          <span>Welcome {localStorage.getItem('token')}</span>
          <h1>QuizzyMind</h1>
          <button className="btn btn-danger" onClick={() => handleLogout()}>
            Logout
          </button>
        </div>
        <div className="m-2 d-flex">
          <div className="container" style={{height:'700px'}}>
            <div className="myCard">
              <div className="row">
                <div className="col-md-6">
                  <div className="myLeftCtn">
                    <h5 className="mt-5">Categories</h5>
                    <div className="m-5" style={{borderRadius:'50px',border:'1px solid white'}}>
                    <div
                      style={myComponent}
                      className="m-2 d-flex justify-content-center"
                      
                    >
                      <ul>
                        {categories.map((category) => (
                            <li style={{listStyle:"none"}} className="p-3" key={category._id} onDoubleClick={()=>handleDoubleClick(category)}>
                            <div style={{padding:'10px',borderRadius:'50px',border:'1px solid black',color:'white',  background: view.id === category._id ? 'red' : 'blueviolet'}}>
                            {category.name}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="myRightCtn">
                    <div className="box">
                      <Question view={view}/>
                    </div>
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
