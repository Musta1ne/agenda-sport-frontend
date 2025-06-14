import {Outlet} from "react-router-dom";

export function Layout() {
    return (
        <div className="min-h-[100dvh] items-center justify-center flex flex-col text-black">
            <div className="container flex flex-col items-center justify-center w-full">
                <Outlet />
            </div>
        </div>
    );
}
