import React from "react";
import { useSelector } from "react-redux";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Enemy from "./components/Enemy";
import Shop from "./components/Shop";
import "./App.css"; // Importujemy style

const App = () => {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <h1>My OGame Clone</h1>
      {user.name ? (
        <div className="cards-container">
          {" "}
          {/* Dodajemy klasę cards-container */}
          <Profile />
          <Enemy />
          <Shop />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
