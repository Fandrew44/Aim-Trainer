import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Menu from './Menu';
import Target from './Target';
import '../Play.css';

const Play = props => {

    //STATES
    const [inGame, setInGame] = useState(false);
    const [targets, setTargets] = useState([]);

    //Dynamic Routing
    // - Functionality for changing routes (I THINK????)
    // - Damn this is kind of cool
    const pushToRoute = route => {
        props.history.push(route);
    }


    //Wait no this algorithm is pretty fast actually it just DOES NOT WORK ( b r u h )
    // - allTargets working CORRECTLY
    // - setTargets DOES NOT seem to be MODIFYING the 'targets' state <= PROBLEM
    // - ...targets DOES WORK ?
    // - Is it the WHILE LOOP that's breaking it?
    //IMPORTANT NOTE: Manipulating States in React is ASYNCHRONOUS
    const startGame = () => {
        // setInGame(true);
        // //Works in this scenario
        // setTargets([{
        //     x: 1,
        //     y: 2,
        //     r: 3,
        //     id: 4
        // }]);
        // const target = {
        //     x: 100,
        //     y: 101,
        //     r: 103,
        //     id: 144,
        // }
        // while (targets.length < 4) {
        //     console.log("Adding new target");
        //     setTargets([
        //         ...targets,
        //         target,
        //     ])
        // }
        // setTargets([
        //     ...targets,
        //     target
        // ])
        //NOTE: Since modifying states in React is ASYNC, I can just first create the Array with all the appropriate Targets and then
        //simply set the 'targets' state to that Array
        // - Rather than updating the 'targets' state with each individual target generated
        setInGame(true);
        let allTargets = [];
        let displayTargets = [];
        while (displayTargets.length < 44) {
            console.log(`# of targets is: ${targets.length}`);
            // console.log("Beep boop generating targets.");
            let overlapping = false;
            const xMin = 25;
            const xMax = 850
            const yMin = 25;
            const yMax = 700;
            const target = {
                x: Math.floor(Math.random() * (xMax - xMin + 1)) + xMin,
                y: Math.floor(Math.random() * (yMax - yMin + 1)) + yMin,
                r: 1,
                id: (Math.random() * 1000),
            };

            for (let i = 0; i < allTargets.length; i++) {
                let other = allTargets[i];
                let xDiff = target.x - other.x;
                let yDiff = target.y - other.y;
                let dist = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
                if (dist < 2) {
                    overlapping = true;
                    break;
                }
            }
            allTargets.push(target);

            //IMPORTANT NOTE: Remember that 'targets' is a STATE
            // - It MUST be modified using the SPECIFIED FUNCTION returned from useState()
            if (!overlapping) { 
                // console.log("Adding target to State");
                // console.log(target.id);
                displayTargets.push(target);
            }
        }

        setTargets(displayTargets);
    }

    const endGame = () => {
        setInGame(false);
    }


    return (
        <div>
            <header>
                <button className="start-button" onClick={ startGame }>Start</button>
                <BrowserRouter>
                    <Switch>
                        <button className="menu-back start-button" onClick={() => { pushToRoute('/') }}>
                            Menu
                        </button>
                    </Switch>
                </BrowserRouter>
            </header>
            <div className="game-screen">
                {targets.map(target => (
                    <Target target={target} color="blue"/>
                ))}
            </div>
        </div>
    )
}

export default Play;