const initialState = {
  user: {
    name: "Player1",
    health: 100,
    maxHealth: 100,
    attack: 30,
    level: 1,
    experience: 0,
  },
  enemies: [
    { name: "Enemy1", health: 60, attack: 32, maxHealth: 60 },
    { name: "Enemy2", health: 80, attack: 25, maxHealth: 80 },
    { name: "Enemy3", health: 50, attack: 40, maxHealth: 50 },
    { name: "Enemy4", health: 70, attack: 35, maxHealth: 70 },
  ],
  activeEnemyIndex: -1,
  gold: 100,
  battleOver: false,
  battleStarted: false,
  battleLog: [],
  showSkills: false,
};

const goldReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "START_BATTLE":
      return {
        ...state,
        battleStarted: true,
        battleOver: false,
        battleLog: [],
        showSkills: false,
      };
    case "PROCESS_ATTACK":
      return handleAttack(state);
    case "SET_ACTIVE_ENEMY":
      return {
        ...state,
        activeEnemyIndex: action.payload,
        battleOver: false,
        battleStarted: false,
        battleLog: [],
        showSkills: false,
      };
    case "RESET_BATTLE":
      return {
        ...state,
        activeEnemyIndex: -1,
        battleOver: false,
        battleStarted: false,
        battleLog: [],
        showSkills: false,
      };
    case "BUY_ITEM":
      return handleBuyItem(state, action.payload);
    case "GAIN_SKILL":
      return handleGainSkill(state, action.payload);
    default:
      return state;
  }
};

const handleAttack = (state) => {
  const userAttack = state.user.attack;
  const activeEnemy = state.enemies[state.activeEnemyIndex];
  const enemyAttack = activeEnemy.attack;

  let newUserHealth = state.user.health - enemyAttack;
  let newEnemyHealth = activeEnemy.health - userAttack;

  newUserHealth = newUserHealth < 0 ? 0 : newUserHealth;
  newEnemyHealth = newEnemyHealth < 0 ? 0 : newEnemyHealth;

  let goldReward = 0;
  let battleOver = false;
  let newExperience = state.user.experience;

  if (newEnemyHealth === 0) {
    goldReward = 50; // Nagroda za pokonanie wroga
    battleOver = true;
    newExperience += 50; // Dodaj doświadczenie za pokonanie wroga
  }

  if (newUserHealth === 0) {
    battleOver = true;
    // Użytkownik przegrał, traci połowę złota i 30% doświadczenia
    state.gold = Math.floor(state.gold / 2);
    newExperience = Math.floor(newExperience * 0.7);
  }

  const newUserLevel = calculateLevel(newExperience);

  const battleLog = [...state.battleLog];
  battleLog.push(
    `Player attacked ${activeEnemy.name} for ${userAttack} damage.`
  );
  battleLog.push(
    `${activeEnemy.name} attacked Player for ${enemyAttack} damage.`
  );

  // Zaktualizowanie listy wrogów
  let newEnemies = [...state.enemies];
  if (newEnemyHealth === 0) {
    newEnemies = newEnemies.filter(
      (_, index) => index !== state.activeEnemyIndex
    );
  } else {
    newEnemies[state.activeEnemyIndex] = {
      ...activeEnemy,
      health: newEnemyHealth,
    };
  }

  return {
    ...state,
    user: {
      ...state.user,
      health: newUserHealth,
      experience: newExperience,
      level: newUserLevel,
    },
    enemies: newEnemies,
    activeEnemyIndex:
      battleOver && newEnemyHealth === 0 ? -1 : state.activeEnemyIndex, // Resetuj indeks aktywnego wroga po walce
    gold: state.gold + goldReward,
    battleOver: battleOver,
    battleLog: battleLog,
    showSkills: battleOver && newEnemyHealth === 0,
  };
};

const handleBuyItem = (state, item) => {
  let newHealth = state.user.health;
  let newGold = state.gold;

  if (item === "FULL" && newGold >= 20) {
    newHealth += 100;
    newGold -= 20;
  } else if (item === "HALF" && newGold >= 13) {
    newHealth += 50;
    newGold -= 13;
  }

  newHealth =
    newHealth > state.user.maxHealth ? state.user.maxHealth : newHealth; // Maksymalne zdrowie to maxHealth

  return {
    ...state,
    user: { ...state.user, health: newHealth },
    gold: newGold,
  };
};

const handleGainSkill = (state, skill) => {
  let newUser = { ...state.user };
  if (skill === "HEALTH") {
    newUser.maxHealth += 10;
    newUser.health = newUser.maxHealth; // Przywróć zdrowie do pełna przy zwiększeniu maxHealth
  } else if (skill === "ATTACK") {
    newUser.attack += 5;
  }

  return {
    ...state,
    user: newUser,
    showSkills: false,
  };
};

const calculateLevel = (experience) => {
  if (experience >= 150) return 3;
  if (experience >= 50) return 2;
  return 1;
};

export default goldReducer;
