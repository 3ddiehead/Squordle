import classes from "./GameRow.module.css";
import GuessBox from "./GuessBox.js";
import React from 'react';

function GameRow(props) {

	var spriteRef = "https://img.pokemondb.net/s.png";
	var guess = props.guess;
	var upDownPos = props.upDownPos;

	var hyphenator = {
		"jangmoo" : "jangmo-o",
		"hakamoo" : "hakamo-o",
		"kommoo" : "kommo-o",
		"tapukoko" : "tapu-koko",
		"tapulele" : "tapu-lele",
		"tapubulu" : "tapu-bulu",
		"tapufini" : "tapu-fini",
		"typenull" : "type-null",
		"nidoran" : "nidoran-m",
		"mrmime" : "mr-mime",
		"mimejr" : "mime-jr",
		"porygonz" : "porygon-z",
		"mrrime" : "mr-rime",
	}

	if(hyphenator[guess]){
		guess = hyphenator[guess];
	}

	if(guess!=""){
		spriteRef = "https://img.pokemondb.net/sprites/sword-shield/icon/"+guess+".png"
	}

	return (
		<div className={classes.GameRow} style={{gridTemplateColumns:"1fr ".repeat(props.length+2)}}>
			<img style={{width:"64px", height:"48px", position:"relative", top:props.upDownPos}} src={spriteRef}/>
			{props.boxes.map((box) => (<GuessBox
				key={box.id}
				id={box.id} 
				delay={box.delay}
				state={box.state}
				letter={box.letter}
				/>))
			}
			<img style={{width:"64px", height:"48px", position:"relative", top:-props.upDownPos-10}} src={spriteRef}/>
		</div>
	)
}

export default GameRow;