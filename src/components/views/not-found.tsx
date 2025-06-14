import {Link} from "react-router-dom";

import {Button} from "../ui/button";

export function NotFound() {
    return (
        <div className="bg-[url('var.webp')] h-screen w-screen flex justify-center items-center bg-cover text-white bg-center bg-no-repeat shadow-[inset_0_100vh_0_rgba(0,0,0,0.95)]">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold">404</h1>
                <p className="text-lg">Página no encontrada</p>
                <Button variant={"secondary"}>
                    <Link to={"/fields"}>Volver</Link>
                </Button>
            </div>
        </div>
    );
}
