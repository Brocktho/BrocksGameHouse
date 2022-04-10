import Navbar from "~/components/navbar";

import { useOptionalUser } from "~/utils";

export default function Index() {
  return (
    <main className="w-screen min-h-screen bg-gradient-to-b from-slate-800 to-slate-500 flex flex-col">
        <Navbar/>
    </main>
  );
}
