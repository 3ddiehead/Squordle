/*
 * User.js
*/

import classes from "./style/User.module.css";
import ReactDOM from 'react-dom/client';

import { useContext, useState, useEffect } from 'react';
import { GameContext } from '../Squordle.js';

function saveKeyGen() {
    return Math.floor(Math.random() * 1000000000000)
           .toString()
}

function User(props)
{
    const { 
        user,
        userHandler,
    } = useContext(GameContext); 

    const [username, setUsername] = useState('');
    const [pwd, setPwd] = useState('');

    //An error of 0 exists when there is no error
    //1 on failed sign in (user/password incorrect)
    //2 on failed sign up (user already exists)
    //3 on successful sign up
    //4 on successful save
    //5 on successful log-out
    //6 on failed save
    //7 on successful save
    //8 on invalid username for sign up
    const [userErr, setUserErr] = useState(0);

    const handleSubmit = (event) => { event.preventDefault(); };

    function signUp() {
        let data = { 
            user: username,
            pass: pwd,
            inventory: JSON.parse(localStorage.inventory),
            pokeDollars: Number(localStorage.pokeDollars),
            region: localStorage.region,
            shuckleInfo: JSON.parse(localStorage.shuckleInfo) 
        };

        async function postUser() {
            return await fetch(`/.netlify/functions/signUp`, {
                method: "POST",
                body: JSON.stringify(data),
            }).then(res => res.json());
        } 

        if (username !== "" && username !== "admin" && username !== "guest") {
            postUser()
                .then(function(result) {
                    if (result.length == 1)
                        setUserErr(2);
                    else setUserErr(3);
                });
        } else setUserErr(8);
    }

    function signIn() {

        //generate and store save-validating string of pseudorandom characters.
        //protects against people saving over a user's data just by changing 
        //localStorage.user and pressing save.
        var saveKey = saveKeyGen();
        localStorage.saveKey = saveKey;

        async function fetchUser() {
            return await fetch(`/.netlify/functions/signIn`, {
                method: "POST",
                body: JSON.stringify({ 
                    user: username, 
                    pass: pwd, 
                    saveKey: saveKey 
                }),
            }).then(res => res.json())
              .catch((err) => console.error(err));
        }

        fetchUser()
            .then(function(result) {
                if (result.length > 0) {
                    setUserErr(7);
                    userHandler(result[0]);
                } else throw 1;
            }).catch(err => {
                console.log("User DNE");
                setUserErr(1);
            });
    }

    function saveData()
    {
        let data = { 
            user: localStorage.user,
            inventory: JSON.parse(localStorage.inventory),
            pokeDollars: Number(localStorage.pokeDollars),
            region: localStorage.region,
            shuckleInfo: JSON.parse(localStorage.shuckleInfo),
            saveKey: localStorage.saveKey 
        };

        async function updateUserInfo() {
            return await fetch(`/.netlify/functions/save`, {
                method: 'POST',
                body: JSON.stringify(data)
            }).then((res) => res.json())
              .catch((err) => console.error(err));
        }

        updateUserInfo()
            .then(function(result) {
                if (result) 
                    setUserErr(4);
            }).catch(err => {
                setUserErr(6);
            });
    } 

    function logOut()
    {
        localStorage.user = 'guest';
        localStorage.saveKey = '';
        userHandler({ 
            ...user, 
            name: localStorage.user, 
            saveKey: localStorage.saveKey 
        });
        setUserErr(5);
    }

	return (
        <> 
            <a style= {{
                paddingTop: "1em", 
                textAlign: "center", 
                fontWeight: "bold"
            }}> 
            *WARNING* <br/>YOUR SAVE KEY WILL NOT BE SECURED</a>

            {userErr === 0 && localStorage.user === "guest" &&
                <p> Enter your login information: </p>}
            {userErr === 1 && 
                <p> The username or save key is incorrect. </p>}
            {userErr === 2 && 
                <p> This username is already in use. </p>}
            {userErr === 3 && 
                <p> Registered successfully, you can log in. </p>}
            {userErr === 4 && 
                <p style = {{paddingTop: "1em"}}> Save successful. </p>}
            {userErr === 5 && user.name === "guest" && 
                <p> Log-out successful. </p>}
            {userErr === 6 && 
                <p> Save was not successful. </p>}
            {userErr === 7 && 
                <p style = {{paddingTop: "1em"}}> Remember to save your game! </p>}
            {userErr === 8 && 
                <p> This is not a valid username. </p>}

            {user.name === "guest" &&
            <form className = {classes.loginForm} onSubmit={handleSubmit}>
                <div className = {classes.typingField}>
                    <label>username: </label>
                    <input
                       value = {username} 
                       onChange = {(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className = {classes.typingField}>
                    <label> save key:</label>
                    <input
                        value = {pwd}
                        onChange = {(e) => setPwd(e.target.value)}
                    />
                </div>
                <div className = {classes.submitOps}>
                    <input type = "submit"
                           value = "Log In" 
                           onClick = {signIn}
                    />
                    <input type = "submit" 
                           value = "Register"
                           onClick = {signUp}
                    />
                </div>
            </form>}
        { user.name !== "guest" && 
            <div className = {classes.loginForm}>
                <h2> WELCOME {user.name} ! </h2>
                <form className = {classes.submitOps} onSubmit = {handleSubmit}>
                    <input type = "submit"
                           value = "Save" 
                           onClick = {saveData}
                    />
                    <input type = "submit" 
                           value = "Log Out"
                           onClick = {logOut}
                    />
                </form>
            </div>
        }
    </>
    );
}

export default User;
