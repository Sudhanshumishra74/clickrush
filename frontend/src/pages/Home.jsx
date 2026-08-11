import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function Home() {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    try {
      await handleLogout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div>
      <h1>ClickRush</h1>

      <p>
        Click as many times as you can in 60 seconds.
      </p>

      {user ? (
        <>
          <p>Welcome {user.name}</p>

          <Link to="/dashboard">
            Dashboard
          </Link>

          <Link to="/game">
            Play Game
          </Link>

          <Link to="/leaderboard">
            Leaderboard
          </Link>

          <Link to="/profile">
            Profile
          </Link>

          <button onClick={handleLogoutClick}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login">
            Login
          </Link>

          <Link to="/signup">
            Signup
          </Link>
        </>
      )}
    </div>
  );
}

export default Home;