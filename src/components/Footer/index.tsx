import Logo from "../../assets/img/ampi-doe-tempo.svg";
import {FacebookLogo, InstagramLogo, TwitterLogo} from "phosphor-react";

export function Footer() {


    return (
        <div className="flex bg-blueberry w-full justify-between p-4">
            <img src={Logo}/>
            <div className="flex gap-5 btn-group-vertical lg:btn-group-horizontal items-center">
                <button className="btn w-32 rounded-full bg-little-white border-0 text-white flex justify-center hover:bg-turquoise-700 hover:text-blueberry"><InstagramLogo size={32} color="#4F79FE" /></button>
                <button className="btn w-32 rounded-full bg-little-white border-0 text-white flex justify-center hover:bg-turquoise-700 hover:text-blueberry"><FacebookLogo size={32} color="#4F79FE" /></button>
                <button className="btn w-32 rounded-full bg-little-white border-0 text-white flex justify-center hover:bg-turquoise-700 hover:text-blueberry"><TwitterLogo size={32} color="#4F79FE" /></button>
            </div>
        </div>
    );
}
