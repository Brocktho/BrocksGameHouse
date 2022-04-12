import { Link } from "@remix-run/react";
import house from "~/Media/GameHouse.png";
import { useOptionalUser } from "~/utils";

const Navbar = () => {
    const user = useOptionalUser();
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
            {user ? (
                  <Link
                    to="/notes"
                    className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
                  >
                    View Notes for {user.email}
                  </Link>
                ) : (
                  <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                    <Link
                      to="/join"
                      className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
                    >
                      Sign up
                    </Link>
                    <Link
                      to="/login"
                      className="flex items-center justify-center rounded-md bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600  "
                    >
                      Log In
                    </Link>
                  </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar;