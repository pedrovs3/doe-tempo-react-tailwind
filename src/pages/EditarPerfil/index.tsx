import React, {useEffect, useState} from "react";
import {HeaderPosts} from "../../components/HeaderPosts";
import {decodeJwt} from "../../utils/jwtDecode";
import {api} from "../../lib/axios";
import background from "../../assets/img/wave-lado.svg";
import edit from "../../assets/img/edit.svg";
import {useParams} from "react-router-dom";
import {FormEditarPerfil} from "../../components/FormEditarPerfil";




export default function EditarPerfil() {
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
        <div className={'bg-little-white relative h-screen overflow-hidden'}>
            <img src={background} className={'absolute top-0 left-0 w-full h-full object-cover'}/>
            <img src={edit} className={'absolute bottom-0 left-0 ml-4 mb-4'}/>
            <div className={"navbar absolute top-0 left-0 w-full bg-transparent"}>
                <HeaderPosts id={user?.user?.id} photoURL={user?.user?.photoURL}/>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <FormEditarPerfil />
            </div>
        </div>
    )
}

