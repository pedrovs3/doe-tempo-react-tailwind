import {CalendarCheck, GlobeHemisphereEast, MapPin} from "phosphor-react";
import { format } from "date-fns";
import React, {useEffect, useState} from "react";
import {apiCep} from "../../api/consulta_cep";
import {api} from "../../lib/axios";
import {CampaignResponse, Data, UserResponse} from "../../pages/DetalhesCampanha";
import {decodeJwt} from "../../utils/jwtDecode";
import {Navigate} from "react-router-dom";

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
    data?: Data
}


export function DetalhesBodyDois(props : CampaignProps) {
    const [user, setUser] = useState<UserResponse | null>(null);
    const [campaign, setCampaign] = useState<CampaignResponse>({ message: "", data: { id: "", id_campaign: "", id_user: "" } });
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

    let decodeJWT;
    let handleInscricao;

    console.log(props.data)

    if (localStorage.getItem("token")) {
        decodeJWT = decodeJwt()
        // @ts-ignore
        const userId = decodeJWT.id;
        useEffect(() => {
            const fetchAPI = async () => {
                // @ts-ignore
                const userResponse = await api.get(`/user/${decodeJWT.id}`);
                setUser(userResponse.data);
            };

            fetchAPI().catch(console.error);
        }, []);

        handleInscricao = async () => {
            const idUser = userId;
            const url = `/user/campaign/?idUser=${idUser}&idCampaign=${props.data.id}`;
            const campaignResponse = await api.post(url);
            location.reload()
        }
    }

    const handleClick = () => {
        history.back()
    };
    const currentDate = new Date();
    const endDate = new Date(props.data?.end_date);
    const isExpired = currentDate > endDate


    const dataFormatadaInicio = format(new Date(props.begin_date), "dd/MM/yyyy");
        const dataFormatadaFim = format(new Date(props.end_date), "dd/MM/yyyy");

        return (
            <div className={"flex flex-col pt-6 w-2/5 fixed right-32"}>
                <div className={"pt-8 transition-all ease-in-out"}>
                    <img src={props.photoUrl} className={"capa w-full h-full object-cover rounded-xl hover:scale-110 hover:mb-8 hover:rounded-2xl hover:shadow-2xl  transition-all ease-in-out"}/>
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
                {decodeJWT?.id ? (<div className={"flex pt-5"}>
                    {/*// @ts-ignore*/}
                    {!props.data?.campaign_participants.some(participant => participant.user.id === decodeJWT.id) && (
                        <div>
                            <label htmlFor="my-modal" className="btn gap-2 w-48 rounded-full bg-maya_blue border-0 text-neutral-100 hover:bg-turquoise-700">
                                QUERO ME INSCREVER
                            </label>
                        </div>
                    )}
                    {isExpired ? (
                        <button className="btn btn-error no-animation text-neutral-50 text-lg cursor-auto">
                            CAMPANHA ENCERRADA
                        </button>
                    ) : (
                        decodeJWT ? (
                            // @ts-ignore
                            decodeJWT.type === 'ONG' ? (
                                <button className="hidden"></button>
                            ) : (
                                <div>
                                    {props.data?.campaign_participants.map((participant) => {
                                        // @ts-ignore
                                        if (participant.user.id === decodeJWT.id) {
                                            if (participant.status.name === 'Aguardando') {
                                                return (
                                                    <div className={"flex flex-col"}>
                                                        <div className={"flex flex-col justify-center pb-5"}>
                                                            <p className={"font-bold text-3xl pb-2 text-neutral-700"}>Status:</p>
                                                            <span className={"font-bold text-xl text-warning"}>{participant.status.name}</span>
                                                        </div>
                                                        <button className={"btn btn-error text-little-white"}>Cancelar Inscrição</button>
                                                    </div>
                                                );
                                            } else {
                                                return (
                                                    <div className={"flex flex-col"}>
                                                        <div className={"flex flex-col justify-center pb-5"}>
                                                            <p className={"font-bold text-3xl pb-2 text-neutral-700"}>Status:</p>
                                                            <span className={`font-bold text-xl ${participant.status.name === 'Aprovado' ? 'text-success' : participant.status.name === 'Reprovado' ? 'text-error' : ''}`}>
                                                                        {participant.status.name}
                                                                    </span>
                                                        </div>
                                                    </div>

                                                );
                                            }
                                        }
                                        return null;
                                    })}
                                </div>
                            )
                        ) : (
                            <button className="hidden"></button>
                        )
                    )}
                    <input type="checkbox" id="my-modal" className="modal-toggle"/>
                    <div className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Você tem certeza que deseja se inscrever na campanha?</h3>
                            <p className="py-4 tex">Inscreva-se com consciência. Sua participação fará a diferença!</p>
                            <div className="modal-action flex gap-5">
                                <form>
                                    <label htmlFor="my-modal" className="btn btn-error text-little-white">Não</label>
                                </form>
                                <label htmlFor="my-modal" onClick={handleInscricao} className="btn btn-success text-little-white">Sim</label>
                            </div>
                        </div>
                    </div>
                </div>): (<></>)}
            </div>
        )
}
