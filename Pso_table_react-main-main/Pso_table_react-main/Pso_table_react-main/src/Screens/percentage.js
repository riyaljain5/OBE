
import React, { useState, useEffect } from "react";
import axios from "axios";

const PercentageTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/calculatePercentage");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="container-fluid vh-100 vw-100 custom-table overflow-auto">
      <div className="container-fluid vh-100 vw-100 custom-table overflow-auto">
        <div className="container-fluid bg-dark text-white cusTable">
          <div className="row bg-dark text-white no-wrap fs-4 d-flex justify-content-center font-weight-bold">
            <div className="col-1 fs-5 font-weight-bold">Course Outcome</div>
            <div className="col-9">
              <div className="row program-outcomes d-flex justify-content-center fs-5 font-weight-bold">
                Program Outcomes (PO)
              </div>
              <div className="row">
                {[...Array(12).keys()].map((index) => (
                  <div className="col" key={index}>
                    PO{index + 1}
                  </div>
                ))}
              </div>
            </div>
            <div className="col-2">
              <div className="row program-specific-outcome d-flex justify-content-center fs-5 font-weight-bold">
                Program Specific Outcomes (PSO)
              </div>
              <div className="row">
                {[...Array(3).keys()].map((index) => (
                  <div className="col" key={index}>
                    PSO{index + 1}
                  </div>
                ))}
              </div>
            </div>
            {/* Additional column for percentage */}
            <div className="col">
              Percentage
            </div>
          </div>

          {/* Entries */}
          {Array.isArray(data) && data.map((item, index) => (
            <div className="row" key={index}>
              <div className="col-1">{item.co}</div>
              
              {/* Display custom percentages for each PO column */}
              {Array.isArray(item.poPercentage) && item.poPercentage.map((poPercentage, poIndex) => (
                <div className="col" key={poIndex}>
                  {poPercentage.toFixed(1)}%
                </div>
              ))}
              
              {/* Additional columns for PSO percentages */}
              {Array.isArray(item.psoPercentage) && item.psoPercentage.map((psoPercentage, psoIndex) => (
                <div className="col" key={psoIndex}>
                  {psoPercentage.toFixed(1)}%
                </div>
              ))}

              {/* Additional column for total PO percentage */}
              <div className="col">
                {/* <PercentageTable/> */}

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PercentageTable;












