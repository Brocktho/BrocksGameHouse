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

    const setBoard = (updateButton : Function, color : string, coordinate : Coordinate, button : React.MutableRefObject<HTMLButtonElement>) => {
        
        let myBox : Box = {
            updateColor: updateButton,
            currentColor: color,
            coords: coordinate,
            element: button };
        
        if(boardElements.current === null){
            boardElements.current = {elements:[[myBox]]};
        }else{
            if(coordinate.x === 0){
                boardElements.current.elements.push([myBox]);
            }else{
                boardElements.current.elements[coordinate.y].push(myBox)
            }
        }
        //
        return 'Success!'
    }

    let left : number;
    let right : number;
    let top  : number;
    let bottom : number;
    let recentChanges : Array<Coordinate> = [];
    const sleep = (ms:number) => new Promise(r => setTimeout(r, ms));


    const propagateColor = async (position : Coordinate, color : string, newColor : string, player : number) => {
        invariant(boardElements.current, "Must exist");
        let currentColor = boardElements.current.elements[position.y][position.x].currentColor
        invariant(currentColor, 'if not found this is invalid');
        let updateColor : Function = boardElements.current.elements[position.y][position.x].updateColor
        if(currentColor === color && !insideRecents(position)){
            recentChanges.push(position);
            if(player === 0){
                updateColor("bg-red-300");
                boardElements.current.elements[position.y][position.x].currentColor = "bg-red-300";
            }
            if(player === 1){
                updateColor("bg-blue-300");
                boardElements.current.elements[position.y][position.x].currentColor = "bg-blue-300";
            }
            await sleep(100);
            if( position.x !== 0 ){
                let newPosition = {
                    x: position.x - 1, 
                    y: position.y
                };
                propagateColor(newPosition, color, newColor, player);
            }
            if( position.x !== columns-1 ){
                let newPosition = {
                    x: position.x + 1,
                    y: position.y
                };
                propagateColor(newPosition, color, newColor, player);
            }
            if( position.y !== 0){
                let newPosition = {
                    x: position.x,
                    y: position.y - 1
                };
                propagateColor(newPosition, color, newColor, player);
            }
            if( position.y !== rows-1 ){
                let newPosition = {
                    x: position.x,
                    y: position.y + 1
                };
                propagateColor(newPosition, color, newColor, player);
            }
        }
    }
    
    const insideRecents = (position : Coordinate) => {
        let result : boolean = false;
        recentChanges.forEach((val) => {
            if(val.x === position.x && val.y === position.y){
                result = true;
            }
        })
        return result;
    }   

    const purgeRecents = (currentPlayer : number) => {
        recentChanges.forEach((val) => {
            invariant(boardElements.current, "Must exist");
            let updateColor = boardElements.current.elements[val.y][val.x].updateColor;
            if(currentPlayer === 1){
                updateColor("bg-red-500");
                boardElements.current.elements[val.y][val.x].currentColor = "bg-red-500";
            }
            if(currentPlayer === 0){
                updateColor("bg-blue-500");
                boardElements.current.elements[val.y][val.x].currentColor = "bg-blue-500";
            }
        });
    }

    const toggleColors = (e:React.MouseEvent<HTMLButtonElement>, position:Coordinate) => {
        let currentPlayer = turn % players;
        let theirColor = playerColors[currentPlayer];
        invariant(boardElements.current, 'I know this is real');
        let interestedColor = boardElements.current.elements[position.y][position.x].currentColor;
        if(theirColor !== interestedColor && !insideRecents(position)){
            purgeRecents(currentPlayer);
            recentChanges = [];
            propagateColor(position, interestedColor, theirColor, currentPlayer);
            turn++ 
        }
    }

    const getChildFocus = (position : Coordinate) => {
        currentPos.current = position;
    }

    const elements = Array.apply(null,Array(rows)).map(
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
        });

    const handleArrows = (event: React.KeyboardEvent) => {
        invariant(currentPos.current, 'required to exist');
        invariant(boardElements.current, "the board elements must be set");
        let current = currentPos.current;
        switch (event.key) {
            case 'ArrowLeft':
            //left arrow
            case 'ArrowLeft':
                if( current.x === 0 ){
                    boardElements.current.elements[currentPos.current.y][columns-1].element.current?.focus();
                }else{
                    boardElements.current.elements[currentPos.current.y][currentPos.current.x-1].element.current?.focus();
                }
                break;
            //right arrow
            case 'ArrowRight':
                if( current.x === columns-1){
                    boardElements.current.elements[currentPos.current.y][0].element.current?.focus();
                }else{
                    boardElements.current.elements[currentPos.current.y][currentPos.current.x+1].element.current?.focus();
                }
                break;
            //up arrow
            case 'ArrowUp':
            if( current.y > 0 ){
                boardElements.current.elements[currentPos.current.y-1][currentPos.current.x].element.current?.focus();
            }else{
                boardElements.current.elements[rows-1][currentPos.current.x].element.current?.focus();
            }
            break;
            //ArrowDown
            case 'ArrowDown':
                if( current.y < rows-1){
                    boardElements.current.elements[currentPos.current.y+1][currentPos.current.x].element.current?.focus();
                }else{
                    boardElements.current.elements[0][currentPos.current.x].element.current?.focus();
                }
            break;
            case 'Enter':
            break;
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