import React, {useEffect, useState} from "react";
import Loading from "../../components/Loading/Index";
import logo from "../../assets/img/ampi-doe-tempo.svg";
import empty from "../../assets/img/empty_no_data.svg";
import {Article, Check, CheckCircle, EyeClosed, Handshake, List, Megaphone, PencilSimple, TrashSimple, UserCircle, X} from "phosphor-react";
import {api} from "../../lib/axios";
import { Link } from "react-router-dom";
import {useParams} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import {format} from "date-fns";


 interface Volunteer {
    status: { name: string };
    id:          string;
    id_campaign: string;
    id_user:     string;
    id_status:   string;
    campaign:    Campaign;
    user:        User;
}

 interface CampaignAddress {
    id:          string;
    id_campaign: string;
    id_address:  string;
}

interface CampaignCause {
    id:          string;
    id_cause:    string;
    id_campaign: string;
}

interface User {
    id:                  string;
    name:                string;
    email:               string;
    password:            string;
    cpf:                 string;
    id_gender:           string;
    birthdate:           Date;
    rg:                  null | string;
    id_type:             string;
    description:         null | string;
    banner_photo:        string;
    photo_url:           string;
    created_at:          Date;
    supported_campaigns: SupportedCampaign[];
    attached_link:       AttachedLink[];
}

interface AttachedLink {
    id:            string;
    attached_link: string;
    id_source:     string;
    id_user:       string;
    id_ngo:        null;
}

interface SupportedCampaign {
    id:          string;
    id_campaign: string;
    id_user:     string;
    id_status:   string;
}

export interface Ngo {
    id:              string;
    photo_url:       string;
    created_at:      string;
    attached_link:   any[];
    banner_photo:    string;
    post_ngo:        PostNgo[];
    ngo_address:     NgoAddress;
    ngo_causes:      any[];
    email:           string;
    name:            string;
    password:        string;
    foundation_date: string;
    type:            Type;
    cnpj:            string;
    campaign:        Campaign[];
    description:     null;
    following:       any[];
    ngo_phone:       any[];
}

export interface Campaign {
    title:           string;
    id:              string;
    description:     string;
    is_active:       boolean;
    campaign_photos: CampaignPhoto[];
}

export interface CampaignPhoto {
    photo_url: string;
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
    post_photo: PostPhoto[];
    post_likes: PostLike[];
    comment:    Comment[];
}

export interface Comment {
    id:            string;
    content:       string;
    created_at:    Date;
    id_post:       string;
    comment_likes: any[];
    comment_ngo:   any[];
    comment_user:  CommentUser[];
    _count:        Count;
}

export interface Count {
    comment_ngo:   number;
    comment_user:  number;
    comment_likes: number;
}

export interface CommentUser {
    id:         string;
    id_comment: string;
    id_user:    string;
}

export interface PostLike {
    id:      string;
    id_user: string;
    id_ngo:  null;
    id_post: string;
}

export interface PostPhoto {
    id:        string;
    id_post:   string;
    photo_url: string;
}

export interface Type {
    name: string;
}



