import type { Coordinate, Box, Board } from '~/types';
import BoxEl from '~/components/Box';
import React from 'react';
import invariant from 'tiny-invariant';
import Navbar from "~/components/Navbar";
import { useState, useRef } from "react";


const TerritoryWars = () => {

    const currentPos = useRef<Coordinate | undefined>();
    const boardElements = useRef<Board | null>(null);
    const columns = 20;
    const rows = 20;
    let colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500'];
    let playerColors = ['bg-red-500', 'bg-blue-500'];
    let players = 2;
    let turn = 0;

    let width = 2*columns;

    let total = 0;

    let lefts = Array.apply(null, Array(rows)).map((aa, rowNum) => {
        return((rowNum*columns)+1)
    });
    let rights = Array.apply(null, Array(rows)).map((bb, rowNum) => {
        return(((rowNum+1)*columns))
    });;
    let tops = Array.apply(null, Array(columns)).map((cc, columnNum) => {
        return(columnNum+1)
    });
    let bottoms = Array.apply(null, Array(columns)).map((dd, columnNum) => {
        return((columns*rows)-(columnNum))
    });

    const setBoard = (coordinate : Coordinate, button : HTMLButtonElement) => {
        let myBox : Box = {
            coord: coordinate,
            element: button }
        if(boardElements.current === null){
            boardElements.current = {elements:[myBox]};
        }
        boardElements.current.elements.push(myBox)
        return 'smd'
    }

    let left : number;
    let right : number;
    let top  : number;
    let bottom : number;
    let recentChanges : Array<string> = [];
    const sleep = (ms:number) => new Promise(r => setTimeout(r, ms));


    const propagateColor = async (id : string, color : string, newColor : string, player : number) => {
        let num : number = parseInt(id);
        let element = document.getElementById(id);
        invariant(element, 'if not found this is invalid');
        if(element.classList[3] === color && !recentChanges.includes(id)){
            recentChanges.push(id);
            element.classList.remove(color);
            element.classList.add(newColor);
            if(player === 0){
                element.classList.add("bg-red-300");
            }
            if(player === 1){
                element.classList.add("bg-blue-300");
            }
            await sleep(150);
            if(lefts.includes(num)){
                //do nothing
            }else{
                left = num-1;
                propagateColor(`${left}`, color, newColor, player)
            }
            if(rights.includes(num)){
                //do nothing
            }else{
                right = num + 1;
                propagateColor(`${right}`, color, newColor, player)
            }
            if(tops.includes(num)){
                //do nothing
            }else{
                top = num - columns;
                propagateColor(`${top}`, color, newColor, player)
            }
            if(bottoms.includes(num)){
                //do nothing
            }else{
                bottom = num + columns;
                propagateColor(`${bottom}`, color, newColor, player)
            }
        }
    }

    const purgeRecents = (elements : Array<string>) => {
        elements.forEach((val) => {
            document.getElementById(val)?.classList.remove("bg-red-300");
            document.getElementById(val)?.classList.remove("bg-blue-300");
        })

    }

    const toggleColors = (e:React.MouseEvent<HTMLButtonElement>, position:Coordinate, callback:Function) => {
        let currentPlayer = turn % players;
        let theirColor = playerColors[currentPlayer];
        //this is some hard coded jank, but oh well
        let ourTarget = e.target as HTMLButtonElement;
        let interestedColor = ourTarget.classList[3];
        let ourId = ourTarget.id;
        if(theirColor !== interestedColor  && !recentChanges.includes(ourId) ){
            purgeRecents(recentChanges);
            recentChanges = [];
            propagateColor(ourId, interestedColor, theirColor, currentPlayer);
            turn++ 
        }
    } 

    const getChildFocus = (position : Coordinate) => {
        console.log(boardElements.current);
        currentPos.current = position;
    }

    const [elements, setElements] = useState(Array.apply(null,Array(rows)).map(
        (a, y) => {
            return(Array.apply(null,Array(columns)).map(
                (b, x) => {
                    let index = Math.floor(Math.random()*colors.length);
                    let color = colors[index];
                    let thisCoord: Coordinate = {x: x, y: y};
                    total++ 
                    return(
                        <BoxEl color={color} position={thisCoord} toggleColor={toggleColors} notifyParent={getChildFocus} appendBoard={setBoard} index={`${total}`} key={`Box${total}`}/>
                    )
                })
            )                    
        })
    );

    const handleArrows = (event: React.KeyboardEvent) => {
        console.log(currentPos.current);
        invariant(currentPos.current, 'required to exist');
        let current = currentPos.current;
        let next : number;
        switch (event.key) {
            case 'ArrowLeft':
                console.log(elements[current.x][current.y]);
            //left arrow
            /* case 'ArrowLeft':
                if( current.x === 1 && current.y === 1 ){
                    elements[rows][columns]
                }else{
                    next = current - 1;
                }
                document.getElementById(`${next}`)?.focus();
                break;
            //right arrow
            case 'ArrowRight':
                if( current === columns*rows){
                    next = 1;
                }else{
                    next = current + 1;
                }
                document.getElementById(`${next}`)?.focus();
                break;
            //up arrow
            case 'ArrowUp':
            if( current > columns ){
                next = current - columns;
            }else{
                next = (columns*rows) - columns + current;
            }
            document.getElementById(`${next}`)?.focus();
            break;
            //ArrowDown
            case 'ArrowDown':
                if( current < ((columns*rows)+1)-columns ){
                    next = current + columns;
                }else{
                    next = columns - (columns*rows - current); 
                }
                document.getElementById(`${next}`)?.focus();
            case 'Enter':
                event.click() */
        }
    }

    return(
        <main className="w-screen min-h-screen bg-gradient-to-b from-slate-800 to-slate-500 flex flex-col">
            <Navbar/>
            <div className="flex flex-col justify-center items-center w-full">
                <div className={`flex flex-row flex-wrap max-w-[${width}rem]`} onKeyDown={(e) => handleArrows(e)}>
                    {elements}
                </div>
            </div>
        </main>
    )
}

export default TerritoryWars;