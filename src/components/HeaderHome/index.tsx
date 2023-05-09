
import Logo from "../../assets/img/logo_home.svg";
import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";

export function Header() {
        const [isLoggedIn, setIsLoggedIn] = useState(false);

        useEffect(() => {
            const token = localStorage.getItem('token');

            if (token) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        }, []);

        return (
            <div>
                {isLoggedIn ? (
                    <div className="navbar bg-base-100">
                        <div className="flex-1">
                            <img src={Logo} alt={'Logo da Doe-Tempo'}/>
                        </div>
                        <div className="menu flex-none">
                            <ul className="menu-horizontal px-1 ">
                                <Link to="/sobre">
                                    <li><a className={'hover:text-blueberry'}>Sobre nós</a></li>
                                </Link>
                                <Link to="/feed">
                                    <li><a className={'hover:text-blueberry'}>Feed</a></li>
                                </Link>
                                <Link to="/ongs">
                                    <li><a className={'hover:text-blueberry'}>Ong's</a></li>
                                </Link>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div className="navbar bg-base-100">
                        <div className="flex-1">
                            <img src={Logo} alt={'Logo da Doe-Tempo'}/>
                        </div>
                        <div className="menu flex-none">
                            <ul className="menu-horizontal px-1 ">
                                <Link to="/sobre">
                                    <li><a className={'hover:text-blueberry'}>Sobre nós</a></li>
                                </Link>
                                <Link to="/feed">
                                    <li><a className={'hover:text-blueberry'}>Feed</a></li>
                                </Link>
                                <Link to="/ongs">
                                    <li><a className={'hover:text-blueberry'}>Ong's</a></li>
                                </Link>
                                <Link to="/login">
                                    <li><a className={'rounded-full px-8 pr-16 bg-turquoise-700 hover:bg-blueberry'}>Entrar</a></li>
                                </Link>
                                <Link to="/signup">
                                    <li><a className={'transition-all shadow-[0px_0px_5px_0px_rgba(79,121,254,1)] ease-in-out rounded-full -ml-12 px-10 bg-blueberry hover:text-white hover:px-20 hover:-ml-36'}>Junte-se a nós</a></li>
                                </Link>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        );
}



