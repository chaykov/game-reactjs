import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Shop = () => {
  const dispatch = useDispatch();
  const gold = useSelector((state) => state.gold);
  const showSkills = useSelector((state) => state.showSkills);

  const handleBuyItem = (item) => {
    dispatch({ type: "BUY_ITEM", payload: item });
  };

  return (
    <div>
      <h2>Shop</h2>
      <p>Gold: {gold}</p>
      <button
        onClick={() => handleBuyItem("FULL")}
        disabled={gold < 20 || showSkills}
      >
        Buy Apteka FULL (20 gold)
      </button>
      <button
        onClick={() => handleBuyItem("HALF")}
        disabled={gold < 13 || showSkills}
      >
        Buy Apteka HALF (13 gold)
      </button>
    </div>
  );
};

export default Shop;
