import GameSpace from "./GameSpace.js";
import Keyboard from "./Keyboard.js";
import { useState, useRef } from 'react';

function GSDiv(props){
	const [gamespace, setGamespace] = useState(props.rows);

	return (
		<div>
			<GameSpace id="gamespace" gamespace={gamespace} setGamespace={setGamespace} wordlength={props.wordlength} validKeys={new Set(props.validKeys)} pokemonlist={props.pokemonlist}/>
			<Keyboard id="keyboard" setGamespace={setGamespace} validKeys={props.validKeys}/>
		</div>
	)
}

export default GSDiv;