import { xml } from "msw/lib/types/context"
import { ServerLifecycleEventsMap } from "msw/lib/types/node/glossary"

export type Coordinate = {
    x: number,
    y: number
} 

export type Box = {
    updateColor: Function,
    currentColor: string,
    coords: Coordinate,
    element: React.MutableRefObject<HTMLButtonElement | null>
}

export type Board = {
    elements: Array<Array<Box>>
}