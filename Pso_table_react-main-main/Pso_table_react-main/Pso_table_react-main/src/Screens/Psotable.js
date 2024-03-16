





import React, { useState, useEffect } from "react";
import axios from "axios";
import PsoRow from "../components/PsoRow";
import PercentageTable from "./percentage"; // Assuming the correct path

const PsoTable = () => {
  const [data, setData] = useState([]);
  const [showPercentages, setShowPercentages] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000");
      // Assuming response.data is an array
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleRowSave = async (editedCo, editedPo, editedPso) => {
    try {
      await axios.post("http://localhost:8000/save", {
        co: editedCo,
        po: editedPo,
        pso: editedPso,
      });
      fetchData();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const addRow = async () => {
    try {
      const newCo = `CO${data.length + 1}`;
      const newRow = {
        co: newCo,
        po: Array(12).fill(0),
        pso: Array(3).fill(0),
      };

      await axios.post("http://localhost:8000/save", newRow);
      fetchData();
    } catch (error) {
      console.error("Error adding row:", error);
    }
  };

  const handleSubmit = () => {
    setShowPercentages(true);
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
          </div>

          {/* Entries */}
          {Array.isArray(data) &&
            data.map((item, index) => (
              <PsoRow
                key={index}
                co={item.co}
                po={item.po}
                pso={item.pso}
                onSave={handleRowSave}
              />
            ))}

          {/* Add row button */}
          <div className="row">
            <div className="col">
              <button className="btn btn-primary" onClick={addRow}>
                Add Row
              </button>
            </div>
          </div>

          {/* Submit button */}
          <div className="row mt-3">
            <div className="col">
              <button className="btn btn-success" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Percentage Table */}
      {showPercentages && <PercentageTable />}
    </div>
  );
};

export default PsoTable;










