import { useEffect, useState } from "react";
import { getProfile } from "../services/profile.services.js";
import Navbar from "../components/Navbar.jsx";

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();

        setProfile(response.data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

 return (
  <div>
    <Navbar />

    <h1>Dashboard</h1>

    <p>Name: {profile?.name}</p>
    <p>Email: {profile?.email}</p>
    <p>Total Games: {profile?.totalGames}</p>
    <p>Best Score: {profile?.bestScore}</p>
  </div>
);
}

export default Dashboard;