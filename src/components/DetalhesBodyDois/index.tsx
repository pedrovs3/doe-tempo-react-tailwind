import {Clock, GlobeHemisphereEast, Heart, MapPin, ShareNetwork} from "phosphor-react";
import capa from "../../assets/img/teste-capa.jpeg";
import avatar from "../../assets/img/pedro-avatar.jpeg";

export function DetalhesBodyDois() {

    return (
        <div className={"flex flex-col pt-6 w-2/5"}>
            <div className={"gap-5"}>
                <div className="badge">Educação</div>
                <div className="badge badge-primary">Comunidade</div>
                <div className="badge badge-secondary">Esudantes</div>
            </div>
            <div className={""}>
                <img src={capa} className={"capa w-[20rem] h-[13rem] object-cover rounded-lg pt-1.5"}/>
            </div>
            <div className={"pt-14"}>
                <progress className="progress progress-accent w-80 h-2/3" value="60" max="100"></progress>
            </div>
            <div className="flex justify-end w-80">
                <p className={"flex font-medium"}>70 Vagas Disponíveis</p>
            </div>
            <div className="avatar-group -space-x-6">
                <div className="avatar">
                    <div className="w-12">
                        <img src={avatar}/>
                    </div>
                </div>
                <div className="avatar">
                    <div className="w-12">
                        <img src={avatar}/>
                    </div>
                </div>
                <div className="avatar">
                    <div className="w-12">
                        <img src={avatar}/>
                    </div>
                </div>
                <div className="avatar placeholder">
                    <div className="w-12 bg-neutral-focus text-neutral-content">
                        <span>+99</span>
                    </div>
                </div>
            </div>
            <div className={"pt-5 flex justify-center w-80"}>
            <button className="btn gap-2 w-48 rounded-full bg-blueberry border-0 text-white flex justify-center hover:bg-turquoise-700 hover:text-blueberry">
                INSCREVER-SE
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
            </button>
            </div>
        </div>
    )
}
