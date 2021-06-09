import React from "react";
import Coin from "./Coin";

const arr = [
  { color: "white", name: "White", score: "2" },
  { color: "dark", name: "Black", score: "4" },
];

const PlayerDetails = ({ coinCount, turn, resetBoard }) => {
  return (
    <>
      {arr.map((player, idx) => (
        <div
          key={idx}
          className={`flex p-2 rounded-sm mb-4 ${
            (turn === "w" && player.name === "White") ||
            (turn === "b" && player.name === "Black")
              ? "bg-board_green_dark"
              : "bg-button_black"
          }`}
        >
          <div className="p-2">
            <Coin color={player.color} />
          </div>
          <div className="p-2 flex flex-col ">
            <p className="">{player.name}</p>
            <p className="">
              {player.color === "white" ? coinCount.white : coinCount.black}
            </p>
          </div>
        </div>
      ))}
      <button className="bg-button_black rounded-sm py-1" onClick={resetBoard}>
        Reset
      </button>
    </>
  );
};

export default PlayerDetails;
