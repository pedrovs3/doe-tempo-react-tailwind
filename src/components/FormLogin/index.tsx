import Line from "../../assets/img/linha.png";
import {NavLink} from "react-router-dom";
import Google from "../../assets/img/google.png";

export function LoginForm(){
    return (
        <form name={"login"} className={'w-1/2 pr-6 flex flex-col justify-between py-6'}>
            <div className={"flex flex-col gap-3 pt-6"}>
                <input id="email" type="email" className="p-5 bg-little-white flex-1 py-2 border-b-2 border-gray-400 focus:border-blueberry text-gray-600 placeholder-gray-400 outline-none" placeholder="Login / Email"/>
                <div className="flex flex-2 justify-between">
                    <input id="senha" type="password" className="p-5 bg-little-white flex-1 py-2 border-b-2 border-gray-400 focus:border-blueberry text-gray-600 placeholder-gray-400 outline-none" placeholder="Senha"/>
                </div>
            </div>
            <div className="flex flex-col gap-12 items-center pt-14">
                <button className={"btn btn-primary w-1/4 rounded-full bg-turquoise-700 border-0 text-xl text-black hover:bg-turquoise-700 hover:text-white sm:btn w-3/4"} type="submit">Entrar</button>
                <img src={Line} className={'sm: w-96'}/>
                <button className="btn-circle bg-tufts-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full sm: bg-blue-600">
                    <img src={Google}/>
                </button>

            </div>
        </form>
    )
}