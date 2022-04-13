import type { Coordinate } from '~/types';
import { useState, useRef, useEffect } from 'react';
import invariant from 'tiny-invariant';

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
    
    const [myClass, setMyClass] = useState<string>(``)
    const myButton = useRef<HTMLButtonElement | null>(null);

    const handleColor = (newColor : string) => {
        setMyClass(`h-8 w-8 cursor-pointer ${newColor}`);
    }

    useEffect(() => {
        invariant(myButton.current, 'my Button must exist');
        appendBoard(handleColor, color, position, myButton);
        setMyClass(`h-8 w-8 cursor-pointer ${color}`);
    }, [color, position])

    return(
        <button id={index} className={myClass} onClick={(e) => toggleColor(e, position)} onFocus={(e) => notifyParent(position)} ref={myButton}>

        </button>
    )
}

export default Box;