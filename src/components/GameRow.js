import classes from "./GameRow.module.css";
import GuessBox from "./GuessBox.js";

var bg_colors = {
	"incorrect":"backgroundColor:gray",
	"in_word":"backgroundColor:yellow",
	"correct":"backgroundColor:green",
	"empty":"backgroundColor:gray",
	"filled": "backgroundColor:gray"
}

function GameRow(props) {
	return (
		<div className={classes.GameRow} style={{gridTemplateColumns:"1fr ".repeat(props.length)}}>
			{props.boxes.map((box) => (<GuessBox
				key={box.id}
				id={box.id} 
				delay={box.delay}
				state={box.state}
				letter={box.letter}
				style={bg_colors[box.state]}
				/>))
			}
		</div>
	)
}

export default GameRow;