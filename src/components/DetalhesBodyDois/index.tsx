import {CalendarCheck, GlobeHemisphereEast, MapPin} from "phosphor-react";
import { format } from "date-fns";
import React, {useEffect, useState} from "react";
import {apiCep} from "../../api/consulta_cep";

interface Cep {
    cep:         string;
    logradouro:  string;
    complemento: string;
    bairro:      string;
    localidade:  string;
    uf:          string;
    ibge:        string;
    gia:         string;
    ddd:         string;
    siafi:       string;
}


interface CampaignProps {
    photoUrl: string,
    causes: [{causes: {id: string, title: string, description:string}}],
    begin_date: string,
    end_date: string,
    home_office: boolean,
    postal_code: string,
    number: string,
    complement: string,
}


export function DetalhesBodyDois(props : CampaignProps) {
    const [cep, setCep] = useState<Cep | null>(null);
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
                <div className={"pt-8"}>
                    <img src={props.photoUrl} className={"capa w-full h-full object-cover rounded-xl"}/>
                </div>
                <div className={"flex gap-5 w-[28rem] justify-center pt-3.5"}>
                    {titulos.map((item) => (
                        <div className="badge badge-primary">{item}</div>
                    ))}
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
