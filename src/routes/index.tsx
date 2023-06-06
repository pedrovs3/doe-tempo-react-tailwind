import React from 'react'
import {createBrowserRouter, Navigate, NavLink} from "react-router-dom";
import Cadastro from "../pages/Cadastro";
import Login from "../pages/login";
import NovaCampanha from "../pages/NovaCampanha"
import CadastroOng from "../pages/CadastroOng";
import CampanhasList from "../pages/CampanhasList";
import Home from "../pages/Home";
import DetalhesCampanha from "../pages/DetalhesCampanha";
import EditarCampanha from "../pages/EditarCampanha";
import Feed from "../pages/Feed";
import Perfil from "../pages/Perfil";
import EditarPerfil from "../pages/EditarPerfil";
import DashboardOng from "../pages/DashboardOng";
import DashboardUser from "../pages/DashboardUser";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import UnauthorizedPage from "../pages/ErrorsPage/UnauthorizedPage";
import RedefinirSenha from "../pages/RedefinirSenha";

export const routes = createBrowserRouter([
    {
        path: '/signup',
        element: <Cadastro/>,
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/redefinir-senha',
        element: <RedefinirSenha/>,
    },
    {
        path: '/feed',
        element: <Feed/>,
        errorElement: <Navigate to={'/unauthorized'}/>
    },
    {
        path: '/unauthorized',
        element: <UnauthorizedPage/>,
    },
    {
        path: '/nova-campanha',
        element: <NovaCampanha/>
    },
    {
        path: '/editar-campanha/:id',
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
        path: '/detalhes-campanha/:id',
        element: <DetalhesCampanha/>
    },
    {
        path: '/perfil/:type/:id',
        element: <Perfil />,
        errorElement: <Navigate to={'/unauthorized'}/>
    },
    {
        path: '/editar-perfil/:id',
        element: <EditarPerfil />,
        errorElement: <Navigate to={'/unauthorized'}/>
    },
    {
        path: '/dashboard-ong/:id',
        element: <DashboardOng />,
    },
    {
        path: '/dashboard-user/:id',
        element: <DashboardUser />,
    },
    {
        path: '/404',
        element: <PageNotFound />,
    },
    {
        path: '/*',
        element: <Navigate to={'/404'}/> ,
        errorElement: <Navigate to={'/404'}/>
    },
])
