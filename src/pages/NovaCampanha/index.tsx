import {Header} from "../../components/HeaderCampanha";
import {CampanhaForm} from "../../components/FormCampanha";
import {decodeJwt} from "../../utils/jwtDecode";
import {api} from "../../lib/axios";
import React, {useEffect, useState} from "react";
import {apiCep} from "../../api/consulta_cep";
import Loading from "../../components/Loading/Index";

interface Jwt {
    id:    string;
    email: string;
    type:  string;
    iat:   number;
    exp:   number;
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

export interface User {
    id:              string;
    photo_url:       string;
    created_at:      Date;
    attached_link:   null;
    banner_photo:    string;
    post_ngo:        PostNgo[];
    ngo_address:     NgoAddress;
    ngo_causes:      any[];
    email:           string;
    name:            string;
    password:        string;
    foundation_date: Date;
    type:            Type;
    cnpj:            string;
    campaign:        Campaign[];
    description:     null;
    following:       any[];
    ngo_phone:       any[];
}

export interface Campaign {
    title: string;
    id:    string;
}

export interface NgoAddress {
    address: Address;
}

export interface Address {
    id:          string;
    complement:  null;
    postal_code: string;
    number:      string;
}

export interface PostNgo {
    post: Post;
}

export interface Post {
    id:         string;
    content:    string;
    created_at: Date;
}

export interface Type {
    name: string;
}

export default function NovaCampanha() {
    const [user, setUser] = useState<User | null>(null);
    const [cep, setCep] = useState<Cep | null>(null);
    const decodeJWT = decodeJwt();
    const jwt = decodeJWT as Jwt;
    const userId = jwt.id;
    const [loading, setLoading] = useState(true);
    console.log(user)


    useEffect(() => {

        const fetchAPI = async () => {
            const userResponse = await api.get(`/ngo/${userId}`)
            const user = await userResponse.data
            setUser(user)

            const consultarCep = await apiCep.get(`/${user?.ngo_address.address.postal_code}/json/`)
            const cep = await consultarCep.data
            setCep(cep)
            setLoading(false)

        }

        fetchAPI().catch(console.error)
    }, [])


    return (
        <div>
            {loading ? (
                <Loading />
            ) : (
        <div className={'p-4'}>
            <Header/>
            <h1 className={'text-4xl font-bold text-blueberry text-start pt-8'}>Nova Campanha</h1>
            <div className={'flex justify-center items-center gap-20'}>
                <CampanhaForm idOng={userId}
                              logradouro={cep?.logradouro}
                              numero={user?.ngo_address.address.number}
                              localidade={cep?.localidade} uf={cep?.uf}
                              complemento={user?.ngo_address.address.complement}
                              cep={user?.ngo_address.address.postal_code}/>
            </div>
        </div>
            )}
        </div>
    )

}
