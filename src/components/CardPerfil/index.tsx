import React, {useEffect, useState} from "react";
import {api} from "../../lib/axios";
import {Link, MapPin, PencilSimple, UserPlus} from "phosphor-react";
import {apiCep} from "../../api/consulta_cep";
import {decodeJwt} from "../../utils/jwtDecode";
import {useNavigate} from "react-router-dom";


interface UserProps {
    id : string,
    name: string,
    photoURL : string,
    postal_code: string,
    attached_link: [],
    description: string,
}

export interface Link {
    id: string;
    attached_link: string;
    id_source: string;
    id_user: string;
    id_ngo: string | null;
    source: {
        id: string;
        name: string;
    };
}

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

interface Jwt {
    id:    string;
    email: string;
    type:  string;
    iat:   number;
    exp:   number;
}

export function CardPerfil(props : UserProps & Cep) {
    const [data, setData] = useState([])
    const [cep, setCep] = useState<Cep | null>(null);
    const [linkSocial, setLinkSocial] = useState<[]>([]);
    const maxLength = 20;
    const decodeJWT = decodeJwt();
    const jwt = decodeJWT as Jwt;
    const userId = jwt.id;
    const navigate = useNavigate();


    function editarPerfil() {
        navigate(`/editar-perfil/${userId}`);
    }

    useEffect(() => {
        const fetchData = async () => {

            const data = await api.get('/campaign/');
            setData(data.data.causes);
        }

        fetchData().catch(console.error);

    }, [])


    function limitLinkSize(link: string, maxLength: number): string {
        if (!link) {
            return '';
        }

        if (link.length <= maxLength) {
            return link;
        } else {
            return link.substring(0, maxLength - 3) + '...';
        }
    }


    useEffect(() => {

        const fetchAPI = async () => {
                const consultarCep = await apiCep.get(`/${props.postal_code}/json/`)
                const cep = await consultarCep.data
                setCep(cep)
        }

        fetchAPI().catch(console.error)
    }, [props.postal_code])



    return (
        <div className="card w-96 bg-slate-50 shadow-xl items-center">
            <div className="avatar relative -mt-16">
                <div className= "w-36 rounded-xl ring ring-blueberry ring-offset-2">
                    <img src={props.photoURL}/>
                </div>
            </div>
            <div className="card-body items-center text-center gap-5">
                <h2 className="card-title text-2xl">{props.name}</h2>
                {props.id === userId && (
                        <button className="gap-2 btn w-40 h-full rounded-full bg-blueberry border-0 text-white flex justify-center hover:bg-accent" onClick={editarPerfil}>
                        <PencilSimple size={24} />
                        Editar
                    </button>
                )}
                <div className={"flex flex-row gap-2"}>
                    <MapPin size={32} />
                <p className={"text-xl font-semibold text-gray-apagado"}>{cep?.localidade}, {cep?.uf}</p>
                </div>
                <div className={"flex justify-start flex-col gap-2"}>
                    <p className={"text-xl font-bold items-start"}>Sobre</p>
                    <p className={"text-xl font-semibold"}>{props.description}</p>
                </div>
                {props.attached_link && props.attached_link.map((link : Link) => (
                    <div key={link.id} className={"flex flex-row gap-2 badge badge-ghost h-10"}>
                        {link.source.name === "Twitter" && (
                            <i className="fa-brands fa-twitter fa-xl"></i>
                        )}
                        {link.source.name === "LinkedIn" && (
                            <i className="fa-brands fa-linkedin fa-xl"></i>
                        )}
                        {link.source.name === "Instagram" && (
                            <i className="fa-brands fa-instagram fa-xl"></i>
                        )}
                        {link.source.name === "Facebook" && (
                            <i className="fa-brands fa-facebook fa-xl"></i>
                        )}
                        <a href={link.attached_link} target="_blank" rel="noopener noreferrer" className="link link-hover text-xl font-semibold">
                            {limitLinkSize(link.attached_link, maxLength)}
                        </a>
                    </div>
                ))}



            </div>
        </div>
    )
}
