import classes from "./LoseDisplay.module.css"

function LoseDisplay(props){
	var gamespace = props.gamespace;
	var spriteRef = "https://img.pokemondb.net/s.png";
	var answer = gamespace[0].pokemon;

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

	if(hyphenator[answer]){
		answer = hyphenator[answer];
	}

	if(answer!=""){
		spriteRef = "https://img.pokemondb.net/sprites/sword-shield/icon/"+answer+".png"
	}

	return(
		<div className={classes.LoseDisplay}>
			<img style={{width:"256px", height:"192px", position:"relative"}} src={spriteRef}/>
			<p>The correct pokemon was {answer}</p>
		</div>
	);
};

export default LoseDisplay;