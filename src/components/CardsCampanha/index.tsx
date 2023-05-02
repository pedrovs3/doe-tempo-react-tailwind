import avatar from "../../assets/img/avatar-ong.png";
import React, {useEffect, useState} from "react";
import {api} from "../../lib/axios";
import {BrowserRouter as Router, Route, NavLink, useNavigate, Link} from "react-router-dom";

interface CardProps {
    id: string,
    imgAvatar: string,
    title: string,
    description: string,
}


export function CardsCampanha(props : CardProps) {
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {

            const data = await api.get('/campaign/');
            setData(data.data.causes);
        }

        fetchData().catch(console.error);

    }, [])

    function limitarTexto(title, limite) {
        if (title.length > limite) {
            return title.substring(0, limite) + '...';
        } else {
            return title;
        }
    }


    return (
        <div className={'pt-5 h-full w-full flex flex-col justify-between'}>
            <div className="card w-96 bg-card-campanha">
                <div className="card-body">
                    <div className="avatar w-96">
                        <div className="w-1/6 rounded-xl ring ring-primary ring-tufts-blue ring-offset-2 bg-blueberry">
                            <img src={props.imgAvatar} alt={'Imagem da ong responsável!'}/>
                        </div>
                            <h2 className={"text-blueberry font-bold text-2xl p-2.5"}>{limitarTexto(`${props.title}`, 18)}</h2>
                    </div>
                    <h2 className={"pt-3 text-blueberry font-bold text-xl"}>Sobre:</h2>
                    <p className={"font-medium text-texto-campanha pb-3.5"}>
                        {props .description}
                    </p>
                    <progress className="progress progress-info w-80" value="50" max="100"></progress>
                    <div className="flex justify-end">
                        <p className={"flex justify-end font-medium"}>70 Vagas Disponíveis</p>
                    </div>
                    <div className="card-actions justify-end pt-3">
                            <NavLink className="btn w-32 rounded-full bg-blueberry border-0 text-white flex justify-center hover:bg-turquoise-700 hover:text-blueberry"
                                     to={`/detalhes-campanha/${props .id}`}>Saiba Mais </NavLink>
                    </div>
                </div>
            </div>
        </div>

    )
}
