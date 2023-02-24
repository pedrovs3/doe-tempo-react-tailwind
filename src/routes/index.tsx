import React from 'react'
import {createBrowserRouter, NavLink} from "react-router-dom";
import Cadastro from "../pages/Cadastro";
import Login from "../pages/login";

export const routes = createBrowserRouter([
    // {
    //     path: '/',
    //     element: <div>
    //         <NavLink to={'/signup'}>Cadastrar-se</NavLink>
    //         <NavLink to={'/login'}>Login</NavLink>
    //     </div>
    // },
    {
        path: '/signup',
        element: <Cadastro/>,
    },
    {
        path: '/login',
        element: <Login/>
    },
])