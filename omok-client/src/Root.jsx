import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Root({ isLogin }) {

    return (
        <>
            <Navbar isLogin={isLogin} />
            <div>
                <Outlet />
            </div>
        </>
    );
}