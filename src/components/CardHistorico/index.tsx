import avatar from "../../assets/img/pedro-avatar.jpeg";
import {
    ClockCounterClockwise,
    Info,
} from "phosphor-react";
import React from "react";
import {PostLike} from "../../models/PostLike";
import {Comentario} from "../FeedPosts";
import {format} from "date-fns";
import { Link } from "react-router-dom";

interface HistoryProps {
    id : string,
    campaign_photo: string,
    tituloCampanha: string,
    begin_date: string
    end_date: string

}
export function CardHistorico(props : HistoryProps) {


    return (
        <div className="card w-full h-80 bg-base-100 shadow-xl">
            <div className="card-body">
                <div className="card-title flex justify-center flex-row gap-2 pb-3.5">
                    <ClockCounterClockwise size={36} />
                    <h1 className="text-3xl font-bold text-blueberry">Histórico de Campanhas</h1>
                </div>
                <div className="flex flex-col sm:flex-row gap-5">
                    <div className="flex-shrink-0">
                        <img className="w-24 max-w-24 rounded-xl ring ring-blueberry ring-offset-2" src={props.campaign_photo} />
                    </div>
                    <div className="flex-1 flex flex-col justify-center gap-2">
                        <h2 className="font-semibold text-2xl">{props.tituloCampanha}</h2>
                        <span className="font-medium text-xl">{format(new Date(props.begin_date), "dd/MM/yyyy")} - {format(new Date(props.end_date), "dd/MM/yyyy")}</span>
                        <Link to={`/detalhes-campanha/${props.id}`}>
                        <button className="text-lg gap-2 btn w-full sm:w-48 rounded-full bg-blueberry border-0 text-white flex justify-center hover:bg-accent">
                            <Info size={32} />
                            Detalhes
                        </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    );
}