export default function DashboardOng() {
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [statusFilter, setStatusFilter] = useState("Aguardando");
    const routeParams = useParams();
    const id = routeParams.id
    const [ngoData, setNgoData] = useState<Ngo>({
        id: "",
        photo_url: "",
        created_at: "",
        attached_link: [],
        banner_photo: "",
        post_ngo: [],
        ngo_address: { address: { id: "", complement: null, postal_code: "", number: "" } },
        ngo_causes: [],
        email: "",
        name: "",
        password: "",
        foundation_date: "",
        type: { name: "" },
        cnpj: "",
        campaign: [],
        description: null,
        following: [],
        ngo_phone: [],
    });
    const [volunteersData, setVolunteersData] = useState<Volunteer[]>([]);


    useEffect(() => {
        const fetchData = async () => {

            const response = await api.get(`/ngo/${id}`);
            setNgoData(response.data);
        }

        fetchData().catch(console.error);

    }, [])

    useEffect(()=> {
        const fetchData = async() => {
            const responseVolunteer = await api.get(`/campaign/participants/?status=${statusFilter}`);
            setVolunteersData(responseVolunteer.data.volunteers);
        }

        fetchData().catch(console.error)
    }, [statusFilter])


    const handleDeleteCampaign = async (idCampaign) => {
        try {
            const response = await api.delete(`/campaign/${idCampaign}`);
            toast.success('Campanha excluída com sucesso!');
        } catch (error) {
            console.error(error);
            toast.error('Houve um erro ao excluir a campanha!');
        }
    };

    const handleDesactivateCampaign = async (idCampaign) => {
        try {
            const response = await api.put(`/campaign/deactivate/${idCampaign}`);
            toast.success(response.data);
        } catch (error) {
            console.error(error);
            toast.error('Houve um erro ao desativar a campanha!');
        }
    };

    const handleApproval = (idCampanha, idUsuario) => {
        const status = 'Aprovado';
        const url = `/campaign/${idCampanha}/user/${idUsuario}?status=${status}`;
        api.put(url)
            .then(response => {
                toast.success('O voluntário foi aprovado!');
            })
            .catch(error => {
                toast.error('Houve um erro ao tentar aprovar o voluntário!');
            });
        console.log(url)
        }



    const handleDenied = (idCampanha, idUsuario) => {
        const status = 'Reprovado';
        const url = `/campaign/${idCampanha}/user/${idUsuario}?status=${status}`;
        api.put(url)
            .then(response => {
                toast.success('O voluntário foi reprovado!');
            })
            .catch(error => {
                toast.error('Houve um erro ao tentar reprovar o voluntário!');
            });

    }

    console.log()

    return (
        <><ToastContainer/>
            <div className="h-screen w-screen">
                    <div className="drawer drawer-mobile">
                        <input id="my-drawer-2" type="checkbox" className="drawer-toggle"/>
                        <div className="drawer-content flex flex-col items-center justify-center">
                            <div
                                className="w-full p-5">
                                <div className="w-full p-5">
                                    <h1 className="text-4xl font-medium text-neutral-600 pb-5">Suas Campanhas</h1>
                                    <div className={"pb-5"}>
                                    <Link to={"/nova-campanha/"}>
                                    <button className="btn gap-2 w-48 rounded-full bg-blueberry border-0 text-neutral-100 hover:bg-turquoise-700">
                                        <Megaphone size={22} color={"white"} />
                                        Nova Campanha
                                    </button>
                                    </Link>
                                    </div>

                                    <div className="flex gap-5">
                                        {ngoData.campaign.map((campanha) => (
                                            <div className="card w-96 bg-base-100 shadow-xl" key={campanha.id}>
                                                <figure className={'rounded-t-lg h-56'}>
                                                    <img className={`rounded-t-lg transition-all ${campanha.is_active ? '' : 'blur-sm grayscale'}`} src={campanha.campaign_photos[0].photo_url} alt="Imagem da Campanha"/>
                                                </figure>
                                                <div className="card-body flex flex-row">
                                                    <div className="dropdown absolute top-[53%] right-4 select-none">
                                                        <label tabIndex={0} className="btn-unstyled m-1 text-blueberry text-4xl">...</label>
                                                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                                            <Link to={`/editar-campanha/${campanha.id}`}>
                                                                <li><a className={"text-xl font-semibold active:bg-neutral-300"}><PencilSimple size={32}/> Editar</a></li>
                                                            </Link>
                                                            <li>
                                                                <button className={"text-xl font-semibold active:bg-neutral-300"} onClick={() => handleDeleteCampaign(campanha.id)}>
                                                                    <TrashSimple size={32} color={"red"}/>Excluir
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <a className={`text-xl font-semibold active:bg-neutral-300 ${campanha.is_active ? '' : 'hidden'}`} onClick={() => handleDesactivateCampaign(campanha.id)}>
                                                                    <EyeClosed size={32}/> Encerrar
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className={'flex flex-col'}>
                                                        <h2 className="card-title">{campanha.title.length > 40 ? campanha.title.slice(0, 40) + '...' : campanha.title}</h2>
                                                        <span className={'text-gray-500'}>{campanha.description.length > 150 ? campanha.description.slice(0, 150) + '...' : campanha.description}</span>
                                                    </div>
                                                </div>
                                            </div>

                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="overflow-x-auto w-full p-5">
                                <table className="table w-full">
                                    {/* head */}
                                    <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Campanha</th>
                                        <th>
                                            <select
                                                className="select select-bordered w-full max-w-xs"
                                                value={statusFilter}
                                                onChange={(e) => setStatusFilter(e.target.value)}
                                            >
                                                <option value="Aguardando">Aguardando</option>
                                                <option value="Aprovado">Aprovado</option>
                                                <option value="Reprovado">Reprovado</option>
                                            </select>
                                        </th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    {/* row 1 */}
                                    <tbody>
                                    {volunteersData.length === 0 && statusFilter === "Aguardando" && (
                                        <span className={"text-2xl"}>Não há solicitações de voluntários para suas campanhas ;/</span>
                                    )}
                                    {volunteersData.length > 0 && volunteersData.map((volunteer) => (
                                        <tr key={volunteer.id}>
                                            <td>
                                                <div className="flex items-center space-x-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <Link to={`/perfil/USER/${volunteer.user.id}`}>
                                                            <img src={volunteer.user.photo_url} alt="Avatar do voluntário" />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <Link to={`/perfil/USER/${volunteer.user.id}`}>
                                                        <div className="font-bold">{volunteer.user.name}</div>
                                                        </Link>
                                                        <div className="text-sm opacity-50">Voluntário</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                {volunteer.campaign.title}
                                                <br />
                                                {/*@ts-ignore*/}
                                                <span className="badge badge-ghost badge-sm">{format(new Date(volunteer.campaign.begin_date), "dd-MM-yyyy")} | {format(new Date(volunteer.campaign.end_date), "dd-MM-yyyy")}</span>
                                            </td>
                                            <td>
                                                <div className="flex gap-5">
                                                    {statusFilter === "Aguardando" ? (
                                                        <>
                                                            <button className="btn btn-circle btn-outline btn-accent"
                                                                    onClick={() => handleApproval(volunteer.campaign.id, volunteer.user.id)}>
                                                            <span className="hover:text-little-white">
                                                                <Check size={32}/>
                                                            </span>
                                                            </button>
                                                            <label htmlFor="my-modal-5"
                                                                   className="btn btn-circle btn-outline btn-error">
                                                                <span className="hover:text-little-white">
                                                                    <X size={32}/>
                                                                </span>
                                                            </label><input type="checkbox" id="my-modal-5"
                                                                           className="modal-toggle"/>
                                                            <div className="modal">
                                                                <div className="modal-box w-11/12 max-w-5xl">
                                                                    <label htmlFor="my-modal-5"
                                                                           className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                                                                    <h3 className="font-bold text-2xl">❌ Recusar</h3>
                                                                    <p className="py-4 text-xl">
                                                                        Sentimos muito por esse voluntário não se
                                                                        encaixar na sua campanha.
                                                                        <br/>
                                                                        Existe algum motivo específico para ele não ser
                                                                        aprovado?
                                                                    </p>
                                                                    <input type="text" placeholder="Motivo"
                                                                           className="input input-bordered input-error w-full"/>
                                                                    <div className="modal-action">
                                                                        <label
                                                                            onClick={() => handleDenied(volunteer.campaign.id, volunteer.user.id)}
                                                                            htmlFor="my-modal-5"
                                                                            className="btn btn-error text-neutral-50">Recusar</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <span className={"font-bold text-xl " + (volunteer.status.name === "Reprovado" ? "text-error" : "text-success")}>
                                                        {volunteer.status.name === "Reprovado" ? "Reprovado" : "Aprovado"}</span>
                                                    )}
                                                </div>
                                            </td>
                                            <th>
                                                <Link to={`/detalhes-campanha/${volunteer.campaign.id}`}>
                                                <button className="btn btn-ghost btn-xs">detalhes</button>
                                                </Link>
                                            </th>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
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
                                <Link to={`/perfil/ONG/${id}`}>
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
            </div>
        </>

    )
}

