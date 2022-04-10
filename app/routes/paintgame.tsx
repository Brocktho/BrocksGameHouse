import type { Coordinate } from '~/types';
import Box from '~/components/Box';
import React from 'react';
import invariant from 'tiny-invariant';


const PaintGame = () => {
    const columns = 20;
    const rows = 20;
    let colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500'];
    let playerColors = ['bg-red-500', 'bg-blue-500'];
    let players = 2;
    let turn = 0;


    let width = 2*columns;



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


      let total = 0;
//    let elements = Array.apply(null,Array(12)).map(
//        (a, y) => {
  //          return(Array.apply(null,Array(12)).map(
    //            (b, x) => {
      //              let index = Math.floor(Math.random()*colors.length);
        //            let color = colors[index];
          //          let thisCoord: Coordinate = {x: x, y: y};
            //        total++ 
              //      return(
                //        <Box color={color} position={thisCoord} toggleColor={toggleColors} index={`${total}`} key={`Box${total}`}/>
                  //  )
                //}
            //))                    
        //}
    //)

    const handleArrows = (event: React.KeyboardEvent) => {
        invariant(document.activeElement, 'required to exist');
        let current = parseInt(document.activeElement.id);
        let next : number;
        switch (event.keyCode) {
            //left arrow
            case 37:
                if( current === 1 ){
                    next = columns*rows;
                }else{
                    next = current - 1;
                }
                document.getElementById(`${next}`)?.focus();
                break;
            //right arrow
            case 39:
                if( current === columns*rows){
                    next = 1;
                }else{
                    next = current + 1;
                }
                document.getElementById(`${next}`)?.focus();
                break;
            //up arrow
            case 38:
            if( current > columns ){
                next = current - columns;
            }else{
                next = (columns*rows) - columns + current;
            }
            document.getElementById(`${next}`)?.focus();
            break;
            //ArrowDown
            case 40:
                if( current < ((columns*rows)+1)-columns ){
                    next = current + columns;
                }else{
                    next = columns - (columns*rows - current); 
                }
                document.getElementById(`${next}`)?.focus();
        }
    }

    return(
        <div className="w-screen h-screen bg-slate-700 flex flex-row items-center justify-center">
            <div className={`flex flex-row flex-wrap max-w-[${width}rem]`} onKeyDown={(e) => handleArrows(e)}>
                {Array.apply(null,Array(rows)).map(
        (a, y) => {
            return(Array.apply(null,Array(columns)).map(
                (b, x) => {
                    let index = Math.floor(Math.random()*colors.length);
                    let color = colors[index];
                    let thisCoord: Coordinate = {x: x, y: y};
                    total++ 
                    return(
                        <Box color={color} position={thisCoord} toggleColor={toggleColors} index={`${total}`} key={`Box${total}`}/>
                    )
                }
            ))                    
        }
    )}
            </div>
        </div>
    )
}

export default PaintGame;