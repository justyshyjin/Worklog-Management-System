const reports = [

  {
    name:
      "Today's Tasks",

    filters:{
      today:true
    }
  },

  {
    name:
      "Open Tasks",

    filters:{
      status:"NEW"
    }
  },

  {
    name:
      "Finished Tasks",

    filters:{
      status:"FINISHED"
    }
  },

  {
    name:
      "Deployment Tasks",

    filters:{
      task_type:
      "DEPLOYMENT"
    }
  }

];

const QuickReports = ({
  onSelect
}) => {

  return (

    <div
      className="quick-reports"
    >

      <h3>
        Quick Reports
      </h3>

      {
        reports.map(
          (report)=>(
            <button
              key={report.name}
              className="
                report-btn
              "
              onClick={() =>
                onSelect(
                  report.filters
                )
              }
            >
              {report.name}
            </button>
          )
        )
      }

    </div>
  );
};

export default QuickReports;