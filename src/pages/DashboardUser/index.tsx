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



export default function DashboardUser() {
    const [loading, setLoading] = useState(false);
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

    console.log(userData)

    const handleDeleteCampaign = async (idCampaign) => {
        try {
            const response = await api.delete(`/campaign/${idCampaign}`);
            toast.success('Campanha excluída com sucesso!');
        } catch (error) {
            console.error(error);
            toast.error('Houve um erro ao excluir a campanha!');
        }
    };


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
                                    <h1 className="text-4xl font-medium text-neutral-600 pb-5">Campanhas apoiadas</h1>
                                    <div className="grid grid-cols-4 gap-4">
                                        {userData.user.supported_campaigns.map((campanha) => (
                                            <Link to={`/detalhes-campanha/${campanha.campaign.id}`}>
                                            <div className="card w-96 bg-base-100 shadow-xl" key={campanha.campaign.id}>
                                                <figure>
                                                    <img className={"rounded-t-lg"}
                                                         // @ts-ignore
                                                         src={campanha.campaign.campaign_photos[0].photo_url}
                                                         alt="Shoes"/></figure>
                                                <div className="card-body">
                                                    <h2 className="card-title">{campanha.campaign.title}</h2>
                                                    <span>
                                                           {/*// @ts-ignore*/}
                                                        {campanha.campaign.description.length > 150 ?
                                                            // @ts-ignore
                                                            campanha.campaign.description.slice(0, 150) + '...' :
                                                            // @ts-ignore
                                                            campanha.campaign.description}
                                                    </span>

                                                    <span className={"font-medium"}>
                                                         {/*// @ts-ignore*/}
                                                        Participou de {format(new Date(campanha.campaign.begin_date), "dd/MM/yyyy")} a {format(new Date(campanha.campaign.end_date), "dd/MM/yyyy")}
                                                    </span>
                                                </div>
                                            </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="overflow-x-auto w-full p-5">
                                <h1 className={"text-4xl font-medium text-neutral-600 pb-5"}>
                                    Solicitações de Campanhas</h1>
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
                                <Link to={`/perfil/USER/${id}`}>
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

