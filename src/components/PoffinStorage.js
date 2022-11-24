/*
 * PoffinStorage.js
*/

import classes from "./style/PoffinStorage.module.css";
import inventory from './Inventory.js';

import React, {useState, useEffect} from 'react';

function PoffinStorage(props) 
{
    // INVENTORY ---------------------------------------------------------------
    let pokeLink = "https://cdn3.iconfinder.com/data/icons/faticons/32/";
    const [arrowSrc, setArrowSrc] = 
        useState(pokeLink + "arrow-down-01-512.png")

    const [isExpanded, setIsExpanded] = useState(false);

    function expandPoffins()
    {
        if (!isExpanded)
            setArrowSrc(pokeLink + "arrow-up-01-512.png");
        else
            setArrowSrc(pokeLink + "arrow-down-01-512.png");
        setIsExpanded(!isExpanded);
    }
    // -------------------------------------------------------------------------

    const selectedItem = props.selectedItem;
    const setItem = props.setItem;
    const itemPos = props.itemPos; 

    function selectItem(e)
    {
        var nodes = Array.prototype.slice.call(e.currentTarget.children);
        const item = nodes[0].name;
        const itemCount = localStorage.getItem(item);
        if (itemCount > 0) {
            setItem(item);
            props.setItemPos(["absolute", 
                              props.mousePos[0], 
                              props.mousePos[1], 
                              1]);
            props.setMoving(true);
        }
    }

    function deselectItem(e)
    {
        console.log("hello");
        if (e.key === 'Escape')  // check [0] ?
            console.log("ESC ESC ESC");
            setItem('');
    }

    function itemPreview(item, bg_color)
    {
        return (
            <tr className = {classes.item}>
                <th style = {{background: bg_color}}>
                    {item.props.tag} 
                    <div> {localStorage.getItem(item.props.name)} </div>
                </th>
                <td onClick = {selectItem}>
                    {item}
                </td>
            </tr> 
        )
    }

    // RENDER ------------------------------------------------------------------
    return (
        <div style = {{width: "0px", height: "0px"}}>
            <table className = {classes.PoffinStorage}>
                <tbody>
                <tr className = {classes.header}>
                    <th> Flavor </th>
                    <th style = {{width: "66px"}}> Items </th>
                </tr>
                { isExpanded && itemPreview(inventory[0], "#F08030") } 
                { isExpanded && itemPreview(inventory[1], "#F85888") }
                { isExpanded && itemPreview(inventory[2], "#78C850") }
                { isExpanded && itemPreview(inventory[3], "#F8D030") }
                { isExpanded && itemPreview(inventory[4], "#6890F0") }
                </tbody>
            </table>

            <button style = {{background: "none", border: "none"}} 
                    className = {classes.expansionArrow} 
                    onClick = {expandPoffins}>
                <img style = {{width: "40px", height: "40px"}} 
                     src = {arrowSrc}>
                </img>
            </button>

            { !(selectedItem === '') &&
                <img id = "draggable_item"
                     className = {classes.Poffin}
                     src = {require("../assets/" + selectedItem + ".png")}
                     style = {{cursor: "move",
                               position: itemPos[0],
                               top: String(itemPos[1]) + "px",
                               left: String(itemPos[2]) + "px",
                               zIndex: String(itemPos[3])}}
                     onClick = {() => props.realize(selectedItem)}
                     decoding = "async"/> }
        </div>
    );
}

export default PoffinStorage;
