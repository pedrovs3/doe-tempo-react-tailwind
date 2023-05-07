import {Clock, GlobeHemisphereEast, Heart, HeartStraight, MagnifyingGlass, MapPin, ShareNetwork} from "phosphor-react";
import avatar from '../../assets/img/avatar-ong.png'

interface CampaignProps {
    id: string,
    title: string,
    description: string,
    how_to_contribute: string,
    prerequisite: string,
    profileOng: string,
    descriptionOng: string,
    nameOng: string,
}

export function DetalhesBody(props : CampaignProps) {
    return (
        <div className={"flex flex-col gap-3 pt-6 w-1/3"}>
            <h1 className={'text-5xl font-bold text-start pt-8'}>{props.title}</h1>
            <div className={"flex gap-5"}>
                <button className="btn gap-2 w-48 rounded-full bg-maya_blue border-0 text-neutral-900 hover:bg-turquoise-700">
                    <ShareNetwork size={32}/>
                    Compartilhar
                </button>
            </div>
            <div className={"pt-5"}>
                <h1 className={"font-bold text-2xl pb-2 text-neutral-700"}>Sobre o Projeto:</h1>
                <span>{props.description}</span>
            </div>
            <div className={"pt-5"}>
                <h1 className={"font-bold text-2xl pb-2 text-neutral-700"}>Como Contribuir:</h1>
                <div className="card w-auto bg-base-100 border border-neutral-400">
                    <div className="card-body">
                        <h2 className="card-title">{props.title}</h2>
                        <span className={"text-neutral-400 font-bold"}>FUNÇÃO:</span>
                        <p className={"text-neutral-700 font-bold"}>{props.how_to_contribute}</p>
                        <span className={"text-neutral-400 font-bold"}>PRÉ-REQUISITOS:</span>
                        <p className={"text-neutral-700 font-bold"}>{props.prerequisite}</p>
                    </div>
                </div>
            </div>
            <div className={"pt-5"}>
                <h1 className={"font-bold text-2xl pb-2 text-neutral-700"}>Realizado pela ONG</h1>
                <div className="card card-side bg-base-100 border border-neutral-400 items-center">
                    <img className={"w-24 h-24 p-1"} src={props.profileOng} alt="Profile photo ONG"/>
                    <div className="center card-body p-5">
                        <h2 className="card-title text-neutral-400 font-bold">{props.nameOng}</h2>
                        <p className={"text-neutral-700 font-bold"}>{props.descriptionOng}</p>
                    </div>
                </div>
            </div>
        </div>

    )
}
