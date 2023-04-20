import React, {useEffect, useState} from "react";
import Logo from "../../assets/img/logo_home.svg";
import Avatar from "../../assets/img/pedro-avatar.jpeg";
import WaveDown from "../../assets/img/Wave_down_turquoise.svg";
import {House, Megaphone} from "phosphor-react";
import {useNavigate} from "react-router-dom";

export function HeaderPosts() {

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login')

    };

    function isAuthenticated() {
        return localStorage.getItem('token') !== null;
    }

    if (!isAuthenticated()) {
        return null;
    }

    return (
        <div className="navbar bg-turquoise-500">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a><House size={32} /></a></li>
                        <li><a><Megaphone size={32}/></a></li>
                    </ul>
                </div>
                    <img src={Logo}/>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-10">
                    <li><a className={'tooltip tooltip-bottom'} data-tip="hHme"><House size={32} /></a></li>
                    <li><a className={'tooltip tooltip-bottom'} data-tip="Campanhas"><Megaphone size={32}/></a></li>
                </ul>
            </div>
            <div className="navbar-end">
                <div className="flex-none gap-2">
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="h-24 btn btn-ghost rounded-btn avatar">
                            <div className="w-16 rounded-xl ring ring-primary ring-turquoise-700 ring-offset-2 ring-offset-accent">
                                <img src={Avatar} />
                            </div>
                        </label>
                        <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                            <li><a>Perfil</a></li>
                            <li><a>Configurações</a></li>
                            <li><a onClick={handleLogout}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
