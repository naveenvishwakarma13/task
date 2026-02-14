import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios.js";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/login", form);

      if (data.success) {
        login(data.data.token);
        navigate("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow mx-auto" style={{ maxWidth: "400px" }}>
        <h3 className="mb-3">Login</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button className="btn btn-primary w-100 mb-2">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;