import React, {useEffect, useState} from "react";
import Loading from "../../components/Loading/Index";
import logo from "../../assets/img/ampi-doe-tempo.svg";
import avatar from "../../assets/img/pedro-avatar.jpeg";
import {Article, Check, CheckCircle, EyeClosed, Handshake, List, Megaphone, PencilSimple, TrashSimple, UserCircle, X} from "phosphor-react";
import {api} from "../../lib/axios";
import { Link } from "react-router-dom";
import {useParams} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";

interface Ngo {
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

interface Campaign {
    title: string;
    id:    string;
}

interface NgoAddress {
    address: Address;
}

interface Address {
    id:          string;
    complement:  null;
    postal_code: string;
    number:      string;
}

interface PostNgo {
    post: Post;
}

interface Post {
    id:         string;
    content:    string;
    created_at: Date;
}

interface Type {
    name: string;
}



export default function DashboardOng() {
    const [loading, setLoading] = useState(false);
    const routeParams = useParams();
    const id = routeParams.id
    const [ngoData, setNgoData] = useState<Ngo>({
        id: "",
        photo_url: "",
        created_at: new Date(),
        attached_link: null,
        banner_photo: "",
        post_ngo: [],
        ngo_address: { address: { id: "", complement: null, postal_code: "", number: "" } },
        ngo_causes: [],
        email: "",
        name: "",
        password: "",
        foundation_date: new Date(),
        type: { name: "" },
        cnpj: "",
        campaign: [],
        description: null,
        following: [],
        ngo_phone: [],
    });


    useEffect(() => {
        const fetchData = async () => {

            const response = await api.get(`/ngo/${id}`);
            setNgoData(response.data);

        }

        fetchData().catch(console.error);

    }, [])

    console.log(ngoData)

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
                                <div className="stats shadow">
                                    <div className="stat">
                                        <div className="stat-figure text-blueberry">
                                        <span className="relative flex h-3 w-3">
                                            <span
                                                className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                            <span
                                                className="animate-ping relative inline-flex rounded-full h-3 w-3 bg-blueberry"></span>
                                        </span>
                                        </div>
                                        <div className="stat-title">Campanhas Ativas</div>
                                        <div className="stat-value">31K</div>
                                        <div className="stat-desc">Jan 1st - Feb 1st</div>
                                    </div>
                                    <div className="stat">
                                        <div className="stat-figure text-blueberry">
                                            <Handshake size={32}/>
                                        </div>
                                        <div className="stat-title">Voluntários Engajados</div>
                                        <div className="stat-value">4,200</div>
                                        <div className="stat-desc">↗︎ 400 (22%)</div>
                                    </div>

                                    <div className="stat">
                                        <div className="stat-figure text-blueberry">
                                            <CheckCircle size={32}/>
                                        </div>
                                        <div className="stat-title">Campanhas concluídas</div>
                                        <div className="stat-value">1,200</div>
                                        <div className="stat-desc">↘︎ 90 (14%)</div>
                                    </div>
                                </div>
                            </div>


                            <div
                                className="w-full p-5 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                                <div className="w-full p-5">
                                    <h1 className="text-4xl font-medium text-neutral-600 pb-5">Suas Campanhas</h1>
                                    <div className={"pb-5"}>
                                    <Link to={"/nova-campanha/"}>
                                    <button className="btn gap-2 w-48 rounded-full bg-blueberry text-base-100 border-0 text-neutral-900 hover:bg-turquoise-700">
                                        <Megaphone size={22} color={"white"} />
                                        Nova Campanha
                                    </button>
                                    </Link>
                                    </div>

                                    <div className="grid grid-cols-4 gap-4">
                                        {ngoData.campaign.map((campanha) => (
                                            <div className="card w-96 bg-base-100 shadow-xl" key={campanha.id}>
                                                <div className="dropdown absolute top-0 right-0 p-2">
                                                    <label tabIndex={0}
                                                           className="btn-unstyled m-1 text-neutral-200 text-4xl">...</label>
                                                    <ul tabIndex={0}
                                                        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                                        <Link to={`/editar-campanha/${campanha.id}`}>
                                                            <li><a className={"text-xl font-semibold active:bg-neutral-300"}><PencilSimple
                                                                size={32}/> Editar</a></li>
                                                        </Link>
                                                        <li>
                                                            <button
                                                                className={"text-xl font-semibold active:bg-neutral-300"}
                                                                onClick={() => handleDeleteCampaign(campanha.id)}>
                                                                <TrashSimple size={32} color={"red"}/>Excluir
                                                            </button>
                                                        </li>
                                                        <li><a className={"text-xl font-semibold active:bg-neutral-300"}><EyeClosed size={32}/> Encerrar</a></li>
                                                    </ul>
                                                </div>
                                                <figure>
                                                    <img className={"rounded-t-lg"}
                                                    src={"https://firebasestorage.googleapis.com/v0/b/doe-tempo-50ccb.appspot.com/o/images%2FFXMBvDUWIAI4b6y.jpeg?alt=media&token=7710cab2-27be-446c-980b-03ebe1e58bd7"}
                                                    alt="Shoes"/></figure>
                                                <div className="card-body">
                                                    <h2 className="card-title">{campanha.title}</h2>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="overflow-x-auto w-full p-5">
                                <h1 className={"text-4xl font-medium text-neutral-600 pb-5"}>Solicitações de
                                    Voluntários</h1>
                                <table className="table w-full">
                                    {/* head */}
                                    <thead>
                                    <tr>
                                        <th>
                                            <label>
                                                <input type="checkbox" className="checkbox"/>
                                            </label>
                                        </th>
                                        <th>Nome</th>
                                        <th>Campanha</th>
                                        <th>Status de Decisão</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {/* row 1 */}
                                    <tr>
                                        <th>
                                            <label>
                                                <input type="checkbox" className="checkbox"/>
                                            </label>
                                        </th>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={avatar} alt="Avatar do voluntário"/>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">Pedro Henrique</div>
                                                    <div className="text-sm opacity-50">Osasco, SP</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            Voluntários para uma escola
                                            <br/>
                                            <span className="badge badge-ghost badge-sm">10/03/2023 | 20/05/2023</span>
                                        </td>
                                        <td>
                                            <div className={"flex gap-5"}>
                                                <button className="btn btn-circle btn-outline btn-accent">
                                                    <span className="hover:text-little-white"><Check size={32}/></span>
                                                </button>
                                                <label htmlFor="my-modal-5" className="btn btn-circle btn-outline btn-error">
                                                    <span className="hover:text-little-white"><X size={32}/></span>
                                                </label>
                                                <input type="checkbox" id="my-modal-5" className="modal-toggle" />
                                                <div className="modal">
                                                    <div className="modal-box w-11/12 max-w-5xl">
                                                        <label htmlFor="my-modal-5" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                                                        <h3 className="font-bold text-2xl">❌ Recusar</h3>
                                                        <p className="py-4 text-xl">
                                                            Sentimos muito por esse voluntário não se encaixar na sua campanha.
                                                            <br/>
                                                            Existe algum motivo específico para ele não ser aprovado?
                                                        </p>
                                                        <input type="text" placeholder="Motivo" className="input input-bordered input-error w-full" />
                                                        <div className="modal-action">
                                                            <label htmlFor="my-modal-5" className="btn btn-error text-neutral-50">Recusar</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <th>
                                            <button className="btn btn-ghost btn-xs">detalhes</button>
                                        </th>
                                    </tr>
                                    </tbody>
                                    {/* foot */}
                                    <tfoot>
                                    <tr>
                                        <th></th>
                                        <th>Nome</th>
                                        <th>Campanha</th>
                                        <th>Status de Decisão</th>
                                        <th></th>
                                    </tr>
                                    </tfoot>

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

                )}
            </div>
        </>

    )
}

