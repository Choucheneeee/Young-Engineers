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

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get(
          "https://young-engineers-backk.onrender.com/api/statistics"
        );
        const { programCount, groupCount, childCount, UserCount } =
          response.data;

        setStats([
          { title: "Programs", count: programCount, link: "/programs" },
          { title: "Groups", count: groupCount, link: "/groups" },
          { title: "Kids", count: childCount, link: "/children" },
          { title: "Users", count: UserCount, link: "/payments" },
        ]);

        // Prepare data for the charts
        setChartData({
          labels: ["Programs", "Groups", "Kids", "Users"],
          datasets: [
            {
              label: "Count",
              data: [programCount, groupCount, childCount, UserCount],
              backgroundColor: ["#4caf50", "#2196f3", "#ff9800", "#e91e63"],
              borderColor: ["#388e3c", "#1976d2", "#f57c00", "#c2185b"],
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Failed to fetch statistics:", error);
      }
    };

    fetchStatistics();
  }, []);

  return (
    <div className="container mt-5">
      <h1
        className="mb-4 text-center"
        style={{ fontFamily: "'Signika', sans-serif", fontWeight: 400 }}
      >
        Welcome to the Dashboard
      </h1>

      <div className="row mb-5">
        {stats.map((stat, index) => (
          <div className="col-md-3 mb-4" key={index}>
            <div
              className="card text-center"
              style={{
                fontFamily: "'Signika', sans-serif",
                fontWeight: 300,
              }}
            >
              <div className="card-body">
                <h5 className="card-title" style={{ fontWeight: 400 }}>
                  {stat.title}
                </h5>
                <p className="card-text fs-1" style={{ fontWeight: 600 }}>
                  {stat.count}
                </p>
                <a href={stat.link} className="btn btn-primary">
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
          <h2
            className="text-center mb-4"
            style={{ fontFamily: "'Signika', sans-serif", fontWeight: 400 }}
          >
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
  );
};

export default DashboardHome;
