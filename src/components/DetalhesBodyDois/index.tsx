import {Clock, GlobeHemisphereEast, Heart, HeartStraight, MapPin, ShareNetwork} from "phosphor-react";
import capa from "../../assets/img/teste-capa.jpeg";
import avatar from "../../assets/img/pedro-avatar.jpeg";

export function DetalhesBodyDois() {

    return (
        <div className={"flex flex-col pt-6 w-2/5"}>
            <div className={""}>
                <img src={capa} className={"capa w-[28rem] h-[16rem] object-cover rounded-lg pt-1.5"}/>
            </div>
            <div className={"flex gap-5 w-[28rem] justify-center pt-3.5"}>
                <div className="badge h-8">Educação</div>
                <div className="badge h-8 badge-primary">Comunidade</div>
                <div className="badge h-8 badge-secondary">Esudantes</div>
            </div>
            <div className={"pt-14"}>
                <progress className="progress progress-accent  w-[28rem] h-2/3" value="60" max="100"></progress>
            </div>
            <div className="flex justify-end  w-[28rem]">
                <p className={"flex font-medium"}>70 Vagas Disponíveis</p>
            </div>
            <div className={"flex flex-col"}>
                <h1 className={"font-bold text-2xl pb-2"}>Detalhes:</h1>
                <ul className={"flex flex-col gap-5"}>
                    <li className={"flex flex-row items-center gap-2"}><Clock size={32}/> 4 Horas</li>
                    <li className={"flex flex-row items-center gap-2"}><GlobeHemisphereEast size={32}/> Pode ser feito a
                        distância
                    </li>
                    <li className={"flex flex-row items-center gap-2"}><MapPin size={32}/> Rua das Rosas, Goth City, 666
                    </li>
                </ul>
            </div>
            <div className={"flex pt-5 gap-5"}>
                <button className="btn gap-2 w-48 rounded-full bg-maya_blue border-0 text-neutral-900 hover:bg-turquoise-700">
                    Quero me inscrever
                </button>
            </div>
        </div>
    )
}
