import { createContext } from "react";

export const LoginContext = createContext({
    isLogin: false,
    setIsLogin: () => {}
});