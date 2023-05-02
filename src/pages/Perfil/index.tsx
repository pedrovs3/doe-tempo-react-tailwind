import React, {useEffect, useState} from "react";
import {HeaderPosts} from "../../components/HeaderPosts";
import {decodeJwt} from "../../utils/jwtDecode";
import {api} from "../../lib/axios";
import header from "../../assets/img/header-profile.png";
import wave from "../../assets/img/wave_white.svg";
import {CardPerfil} from "../../components/CardPerfil";
import {useParams} from "react-router-dom";
import NovoPost from "../NovoPost";




export default function Perfil() {
    const routeParams = useParams();
    const [data, setData] = useState({})
    const id = routeParams.id

    const decodeJWT = decodeJwt();
    const userType = decodeJWT.type;
    const userId = decodeJWT.id;
    const [user, setUser ] = useState<object>();

    useEffect(() => {
        const fetchData = async () => {
            let endpoint = "";
            if (userType === "ONG") {
                endpoint = `/ngo/${userId}`;
            } else if (userType === "USER") {
                endpoint = `/user/${userId}`;
            }

            const response = await api.get(endpoint);
            const user = response.data;
            setUser(user);
        };

        fetchData();
    }, [userId, userType]);

    useEffect(() => {
        const fetchData = async () => {
            const {data} = await api.get(`/user/${id}`);
            setData(data.user)
        }


        fetchData().catch(console.error);

    }, [])


    return (
        <div className={'bg-little-white'}>
            <div className={"navbar absolute top-0 left-0 w-full bg-transparent"}>
            <HeaderPosts id={user?.user?.id} photoURL={user?.user?.photo_url}/>
            </div>
            <img src={data?.banner_photo} alt="Header image" className="object-cover w-full h-64 md:h-96 lg:h-128" />
            <img src={wave} className={'relative -mt-8 w-full'}/>
            <div className={'flex flex-col gap-10 md:lg-flex-row lg:flex-row'}>
            <CardPerfil  id={data?.id} name={data?.name} photoURL={data?.photo_url} postal_code={data?.user_address?.address?.postal_code}/>
                <NovoPost />
            </div>
        </div>
    )
}

