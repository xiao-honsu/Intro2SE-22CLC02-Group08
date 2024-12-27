import React from "react";

const Reports = ({ reports }) => {
    return (
        <section className="reports-container">
            {reports.map((report, index) => (
                <div
                    className="reports-item"
                    key={report._id || index} 
                >
                    <img
                        src={report.reportedID?.avatar || "default-avatar.jpg"}
                        className="avt"
                        alt="Reported Person Avatar"
                    />
                    <h6>{report.reportedID?.username || "Unknown User"}</h6>
                    <div className="reported-email">{report.reportedID?.email || "N/A"}</div>
                    <div className="reported-product">{report.productID?.productName || "Unknown Product"}</div>
                    <div className="description">{report.description || "No description available"}</div>
                </div>
            ))}
        </section>
    );
};

export default Reports;
