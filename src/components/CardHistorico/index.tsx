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
        <div className="card w-full bg-base-100 shadow-xl">
            <div className="card-body">
                <div className="flex flex-col sm:flex-row gap-5">
                    <div className="flex-shrink-0">
                        <img className="w-20 max-w-24 rounded-xl ring ring-blueberry ring-offset-2" src={props.campaign_photo} />
                    </div>
                    <div className="flex-1 flex flex-col justify-center gap-2">
                        <div>
                            <h2 className="font-bold text-xl">{props.tituloCampanha}</h2>
                            <span className="font-medium text-gray-apagado text-l pl-2">{format(new Date(props.begin_date), "dd/MM/yyyy")} - {format(new Date(props.end_date), "dd/MM/yyyy")}</span>
                        </div>
                        <Link to={`/detalhes-campanha/${props.id}`}>
                        <button className="text-l gap-2 btn w-full sm:w-48 rounded-xl bg-blueberry border-0 text-white flex justify-between hover:bg-accent">
                            <Info size={32} weight={"light"} />
                            <p className={'text-center'}>Detalhes</p>
                        </button>
                        </Link>
                    </div>
                </div>
             </div>
        </div>

    );
}
