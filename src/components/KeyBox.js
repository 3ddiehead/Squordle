import classes from "./KeyBox.module.css";

function KeyBox(props) {
	return (
		<button className={classes.KeyBox}>
			{props.id}
		</button>
	);
}

export default KeyBox;