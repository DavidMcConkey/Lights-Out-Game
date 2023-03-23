import React from "react";
import "./Cell.css";

const Cell = ({ flipCells, isLit = false }) => {
  const classes = `Cell ${isLit ? "Cell-lit" : ""}`;
  return <td className={classes} onClick={flipCells} role="button" />;
};

export default Cell;
