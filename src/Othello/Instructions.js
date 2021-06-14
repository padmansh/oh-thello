import React from "react";

const instructions = [
  { text: "In every mode, White is the first moving piece followed by Black." },
  {
    text: "You have to place your pieces on the board adjacant to opponent's pieces so that the opponent's piece or a row of opponent's pieces is flanked by the new piece (you just placed) and another piece of your own (that you placed in previous turns).",
  },
  {
    text: "You should play your turn in order to flip pieces in more than one direction to increase your count faster.",
  },
  {
    text: "A legal move is one in which atleast one of the opponent's pieces are being turned. If no legal moves are available, You may pass on the turn or Exit the game.",
  },
  {
    text: "Hints provide you with all possible places where you can place your piece for difficult situations.",
  },
  {
    text: "You can reset the board anytime, If you feel losing.",
  },
];

const Instructions = () => {
  return (
    <>
      <div className="ml-4 mr-2 py-4 px-4 sm:px-24 md:px-40 lg:px-64 xl:px-80 h-screen ">
        <p className="text-white text-4xl text-center mt-5 mb-6">
          Instructions
        </p>
        <ul className="text-white">
          {instructions.map((ins, idx) => (
            <li className="list-disc py-2" key={idx}>
              {ins.text}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Instructions;
