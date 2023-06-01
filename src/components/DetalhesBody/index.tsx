import {ShareNetwork} from "phosphor-react";
import {Link} from "react-router-dom";

interface CampaignProps {
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
            <h1 className={'text-6xl font-bold text-start pt-8'}>{props.title}</h1>
            <div className={"pt-5"}>
                <h1 className={"font-bold text-3xl pb-2 text-neutral-700"}>Sobre o Projeto:</h1>
                <span className={'pl-2 text-gray-500 text-justify'}>{props.description}</span>
            </div>
            <div className={"pt-5"}>
                <h1 className={"font-bold text-3xl text-neutral-700"}>Como Contribuir:</h1>
                <div className="card w-auto bg-base-100">
                    <div className="card-body">
                        <span className={"text-neutral-700 font-bold"}>FUNÇÃO:</span>
                        <p className={"text-gray-500 font-medium pl-2 text-justify"}>{props.how_to_contribute}</p>
                        <span className={"text-neutral-700 font-bold"}>PRÉ-REQUISITOS:</span>
                        <p className={"text-gray-500 font-medium pl-2 text-justify"}>{props.prerequisite}</p>
                    </div>
                </div>
            </div>
            <div className={"pt-5"}>
                <h1 className={"font-bold text-2xl pb-2 text-neutral-700"}>Realizado pela ONG</h1>
                <div className="card card-side items-top gap-5">
                    <img className={"card-title h-24 w-24 rounded-xl"} src={props.profileOng} alt="Profile photo ONG"/>
                    <div className="center">
                        <h2 className=" text-2xl text-neutral-700 font-bold pb-2">{props.nameOng}</h2>
                        <p className={"text-gray-500 font-medium pl-2 text-justify"}>{props.descriptionOng}</p>
                    </div>
                </div>
            </div>
        </div>

    )
}
