import classes from "./KeyBox.module.css";

var bg_colors = {
	"in_word":"#f5e554",
	"correct":"#78e22c",
	"normal":"#dadada",
	"incorrect": "#939393"
}

function KeyBox(props) {

	if(props.id == "Enter"){
		return (
			<button className={classes.KeyBox_long} style={{fontSize: "24px"}} value={props.id} onClick={props.handler}>
				{'↵'}
			</button>
		);
	}
	else if(props.id == "Backspace"){
		return (
			<button className={classes.KeyBox_long} value={props.id} onClick={props.handler}>
				{"BACK"}
			</button>
		);
	}
	else{
		return (
			<button className={classes.KeyBox} style={{backgroundColor:bg_colors[props.state]}}value={props.id} onClick={props.handler}>
				{props.id}
			</button>
		);
	}
}

export default KeyBox;