import { useState } from "react";
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react';
import LoginForm from "./LoginForm";
import Main from './main/Main';
import Game from './game/Game';
import SignupForm from './SignupForm';
import Root from './Root';
import Profile from './Profile';
import { LoginContext } from "./LoginContext";  
import { PlayContext } from "./PlayContext";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          element: <LoginForm/>,
        },
        {
          path: "/signup",
          element: <SignupForm />,
        },
        {
          path: "/main",
          element: <Main />,
        },
        {
          path: "/game/:gameIndex",
          element: <Game />,
        },
        {
          path: "/profile",
          element: <Profile />
        }
      ]
    }
]);
  
export default function App() {

    const [isLogin, setIsLogin] = useState(false);
    const [username, setUsername] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <ChakraProvider>
            <LoginContext.Provider value={{ isLogin, setIsLogin, username, setUsername }}>
                <PlayContext.Provider value={{ isPlaying, setIsPlaying }}>
                    <RouterProvider router={router} />
                </PlayContext.Provider>
            </LoginContext.Provider>
        </ChakraProvider>
    );
}