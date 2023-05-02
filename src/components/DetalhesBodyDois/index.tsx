import {CalendarCheck, Clock, GlobeHemisphereEast, Heart, HeartStraight, MapPin, ShareNetwork} from "phosphor-react";
import { format } from "date-fns";
import {CardsCampanha} from "../CardsCampanha";
import React, {useEffect, useState} from "react";
import {api} from "../../lib/axios";
import {apiCep} from "../../api/consulta_cep";



interface CampaignProps {
    photoUrl: string,
    causes: [{causes: {id: string, title: string, description:string}}],
    begin_date: string,
    end_date: string,
    home_office: boolean,
    postal_code: number,
    number: number,
    complement: string,
}


export function DetalhesBodyDois(props : CampaignProps) {
    const [cep, setCep] = useState('');
    const titulos = props.causes.map((causa) => (causa.causes.title));


    useEffect(() => {

        const fetchAPI = async () => {
            const consultarCep = await apiCep.get(`/${props.postal_code}/json/`)
            const cep = await consultarCep.data
            setCep(cep)

        }

        fetchAPI().catch(console.error)
    }, [])


    function homeOffice(booleano) {
        if (booleano) {
            return "Pode ser feito a distância";
        } else {
            return "Não pode ser feito a distância";
        }
    }

        const dataFormatadaInicio = format(new Date(props.begin_date), "dd/MM/yyyy");
        const dataFormatadaFim = format(new Date(props.end_date), "dd/MM/yyyy");

        return (
            <div className={"flex flex-col pt-6 w-2/5"}>
                <div className={""}>
                    <img src={props.photoUrl} className={"capa w-[28rem] h-[16rem] object-cover rounded-lg pt-1.5"}/>
                </div>
                <div className={"flex gap-5 w-[28rem] justify-center pt-3.5"}>
                    {titulos.map((item) => (
                        <div className="badge badge-primary">{item}</div>
                    ))}

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
                        <li className={"flex flex-row items-center gap-2"}><CalendarCheck
                            size={32}/>{dataFormatadaInicio} até {dataFormatadaFim}</li>
                        <li className={"flex flex-row items-center gap-2"}><GlobeHemisphereEast
                            size={32}/>{homeOffice(props.home_office)}</li>
                        <li className={"flex flex-row items-center gap-2"}><MapPin size={32}/>{cep?.logradouro}, {props.number}, {cep?.bairro} {props.complement} </li>
                    </ul>
                </div>
            </div>
        )
}
