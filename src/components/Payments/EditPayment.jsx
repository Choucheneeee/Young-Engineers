import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditPayment = () => {
  const { paymentId } = useParams(); // Get paymentId from the URL parameters
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    amount: 0,
    date: "",
    paymentMethod: "",
    childId: "", // Default value for childId will be updated later
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [children, setChildren] = useState([]); // State to hold list of children

  // Fetch payment data and children data on component mount
  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        // Fetch the payment data
        const paymentResponse = await axios.get(
          `https://young-engineers-backk.onrender.com/api/payments/${paymentId}`
        );
        const paymentData = paymentResponse.data;

        // Set the payment data into formData state
        setFormData(paymentData); // Pre-populate the form with fetched payment data

        // Fetch the children data
        const childrenResponse = await axios.get(
          `https://young-engineers-backk.onrender.com/api/children`
        );
        setChildren(childrenResponse.data); // Store children data

        // Set the default childId if it exists in the payment data
        if (paymentData.childId) {
          setFormData((prevData) => ({
            ...prevData,
            childId: paymentData.childId, // Set the childId from the payment data
          }));
        }
      } catch (err) {
        setError("Error fetching payment or children data.");
      }
    };

    fetchPaymentData();
  }, [paymentId]);

  // Handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const dataToSubmit = { ...formData, amount: Number(formData.amount) };

    try {
      // Update the payment using PUT request
      await axios.put(
        `https://young-engineers-backk.onrender.com/api/payments/${paymentId}`,
        dataToSubmit
      );

      setLoading(false);
      navigate("/payments"); // Redirect to the payments page after successful edit
    } catch (err) {
      setLoading(false);
      setError("An error occurred while saving the payment.");
    }
  };

  return (
    <div className="edit-payment-container container mt-4">
      <h2>Edit Payment</h2>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {formData && (
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
            <label htmlFor="paymentMethod">Payment Method</label>
            <select
              className="form-control"
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
            >
              <option value="">Select payment method</option>
              <option value="credit card">Credit Card</option>
              <option value="cash">Cash</option>
              <option value="bank transfer">Bank Transfer</option>
            </select>
          </div>

          <div className="form-group mt-3">
            <label htmlFor="childId">Child</label>
            <select
              className="form-control"
              id="childId"
              name="childId"
              value={formData.childId}
              onChange={handleChange}
              required
            >
              <option value="">Select child</option>
              {children.map((child) => (
                <option key={child._id} value={child._id}>
                  {child.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary mt-3"
            disabled={loading}
          >
            {loading ? "Saving..." : "Update Payment"}
          </button>
        </form>
      )}
    </div>
  );
};

export default EditPayment;
