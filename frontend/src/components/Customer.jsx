import React, { useState } from "react";
import api from "../api/axios.js";

const AddCustomerForm = ({ show, onClose, onAdded }) => {
  const [form, setForm] = useState({ name: "", email: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put("/auth/create-customer", form);
      if (data.success) {
        onAdded();
        onClose();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  if (!show) return null;

  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content p-3">
          <h5>Add Customer</h5>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              className="form-control mb-2"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              className="form-control mb-2"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <button type="submit" className="btn btn-success me-2">
              Add
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCustomerForm;