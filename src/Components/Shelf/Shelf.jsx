import React, { useContext, forwardRef, useEffect,useRef } from 'react';
import ShelfCell from "../ShelfCell/ShelfCell.jsx";
import UserContext from "../../Context/UserContext.jsx"; 
import "./Shh.css";

const Shelf = forwardRef(({ shelfConfig, shelfSetter,onShelfUpdate }, ref) => {
  // Access the UserContext
  const { updateUserData,userData } = useContext(UserContext);
  const latestShelfConfig = useRef(shelfConfig);

  useEffect(()=>{
    console.log('SHELF CONFIG UODATED',shelfConfig)
    latestShelfConfig.current = shelfConfig;
  },[shelfConfig])

// console.log("current shelf config",shelfConfig)

  const handleDrop = async (cellId, item) => {
    const [shelf, spot] = cellId.split(".");
    const newShelfConfig = { ...latestShelfConfig.current, [shelf]: {...latestShelfConfig.current[shelf], [spot]: item } };
    // console.log("shelf after change", newShelfConfig);

    // Get userId from localStorage
    const userId = localStorage.getItem("loggedInUserId");
    // const userId = userData.id

    // Prepare the data for updating user data
    const newUserChemData = { shelfConfig: newShelfConfig, userId };

    const updated = await updateUserData(newUserChemData);
    if (updated) {
      shelfSetter(newShelfConfig);
    } else {
      console.error("Failed to update shelf configuration");
    }
    
  };
  

  return (
    // Attach the ref to the outer div
    <div className="grid-div" ref={ref}>
      {/* <h3 onClick={()=>console.log(shelfConfig)}>TESTER</h3> */}
      {Object.keys(shelfConfig).map((shelf) => (
        <div
          style={{ display: "flex", justifyContent: "center" ,}}
          key={shelf}
        >
          {Object.keys(shelfConfig[shelf]).map((spot) => (
            <ShelfCell
              cellId={`${shelf}.${spot}`}
              content={shelfConfig[shelf][spot]}
              onDropItem={(item) => {
                handleDrop(`${shelf}.${spot}`, item)
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
});

export default Shelf;
