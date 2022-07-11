import classes from "./KeyRow.module.css";
import KeyBox from "./KeyBox.js"

function KeyRow(props){
	return(
		<div className={classes.KeyRow} style={{gridTemplateColumns:"1fr ".repeat(props.keys.length)}}>
			{props.keys.map((item) => (<KeyBox
				key={item}
				id={item}
				setGamespace={props.setGamespace} 
				/>))
			}
		</div>
	)
};

export default KeyRow;