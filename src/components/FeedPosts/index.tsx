
import React, {useEffect, useState} from "react";
import Logo from "../../assets/img/logo_home.svg";
import { format } from 'date-fns'
import { pt } from 'date-fns/locale'

interface PostProps {
    id : string,
    photoUser: string,
    nameUser: string,
    content : string,
    created : string,
    images: []

}


export function FeedPosts(props : PostProps) {

    const dataFormatada = format(new Date(props.created), "d 'de' MMMM 'às' HH:mm", { locale: pt });



    return (
        <div className="bg-base-100 shadow-xl w-1/3 text-primary-content rounded-lg">
            <div className="card-body">
                <div className={"flex flex-row"}>
                    <img src={Logo}/>
                    <div className={""}>
                        <h2 className="card-title text-neutral-900">Instituto Luisa Mell</h2>
                        <p className={"text-neutral-800 text-xs"}>{dataFormatada}</p>
                    </div>
                </div>
                <p className={"text-neutral-900"}>{props.content}</p>
                <div className="card-actions justify-start">
                </div>
            </div>
        </div>
    );
}
