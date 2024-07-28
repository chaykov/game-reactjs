import React from "react";
import { useSelector } from "react-redux";

const ResourcePanel = () => {
  const gold = useSelector((state) => state.gold);

  return (
    <div>
      <h2>Gold: {gold}</h2>
    </div>
  );
};

export default ResourcePanel;
