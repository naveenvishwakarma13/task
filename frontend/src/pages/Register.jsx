import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios.js";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/register", form);

      if (data.success) {
        alert("Registered Successfully");
        navigate("/");
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
        <h3 className="mb-3">Register</h3>
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
          <button className="btn btn-success w-100 mb-2">Register</button>
        </form>
        <p>
          Already have an account? <Link to="/">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;