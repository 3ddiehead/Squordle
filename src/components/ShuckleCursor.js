/*
 * ShuckleCursor.js
*/ 

import classes from "./style/ShuckleCursor.module.css";
import { useState, useEffect} from 'react';

function ShuckleCursor(props)
{
    const focus = { MOUSE: 0,
                    ITEM:  1,
                    KEY:   2,
                    STAY:  3,
                    MOBILE: 4};
    Object.freeze(focus);

	const action = { NONPLUSSED: 0, 
                     ANGRY:      1,
                     BIRTHING:   2,
                     SHINY:      3,     // ACTIVE, no animation
                     SING:       4,
                     HAPPY:      5,
                     LAY_EGG:    6};
    Object.freeze(action);

    const haltInv = props.haltInv;
    const setHaltInv = props.setHaltInv;

    const mousePos = props.mousePos;
    const [shuckleChildren, setShuckleChildren] = 
        useState(JSON.parse(localStorage.shuckleInfo)["children"]);
    const [shucklePos, setShucklePos] = useState([0, 0]);

    const babyPosInit = Array(shuckleChildren.length);
    for (var i = 0; i < babyPosInit.length; i++) {
        babyPosInit[i] = [0,0];
    }
    const [babyPosList, setBabyPosList] = useState(babyPosInit);

    // behavioral info: [0] - focus, [1] - action
    const [shuckleInfo, setShuckleInfo] = useState([0,0]);

    const [targetPos, setTargetPos] = useState([0,0]); 
    const [targetReached, setTargetReached] = useState(false);
    const [babyTargetReached, setBabyTargetReached] = 
        useState(Array(shuckleChildren.length));
    const [mobileTargetPos, setMobileTargetPos] = useState([0,0]);

    const [remainingKeys, setRemainingKeys] = useState(["Backspace", "Enter"]
        .concat("qwertyuiopasdfghjklzxcvbnm".split(''))); 

    const [selectedKey, setKey] = useState(null);
    const [keyPos, setKeyPos] = useState(null);
    const [busy, setBusy] = useState(true);
    const damageList = ["#131313", "#242424", "#303030", "#404040"];

	function isNear(a, b) 
    {
        if (a) return (Math.abs(a[0] - b[0]) < 25 && Math.abs(a[1] - b[1]) < 25);
	}

	function translateSpritePos(tPos, currPos, speed)
    {
		const [t_x, t_y] = [tPos[0], tPos[1]];
  		const [curr_x, curr_y] = [currPos[0], currPos[1]];

  		const xDir = Math.max
            (Math.min(speed * 0.01 * (t_x - curr_x), 3.5), -3.5);
  		const yDir = Math.max
            (Math.min(speed * 0.01 * (t_y - curr_y), 3.5), -3.5);

        return([xDir + curr_x, yDir + curr_y]);
	}

    function createBaby()
    {
        return {number: shuckleChildren.length,
                state:  "shuckleEgg0",
                shiny:  0}
    }

    // FUNCTION FUNCTION -------------------------------
    function chooseKey() 
    {
        setTargetReached(false);

        const rand = Math.floor(Math.random() * remainingKeys.length);
        const key = document.getElementById(remainingKeys[rand]);
        const keyPosition = key.getBoundingClientRect();

        setBusy(false);
        setHaltInv(true);
        setKey(key);
        setKeyPos([keyPosition.top, keyPosition.left]);

    }
    // -------------------------------------------------

    // USE EFFECTS -------------------------------------------------------------
    // TARGET TRACKING ----------------------------------------------
    //SHUCKLE
    useEffect(() => {
        setTimeout(() => {
            if (shuckleInfo[0] === focus.MOUSE) {  // MOUSE TRACKING
                let currPos = [mousePos[0], mousePos[1]]; 
                setTargetPos(currPos);
            }

            if (shuckleInfo[0] === focus.MOBILE) {
                let currPos = [mobileTargetPos[0], mobileTargetPos[1]];
                setTargetPos(currPos);
            }

            if (shuckleInfo[0] === focus.KEY && selectedKey !== null) {  // KEY CASE
                let currPos = [keyPos[0], keyPos[1]]
                setTargetPos(currPos);
            }

            if (shuckleInfo[0] === focus.ITEM) {
                let currPos = [props.targetInfo[1],props.targetInfo[2]];
                setTargetPos(currPos);
            }

            let pos = translateSpritePos([targetPos[0] + 15, targetPos[1]], 
                                         shucklePos, 
                                         3);
            setShucklePos([pos[0], pos[1]]);

            if (shuckleInfo[0] !== focus.KEY)
                setTargetReached
                    (isNear(targetPos, shucklePos) || 
                     isNear(mobileTargetPos, shucklePos));
            else
                setTargetReached(isNear(keyPos, shucklePos));
        }, 16);
    }, [mousePos, targetPos, shucklePos, selectedKey]);

    //BABIES
    useEffect(() => {
        setTimeout(() => {
            let currPosList = [[shucklePos[0], shucklePos[1]]];
            for (var i = 0; i < babyPosList.length; i++)
                currPosList.push(babyPosList[i]);

            let targPosList = [];
            let targReachedList = [];
            for (var i = 0; i < babyPosList.length; i++) {
                if (!(isNear(babyPosList[i], currPosList[i])))
                    targReachedList.push(0);
                else
                    targReachedList.push(1);
                targPosList.push(currPosList[i]);
            }

            let newPosList = [];
            for (var i = 0; i < babyPosList.length; i++) {
                if (targReachedList[i] == 1)
                    newPosList.push(babyPosList[i]);
                else {
                    let pos = translateSpritePos([targPosList[i][0], 
                                                  targPosList[i][1] - 32], 
                                                  babyPosList[i], 
                                                  6);
                    newPosList.push(pos);
                }
            }

            if(shuckleInfo[1] == action.BIRTHING)
                resolveOnceTimedOut(7000);
            else
                setBabyPosList(newPosList);                
            setBabyTargetReached(targReachedList);
        }, 16);
    }, [babyPosList, shucklePos]);

    //MOVE TOWARD ITEM if REALIZED and NONPLUSSED or ANGRY
    useEffect(() => {
        if (props.realizeItem[0] && shuckleInfo[1] <= 1)  // SET TO ITEM
            setShuckleInfo([focus.ITEM, shuckleInfo[1]]);
    }, [props.realizeItem[0]])

    // TARGET SPECIFIC BEHAVIOR  -------------------------------------
    useEffect(() => {
        // ASYNC FUNCTIONS ---------------------------------
        const eatItem = async () => {
            await resolveOnceTimedOut(5000); 
            let currFocus = focus.MOUSE;

            if (props.realizeItem[1] === 1)
                currFocus = focus.KEY;

            // is there a better way to do this (ANGRY CONDITION)
            if (shuckleInfo[1] === action.ANGRY && props.realizeItem[1] !== 3) {
                setKey(null);
                setKeyPos(null);
                setShuckleInfo([currFocus, action.SING]);
            }
            else  // EVERYTHING ELSE
                setShuckleInfo([currFocus, props.realizeItem[1]]);

            props.reset();
            setTargetReached(false);
        };

        if (targetReached && 
                shuckleInfo[0] === focus.ITEM && shuckleInfo[1] <= 1) {
            if (shuckleInfo[0] === focus.ITEM)
                eatItem();
        }
    }, [targetReached, selectedKey, shuckleInfo[0]]);

    useEffect(() => {
        if (props.realizeItem[0] && selectedKey === null)  // SET TO ITEM
            setShuckleInfo([focus.ITEM, shuckleInfo[1]]);

        if (shuckleInfo[0] === focus.KEY) {    // KEY FOCUS - ANGRY
            if (selectedKey === null && remainingKeys.length > 0)
                chooseKey();

            if (remainingKeys.length <= 0) {        // EXIT CASE
                setShuckleInfo([focus.MOUSE, 0]);
                setTargetReached(false);
                setHaltInv(false);
                setBusy(false);
            }
        }
    }, [props.realizeItem[0], keyPos]);

    useEffect(() => {
        const destroy = async () =>
        {
            await resolveOnceTimedOut(5000);
            const rand = Math.floor(Math.random() * damageList.length);
            selectedKey.style.background = damageList[rand];
            selectedKey.style.pointerEvents = 'none';
            setRemainingKeys(remainingKeys.filter(k => k !== selectedKey.id));
            setTargetReached(false);
            setKey(null);
            setKeyPos(null);
        };

        if (shuckleInfo[0] === focus.KEY &&  // KEY FOCUS - ANGRY  
                targetReached && !busy) { 
            setBusy(true);
            destroy();
        }
    }, [targetReached])

    // EMOTION-BASED BEHAVIORS ---------------------------------------
    useEffect(() => {
        const processEmotion = async () => {
            await resolveOnceTimedOut(3000);
            setMobileTargetPos([0,0]);
            setHaltInv(false);
            setShuckleInfo([focus.MOUSE, action.NONPLUSSED]);
        }

        const offscreen = async () => {
            setMobileTargetPos([300,-200]);
            setShuckleInfo([focus.MOBILE, shuckleInfo[1]]);
            await resolveOnceTimedOut(6000);
            if (shuckleInfo[1] === action.BIRTHING)
                setShuckleInfo([shuckleInfo[0], action.LAY_EGG]);
            else
                processEmotion();
        }

        const layEgg = async () => {
            const baby = createBaby();
            const newFamily = shuckleChildren.concat([baby]);

            // updates the game save 
            // (you had a baby! you wanna remember you had a baby right?)
            let tempInfo = JSON.parse(localStorage.shuckleInfo);
            tempInfo["children"] = newFamily;
            localStorage.setItem("shuckleInfo", JSON.stringify(tempInfo));

            setBabyPosList([[400,-200]].concat(babyPosList));
            setShuckleChildren(newFamily);

            //brings back onscreen
            setHaltInv(false);
            setMobileTargetPos([0,0]);
            setShuckleInfo([focus.MOUSE, action.SING]);
        }

        // move ?
        if (shuckleInfo[1] === action.HAPPY) {
            processEmotion();
        }
        else if (shuckleInfo[1] === action.SING) {
            processEmotion();
        }
        else if (shuckleInfo[1] === action.CONFUSED) {
            processEmotion();
        }
        else if (shuckleInfo[1] === action.SHINY) {
            let tempInfo = JSON.parse(localStorage.shuckleInfo);
            tempInfo["shiny"] = true;
            localStorage.setItem("shuckleInfo", JSON.stringify(tempInfo));
            processEmotion();
        }
        else if (shuckleInfo[1] === action.BIRTHING) {
            setHaltInv(true);
            offscreen();
        }
        else if (shuckleInfo[1] === action.LAY_EGG) {
            if (props.realizeItem[0])
                setShuckleInfo([focus.ITEM, action.NONPLUSSED]);
            else
                layEgg();
        }
    }, [shuckleInfo[1]]);

    // PROMISES ----------------------------------------------------------------
    function resolveOnceTimedOut(ms) 
    {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, ms);
        });
    }

    // RENDER ------------------------------------------------------------------
    function animate(name, pos, offset) 
    {
        return (
            <img className = {classes[name]}
                 style = {{top: (pos[0] - offset[0]) + "px", 
                           left: (pos[1] - offset[1]) + "px"}}
                 src = {require("../assets/" + name + ".gif")}/>
        )
    }

    function animBabies(children, posList)
    {
        //deepCopy and reverse creates the correct render order
        const revChildren = JSON.parse(JSON.stringify(children));

        var sizes = [];
        var sizeOffset = [];
        for (var i = 0; i < posList.length; i++){
            if (posList[i] == undefined)
                posList[i] = [0,0];
            if (revChildren[i].state === "shuckle") {
                sizes = sizes.concat([["48px","48px"]]);
                sizeOffset = sizeOffset.concat([-8]);
            } else {
                sizes = sizes.concat([["32px","32px"]]);
                sizeOffset = sizeOffset.concat([0]);
            }
        }

        revChildren.reverse();

        return (
            <> { revChildren.map((child) => (<img className = {classes.shuckle}
                  style = {{top: (posList[child.number][0] + 
                                  sizeOffset[child.number]).toString() + "px",
                            left: (posList[child.number][1] + 
                                  sizeOffset[child.number]).toString() + "px",
                            width: sizes[child.number][0],
                            height: sizes[child.number][1]}}
                  src = {require("../assets/" + child.state + ".gif")}
                  key = {child.number}/>))} </>
        )
    }

	return (
		<>
            {shuckleChildren.length > 0
                && ( <> { animBabies(shuckleChildren, babyPosList) } </> )}
			{!(JSON.parse(localStorage.shuckleInfo)["shiny"]) && 
                animate("shuckle", shucklePos, [16, 32]) }
			{JSON.parse(localStorage.shuckleInfo)["shiny"] && 
                animate("shuckleShiny", shucklePos, [16, 32]) }

			{shuckleInfo[0] === focus.MOUSE && shuckleInfo[1] === action.SING
                && ( <> { animate("sing", shucklePos, [32, 26]) } </> )}
			{shuckleInfo[0] === focus.MOUSE && !(shuckleInfo[1] === action.SING)
                && targetReached 
                && ( <> { animate("love", shucklePos, [26, 26]) } </> )}
            {shuckleInfo[0] === focus.ITEM && targetReached 
                && ( <> { animate("chomp", targetPos , [31, 31]) } </> )}
            {shuckleInfo[0] === focus.KEY && shuckleInfo[1] === action.ANGRY 
                && targetReached 
                && ( <> { animate("slash", targetPos, [0, 0]) } </> )}
			
            {shuckleInfo[1] === action.ANGRY 
                && ( <> { animate("anger", shucklePos, [36, 2]) } </> )}
            {shuckleInfo[1] === action.BIRTHING
                && ( <> { animate("love", shucklePos, [26, 26])} </> )}
		</>
    )
}

export default ShuckleCursor;
