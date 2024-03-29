import React, {useEffect, useState} from "react";
import Loading from "../../components/Loading/Index";
import logo from "../../assets/img/ampi-doe-tempo.svg";
import avatar from "../../assets/img/pedro-avatar.jpeg";
import {Article, Check, CheckCircle, EyeClosed, Handshake, List, Megaphone, PencilSimple, TrashSimple, UserCircle, X} from "phosphor-react";
import {api} from "../../lib/axios";
import { Link } from "react-router-dom";
import {useParams} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import {format} from "date-fns";
import {decodeJwt} from "../../utils/jwtDecode";

interface ResponseUser {
    user: User;
}

interface User {
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

interface UserCount {
    supported_campaigns: number;
    following:           number;
}

interface Gender {
    name:         string;
    abbreviation: string;
}

interface PostUser {
    post: Post;
}

interface Post {
    id:         string;
    content:    string;
    post_likes: PostLike[];
    created_at: Date;
    post_photo: any[];
    comment:    Comment[];
    _count:     PostCount;
}

interface PostCount {
    comment:    number;
    post_ngo:   number;
    post_photo: number;
    post_user:  number;
    post_likes: number;
}

interface Comment {
    id:         string;
    content:    string;
    created_at: Date;
    id_post:    string;
}

interface PostLike {
    id:      string;
    id_user: string;
    id_ngo:  null;
    id_post: string;
}

interface SupportedCampaign {
    campaign: Campaign;
}

interface Campaign {
    id:    string;
    title: string;
}

interface UserAddress {
    id:         string;
    id_address: string;
    id_user:    string;
    address:    Address;
}

interface Address {
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


export default function DashboardUser() {
    const decodeJWT = decodeJwt();
    const jwt = decodeJWT as Jwt;
    const [loading, setLoading] = useState(false);
    let hasApprovedCampaigns = false;
    const routeParams = useParams();
    const id = routeParams.id
    const [userData, setUserData] = useState<ResponseUser>({
        user: {
            id: "",
            name: "",
            email: "",
            password: "",
            cpf: "",
            id_gender: "",
            birthdate: new Date(),
            rg: "",
            id_type: "",
            description: "",
            banner_photo: "",
            attached_link: "",
            photo_url: "",
            created_at: new Date(),
            user_address: {
                id: "",
                id_address: "",
                id_user: "",
                address: {
                    id: "",
                    postal_code: "",
                    number: "",
                    complement: ""
                }
            },
            gender: {
                name: "",
                abbreviation: ""
            },
            user_phone: null,
            supported_campaigns: [],
            post_user: [],
            _count: {
                supported_campaigns: 0,
                following: 0
            }
        }
    });



    useEffect(() => {
        const fetchData = async () => {

            const response = await api.get(`/user/${id}`);
            setUserData(response.data);

        }

        fetchData().catch(console.error);

    }, [])


    return (
        <><ToastContainer/>
            <div className="h-screen w-screen">
                {loading ? (
                    <Loading/>
                ) : (
                    <div className="drawer drawer-mobile">
                        <input id="my-drawer-2" type="checkbox" className="drawer-toggle"/>
                        <div className="drawer-content flex flex-col items-center justify-center">
                            <div>

                            </div>
                            <div
                                className="w-full p-5 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                                <div className="w-full p-5">
                                    <h1 className="text-4xl font-medium pb-5">Campanhas apoiadas</h1>
                                    <div className="grid grid-cols-4 gap-4">
                                        {userData.user.supported_campaigns.map((campanha) => {
                                            // @ts-ignore
                                            if (campanha.status.name === "Aprovado") {
                                                hasApprovedCampaigns = true;
                                                return (
                                                    <Link to={`/detalhes-campanha/${campanha.campaign.id}`} key={campanha.campaign.id}>
                                                        <div className="card w-96 bg-base-100 shadow-xl">
                                                            <figure className={'rounded-t-lg h-56'}>
                                                                {/*// @ts-ignore*/}
                                                                <img className="rounded-t-lg" src={campanha.campaign.campaign_photos[0].photo_url} alt="Shoes" />
                                                            </figure>
                                                            <div className="card-body">
                                                                <h2 className="card-title">{campanha.campaign.title.length > 40 ? campanha.campaign.title.slice(0, 40) + '...' : campanha.campaign.title}</h2>
                                                                {/*// @ts-ignore*/}
                                                                <span className={'text-gray-500'}>{campanha.campaign.description.length > 150  ? campanha.campaign.description.slice(0, 150) + '...' : campanha.campaign.description}</span>
                                                                {/*// @ts-ignore*/}
                                                                <span className="font-medium">Participou de {format(new Date(campanha.campaign.begin_date), "dd/MM/yyyy")} a {format(new Date(campanha.campaign.end_date), "dd/MM/yyyy")}</span>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                );
                                            }
                                        })}
                                        {!hasApprovedCampaigns && (
                                            <div className={'flex flex-col'}>
                                                <span className={"text-xl font-medium text-gray-500 pb-2"}>Você ainda não foi aprovado em nenhuma campanha.</span>
                                                <Link to={'/campanhas'}>
                                                    <span className={'text-start text-blueberry underline pl-3'}>Que tal tentar encontrar outras campanhas?</span>
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="overflow-x-auto w-full p-5">
                                <h1 className="text-4xl font-medium text-neutral-600 pb-5">Solicitações de Campanhas</h1>
                                {/*// @ts-ignore*/}
                                {userData.user.supported_campaigns.some((campanha) => campanha.status.name === "Aguardando" || campanha.status.name === "Reprovado") ? (
                                    <div className="overflow-x-auto w-full">
                                        <table className="table w-full">
                                            <thead>
                                            <tr>
                                                <th>Nome da ONG</th>
                                                <th>Campanha</th>
                                                <th>Status de Aprovação</th>
                                                <th></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {userData.user.supported_campaigns.map((campanha) => {
                                                {/*// @ts-ignore*/}
                                                if (campanha.status.name === "Aguardando" || campanha.status.name === "Reprovado") {
                                                    return (
                                                        <tr>
                                                            <td>
                                                                <div className="flex items-center space-x-3">
                                                                    <div className="avatar">
                                                                        <div className="mask mask-squircle w-12 h-12">
                                                                            {/*// @ts-ignore*/}
                                                                            <Link to={`/perfil/ONG/${campanha.campaign.ngo.id}`}>
                                                                                {/*// @ts-ignore*/}
                                                                            <img src={campanha.campaign.ngo.photo_url} alt="Imagem" />
                                                                            </Link>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        {/*// @ts-ignore*/}
                                                                        <div className="font-bold">{campanha.campaign.ngo.name}</div>
                                                                        <div className="text-sm opacity-50">ONG</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                {campanha.campaign.title}
                                                                <br/>
                                                                <span className="badge badge-ghost badge-sm">
                                                                    {/*// @ts-ignore*/}
                                                                {format(new Date(campanha.campaign.begin_date), "dd-MM-yyyy")} | {format(new Date(campanha.campaign.end_date), "dd-MM-yyyy")}</span></td>
                                                            <td>
                                                                {/*// @ts-ignore*/}
                                                              <span className={"font-bold text-xl " + (campanha.status.name === "Reprovado" ? "text-error" : "text-warning")}>
                                                                  {/*// @ts-ignore*/}
                                                                {campanha.status.name === "Reprovado" ? "Reprovado" : "Aguardando"}
                                                                 </span>
                                                            </td>
                                                            <th>
                                                                <Link to={`/detalhes-campanha/${campanha.campaign.id}`}>
                                                                    <button className="btn btn-ghost btn-xs">Detalhes</button>
                                                                </Link>
                                                            </th>
                                                        </tr>
                                                    );
                                                } else {
                                                    return null; // Ignorar outros casos
                                                }
                                            })}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <p>Nenhuma solicitação de campanha aguardando ou reprovada.</p>
                                )}
                            </div>


                            <label htmlFor="my-drawer-2"
                                   className="btn bg-blueberry drawer-button lg:hidden absolute top-0 left-0 mt-4 ml-4">
                                <List size={32}/>
                            </label>
                        </div>
                        <div className="drawer-side">
                            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                            <ul className="menu bg-blueberry p-4 w-80 text-little-white">
                                <img src={logo}/>
                                <Link to={`/perfil/USER/${jwt.id}`}>
                                    <li><a className={"text-xl font-semibold active:bg-blueberry"}> <UserCircle size={32} /> Perfil</a></li>
                                </Link>
                                <Link to={"/feed"}>
                                    <li><a className={"text-xl font-semibold active:bg-blueberry"}> <Article size={32} /> Feed</a></li>
                                </Link>
                                <Link to={"/campanhas"}>
                                    <li><a className={"text-xl font-semibold active:bg-blueberry"}> <Megaphone size={32} /> Campanhas</a></li>
                                </Link>
                            </ul>
                        </div>
                    </div>

                )}
            </div>
        </>

    )
}

