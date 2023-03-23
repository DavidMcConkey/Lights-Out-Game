import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

function Board({ numRows = 5, numCols = 5, chanceLightOn = 0.25 }) {
  const [board, setBoard] = useState(createBoard());

  function createBoard() {
    let initBoard = [];
    for (let y = 0; y < numRows; y++) {
      let row = [];
      for (let x = 0; x < numCols; x++) {
        row.push(Math.random() < chanceLightOn);
      }
      initBoard.push(row);
    }
    return initBoard;
  }
  function checkWin() {
    return board.every((row) => row.every((cell) => !cell));
  }
  function flipCells(coord) {
    setBoard((oldBoard) => {
      const [y, x] = coord.split("-").map(Number);
      const flipCell = (y, x, boardCopy) => {
        if (x >= 0 && x < numCols && y >= 0 && y < numRows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };
      const boardCopy = oldBoard.map((row) => [...row]);
      flipCell(y, x, boardCopy);
      flipCell(y, x, -1, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y, x - 1, x, boardCopy);
      flipCell(y + 1, x, boardCopy);
      return boardCopy;
    });
  }
  if (checkWin()) {
    return <div>You won! Congrats!</div>;
  }
  let tblBoard = [];

  for (let y = 0; y < numRows; y++) {
    let row = [];
    for (let x = 0; x < numCols; x++) {
      let coord = `${y}-${x}`;
      row.push(
        <Cell
          key={coord}
          isLit={board[y][x]}
          flipCells={() => flipCells(coord)}
        />
      );
    }
    tblBoard.push(<tr key={y}>{row}</tr>);
  }
  return (
    <table className="Board">
      <tbody>{tblBoard}</tbody>
    </table>
  );
}

export default Board;
