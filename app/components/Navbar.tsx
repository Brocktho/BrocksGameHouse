import { Link } from "@remix-run/react";
import house from "~/Media/GameHouse.png";

const Navbar = () => {
    return(
        <nav className="flex flex-row w-full h-12 items-center px-4 justify-between">
            <Link className="h-8 flex flex-row gap-2 justify-center" to="/">
                <img className="h-full" src={house}/>
                <img className="h-full" src="https://fontmeme.com/permalink/220410/9043fb9fc1e31800ab4c84e8dba99f6a.png"/>
            </Link>
            <div className="flex flex-row gap-2">
            <Link to="/territoryWars" className="text-slate-200 cursor-pointer hover:text-slate-50 hover:underline">
                Territory Wars
            </Link>
            </div>
        </nav>
    )
}

export default Navbar;