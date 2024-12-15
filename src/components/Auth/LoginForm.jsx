import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Font Awesome icons for password visibility toggle

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Both fields are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://young-engineers-backk.onrender.com/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        // If the server responds with an error
        setError(data.message || "Login failed.");
      } else {
        // If login is successful
        localStorage.setItem("token", data.token); // Store the token in localStorage
        window.location.href = "/dashboard"; // Redirect to the dashboard page
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{ background: "linear-gradient(to left, #0083cb, #ed174c)" }}
    >
      <img
        src="../../../dist/images/logo.png"
        alt="logo"
        className="position-absolute"
        style={{
          marginTop: "50px",
          top: "-40px",
          left: "20px",
          height: "auto",
          width: "150px",
          borderRadius: "0%",
          padding: "5px",
        }}
      />
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <div className="card shadow-lg" style={{ borderRadius: "15px" }}>
          <div className="card-body">
            <h2
              className="text-center mb-4"
              style={{ fontFamily: "Signika Regular, Arial", color: "#0083cb" }}
            >
              Welcome!
            </h2>
            <p
              className="text-center mb-4"
              style={{ fontFamily: "Signika Light, Arial", color: "#333" }}
            >
              Please log in to your account
            </p>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="form-label"
                  style={{ fontFamily: "Signika Regular, Arial" }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control rounded-3"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ fontFamily: "Signika Light, Arial" }}
                />
              </div>

              <div className="mb-4 position-relative">
                <label
                  htmlFor="password"
                  className="form-label"
                  style={{ fontFamily: "Signika Regular, Arial" }}
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="form-control rounded-3"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ fontFamily: "Signika Light, Arial" }}
                />
                <button
                  type="button"
                  className="position-absolute top-50 end-0 translate-middle-y border-0 bg-transparent mt-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash color="#333" />
                  ) : (
                    <FaEye color="#333" />
                  )}
                </button>
              </div>

              <button
                type="submit"
                className="w-100 btn"
                style={{
                  backgroundColor: "#0083cb",
                  color: "white",
                  borderRadius: "30px",
                  fontFamily: "Signika Regular, Arial",
                }}
              >
                Log In
              </button>
            </form>

            <p
              className="mt-3 text-center"
              style={{ fontFamily: "Signika, Arial, sans-serif" }}
            >
              Don’t have an account?{" "}
              <a
                href="/signup"
                style={{ color: "#0083cb", textDecoration: "underline" }}
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
