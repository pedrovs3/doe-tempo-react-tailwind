import Line from "../../assets/img/linha.png";
import {NavLink} from "react-router-dom";
import Google from "../../assets/img/google.png";

export function LoginForm(){
    return (
        <form name={"login"} className={'w-1/2 pr-6 flex flex-col justify-between py-6'}>
            <div className={"flex flex-col gap-3 pt-6"}>
                <input id="email" type="email" className="bg-white flex-1 py-2 border-b-2 border-gray-400 focus:border-blue-400 text-gray-600 placeholder-gray-400 outline-none" placeholder="Login / Email"/>
                <div className="flex flex-2 justify-between">
                    <input id="senha" type="password" className="bg-white flex-1 py-2 border-b-2 border-gray-400 focus:border-blue-400 text-gray-600 placeholder-gray-400 outline-none" placeholder="Senha"/>
                </div>
            </div>
            <div className="flex flex-col gap-3 items-center pt-14 gap-12">
                <button className={"btn btn-primary w-1/4 rounded-full bg-success border-0 text-xl text-black hover:bg-blue-600 hover:text-white"} type="submit">Entrar</button>
                <img src={Line} className={'pt16'}/>
                <button className="btn-circle bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    <img src={Google}/>
                </button>

            </div>
        </form>
    )
}