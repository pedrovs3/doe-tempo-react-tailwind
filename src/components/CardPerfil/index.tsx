import avatar from "../../assets/img/avatar-ong.png";
import React, {useEffect, useState} from "react";
import {api} from "../../lib/axios";
import profile from "../../assets/img/pedro-avatar.jpeg";
import {Link, MapPin} from "phosphor-react";
import {apiCep} from "../../api/consulta_cep";

interface UserProps {
    id : string,
    name: string,
    photoURL : string,
    postal_code: string,
}

export function CardPerfil(props : UserProps) {
    const [data, setData] = useState([])
    const [cep, setCep] = useState('');

    useEffect(() => {
        const fetchData = async () => {

            const data = await api.get('/campaign/');
            setData(data.data.causes);
        }

        fetchData().catch(console.error);

    }, [])



    const link = "https://www.corinthians.com.br/";
    const maxLength = 20;

    function limitLinkSize(link, maxLength) {
        if (link.length <= maxLength) {
            return link;
        } else {
            const truncatedLink = link.substring(0, maxLength - 3) + "...";
            return truncatedLink;
        }
    }

    useEffect(() => {

        const fetchAPI = async () => {
            const consultarCep = await apiCep.get(`/${props.postal_code}/json/`)
            const cep = await consultarCep.data
            setCep(cep)

        }

        fetchAPI().catch(console.error)
    }, [])

    console.log(cep)


    return (
        <div className="card w-96 bg-slate-50 shadow-xl items-center">
            <div className="avatar relative -mt-16">
                <div className= "w-36 rounded-xl ring ring-blueberry ring-offset-2">
                    <img src={props.photoURL}/>
                </div>
            </div>
            <div className="card-body items-center text-center gap-5">
                <h2 className="card-title text-2xl">{props.name}</h2>
                <div className={"gap-1"}>
                    <p className={"text-blueberry text-2xl font-bold"}>225</p>
                    <p className={"text-xl font-semibold"}>Conexões</p>
                </div>
                <div className={"flex flex-row gap-2"}>
                    <MapPin size={32} />
                <p className={"text-xl font-semibold text-gray-apagado"}>{cep?.localidade}</p>
                </div>
                <div className={"flex items-start flex-col gap-2"}>
                    <p className={"text-xl font-bold"}>Sobre</p>
                    <p className={"text-xl font-semibold"}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.</p>
                </div>
                <div className={"flex flex-row gap-2 badge badge-ghost h-10"}>
                    <Link size={32} />
                    <a href={link} target="_blank" rel="noopener noreferrer" className="link link-hover text-xl font-semibold">{limitLinkSize(link, maxLength)}</a>
                </div>
            </div>
        </div>
    )
}
