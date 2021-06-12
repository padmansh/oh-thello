import React from "react";
import { useHistory } from "react-router-dom";

const options = [
  { name: "Single Player", path: "/board/single_player" },
  { name: "Multi Player", path: "/board/multi_player" },
  { name: "Computer Player", path: "/board/computer_player" },
  { name: "How to Play", path: "/instructions" },
];

const Landing = () => {
  const history = useHistory();

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <p className="text-white text-5xl my-8">Othello</p>
      {options.map((option, idx) => (
        <button
          key={idx}
          onClick={() => history.push(option.path)}
          className="text-white my-4 text-xl px-8 pt-0.5 pb-1.5 bg-button_black hover:bg-board_green_dark rounded-sm w-4/6 sm:w-2/6 lg:w-1/6"
        >
          {option.name}
        </button>
      ))}
    </div>
  );
};

export default Landing;
