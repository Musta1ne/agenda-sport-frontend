import {LoginTabs} from "../login-tabs";

export function Login() {
    return (
        <div className="w-full flex min-h-[100dvh] justify-center items-center bg-[url('https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=2070')] bg-center bg-cover shadow-[inset_0_100vh_0_rgba(0,0,0,0.4)]">
            <div className="p-10 min-h-[408px] text-black bg-white rounded-lg">
                <LoginTabs />
            </div>
        </div>
    );
}
