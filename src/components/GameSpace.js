import classes from "./GameSpace.module.css";

import GameRow from "./GameRow.js";

import { useState, useRef } from 'react';

function GameSpace(props) {

  var wordlength = props.wordlength;
  var validKeys = props.validKeys;

  const [gamespace, setGamespace] = useState(props.rows);

  function findFocus(gamespace){
    for(var i=0; i<gamespace.length; i++) {
      if(gamespace[i].state === "empty"){
        for(var k=0; k<gamespace[i].boxes.length; k++) {
          if(gamespace[i].boxes[k].state === "empty"){
            return [i,k];
          }
        }
        return [i,-1]
      }
    };
    return 0
  }

  function checkAnswer(row){
    var word = row.pokemon;
    var wordset = word.split('');
    wordset = new Set(wordset);

    for(var i=0;i<word.length;i++){
      var letter = row.boxes[i].letter;
      const is_in_word = wordset.has(letter);
      if(letter === word[i]){
        row.boxes[i].state = "correct";
      }
      else if(is_in_word){
        row.boxes[i].state = "in_word";
      }
      else{
        row.boxes[i].state = "incorrect"
      }
    }
    return row;
  }

  function keyDownHandler(e){
    document.removeEventListener('keydown', keyDownHandler);
    const is_valid_key = validKeys.has(e.key);
    var foc = findFocus(gamespace);
    var gamechange = gamespace;
    if(foc[1]===-1 && e.key === "Enter"){
      var rowchange = checkAnswer(gamechange[foc[0]]);
      gamechange[foc[0]] = rowchange;
      gamechange[foc[0]].state = "filled";
    }
    else if(e.key === "Backspace"){
      if(foc[1]===-1){
        gamechange[foc[0]].boxes[wordlength-1].state = "empty";
        gamechange[foc[0]].boxes[wordlength-1].letter = '';
      }else if(foc[1]!==0){
        gamechange[foc[0]].boxes[foc[1]-1].state = "empty";
        gamechange[foc[0]].boxes[foc[1]-1].letter = '';
      }
    }
    else if(foc[1]!==-1 && is_valid_key){
      gamechange[foc[0]].boxes[foc[1]].letter = e.key;
      gamechange[foc[0]].boxes[foc[1]].state = "filled"
    }
    setGamespace([...gamechange]);
  }

  document.addEventListener('keydown', keyDownHandler);

  if(findFocus(gamespace) === 0){
    document.removeEventListener('keydown', keyDownHandler);
  }

  return (
    <div className={classes.GameSpace}>
      {gamespace.map((row) => (<GameRow
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