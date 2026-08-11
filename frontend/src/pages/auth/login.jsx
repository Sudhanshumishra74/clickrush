import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { handleLogin } = useAuth();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await handleLogin(formData);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />

      <button type="submit">
        Login
      </button>
    </form>
  );
}

export default Login;