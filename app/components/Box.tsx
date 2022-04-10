import type { Coordinate } from '~/types';
import { useEffect } from 'react';

const Box = ({
    color,
    toggleColor,
    position,
    index
} 
: 
{
    color: string,
    toggleColor: Function,
    position: Coordinate,
    index: string, 
}) => {
    
    const callback = () => {
        console.log(`my color is: ${color},  my coordinates are: ${position}`);
    }

    useEffect(() => { 
        document.getElementById(`${index}`)?.classList.add(`${color}`);
    }, [index, color])
    return(
        <button id={index} className={`h-8 w-8 cursor-pointer`} onClick={(e) => toggleColor(e, position, callback)}>

        </button>
    )
}

export default Box;