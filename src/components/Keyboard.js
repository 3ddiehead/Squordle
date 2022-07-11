import classes from "./Keyboard.module.css";
import KeyRow from "./KeyRow.js"

function Keyboard(props){
	return(
		<div className={classes.Keyboard}>
	      	<KeyRow key = "kr1" id = "kr1" setGamespace={props.setGamespace} keys = {props.validKeys.slice(0,10)}/>
	      	<KeyRow key = "kr2" id = "kr2" setGamespace={props.setGamespace} keys = {props.validKeys.slice(10,19)}/>
	      	<KeyRow key = "kr3" id = "kr3" setGamespace={props.setGamespace} keys = {["Enter"].concat(props.validKeys.slice(19,27).concat("Back"))}/>
		</div>
	)
}

export default Keyboard;