import React, {useEffect, useState} from "react";
import {HeaderPosts} from "../../components/HeaderPosts";
import {decodeJwt} from "../../utils/jwtDecode";
import {api} from "../../lib/axios";
import background from "../../assets/img/wave-lado.svg";
import edit from "../../assets/img/edit.svg";
import {useParams} from "react-router-dom";
import {FormEditarPerfil} from "../../components/FormEditarPerfil";
import { ToastContainer } from 'react-toastify';
import {FormEditarPerfilOng} from "../../components/FormEditarPerfilOng";
import {CaretLeft} from "phosphor-react";

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
    }, []);

    const handleClick = () => {
        history.back()
    };


    return (
        <>
            <ToastContainer />
            <div className="bg-little-white relative min-h-screen overflow-hidden">
                <img src={background} className="absolute top-0 left-0 w-full h-full object-cover" />
                <button onClick={handleClick} className="btn w-40 rounded-full bg-turquoise-500 border-0 text-white flex justify-center hover:bg-accent absolute top-0 left-0 mt-4 ml-4">
                    <CaretLeft size={32} />
                    Voltar
                </button>
                <div className="flex justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    {jwt.type === 'USER' ? (
                        <FormEditarPerfil />
                    ) : (
                        <FormEditarPerfilOng />
                    )}
                </div>
            </div>
        </>



    )
}

