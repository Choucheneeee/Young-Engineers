import React from "react";

const DashboardHome = () => {
  const stats = [
    { title: "Programs", count: 12, link: "/programs" },
    { title: "Groups", count: 8, link: "/groups" },
    { title: "Children", count: 150, link: "/children" },
    { title: "Payments", count: 45, link: "/payments" },

  ];

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

export default DashboardHome;
