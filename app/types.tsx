import { xml } from "msw/lib/types/context"
import { ServerLifecycleEventsMap } from "msw/lib/types/node/glossary"

export type Coordinate = {
    x: number,
    y: number
} 

export type Box = {
    coord: Coordinate,
    element: HTMLButtonElement
}

export type Board = {
    elements: Array<Array<Box>>
}