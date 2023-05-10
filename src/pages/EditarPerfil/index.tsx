import React, {useEffect, useState} from "react";
import {HeaderPosts} from "../../components/HeaderPosts";
import {decodeJwt} from "../../utils/jwtDecode";
import {api} from "../../lib/axios";
import background from "../../assets/img/wave-lado.svg";
import edit from "../../assets/img/edit.svg";
import {useParams} from "react-router-dom";
import {FormEditarPerfil} from "../../components/FormEditarPerfil";
import {PencilSimple} from "phosphor-react";
import { ToastContainer } from 'react-toastify';

export interface UserResponse {
    user: User;
}

export interface User {
    id:                  string;
    name:                string;
    email:               string;
    password:            string;
    cpf:                 string;
    id_gender:           string;
    birthdate:           Date;
    rg:                  string;
    id_type:             string;
    description:         string;
    banner_photo:        string;
    attached_link:       string;
    photo_url:           string;
    created_at:          Date;
    user_address:        UserAddress;
    gender:              Gender;
    user_phone:          null;
    supported_campaigns: SupportedCampaign[];
    post_user:           PostUser[];
    _count:              UserCount;
}

export interface UserCount {
    supported_campaigns: number;
    following:           number;
}

export interface Gender {
    name:         string;
    abbreviation: string;
}

export interface PostUser {
    post: Post;
}

export interface Post {
    id:         string;
    content:    string;
    post_likes: PostLike[];
    created_at: Date;
    post_photo: PostPhoto[];
    comment:    Comment[];
    _count:     PostCount;
}

export interface PostCount {
    comment:    number;
    post_ngo:   number;
    post_photo: number;
    post_user:  number;
    post_likes: number;
}

export interface Comment {
    id:         string;
    content:    string;
    created_at: Date;
    id_post:    string;
}

export interface PostLike {
    id:      string;
    id_user: null | string;
    id_ngo:  null | string;
    id_post: string;
}

export interface PostPhoto {
    id:        string;
    id_post:   string;
    photo_url: string;
}

export interface SupportedCampaign {
    campaign: Campaign;
}

export interface Campaign {
    id:    string;
    title: string;
}

export interface UserAddress {
    id:         string;
    id_address: string;
    id_user:    string;
    address:    Address;
}

export interface Address {
    id:          string;
    postal_code: string;
    number:      string;
    complement:  string;
}

interface Jwt {
    id:    string;
    email: string;
    type:  string;
    iat:   number;
    exp:   number;
}


export default function EditarPerfil() {
    const decodeJWT = decodeJwt();
    const jwt = decodeJWT as Jwt;
    const routeParams = useParams();
    const [data, setData] = useState({})
    const id = routeParams.id
    const userType = jwt.type;
    const userId = jwt.id;
    const [user, setUser] = useState<UserResponse | null>(null);




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
        <><ToastContainer/>
        <div className={'bg-little-white relative h-screen overflow-hidden'}>
            <img src={background} className={'absolute top-0 left-0 w-full h-full object-cover'}/>
            <img src={edit} className={'absolute bottom-0 left-0 ml-4 mb-4 hidden 2xl:block'} />
            <div className={"navbar absolute top-0 left-0 w-full bg-transparent"}>
                <HeaderPosts id={user?.user?.id} photoURL={user?.user?.photo_url}/>
            </div>
            <div className="justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <div className={"flex flex-row gap-2 pb-3.5"}>
                <PencilSimple size={42} />
                <h1 className={"text-5xl font-bold text-blueberry"}>Edite seus dados</h1>
                </div>
                <FormEditarPerfil />
            </div>
        </div>
        </>
    )
}

