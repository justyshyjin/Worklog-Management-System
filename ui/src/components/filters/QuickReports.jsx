import "../../styles/filter.css";
import { useState } from "react";

// fallback data (safe default)
const defaultReports = [
  {
    name: "Today's Tasks",
    filters: { range: "today" }
  },
  {
    name: "Weekly Tasks",
    filters: { range: "week" }
  },
  {
    name: "Monthly Tasks",
    filters: { range: "month" }
  }
];

const QuickReports = ({
  reports = defaultReports,
  activeReport,
  setActiveReport,
  onSelect = () => {}
}) => {
const handleReportClick = (report) => {


    // If same button clicked again
    // remove quick report filter
    if (activeReport === report.name) {

      setActiveReport(null);

      onSelect({});   // clear range from parent

      return;
    }


    // New quick report selected
    setActiveReport(report.name);

    onSelect(report.filters);

  };


  return (
    <div className="quick-reports">
      {/* <h3>Quick Filters</h3> */}

      <div className="report-tabs">
        {Array.isArray(reports) &&
          reports.map((report) => (
            <button
              key={report.name}
              className={`report-tab ${activeReport === report.name ? "active" : ""
                }`}
              onClick={() => 
                handleReportClick(report)
              }
            >
              {report.name}
            </button>
          ))}
      </div>
    </div>
  );
};

export default QuickReports;