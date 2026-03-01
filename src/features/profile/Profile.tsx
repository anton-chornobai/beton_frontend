import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import "./Profile.module.scss";
import { User } from "./types/user";

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/profile`,
          { credentials: "include" }
        );

        if (!res.ok) throw new Error("Not authenticated");

        const data = await res.json();
        setUser(data.user); // assuming backend returns { user: {...} }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/signup" replace />;
  }

  return (
    <div className="profile">
      <div className="profile__card">
        <label>
          <span>Name</span>
          <input type="text" defaultValue={user.name && ""} />
        </label>

        <label>
          <span>Phone Number</span>
          <input type="text" placeholder={user.number ?? ""}/>
        </label>

        <label>
          <span>Email</span>
          <input type="text" value={user.email} />
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