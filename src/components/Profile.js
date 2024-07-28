import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const gold = useSelector((state) => state.gold);

  return (
    <div>
      <h2>{user.name}'s Profile</h2>
      <p>
        Health: {user.health}/{user.maxHealth}%
      </p>
      <p>Attack: {user.attack}</p>
      <p>Gold: {gold}</p>
      <p>Level: {user.level}</p>
      <p>Experience: {user.experience}</p>
    </div>
  );
};

export default Profile;
