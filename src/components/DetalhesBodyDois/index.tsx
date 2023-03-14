import {Clock, GlobeHemisphereEast, Heart, MapPin, ShareNetwork} from "phosphor-react";
import professor from "../../assets/img/professor.png";

export function DetalhesBodyDois() {

    return (
        <div className={"flex pt-6 w-2/5"}>
            <div className={"gap-52"}>
                <div className="badge">Educação</div>
                <div className="badge badge-primary">Comunidade</div>
                <div className="badge badge-secondary">Esudantes</div>
            </div>
            <div className={"flex flex-col"}>
                <img src={professor} className={"w-[20rem] h-[13rem] object-cover rounded-lg pt-1.5"}/>
            </div>
        </div>
    )
}