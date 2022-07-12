import classes from "./KeyRow.module.css";
import KeyBox from "./KeyBox.js"

function KeyRow(props){

	function keyInWord(letterStates, id){
		if(letterStates.correctGuess.has(id)){
			return "correct";
		}else if(letterStates.inWord.has(id)){
			return "in_word";
		}else if(letterStates.notInWord.has(id)){
			return "incorrect";
		}else{
			return "normal";
		}
	}

	return(
		<div className={classes.KeyRow} style={{paddingLeft:props.padding, paddingRight:props.padding, gridTemplateColumns:"1fr ".repeat(props.keys.length)}}>
			{props.keys.map((item) => (<KeyBox
				key={item}
				id={item}
				handler={props.handler}
				gamespace={props.gamespace}
				setGamespace={props.setGamespace}
				state={keyInWord(props.letterStates,item)} 
				/>))
			}
		</div>
	)
};

export default KeyRow;