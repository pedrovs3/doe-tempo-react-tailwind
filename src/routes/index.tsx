import React from 'react'
import {createBrowserRouter, NavLink} from "react-router-dom";
import Cadastro from "../pages/Cadastro";
import Login from "../pages/login";
import NovaCampanha from "../pages/NovaCampanha"
import CadastroOng from "../pages/CadastroOng";
import CampanhasList from "../pages/CampanhasList";
import Home from "../pages/Home";
import {DetalhesBody} from "../components/DetalhesBody";
import DetalhesCampanha from "../pages/DetalhesCampanha";
import EditarCampanha from "../pages/EditarCampanha";

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
    {
        path: '/nova-campanha',
        element: <NovaCampanha/>
    },
    {
        path: '/editar-campanha',
        element: <EditarCampanha/>
    },
    {
        path: '/signup-ong',
        element: <CadastroOng/>
    },
    {
        path: '/campanhas',
        element: <CampanhasList/>
    },
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '/detalhes-campanha',
        element: <DetalhesCampanha/>
    },
])
