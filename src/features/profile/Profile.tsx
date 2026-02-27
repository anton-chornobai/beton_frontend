import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import "./Profile.module.scss"

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading ] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/profile`, {credentials: "include"})

        if (res.ok) {
          console.log("I got through")
          setIsAuthenticated(true)
        }

      } catch(err) {
        console.error("Auth check failed", err);
      }
      setLoading(false);
    } 
    checkAuth()

    console.log(1)
  }, [isAuthenticated])

  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="profile">
      <div className="profile__card">
        <label>
          <span>Name</span>
          <input type="text" placeholder="Enter your name" />
        </label>

        <label>
          <span>Phone Number</span>
          <input type="text" placeholder="+38 012 345 6789" />
        </label>

        <label>
          <span>Address</span>
          <input type="text" placeholder="Enter your address" />
        </label>

        <div className="profile__buttons">
          <button className="edit-btn">Edit Data</button>
          <button className="save-btn">Save</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
