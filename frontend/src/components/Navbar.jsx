import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function Navbar() {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    try {
      await handleLogout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav>
      <Link to="/dashboard">
        Dashboard
      </Link>

      <Link to="/game">
        Play
      </Link>

      <Link to="/leaderboard">
        Leaderboard
      </Link>

      <Link to="/profile">
        Profile
      </Link>

      {user && (
        <button onClick={handleLogoutClick}>
          Logout
        </button>
      )}
    </nav>
  );
}

export default Navbar;