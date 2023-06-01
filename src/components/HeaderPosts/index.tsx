import React from "react";
import {Article, CaretLeft, House, Megaphone} from "phosphor-react";
import {Link, useNavigate} from "react-router-dom";
import {decodeJwt} from "../../utils/jwtDecode";
interface UserProps {
    id : string,
    photoURL : string,
}

interface Jwt {
    id:    string;
    email: string;
    type:  string;
    iat:   number;
    exp:   number;
}


export function HeaderPosts(props : UserProps) {
    const navigate = useNavigate()
    const decodeJWT = decodeJwt();
    const jwt = decodeJWT as Jwt;

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

    const handleClick = () => {
        history.back()
    };

    return (
        <div className="navbar">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <button  onClick={handleClick} className={'btn w-40 rounded-full bg-blueberry border-0 text-white flex justify-center hover:bg-accent'} type={'submit'}>
                        <CaretLeft size={32} />
                        Voltar
                    </button>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <Link to={"/"} >
                            <li className={'bg-little-white rounded'}><a className={'tooltip tooltip-bottom active:bg-little-white'} data-tip="Home"><House size={32} color="#4F79FE"/></a></li>
                        </Link>
                        <Link to={"/campanhas"} >
                            <li className={'bg-little-white rounded'}><a className={'tooltip tooltip-bottom active:bg-little-white'} data-tip="Campanhas"><Megaphone size={32} color="#4F79FE"/></a></li>
                        </Link>
                        <Link to={"/feed"} >
                            <li className={'bg-little-white rounded'}><a className={'tooltip tooltip-bottom active:bg-little-white'} data-tip="Feed"><Article size={32} color="#4F79FE"/></a></li>
                        </Link>
                    </ul>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-10">
                    <Link to={"/"} >
                        <li className={'bg-little-white rounded'}><a className={'tooltip tooltip-bottom active:bg-little-white'} data-tip="Home"><House size={32} color="#4F79FE"/></a></li>
                    </Link>
                    <Link to={"/campanhas"} >
                        <li className={'bg-little-white rounded'}><a className={'tooltip tooltip-bottom active:bg-little-white'} data-tip="Campanhas"><Megaphone size={32} color="#4F79FE"/></a></li>
                    </Link>
                    <Link to={"/feed"} >
                        <li className={'bg-little-white rounded'}><a className={'tooltip tooltip-bottom active:bg-little-white'} data-tip="Feed"><Article size={32} color="#4F79FE"/></a></li>
                    </Link>
                </ul>
            </div>
            <div className="navbar-end">
                <div className="flex-none gap-2">
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="h-24 btn btn-ghost rounded-btn avatar">
                            <div className="w-16 rounded-xl ring ring-turquoise-700 ring-offset-2 ring-offset-accent">
                                <img src={props.photoURL}  alt={"foto de perfil"}/>
                            </div>
                        </label>
                        <ul tabIndex={0} className="bg- mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                            <Link to={`/perfil/${jwt.type}/${props.id}`} >
                            <li><a className={"active:bg-turquoise-500"}>Perfil</a></li>
                            </Link>
                            {jwt.type == 'ONG' ? (
                                <Link to={`/dashboard-ong/${props.id}`}>
                                    <li>
                                        <a className={"active:bg-turquoise-500"}>Dashboard</a>
                                    </li>
                                </Link>
                            ) : (
                                <Link to={`/dashboard-user/${props.id}`}>
                                    <li>
                                        <a className={"active:bg-turquoise-500"}>Dashboard</a>
                                    </li>
                                </Link>
                            )}
                            <li><a className={"active:bg-turquoise-500"} onClick={handleLogout}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
