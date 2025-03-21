import React, { useState } from "react";
import { Rnd } from "react-rnd";
import chair from "./images/Chair.png";
import table from "./images/table.jpg";

const Board = ({ objects, onMoveObject, onRotateObject, onSelectObject }) => {
  const [isHovered, setIsHovered] = useState(false);

  const sortedObjects = [...objects].sort((a, b) => a.layer - b.layer);

  const handleWheel = (e, id) => {
    if (isHovered) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -5 : 5;
      onRotateObject(id, delta);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "600px",
        position: "relative",
        border: "1px solid #d9d9d9",
        borderRadius: "8px",
        overflow: "hidden",
      }}
      onWheel={(e) => {
        if (isHovered) {
          e.preventDefault();
        }
      }}
    >
      {sortedObjects.map((obj) => (
        <Rnd
          key={obj.id}
          position={{ x: obj.x || 0, y: obj.y || 0 }}
          size={{ width: obj.width || 100, height: obj.height || 100 }}
          onDragStop={(e, data) => {
            onMoveObject(obj.id, data.x, data.y);
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
            onMoveObject(obj.id, position.x, position.y);
          }}
          rotate={obj.angle || 0}
          onClick={() => onSelectObject(obj)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `rotate(${obj.angle || 0}deg)`,
            }}
            onWheel={(e) => handleWheel(e, obj.id)}
          >
            {obj.type === "chair" && (
              <img src={chair} alt="Chair" width="100" height="100" />
            )}
            {obj.type === "table" && (
              <img src={table} alt="Table" width="150" height="150" />
            )}
          </div>
        </Rnd>
      ))}
    </div>
  );
};

export default Board;
