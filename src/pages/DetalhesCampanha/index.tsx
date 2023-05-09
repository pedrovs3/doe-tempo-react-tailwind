import {DetalhesBody} from "../../components/DetalhesBody";
import {useParams, useNavigate, Link} from "react-router-dom"
import React, {useEffect, useState} from "react";
import {api} from "../../lib/axios";
import Loading from "../../components/Loading";
import {decodeJwt} from "../../utils/jwtDecode";
import {DetalhesBodyDois} from "../../components/DetalhesBodyDois";

export interface CampaignResponse {
    message: string;
    data:    Response;
}

export interface Response {
    id:          string;
    id_campaign: string;
    id_user:     string;
}

interface Data {
    id:                    string;
    title:                 string;
    description:           string;
    how_to_contribute:     string;
    prerequisites:         string;
    home_office:           boolean;
    begin_date:            string;
    end_date:              string;
    ngo:                   Ngo;
    campaign_photos:       CampaignPhoto[];
    campaign_causes:       CampaignCause[];
    campaign_participants: any[];
    campaign_address:      CampaignAddress;
}

interface CampaignAddress {
    address: Address;
}

interface Address {
    id:          string;
    postal_code: string;
    number:      string;
    complement:  null;
}

interface CampaignCause {
    causes: Causes;
}

interface Causes {
    id:          string;
    title:       string;
    description: string;
}

interface CampaignPhoto {
    photo_url: string;
}

interface Ngo {
    id:          string;
    name:        string;
    email:       string;
    cnpj:        string;
    description: string;
    photo_url:   string;
}


export default function DetalhesCampanha() {
    const [data, setData] = useState<Data>({
        id: "",
        title: "",
        description: "",
        how_to_contribute: "",
        prerequisites: "",
        home_office: false,
        begin_date: "",
        end_date: "",
        ngo: {
            id: "",
            name: "",
            email: "",
            cnpj: "",
            description: "",
            photo_url: ""
        },
        campaign_photos: [],
        campaign_causes: [],
        campaign_participants: [],
        campaign_address: {
            address: {
                id: "",
                postal_code: "",
                number: "",
                complement: null
            }
        }
    });

    const [campaign, setCampaign] = useState({})
    const [loading, setLoading] = useState(true);
    const routeParams = useParams();
    const id = routeParams.id
    const [user, setUser] = useState([]);
    let decodeJWT;

    console.log(data)

    if (localStorage.getItem("token")) {
        decodeJWT = decodeJwt();
        const userId = decodeJWT.id;



        useEffect(() => {

            const fetchAPI = async () => {
                const userResponse = await api.get(`/user/${decodeJWT.id}`)
                const user = await userResponse.data
                setUser(user)

            }

            fetchAPI().catch(console.error)
        }, [])
    }



    useEffect(() => {
        const fetchData = async () => {
            const {data} = await api.get(`/campaign/${id}`);
            setData(data)
            setLoading(false)
        }


        fetchData().catch(console.error);

    }, [])

    const navigate = useNavigate();

    const handleInscricao = async () => {
        const idUser = user?.user.id;
        const idCampaign = id;
        const url = `/user/campaign/?idUser=${idUser}&idCampaign=${idCampaign}`
        const campaign = await api.post<CampaignResponse>(url);
        setCampaign(campaign.data.data);
        console.log(campaign)

    }
    const fetchData = async () => {
        const {data} = await api.get(`/count`);
        setData(data.counts)
    }



    const currentDate = new Date();
    const endDate = new Date(data?.end_date);
    const isExpired = currentDate > endDate

    console.log (currentDate)
    console.log(endDate)

return (
    <div>
        {loading ? (
            <Loading />
        ) : (
            <div className={'p-20'}>
                <div className={'flex w-full justify-between'}>
                    <DetalhesBody title={data?.title}
                                  description={data?.description}
                                  how_to_contribute={data?.how_to_contribute}
                                  descriptionOng={data?.ngo?.description}
                                  prerequisite={data?.prerequisites}
                                  nameOng={data?.ngo?.name}
                                  profileOng={data?.ngo?.photo_url}
                                 />
                    <DetalhesBodyDois  begin_date={data?.begin_date}
                                       end_date={data?.end_date}
                                       causes={data?.campaign_causes}
                                       home_office={data?.home_office}
                                       photoUrl={data?.campaign_photos[0].photo_url}
                                       postal_code={data?.campaign_address?.address?.postal_code}
                                       complement={data?.campaign_address?.address?.complement}
                                       number={data?.campaign_address?.address?.number}/>
                </div>
                <div className={"flex pt-5"}>
                    <div>
                        {
                            isExpired ? (
                                <button className="btn btn-error no-animation text-neutral-50 text-lg ">CAMPANHA ENCERRADA</button>
                            ) : (
                                decodeJWT ? (
                                    decodeJWT.type === 'ONG' ? (
                                        <button className="hidden"></button>
                                    ) : (
                                        <label onClick={handleInscricao} htmlFor="my-modal"
                                               className="btn gap-2 w-48 rounded-full bg-maya_blue border-0 text-neutral-900 hover:bg-turquoise-700">QUERO ME INSCREVER</label>
                                    )
                                ) : (<button className="hidden"></button>)
                            )
                        }
                    </div>
                    <input type="checkbox" id="my-modal" className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">{campaign.message}</h3>
                            <p className="py-4">Obrigado por se inscrever! Seu cadastro foi {campaign.message}</p>
                            <div className="modal-action">
                                <Link to={'/campanhas'}>
                                <label htmlFor="my-modal" className="btn"> 👍 Entendido!</label>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
)
}

