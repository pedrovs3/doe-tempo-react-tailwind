import avatar from "../../assets/img/pedro-avatar.jpeg";
import {
    ClockCounterClockwise,
    FacebookLogo,
    Info,
    InstagramLogo,
    PencilSimple,
    TwitterLogo,
    UserPlus
} from "phosphor-react";
import React from "react";

export function CardHistorico() {


    return (
        <div className="card w-full sm:w-1/2 md:w-1/3 bg-base-100 shadow-xl">
            <div className="card-body">
                <div className="card-title flex justify-center flex-row gap-2 pb-3.5">
                    <ClockCounterClockwise size={36} />
                    <h1 className="text-3xl font-bold text-blueberry">Histórico de Campanhas</h1>
                </div>
                <div className="flex flex-col sm:flex-row gap-5">
                    <div className="flex-shrink-0">
                        <img className="w-24 max-w-24 rounded-xl ring ring-blueberry ring-offset-2" src={avatar} />
                    </div>
                    <div className="flex-1 flex flex-col justify-center gap-2">
                        <h2 className="font-semibold text-2xl">Titulo</h2>
                        <span className="font-medium text-xl">23/05/2019 - 24/05/2019</span>
                        <button className="text-lg gap-2 btn w-full sm:w-48 rounded-full bg-blueberry border-0 text-white flex justify-center hover:bg-accent">
                            <Info size={32} />
                            Detalhes
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
}
