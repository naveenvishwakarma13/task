import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import AddCustomerForm from "../components/Customer.jsx";
import api from "../api/axios.js";

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [customers, setCustomers] = useState([]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const fetchCustomers = async () => {
    try {
      const { data } = await api.get("/auth/get-customer");
      if (data.success) {
        setCustomers(data.data);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Something went wrong while fetching customers");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-dark px-4">
        <span className="navbar-brand">Customer</span>
        <div className="d-flex gap-2">
          <button className="btn btn-success" onClick={() => setShowModal(true)}>
            Add Customer
          </button>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* Cards */}
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-4">
            <div className="card shadow p-3 mb-4">
              <h5>Total Customers</h5>
              <h3 className="text-success">{customers.length}</h3>
            </div>
          </div>
        </div>

        {/* Customer Table */}
        <div className="card shadow p-3">
          <h5 className="mb-3">Customers List</h5>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {customers.length > 0 ? (
                customers.map((c, idx) => (
                  <tr key={c._id}>
                    <td>{idx + 1}</td>
                    <td>{c.name}</td>
                    <td>{c.email}</td>
                    <td>
                      <span className={`badge ${c.status === "active" ? "bg-success" : "bg-secondary"}`}>
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AddCustomerForm show={showModal} onClose={() => setShowModal(false)} onAdded={fetchCustomers} />
    </div>
  );
};

export default Dashboard;