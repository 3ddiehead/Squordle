import './App.css';

import { useState, useRef } from 'react';

import GameSpace from "./components/GameSpace.js"


function App() {

  var pokemonlist = ['absol', 'accelgor', 'aggron', 'aipom', 'alakazam', 'alcremie', 'altaria', 'amaura', 'ambipom', 'ampharos', 'anorith', 'appletun', 'applin', 'arbok', 'arcanine', 'arceus', 'archen', 'archeops', 'ariados', 'armaldo', 'arrokuda', 'articuno', 'audino', 'aurorus', 'avalugg', 'azelf', 'azurill', 'bagon', 'baltoy', 'banette', 'barboach', 'basculin', 'bayleef', 'beartic', 'beedrill', 'beheeyem', 'beldum', 'bergmite', 'bewear', 'bibarel', 'bidoof', 'binacle', 'bisharp', 'blaziken', 'blipbug', 'blissey', 'blitzle', 'boldore', 'boltund', 'bonsly', 'braixen', 'braviary', 'breloom', 'brionne', 'bronzong', 'bronzor', 'bruxish', 'budew', 'buizel', 'buneary', 'bunnelby', 'burmy', 'buzzwole', 'cacnea', 'cacturne', 'calyrex', 'camerupt', 'carbink', 'carkol', 'carvanha', 'cascoon', 'castform', 'caterpie', 'celebi', 'chansey', 'chatot', 'cherrim', 'cherubi', 'chespin', 'chewtle', 'chimchar', 'chimecho', 'chinchou', 'cinccino', 'clamperl', 'claydol', 'clefable', 'clefairy', 'cleffa', 'cloyster', 'cobalion', 'combee', 'comfey', 'corphish', 'corsola', 'cosmoem', 'cosmog', 'cottonee', 'cradily', 'cranidos', 'croagunk', 'crobat', 'croconaw', 'crustle', 'cubchoo', 'cubone', 'cufant', 'cursola', 'cutiefly', 'darkrai', 'dartrix', 'darumaka', 'dedenne', 'deerling', 'deino', 'delcatty', 'delibird', 'delphox', 'deoxys', 'dewgong', 'dewott', 'dewpider', 'dhelmise', 'dialga', 'diancie', 'diglett', 'ditto', 'dodrio', 'doduo', 'donphan', 'dottler', 'doublade', 'dragalge', 'drakloak', 'drampa', 'drapion', 'dratini', 'drednaw', 'dreepy', 'drifblim', 'drifloon', 'drilbur', 'drizzile', 'drowzee', 'dubwool', 'ducklett', 'dugtrio', 'duosion', 'durant', 'dusclops', 'dusknoir', 'duskull', 'dustox', 'dwebble', 'eevee', 'eiscue', 'ekans', 'eldegoss', 'elekid', 'elgyem', 'emboar', 'emolga', 'empoleon', 'entei', 'espeon', 'espurr', 'exploud', 'falinks', 'fearow', 'feebas', 'fennekin', 'finneon', 'flaaffy', 'flabebe', 'flapple', 'flareon', 'floatzel', 'floette', 'florges', 'flygon', 'fomantis', 'foongus', 'fraxure', 'frillish', 'froakie', 'froslass', 'frosmoth', 'furfrou', 'furret', 'gabite', 'gallade', 'garbodor', 'garchomp', 'gastly', 'genesect', 'gengar', 'geodude', 'gible', 'gigalith', 'giratina', 'glaceon', 'glalie', 'glameow', 'gligar', 'gliscor', 'gloom', 'gogoat', 'golbat', 'goldeen', 'golduck', 'golem', 'golett', 'golurk', 'goodra', 'goomy', 'gorebyss', 'gothita', 'granbull', 'graveler', 'greedent', 'greninja', 'grimer', 'grookey', 'grotle', 'groudon', 'grovyle', 'grubbin', 'grumpig', 'gulpin', 'gumshoos', 'gurdurr', 'guzzlord', 'gyarados', 'hakamoo', 'happiny', 'hariyama', 'hatenna', 'hattrem', 'haunter', 'hawlucha', 'haxorus', 'heatmor', 'heatran', 'herdier', 'honedge', 'hoopa', 'hoothoot', 'hoppip', 'horsea', 'houndoom', 'houndour', 'huntail', 'hypno', 'illumise', 'impidimp', 'indeedee', 'inkay', 'inteleon', 'ivysaur', 'jangmoo', 'jirachi', 'jolteon', 'joltik', 'jumpluff', 'kabuto', 'kabutops', 'kadabra', 'kakuna', 'kartana', 'kecleon', 'keldeo', 'kingdra', 'kingler', 'kirlia', 'klang', 'klefki', 'klink', 'koffing', 'komala', 'kommoo', 'krabby', 'krokorok', 'kubfu', 'kyogre', 'kyurem', 'lairon', 'lampent', 'landorus', 'lanturn', 'lapras', 'larvesta', 'larvitar', 'latias', 'latios', 'leafeon', 'leavanny', 'ledian', 'ledyba', 'liepard', 'lileep', 'lillipup', 'linoone', 'litleo', 'litten', 'litwick', 'lombre', 'lopunny', 'lotad', 'loudred', 'lucario', 'ludicolo', 'lugia', 'lumineon', 'lunala', 'lunatone', 'lurantis', 'luvdisc', 'luxio', 'luxray', 'lycanroc', 'machamp', 'machoke', 'machop', 'magby', 'magcargo', 'magearna', 'magikarp', 'magmar', 'magneton', 'makuhita', 'malamar', 'manaphy', 'mankey', 'mantine', 'mantyke', 'maractus', 'mareanie', 'mareep', 'marill', 'marowak', 'mawile', 'medicham', 'meditite', 'meganium', 'melmetal', 'meloetta', 'meltan', 'meowstic', 'meowth', 'mesprit', 'metang', 'metapod', 'mewtwo', 'mienfoo', 'mienshao', 'milcery', 'milotic', 'miltank', 'mimejr', 'mimikyu', 'minccino', 'minior', 'minun', 'moltres', 'monferno', 'morelull', 'morgrem', 'morpeko', 'mothim', 'mrmime', 'mrrime', 'mudbray', 'mudkip', 'mudsdale', 'munchlax', 'munna', 'murkrow', 'musharna', 'necrozma', 'nickit', 'nidoking', 'nidoran', 'nidoran', 'nidorina', 'nidorino', 'nihilego', 'nincada', 'ninjask', 'noctowl', 'noibat', 'noivern', 'nosepass', 'numel', 'nuzleaf', 'oddish', 'omanyte', 'omastar', 'oranguru', 'orbeetle', 'oricorio', 'oshawott', 'palkia', 'pancham', 'pangoro', 'panpour', 'pansage', 'pansear', 'paras', 'parasect', 'patrat', 'pawniard', 'pelipper', 'persian', 'petilil', 'phanpy', 'phantump', 'phione', 'pichu', 'pidgeot', 'pidgey', 'pidove', 'pignite', 'pikachu', 'pikipek', 'pineco', 'pinsir', 'piplup', 'plusle', 'poipole', 'politoed', 'poliwag', 'ponyta', 'popplio', 'porygon', 'porygonz', 'primeape', 'prinplup', 'psyduck', 'pupitar', 'purrloin', 'purugly', 'pyroar', 'quagsire', 'quilava', 'qwilfish', 'raboot', 'raichu', 'raikou', 'ralts', 'rapidash', 'raticate', 'rattata', 'rayquaza', 'regice', 'regirock', 'remoraid', 'reshiram', 'rhydon', 'rhyhorn', 'ribombee', 'riolu', 'rockruff', 'rolycoly', 'rookidee', 'roselia', 'roserade', 'rotom', 'rowlet', 'rufflet', 'sableye', 'salandit', 'salazzle', 'samurott', 'sandile', 'sawsbuck', 'sceptile', 'scizor', 'scrafty', 'scraggy', 'scyther', 'seadra', 'seaking', 'sealeo', 'seedot', 'sentret', 'servine', 'seviper', 'sewaddle', 'sharpedo', 'shaymin', 'shedinja', 'shelgon', 'shellder', 'shellos', 'shelmet', 'shieldon', 'shiftry', 'shinx', 'shuckle', 'shuppet', 'sigilyph', 'silcoon', 'silvally', 'simipour', 'simisage', 'simisear', 'sinistea', 'skarmory', 'skiddo', 'skiploom', 'skitty', 'skorupi', 'skrelp', 'skuntank', 'skwovet', 'slaking', 'slakoth', 'sliggoo', 'slowbro', 'slowking', 'slowpoke', 'slugma', 'slurpuff', 'smeargle', 'smoochum', 'sneasel', 'snivy', 'snorlax', 'snorunt', 'snover', 'snubbull', 'sobble', 'solgaleo', 'solosis', 'solrock', 'spearow', 'spewpa', 'spheal', 'spinarak', 'spinda', 'spoink', 'spritzee', 'squirtle', 'stantler', 'staravia', 'starly', 'starmie', 'staryu', 'steelix', 'steenee', 'stufful', 'stunfisk', 'stunky', 'suicune', 'sunflora', 'sunkern', 'surskit', 'swablu', 'swadloon', 'swalot', 'swampert', 'swanna', 'swellow', 'swinub', 'swirlix', 'swoobat', 'sylveon', 'taillow', 'tangela', 'tapubulu', 'tapufini', 'tapukoko', 'tapulele', 'tauros', 'tepig', 'thievul', 'throh', 'thwackey', 'timburr', 'tirtouga', 'togekiss', 'togepi', 'togetic', 'torchic', 'torkoal', 'tornadus', 'torracat', 'torterra', 'totodile', 'toxapex', 'toxel', 'trapinch', 'treecko', 'tropius', 'trubbish', 'trumbeak', 'tsareena', 'turtwig', 'tympole', 'tynamo', 'typenull', 'tyrogue', 'tyrunt', 'umbreon', 'unfezant', 'unown', 'ursaring', 'urshifu', 'vaporeon', 'venipede', 'venomoth', 'venonat', 'venusaur', 'vibrava', 'victini', 'vigoroth', 'vikavolt', 'virizion', 'vivillon', 'volbeat', 'voltorb', 'vullaby', 'vulpix', 'wailmer', 'wailord', 'walrein', 'watchog', 'weavile', 'weedle', 'weezing', 'whiscash', 'whismur', 'wimpod', 'wingull', 'woobat', 'wooloo', 'wooper', 'wormadam', 'wurmple', 'wynaut', 'xerneas', 'yamask', 'yamper', 'yanma', 'yanmega', 'yungoos', 'yveltal', 'zacian', 'zangoose', 'zapdos', 'zarude', 'zekrom', 'zeraora', 'zoroark', 'zorua', 'zubat', 'zweilous', 'zygarde'];
  var validKeys = "qwertyuiopasdfghjklzxcvbnm".split('').concat("Backspace");
  validKeys = new Set(validKeys)

  var selection_number = Math.floor(Math.random()*pokemonlist.length);

  var selection = pokemonlist[selection_number];

  var wordlength = selection.length;

  var gs_init = Array(6);

  for(var i=0; i<gs_init.length; i++) {
    var row = {};
    row.id = "r"+i;
    row.state = "empty";
    row.length = wordlength;
    row.pokemon = selection;
    row.boxes = Array(wordlength);
    for(var k=0; k<row.boxes.length; k++) {
      var box = {};
      box.id = row.id+"b"+k;
      box.delay = k*100+"ms"
      box.state = "empty";
      box.letter = "";
      row.boxes[k] = box;
    };
    gs_init[i] = row;
  };

  return (
    <div>
      <header className="MenuBar">
        <div className="LeftMenu">
          <button type="button" className="NavSandwich">
            <svg width="24" height="17" viewBox="0 0 24 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.172974" width="20" height="3" rx="1.5" fill="#000000"></rect>
              <rect x="0.172974" y="7" width="20" height="3" rx="1.5" fill="#000000"></rect>
              <rect x="0.172974" y="14" width="20" height="3" rx="1.5" fill="#000000"></rect>
            </svg>
          </button>
          <button type="button" id="help-button" className="HelpButton">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" className="game-icon" data-testid="icon-help">
              <path fill="#000000" d=
              "M11 18h2v-2h-2v2z
              m1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z
              m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z
              m0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z">
              </path>
            </svg>
          </button>
        </div>
        <div className="GameTitle">
          <img height="35" width="auto" src={require("./assets/LogoLight.png")} />
        </div>
        <div className="RightMenu">
          <button>
            OPTIONS
          </button>
        </div>
      </header>
      <GameSpace id="gamespace" rows={gs_init} wordlength={wordlength} validKeys={validKeys}/>
      <div className="Keyboard">
      </div>
    </div>
  );
}

export default App;
