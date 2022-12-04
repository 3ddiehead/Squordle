/*
 * InfoDisplay.js
*/ 

import classes from "./style/InfoDisplay.module.css";

function InfoDisplay(props)
{
	var infoText = ["You have six tries to guess the name of the Pokémon.",
                    "Each guess must be a real Pokémon. "
                     + "Hit enter to submit your guess.",
                    "Green letters are in the correct spot, "
                     + "yellow letters are in the wrong spot, "
                     + "and gray letters are not in the name.",
                    "Win 5 Pokédollars for each yellow letter, "
                     + "20 for each green letter, "
                     + "and 200 for correct guesses!"]

    function bullet(i)
    {
        return (
            <div className = {classes.listRow}
                 key = {"bullet-" + i}>
                <img className = {classes.pokeBullet} 
                     src = {require("../assets/BulletPointLight.png")}/>
                {infoText[i]}
            </div>
        )
    }

	return (
		<div className = {classes.infoDisplay}>
			<p/>
			<img src = {require("../assets/howtoplayLight.png")}/>

            {infoText.map((info, index) => {return bullet(index)} )}

			<div className = {classes.listRow}> 
                This project was made by&nbsp; 
                <a href="https://www.github.com/3ddiehead">3ddiehead</a>
			</div>

			<button onClick = {props.infoHandler}> Close </button>
			<p/>
		</div>
    );
}

export default InfoDisplay;
