import React, { useEffect } from "react";

const Oops = ({ ExitGame, PassChance, showPrompt, mode, turn }) => {
  const config = [
    { name: "Pass", func: PassChance },
    { name: "Exit", func: ExitGame },
  ];

  useEffect(() => {
    if (mode === "computer_player" && turn === "b") {
      setTimeout(() => PassChance(), 1000);
    }
    //eslint-disable-next-line
  }, [showPrompt]);

  return (
    <>
      <div
        className={`${
          showPrompt ? "visible" : "hidden"
        } text-white fixed left-1/2 -ml-5/12 sm:-ml-4/12 md:-ml-3/12 lg:-ml-2/12 top-5/12 bg-button_black w-5/6 sm:w-4/6 md:w-3/6 lg:w-2/6 flex flex-col items-center p-4`}
      >
        <h2 className="text-xl">Oops!</h2>
        <p className="my-2">No more possible moves available :/</p>
        <div className="flex w-full justify-around mt-1">
          {config.map((item, idx) => (
            <button
              key={idx}
              onClick={item.func}
              disabled={
                mode === "computer_player" && turn === "b" ? true : false
              }
              className="bg-dark py-1 px-5 rounded-sm hover:bg-board_green_dark"
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Oops;
