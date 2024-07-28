import React from "react";
import { useDispatch } from "react-redux";

const ControlPanel = () => {
  const dispatch = useDispatch();

  const addGold = () => {
    dispatch({ type: "ADD_GOLD", payload: 10 });
  };

  const removeGold = () => {
    dispatch({ type: "REMOVE_GOLD", payload: 10 });
  };

  return (
    <div>
      <button onClick={addGold}>Add Gold</button>
      <button onClick={removeGold}>Remove Gold</button>
    </div>
  );
};

export default ControlPanel;
