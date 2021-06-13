import React from "react";

const GameOver = ({ ExitGame, showPrompt, PlayAgain, coinCount, mode }) => {
  const config = [
    { name: "Play Again", func: PlayAgain },
    { name: "Exit", func: ExitGame },
  ];

  const getContent = () => {
    let text;
    if (coinCount.white > coinCount.black) {
      if (mode === "computer_player") {
        text = "Congrats! You WIN";
      } else {
        text = "White WINS !";
      }
    } else if (coinCount.white < coinCount.black) {
      if (mode === "computer_player") {
        text = "LOL You NOOB You LOST !";
      } else {
        text = "Black WINS !";
      }
    } else {
      text = "You both NOOB Its a DRAW !";
    }

    return text;
  };

  return (
    <>
      <div
        className={`${
          showPrompt ? "visible" : "hidden"
        } text-white fixed left-1/2 -ml-5/12 sm:-ml-4/12 md:-ml-3/12 lg:-ml-2/12 top-5/12 bg-button_black w-5/6 sm:w-4/6 md:w-3/6 lg:w-2/6 flex flex-col items-center p-4`}
      >
        <h2 className="text-xl">Game Over !</h2>
        <p className="my-2">{getContent()}</p>
        <div className="flex w-full justify-around mt-1">
          {config.map((item, idx) => (
            <button
              key={idx}
              onClick={item.func}
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

export default GameOver;
