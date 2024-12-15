import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  ArcElement,
  PointElement,
  LineElement
);

const DashboardHome = () => {
  const [stats, setStats] = useState([]);
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get(
          "https://young-engineers-backk.onrender.com/api/statistics"
        );
        const { programCount, groupCount, childCount, UserCount } =
          response.data;

        setStats([
          { title: "Programs", count: programCount, link: "/programs", color: "#0083cb", icon: "fas fa-book" },
          { title: "Groups", count: groupCount, link: "/groups", color: "#ed174c", icon: "fas fa-users" },
          { title: "Kids", count: childCount, link: "/children", color: "#8dc63f", icon: "fas fa-child" },
          { title: "Users", count: UserCount, link: "/users", color: "#fff200", icon: "fas fa-user" },
        ]);

        setChartData({
          labels: ["Programs", "Groups", "Kids", "Users"],
          datasets: [
            {
              label: "Count",
              data: [programCount, groupCount, childCount, UserCount],
              backgroundColor: ["#0083cb", "#ed174c", "#8dc63f", "#fff200"],
              borderColor: ["#005a9c", "#b11235", "#6c9e30", "#ccc000"],
              borderWidth: 2,
            },
          ],
        });
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch statistics:", error);
        setError("Unable to fetch data.");
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center mt-5" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Animated Lego Background */}
      <div className="lego-background">
        <div className="lego lego-1"></div>
        <div className="lego lego-2"></div>
        <div className="lego lego-3"></div>
        <div className="lego lego-4"></div>
      </div>

      {/* Dashboard Content */}
      <div className="container mt-5" style={{ position: "relative", zIndex: 1 }}>
        <h1 className="mb-5 text-center" style={{ fontFamily: "'Signika', sans-serif", fontWeight: 600, color: "#333" }}>
          Welcome to the Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="row mb-5">
          {stats.map((stat, index) => (
            <div className="col-lg-3 col-md-6 mb-4" key={index}>
              <div
                className="card shadow-sm text-center"
                style={{
                  border: "none",
                  borderRadius: "15px",
                  backgroundColor: "#fff",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 8px 15px rgba(0, 0, 0, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  className="card-body"
                  style={{
                    backgroundColor: stat.color,
                    borderRadius: "15px 15px 0 0",
                    color: "#fff",
                    padding: "30px",
                  }}
                >
                  <i className={`${stat.icon} fa-3x mb-3`} style={{ color: "#fff" }}></i>
                  <h5 className="card-title" style={{ fontWeight: 600, fontSize: "18px" }}>
                    {stat.title}
                  </h5>
                </div>
                <div
                  className="card-footer"
                  style={{
                    padding: "20px",
                    backgroundColor: "#f9f9f9",
                    borderRadius: "0 0 15px 15px",
                  }}
                >
                  <p className="fs-1 mb-2" style={{ fontWeight: 700, color: stat.color }}>
                    {stat.count}
                  </p>
                  <a
                    href={stat.link}
                    className="btn btn-outline-primary btn-sm"
                    style={{ fontWeight: 500 }}
                  >
                    View {stat.title}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        {chartData.labels && (
          <div className="row mb-5">
            <h2 className="text-center mb-4" style={{ fontFamily: "'Signika', sans-serif", fontWeight: 400 }}>
              Statistics Overview
            </h2>

            <div className="col-md-4">
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: "top" },
                    title: { display: true, text: "Bar Chart" },
                  },
                }}
                style={{ height: "200px" }}
              />
            </div>

            <div className="col-md-4">
              <Pie
                data={chartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: "top" },
                    title: { display: true, text: "Pie Chart" },
                  },
                }}
                style={{ height: "200px" }}
              />
            </div>

            <div className="col-md-4">
              <Line
                data={chartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: "top" },
                    title: { display: true, text: "Line Chart" },
                  },
                }}
                style={{ height: "200px" }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;
