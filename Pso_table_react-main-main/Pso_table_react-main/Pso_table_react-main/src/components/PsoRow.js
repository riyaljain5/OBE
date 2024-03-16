// PsoRow.js
import React, { useState } from "react";

function PsoRow({ co, po, pso, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCo, setEditedCo] = useState(co);
  const [editedPo, setEditedPo] = useState(po);
  const [editedPso, setEditedPso] = useState(pso);

  const handleSave = () => {
    onSave(editedCo, editedPo, editedPso);
    setIsEditing(false);
  };

  return (
    <div className="row">
      <div className="col-1">
        {isEditing ? (
          <input
            type="text"
            value={editedCo}
            onChange={(e) => setEditedCo(e.target.value)}
          />
        ) : (
          co
        )}
      </div>
      <div className="col-9">
        <div className="row">
          {isEditing ? (
            editedPo.map((item, index) => (
              <div className="col" key={index}>
                <input
                  type="number"
                  value={item}
                  onChange={(e) => {
                    const newPo = [...editedPo];
                    newPo[index] = e.target.value;
                    setEditedPo(newPo);
                  }}
                  style={{ width: "50px" }}
                />
              </div>
            ))
          ) : (
            po.map((item, index) => (
              <div className="col" key={index}>
                {item}
              </div>
            ))
          )}
        </div>
      </div>
      <div className="col-2">
        <div className="row">
          {isEditing ? (
            editedPso.map((item, index) => (
              <div className="col" key={index}>
                <input
                  type="number"
                  value={item}
                  onChange={(e) => {
                    const newPso = [...editedPso];
                    newPso[index] = e.target.value;
                    setEditedPso(newPso);
                  }}
                  style={{ width: "50px" }}
                />
              </div>
            ))
          ) : (
            pso.map((item, index) => (
              <div className="col" key={index}>
                {item}
              </div>
            ))
          )}
        </div>
      </div>
      <div className="col-1">
        {isEditing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}
      </div>
    </div>
  );
}

export default PsoRow;
