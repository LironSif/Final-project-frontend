import React, { useState, useEffect, useCallback } from "react";
import ShelfCell from "../ShelfCell/ShelfCell.jsx";
import "./Shh.css";

const Shelf = ({ shelfConfig, shelfSetter }) => {

  const handleDrop = (cellId, item) => {
    const [shelf, spot] = cellId.split(".");
    console.log('222222current config into function --> ', shelfConfig)
    shelfSetter(p=> ({...p,[shelf]:{...p[shelf],[spot]: item}}))
  };

  return (
    <div className="grid-div">
      {Object.keys(shelfConfig).map((shelf) => (
        <div
          style={{ display: "flex", justifyContent: "space-between" }}
          key={shelf}
        >
          {Object.keys(shelfConfig[shelf]).map((spot) => (
            <ShelfCell
              cellId={`${shelf}.${spot}`}
              content={shelfConfig[shelf][spot]}
              onDropItem={(item) =>{
                console.log("ITEM-------------->",item)
                 handleDrop(`${shelf}.${spot}`, item)}}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Shelf;
