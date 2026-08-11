import { useState } from "react";
import { register } from "../../services/auth.services.js";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

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
      const data = await register(formData);

    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
   <form onSubmit={handleSubmit}>
      <input
      type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />

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

      <button type="submit">Signup</button>
    </form>
  );
}

export default Signup;