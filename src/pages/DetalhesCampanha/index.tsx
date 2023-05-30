import {DetalhesBody} from "../../components/DetalhesBody";
import {useParams, useNavigate, Link} from "react-router-dom"
import React, {useEffect, useState} from "react";
import {api} from "../../lib/axios";
import Loading from "../../components/Loading/Index";
import {decodeJwt} from "../../utils/jwtDecode";
import {DetalhesBodyDois} from "../../components/DetalhesBodyDois";
import {Header} from "../../components/HeaderCampanha";

interface Jwt {
    id:    string;
    email: string;
    type:  string;
    iat:   number;
    exp:   number;
}


interface UserResponse {
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
    post_photo: PostPhoto[];
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
    id_user: null | string;
    id_ngo:  null | string;
    id_post: string;
}

interface PostPhoto {
    id:        string;
    id_post:   string;
    photo_url: string;
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


interface CampaignResponse {
    message: string;
    data:    Response;
}

interface Response {
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
        campaign_causes: [{ causes: { id: "", description: "", title: ""}}],
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
    const [user, setUser] = useState<UserResponse | null>(null);
    const [campaign, setCampaign] = useState<CampaignResponse>({ message: "", data: { id: "", id_campaign: "", id_user: "" } });
    const [loading, setLoading] = useState(true);
    const routeParams = useParams();
    const id = routeParams.id

    let decodeJWT;

    console.log(data)

    if (localStorage.getItem("token")) {
        decodeJWT = decodeJwt();
        const userId = decodeJWT.id;


        useEffect(() => {
            const fetchAPI = async () => {
                const userResponse = await api.get(`/user/${decodeJWT.id}`);
                setUser(userResponse.data);
            };

            fetchAPI().catch(console.error);
        }, []);

        useEffect(() => {
            const fetchData = async () => {
                const {data} = await api.get(`/campaign/${id}`);
                setData(data)
                setLoading(false)
            }


            fetchData().catch(console.error);

        }, [])


        const handleInscricao = async () => {
            const idUser = userId;
            const url = `/user/campaign/?idUser=${idUser}&idCampaign=${id}`;
            const campaignResponse = await api.post(url);
            console.log(url)
            setCampaign(campaignResponse.data);

        }

        const currentDate = new Date();
        const endDate = new Date(data?.end_date);
        const isExpired = currentDate > endDate


        return (
            <div>
                {loading ? (
                    <Loading/>
                ) : (
                    <div className={'p-20'}>
                        <Header/>
                        <div className={'flex w-full justify-between'}>
                            <DetalhesBody title={data?.title}
                                          description={data?.description}
                                          how_to_contribute={data?.how_to_contribute}
                                          descriptionOng={data?.ngo?.description}
                                          prerequisite={data?.prerequisites}
                                          nameOng={data?.ngo?.name}
                                          profileOng={data?.ngo?.photo_url}
                            />
                            <DetalhesBodyDois begin_date={data?.begin_date}
                                              end_date={data?.end_date}
                                // @ts-ignore
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
                                        <button className="btn btn-error no-animation text-neutral-50 text-lg cursor-auto">CAMPANHA
                                            ENCERRADA</button>
                                    ) : (
                                        decodeJWT ? (
                                            decodeJWT.type === 'ONG' ? (
                                                <button className="hidden"></button>
                                            ) : (
                                                <label onClick={handleInscricao} htmlFor="my-modal"
                                                       className="btn gap-2 w-48 rounded-full bg-maya_blue border-0 text-neutral-100 hover:bg-turquoise-700">QUERO
                                                    ME INSCREVER</label>
                                            )
                                        ) : (<button className="hidden"></button>)
                                    )
                                }
                            </div>
                            <input type="checkbox" id="my-modal" className="modal-toggle"/>
                            <div className="modal">
                                <div className="modal-box">
                                    <h3 className="font-bold text-lg">{campaign.message}</h3>
                                    <p className="py-4">Obrigado por se inscrever! Seu cadastro
                                        está com o status "Aguardando", se você for aprovado ou reprovado, poderá ver no seu Dashboard!</p>
                                    <div className="modal-action">
                                        <Link to={`/dashboard-user/${userId}`}>
                                            <label htmlFor="my-modal" className="btn"> Dashboard!</label>
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
}

