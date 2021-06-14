import React, { useState, useEffect } from "react";
import Coin from "./Coin";
import PreCoin from "./PreCoin";
import PlayerDetails from "./PlayerDetails";
import Oops from "./OopsPrompt";
import { useHistory } from "react-router-dom";
import GameOver from "./GameOverPrompt";

let tiles = new Array(8);

for (let i = 0; i < tiles.length; i++) {
  tiles[i] = new Array(8);
}

for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    if ((i === 3 && j === 3) || (i === 4 && j === 4)) {
      tiles[i][j] = { row: i, col: j, type: "w", id: `${i}${j}` };
    } else if ((i === 3 && j === 4) || (i === 4 && j === 3)) {
      tiles[i][j] = { row: i, col: j, type: "b", id: `${i}${j}` };
    } else {
      tiles[i][j] = { row: i, col: j, type: "n", id: `${i}${j}` };
    }
  }
}

const Board = ({ match }) => {
  const history = useHistory();
  const { mode } = match.params;
  const [squares, setSquares] = useState(tiles);
  const [turn, setTurn] = useState("w");
  const [hint, setHint] = useState(false);
  const [allPossibleMoves, setAllPossibleMoves] = useState([]);
  const [filled, setFilled] = useState(["33", "44", "34", "43"]);
  const [coinCount, setCoinCount] = useState({ white: 2, black: 2 });
  const [showPrompt, setShowPrompt] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    resetBoard();
    //eslint-disable-next-line
  }, [history]);

  useEffect(() => {
    let { allMoves, compMove } = possibleMoves();
    setAllPossibleMoves(allMoves);

    if (allMoves.length) {
      if (mode === "computer_player" && turn === "b") {
        compMove &&
          setTimeout(() => {
            handleTurn(compMove);
          }, 1000);
      }
    } else {
      if (
        coinCount.white === 0 ||
        coinCount.black === 0 ||
        filled.length === 64
      ) {
        setGameOver(true);
      } else {
        setShowPrompt(true);
      }
    }

    //eslint-disable-next-line
  }, [turn]);

  const PassChance = () => {
    setTurn(turn === "b" ? "w" : "b");
    setShowPrompt(false);
  };

  const ExitGame = () => {
    resetBoard();
    history.push("/");
    setShowPrompt(false);
  };

  const PlayAgain = () => {
    resetBoard();
    setGameOver(false);
  };

  const possibleMoves = () => {
    let allMoves = [];
    let flips = [];
    let max = 1;
    let bestMove = [];

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (!filled.includes(squares[i][j].id)) {
          flips = getFlippingCoins(squares[i][j]);
          if (flips.length > 0) {
            allMoves.push(squares[i][j].id);
          }
          if (mode === "computer_player") {
            if (flips.length > max) {
              max = flips.length;
              bestMove = [];
              bestMove.push(squares[i][j]);
            }
            if (flips.length === max) {
              bestMove.push(squares[i][j]);
            }
          }
        }
      }
    }

    const computerMove = bestMove[Math.floor(Math.random() * bestMove.length)];

    return { allMoves: allMoves, compMove: computerMove };
  };

  const resetBoard = () => {
    setSquares(
      squares.map((square) =>
        square.map((block) => {
          let arr = block;

          if (block.id === "33" || block.id === "44") {
            arr.type = "w";
            block = arr;
          } else if (block.id === "34" || block.id === "43") {
            arr.type = "b";
            block = arr;
          } else {
            arr.type = "n";
            block = arr;
          }
          return block;
        })
      )
    );
    setTurn("w");
    setCoinCount({ white: 2, black: 2 });
    setFilled(["33", "44", "34", "43"]);
    setAllPossibleMoves(["24", "35", "42", "53"]);
  };

  const updateCoinCount = () => {
    let white = 0;
    let black = 0;
    for (let i = 0; i < 8; i++) {
      // eslint-disable-next-line
      squares[i].filter((square) =>
        square.type === "w"
          ? (white += 1)
          : square.type === "b"
          ? (black += 1)
          : []
      );
    }
    if (turn === "w") {
      white += 1;
    } else if (turn === "b") {
      black += 1;
    }
    setCoinCount({ white: white, black: black });
  };

  const getFlippingCoins = (tile) => {
    let row_i = tile.row;
    let col_j = tile.col;
    let coinsMayFlip = [];
    let coinsWillFlip = [];

    //top flippings
    while (row_i > 0) {
      row_i -= 1;
      let currentTileValue = squares[row_i][tile.col].type;

      if (currentTileValue === "n" || currentTileValue === turn) {
        if (currentTileValue === turn) {
          coinsWillFlip = coinsWillFlip.concat(coinsMayFlip);
        }
        break;
      } else {
        let flipTile = { row: row_i, col: tile.col, flip: "t" };
        coinsMayFlip.push(flipTile);
      }
    }

    row_i = tile.row;
    coinsMayFlip = [];

    // bottom flippings
    while (row_i < 7) {
      row_i += 1;
      let currentTileValue = squares[row_i][tile.col].type;

      if (currentTileValue === "n" || currentTileValue === turn) {
        if (currentTileValue === turn) {
          coinsWillFlip = coinsWillFlip.concat(coinsMayFlip);
        }
        break;
      } else {
        let flipTile = { row: row_i, col: tile.col, flip: "b" };
        coinsMayFlip.push(flipTile);
      }
    }

    coinsMayFlip = [];

    // right flippings
    while (col_j < 7) {
      col_j += 1;
      let currentTileValue = squares[tile.row][col_j].type;
      if (currentTileValue === "n" || currentTileValue === turn) {
        if (currentTileValue === turn) {
          coinsWillFlip = coinsWillFlip.concat(coinsMayFlip);
        }
        break;
      } else {
        let flipTile = { row: tile.row, col: col_j, flip: "r" };
        coinsMayFlip.push(flipTile);
      }
    }

    col_j = tile.col;
    coinsMayFlip = [];

    // left flippings
    while (col_j > 0) {
      col_j -= 1;
      let currentTileValue = squares[tile.row][col_j].type;
      if (currentTileValue === "n" || currentTileValue === turn) {
        if (currentTileValue === turn) {
          coinsWillFlip = coinsWillFlip.concat(coinsMayFlip);
        }
        break;
      } else {
        let flipTile = { row: tile.row, col: col_j, flip: "l" };
        coinsMayFlip.push(flipTile);
      }
    }

    row_i = tile.row;
    col_j = tile.col;
    coinsMayFlip = [];

    //top-right diagonal flippings
    while (col_j < 7 && row_i > 0) {
      col_j += 1;
      row_i -= 1;
      let currentTileValue = squares[row_i][col_j].type;

      if (currentTileValue === "n" || currentTileValue === turn) {
        if (currentTileValue === turn) {
          coinsWillFlip = coinsWillFlip.concat(coinsMayFlip);
        }
        break;
      } else {
        let flipTile = { row: row_i, col: col_j, flip: "tr" };
        coinsMayFlip.push(flipTile);
      }
    }

    row_i = tile.row;
    col_j = tile.col;
    coinsMayFlip = [];

    //top-left diagonal flippings
    while (col_j > 0 && row_i > 0) {
      col_j -= 1;
      row_i -= 1;
      let currentTileValue = squares[row_i][col_j].type;

      if (currentTileValue === "n" || currentTileValue === turn) {
        if (currentTileValue === turn) {
          coinsWillFlip = coinsWillFlip.concat(coinsMayFlip);
        }
        break;
      } else {
        let flipTile = { row: row_i, col: col_j, flip: "tl" };
        coinsMayFlip.push(flipTile);
      }
    }

    row_i = tile.row;
    col_j = tile.col;
    coinsMayFlip = [];

    //bottom-right diagonal flippings
    while (col_j < 7 && row_i < 7) {
      col_j += 1;
      row_i += 1;
      let currentTileValue = squares[row_i][col_j].type;

      if (currentTileValue === "n" || currentTileValue === turn) {
        if (currentTileValue === turn) {
          coinsWillFlip = coinsWillFlip.concat(coinsMayFlip);
        }
        break;
      } else {
        let flipTile = { row: row_i, col: col_j, flip: "br" };
        coinsMayFlip.push(flipTile);
      }
    }

    row_i = tile.row;
    col_j = tile.col;
    coinsMayFlip = [];

    //bottom-left diagonal flippings
    while (col_j > 0 && row_i < 7) {
      col_j -= 1;
      row_i += 1;
      let currentTileValue = squares[row_i][col_j].type;

      if (currentTileValue === "n" || currentTileValue === turn) {
        if (currentTileValue === turn) {
          coinsWillFlip = coinsWillFlip.concat(coinsMayFlip);
        }
        break;
      } else {
        let flipTile = { row: row_i, col: col_j, flip: "bl" };
        coinsMayFlip.push(flipTile);
      }
    }

    return coinsWillFlip;
  };

  const flipCoins = (flips) => {
    squares.map((square) =>
      square.map((block) => {
        for (let i = 0; i < flips.length; i++) {
          if (block.id === `${flips[i].row}${flips[i].col}`) {
            block.type = turn;
          }
        }
        return block;
      })
    );
  };

  const handleTurn = (tile) => {
    console.time("time");
    let arr;

    if (!filled.includes(tile.id)) {
      let flips = getFlippingCoins(tile);

      if (flips.length) {
        setSquares(
          squares.map((square) =>
            square.map((block) =>
              block.id === tile.id ? { ...block, type: turn } : block
            )
          )
        );

        arr = filled;
        arr.push(tile.id);
        setFilled(arr);

        flipCoins(flips);

        updateCoinCount();

        if (turn === "w") {
          setTurn("b");
        } else {
          setTurn("w");
        }
      }
    }
    console.timeEnd("time");
  };

  return (
    <>
      <div className="p-2 sm:p-4 flex flex-col justify-center items-center h-screen">
        {mode === "multi_player" ? (
          <p className="text-white text-4xl">Comming Soon !</p>
        ) : (
          <div className="p-0 sm:p-2 flex flex-col md:flex-row items-center justify-center">
            <PlayerDetails
              coinCount={coinCount}
              turn={turn}
              resetBoard={resetBoard}
              ExitGame={ExitGame}
              hint={hint}
              setHint={setHint}
              mode={mode}
            />
            <div className="grid grid-cols-8">
              {squares.map((square) =>
                square.map((tile) => (
                  <div
                    onClick={() => {
                      if (!(mode === "computer_player" && turn === "b")) {
                        handleTurn(tile);
                      }
                    }}
                    key={tile.id}
                    className={`h-11 w-11 sm:h-16 sm:w-16 bg-board_green hover:bg-board_green_dark flex justify-center items-center p-0.5 border-dark rounded-sm ${
                      filled.includes(tile.id)
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    } border`}
                  >
                    {tile.type !== "n" &&
                      (tile.type === "b" ? (
                        <Coin color="dark" shadow />
                      ) : (
                        <Coin color="white" shadow />
                      ))}
                    {hint && allPossibleMoves.includes(tile.id) && <PreCoin />}
                  </div>
                ))
              )}
            </div>
            <button
              className={` rounded-sm py-1 md:hidden text-white mt-4 w-full hover:bg-board_green_dark ${
                hint ? "bg-board_green_dark" : "bg-button_black"
              }`}
              onClick={() => setHint(!hint)}
            >
              {`Hint : ${hint ? "On" : "Off"}`}
            </button>
            <button
              disabled={
                mode === "computer_player" && turn === "b" ? true : false
              }
              className="bg-button_black rounded-sm py-1 md:hidden text-white mt-4 w-full hover:bg-board_green_dark"
              onClick={resetBoard}
            >
              Reset
            </button>
            <button
              disabled={
                mode === "computer_player" && turn === "b" ? true : false
              }
              className="bg-button_black rounded-sm py-1 md:hidden text-white mt-4 w-full hover:bg-board_green_dark"
              onClick={ExitGame}
            >
              Exit
            </button>
          </div>
        )}
      </div>
      <Oops
        ExitGame={ExitGame}
        PassChance={PassChance}
        showPrompt={showPrompt}
        mode={mode}
        turn={turn}
      />
      <GameOver
        ExitGame={ExitGame}
        PlayAgain={PlayAgain}
        showPrompt={gameOver}
        coinCount={coinCount}
        mode={mode}
      />
    </>
  );
};

export default Board;
