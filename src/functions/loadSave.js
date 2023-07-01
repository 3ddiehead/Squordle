/*
 *loadSave.js
*/

function loadSave()
{
    if (localStorage.length !== 13)
    {
        if (!(localStorage.firstTime))
            localStorage.firstTime = true;
        if (!(localStorage.backdrop))
            localStorage.backdrop = false;
        if (!(localStorage.shopState))
            localStorage.shopState = 0;
        
        if (!(localStorage.pokeList))
            localStorage.pokeList = null;

        // GAMEMODE INFO ---
        // 0: daily, 1: freeplay, 2: daily + ez, 3: freeplay + ez
        if (!(localStorage.gameMode))
            localStorage.gameMode = 2;
        if (!(localStorage.potd)) {
            let info = { daily: "",
                         isWon: false };
            localStorage.potd = JSON.stringify(info);
        }
        if (!(localStorage.genFilter)) {
            let filter = { g1: false,
                           g2: false,
                           g3: false,
                           g4: false,
                           g5: false,
                           g6: false };
            localStorage.genFilter = JSON.stringify(filter);
        }
        if (!(localStorage.boardState)) {
            let info = { gameSpace: null,
                         letterStates: null,
                         focus: [0, 0] };
            localStorage.boardState = JSON.stringify(info); 
        }
        // USER INFO ---
        if (!(localStorage.user))
            localStorage.user = "guest";
        if (!(localStorage.region))
            localStorage.region = "kanto";
        if (!(localStorage.pokeDollars))
            localStorage.pokeDollars = 0;
        if (!(localStorage.shuckleInfo)) {
            let info = { adopted:    false,
                         shiny:      false,
                         children:   [] };
            localStorage.shuckleInfo = JSON.stringify(info);
        }
        if (!(localStorage.inventory)) {
            let items = { spicyPoffin: 0,
                          sweetPoffin: 0,
                          goldPoffin:  0,
                          lemonade:    0,
                          ticket:      false };
            localStorage.inventory = JSON.stringify(items);
        } 
        if (!(localStorage.saveKey))
            localStorage.saveKey = "";
    };
};

export default loadSave;
