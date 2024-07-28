import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Enemy.css"; // Importujemy style

const Enemy = () => {
  const enemies = useSelector((state) => state.enemies);
  const activeEnemyIndex = useSelector((state) => state.activeEnemyIndex);
  const battleOver = useSelector((state) => state.battleOver);
  const battleStarted = useSelector((state) => state.battleStarted);
  const battleLog = useSelector((state) => state.battleLog);
  const showSkills = useSelector((state) => state.showSkills);
  const gameLost = useSelector((state) => state.gameLost);
  const dispatch = useDispatch();

  const activeEnemy = enemies[activeEnemyIndex] || {};

  useEffect(() => {
    if (battleStarted && !battleOver && activeEnemy.health > 0) {
      const timer = setTimeout(() => {
        dispatch({ type: "PROCESS_ATTACK" });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [battleStarted, battleOver, activeEnemy.health, dispatch]);

  const handleAttack = () => {
    dispatch({ type: "START_BATTLE" });
  };

  const handleEnemySelection = (index) => {
    dispatch({ type: "SET_ACTIVE_ENEMY", payload: index });
  };

  const handleResetBattle = () => {
    dispatch({ type: "RESET_BATTLE" });
  };

  const handleGainSkill = (skill) => {
    dispatch({ type: "GAIN_SKILL", payload: skill });
  };

  const handleResetGame = () => {
    dispatch({ type: "RESET_GAME" });
  };

  return (
    <div className="container">
      {gameLost ? (
        <div>
          <p>You lost the game!</p>
          <button onClick={handleResetGame}>Reset Game</button>
        </div>
      ) : (
        <>
          <h2>Enemy: {activeEnemy.name || "None"}</h2>
          {activeEnemy.health !== undefined && (
            <p>Health: {activeEnemy.health}%</p>
          )}
          <button
            onClick={handleAttack}
            disabled={battleStarted || activeEnemy.health === undefined}
          >
            Attack
          </button>
          {battleOver && !showSkills && <p>Battle is over!</p>}
          {battleOver && showSkills && (
            <div>
              <h3>Choose a Skill:</h3>
              <button onClick={() => handleGainSkill("HEALTH")}>
                Increase Health
              </button>
              <button onClick={() => handleGainSkill("ATTACK")}>
                Increase Attack
              </button>
            </div>
          )}
          {battleOver && !showSkills && (
            <button onClick={handleResetBattle}>Select Another Enemy</button>
          )}
          <div className="log">
            {battleLog.map((log, index) => (
              <p key={index}>{log}</p>
            ))}
          </div>
          <div>
            <h3>Select an Enemy:</h3>
            {enemies.map((enemy, index) => (
              <button
                key={index}
                onClick={() => handleEnemySelection(index)}
                disabled={battleStarted || showSkills}
              >
                {enemy.name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Enemy;
