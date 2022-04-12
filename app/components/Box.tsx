import type { Coordinate } from '~/types';
import { useState, useRef, useEffect } from 'react';

const Box = ({
    color,
    toggleColor,
    position,
    index,
    notifyParent,
    appendBoard,
} 
: 
{
    color: string,
    toggleColor: Function,
    position: Coordinate,
    index: string, 
    notifyParent: Function,
    appendBoard: Function,
}) => {
    
    const [myClass, setMyClass] = useState<string>(`h-8 w-8 cursor-pointer ${color}`)
    const myButton = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        appendBoard(position, myButton);
    }, [])

    return(
        <button id={index} className={myClass} onClick={(e) => toggleColor(e, position, setMyClass)} onFocus={(e) => notifyParent(position)} ref={myButton}>

        </button>
    )
}

export default Box;