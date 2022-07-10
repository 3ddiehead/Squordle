import classes from "./GuessBox.module.css";

var bg_colors = {
	"in_word":"yellow",
	"correct":"green",
	"empty":"none",
	"filled": "none"
}

function GuessBox(props) {
	return (
		<div className={classes.GuessBox}>
			<button style={{backgroundColor:bg_colors[props.state]}}>
				{props.letter}
			</button>
		</div>
	)
}

export default GuessBox;

