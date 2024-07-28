import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Shop.css";

const Shop = () => {
  const dispatch = useDispatch();
  const gold = useSelector((state) => state.gold);
  const showSkills = useSelector((state) => state.showSkills);
  const gameLost = useSelector((state) => state.gameLost);

  const handleBuyItem = (item) => {
    dispatch({ type: "BUY_ITEM", payload: item });
  };

  return (
    <div className="container">
      <h2>Shop</h2>
      <p>Gold: {gold}</p>
      <div className="shop-item">
        <span>Apteka FULL (20 gold)</span>
        <button
          onClick={() => handleBuyItem("FULL")}
          disabled={gold < 20 || showSkills || gameLost}
        >
          Buy
        </button>
      </div>
      <div className="shop-item">
        <span>Apteka HALF (13 gold)</span>
        <button
          onClick={() => handleBuyItem("HALF")}
          disabled={gold < 13 || showSkills || gameLost}
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export default Shop;
