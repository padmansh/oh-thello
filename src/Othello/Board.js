import React, { useState } from "react";
import Coin from "./Coin";
import PlayerDetails from "./PlayerDetails";

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

const Board = () => {
  const [squares, setSquares] = useState(tiles);
  const [turn, setTurn] = useState("w");
  const [filled, setFilled] = useState(["33", "44", "34", "43"]);
  const [coinCount, setCoinCount] = useState({ white: 2, black: 2 });

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
  };

  return (
    <>
      <div className="p-4 flex flex-col justify-center items-center h-screen bg-dark">
        <div className="p-2 flex items-center justify-center">
          <div className="px-4 text-white flex flex-col">
            <PlayerDetails
              coinCount={coinCount}
              turn={turn}
              resetBoard={resetBoard}
            />
          </div>
          <div className="grid grid-cols-8">
            {squares.map((square) =>
              square.map((tile) => (
                <div
                  onClick={() => handleTurn(tile)}
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
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Board;
