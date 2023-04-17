import {CaretLeft} from "phosphor-react";
import Logo from "../../assets/img/logo-home.png";
import React from "react";
import { Link } from "react-router-dom";

export function Header() {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <img src={Logo} alt={'Logo da Doe-Tempo'}/>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1 ">
                    <li><a>Sobre nós</a></li>
                    <li><a>Feed</a></li>
                    <li><a>Ong's</a></li>
                    <li><a>Entrar</a></li>
                    <li><a>Junte-se a nós</a></li>
                </ul>
            </div>
        </div>
        );
}
