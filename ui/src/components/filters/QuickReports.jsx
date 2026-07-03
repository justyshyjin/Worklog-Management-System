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
  onSelect = () => { }
}) => {
  const handleReportClick = (report) => {

    const reportKey = report.filters.range;

    // Same button clicked again
    if (activeReport === reportKey) {

      setActiveReport(null);

      onSelect({});

      return;
    }

    // New quick report selected
    setActiveReport(reportKey);

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
              className={`report-tab ${activeReport === report.filters.range  ? "active" : ""
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