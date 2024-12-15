import React, { useEffect, useState } from "react";
import axios from "axios";

const DashboardHome = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get("https://young-engineers-backk.onrender.com/api/statistics");
        const { programCount, groupCount, childCount,UserCount } = response.data;
        console.log(response.data,'data')

        console.log(programCount,'programCount')

        // Construct the stats array dynamically
        setStats([
          { title: "Programs", count: programCount, link: "/programs" },
          { title: "Groups", count: groupCount, link: "/groups" },
          { title: "Kids", count: childCount, link: "/children" },
          { title: "Users", count: UserCount, link: "/payments" }, // Set Payments count if available
        ]);
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
      <div className="row">
        {stats.map((stat, index) => (
          <div className="col-md-3 mb-4" key={index}>
            <div
              className="card text-center"
              style={{
                fontFamily: "'Signika', sans-serif",
                fontWeight: 300, // Light font for body
              }}
            >
              <div className="card-body">
                <h5 className="card-title" style={{ fontWeight: 400 }}>
                  {" "}
                  {/* Regular font for titles */}
                  {stat.title}
                </h5>
                <p className="card-text fs-1" style={{ fontWeight: 600 }}>
                  {" "}
                  {/* Bold font for numbers */}
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
    </div>
  );
};

export default DashboardHome;