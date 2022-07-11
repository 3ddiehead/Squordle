import GameSpace from "./GameSpace.js";
import Keyboard from "./Keyboard.js";
import { useState, useRef } from 'react';

function GSDiv(props){
	const [gamespace, setGamespace] = useState(props.rows);

	var wordlength = props.wordlength;
  	var validKeys = props.validKeys;
  	var validKeysSet = new Set(validKeys);
  	var pokemonlist = props.pokemonlist;
  	var pokemonset = new Set(pokemonlist);

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
	    var is_winner = true;

	    for(var i=0;i<word.length;i++){
	      var letter = row.boxes[i].letter;
	      if(letter === word[i]){
	        row.boxes[i].state = "correct";
	        for(var k=0;k<wordset.length;k++){
	          if(letter===wordset[k]){
	            wordset.splice(k, 1);
	            break;
	          }
	        }
	      }else{
	        is_winner = false;
	      }
	    }

	    for(var i=0;i<word.length;i++){
	      if(row.boxes[i].state==="correct"){
	        continue;
	      }
	      var letter = row.boxes[i].letter;
	      var is_in_word = false;
	      for(var k=0;k<wordset.length;k++){
	        if(letter===wordset[k]){
	          is_in_word = true;
	          wordset.splice(k, 1);
	          break;
	        }
	      }
	      if(is_in_word){
	        row.boxes[i].state = "in_word";
	      }
	    }

	    if(is_winner){
	      row.state = "winner";
	    }

	    return row;
	}


	function keyDownHandler(e){

		var input = e.key || e.target.value;

	    document.removeEventListener('keydown', keyDownHandler);
	    const is_valid_key = validKeysSet.has(input);
	    var foc = findFocus(gamespace);
	    var gamechange = gamespace;

	    var guess = "";
	    for(var i=0;i<wordlength;i++){
	      guess = guess+gamechange[foc[0]].boxes[i].letter;
	    }
	    var is_pokemon = pokemonset.has(guess);

	    if(foc[1]===-1 && input === "Enter" && is_pokemon){
	      var rowchange = checkAnswer(gamechange[foc[0]]);
	      gamechange[foc[0]] = rowchange;
	      if(gamechange[foc[0]].state !== "winner"){
	        gamechange[foc[0]].state = "filled";
	      }
	    }
	    else if(input === "Backspace"){
	      if(foc[1]===-1){
	        gamechange[foc[0]].boxes[wordlength-1].state = "empty";
	        gamechange[foc[0]].boxes[wordlength-1].letter = '';
	      }else if(foc[1]!==0){
	        gamechange[foc[0]].boxes[foc[1]-1].state = "empty";
	        gamechange[foc[0]].boxes[foc[1]-1].letter = '';
	      }
	    }
	    else if(foc[1]!==-1 && is_valid_key){
	      gamechange[foc[0]].boxes[foc[1]].letter = input;
	      gamechange[foc[0]].boxes[foc[1]].state = "filled"
	    }
	    setGamespace([...gamechange]);
	  }

	  document.addEventListener('keydown', keyDownHandler);

	  if(findFocus(gamespace) === 0){
	    document.removeEventListener('keydown', keyDownHandler);
	    console.log(gamespace[0].pokemon);
	  }else{
	    for(var i=0;i<gamespace.length;i++){
	      if(gamespace[i].state === "winner"){
	        document.removeEventListener('keydown', keyDownHandler)
	      }
	    }
	  }

	return (
		<div>
			<GameSpace id="gamespace" gamespace={gamespace} wordlength={props.wordlength} pokemonlist={props.pokemonlist}/>
			<Keyboard id="keyboard" handler={keyDownHandler} gamespace={gamespace} setGamespace={setGamespace} validKeys={props.validKeys}/>
		</div>
	)
}

export default GSDiv;