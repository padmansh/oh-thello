import React from "react";
import Coin from "./Coin";

const arr = [
  { color: "white", name: "White", score: "2" },
  { color: "dark", name: "Black", score: "4" },
];

const PlayerDetails = ({ coinCount, turn, resetBoard, hint, setHint }) => {
  return (
    <>
      <div className="flex md:flex-col md:mr-4 justify-between w-full md:w-44 text-white">
        {arr.map((player, idx) => (
          <div
            key={idx}
            className={`flex p-2 rounded-sm mb-4 flex-grow ${
              (turn === "w" && player.name === "White") ||
              (turn === "b" && player.name === "Black")
                ? "bg-board_green_dark"
                : "bg-button_black"
            } ${player.name === "White" ? "mr-2 md:mr-0" : "ml-2 md:ml-0"}`}
          >
            <div className="p-4 flex items-center md:flex-remove">
              <Coin color={player.color} />
            </div>
            <div className="p-2 px-4  flex flex-col justify-center ">
              <p className="">{player.name}</p>
              <p className="">
                {player.color === "white" ? coinCount.white : coinCount.black}
              </p>
            </div>
          </div>
        ))}
        <button
          className={`${
            hint ? "bg-board_green_dark" : "bg-button_black"
          } rounded-sm py-1 hidden md:block mb-4 hover:bg-board_green_dark`}
          onClick={() => setHint(!hint)}
        >
          {`Hint : ${hint ? "On" : "Off"}`}
        </button>

        <button
          className="bg-button_black rounded-sm py-1 hidden md:block hover:bg-board_green_dark"
          onClick={resetBoard}
        >
          Reset
        </button>
      </div>
    </>
  );
};

export default PlayerDetails;
