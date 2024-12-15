import React, { useState } from "react";
import axios from "axios";

const PaymentForm = ({ paymentId = null, onSuccess }) => {
  const [formData, setFormData] = useState({
    amount: "",
    date: "",
    type: "",
    childId: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (paymentId) {
        // Update payment
        await axios.put(`/api/payments/${paymentId}`, formData);
      } else {
        // Create new payment
        await axios.post("/api/payments", formData);
      }

      setFormData({ amount: "", date: "", type: "", childId: "" });
      onSuccess && onSuccess(); // Call the success callback
    } catch (err) {
      setError("An error occurred while saving the payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-form container mt-4">
      <h2>{paymentId ? "Edit Payment" : "New Payment"}</h2>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="type">Type</label>
          <select
            className="form-control"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option value="Tuition Fee">Tuition Fee</option>
            <option value="Material Fee">Material Fee</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </select>
        </div>

        <div className="form-group mt-3">
          <label htmlFor="childId">Child ID</label>
          <input
            type="text"
            className="form-control"
            id="childId"
            name="childId"
            value={formData.childId}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
          {loading ? "Saving..." : paymentId ? "Update Payment" : "Create Payment"}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
