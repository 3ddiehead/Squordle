import classes from "./KeyBox.module.css";

function KeyBox(props) {
	
	return (
		<button className={classes.KeyBox} value={props.id} onClick={props.handler}>
			{props.id}
		</button>
	);
}

export default KeyBox;