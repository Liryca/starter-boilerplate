import React from "react";
import chair from "./images/Chair.png";
import table from "./images/table.jpg";

const ObjectList = ({ onAddObject }) => {
  const objects = [
    { id: 1, name: "Столы", type: "table", image: table },
    { id: 2, name: "Стулья", type: "chair", image: chair },
  ];

  return (
    <div>
      {objects.map((obj) => (
        <div
          key={obj.id}
          onClick={() => onAddObject(obj)}
          style={{
            padding: "10px",
            margin: "5px",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          <img src={obj.image} alt={obj.name} width="50" height="50" />
          {obj.name}
        </div>
      ))}
    </div>
  );
};

export default ObjectList;
