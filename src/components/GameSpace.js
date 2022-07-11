import classes from "./GameSpace.module.css";

import GameRow from "./GameRow.js";

import { useState, useRef } from 'react';

function GameSpace(props) {
  
  return (
    <div className={classes.GameSpace}>
      {props.gamespace.map((row) => (<GameRow
        key = {row.id}
        id = {row.id}
        state = {row.state}
        length = {row.length}
        boxes = {row.boxes}
        />))
      }
    </div>
  )
}

export default GameSpace;