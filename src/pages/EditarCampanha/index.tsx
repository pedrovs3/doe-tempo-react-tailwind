import {Header} from "../../components/HeaderCampanha";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {api} from "../../lib/axios";
import {EditCampanhaForm} from "../../components/EditarCampanha";
import {decodeJwt} from "../../utils/jwtDecode";

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
    birthdate:           string;
    rg:                  string;
    id_type:             string;
    description:         string;
    banner_photo:        string;
    attached_link:       string;
    photo_url:           string;
    created_at:          string;
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
    created_at: string;
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
    created_at: string;
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

export interface Data {
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
    campaign_participants: CampaignParticipant[];
    campaign_address:      CampaignAddress;
}

export interface CampaignAddress {
    address: Address;
}

export interface Address {
    id:          string;
    postal_code: string;
    number:      string;
    complement:  null;
}

export interface CampaignCause {
    causes: Causes;
}

export interface Causes {
    id:          string;
    title:       string;
    description: string;
}

export interface CampaignParticipant {
    user: User;
}

export interface User {
    id:            string;
    name:          string;
    email:         string;
    password:      string;
    cpf:           string;
    id_gender:     string;
    birthdate:     string;
    rg:            string;
    id_type:       string;
    description:   string;
    banner_photo:  string;
    attached_link: string;
    photo_url:     string;
    created_at:    string;
}

export interface CampaignPhoto {
    photo_url: string;
}

export interface Ngo {
    id:          string;
    name:        string;
    email:       string;
    cnpj:        string;
    description: null;
    photo_url:   string;
}

export default function EditarCampanha() {
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
            description: null,
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
    const [user, setUser] = useState<UserResponse | null>(null);
    const decodeJWT = decodeJwt();
    const routeParams = useParams();
    const id = routeParams.id
    useEffect(() => {
        const fetchData = async () => {
            const {data} = await api.get(`/campaign/${id}`)
            setData(data)

            const userResponse = await api.get(`/ngo/${decodeJWT.id}`)
            const user = await userResponse.data
            setUser(user)
            console.log(user)

        }

        fetchData().catch(console.error);

    }, [])

    console.log(data)


    const photoURL = data?.campaign_photos && data.campaign_photos.length > 0 ? data.campaign_photos[0].photo_url : "";


    return (
        <div className={'p-4'}>
            <Header/>
            <h1 className={'text-4xl font-bold text-blueberry text-start pt-8'}>Editar Campanha</h1>
            <div className={'flex justify-center items-center gap-20'}>
                <EditCampanhaForm title={data?.title}
                                  description={data?.description}
                                  begin_date={data?.begin_date}
                                  end_date={data?.end_date}
                                  home_office={data?.home_office}
                                  causes={data?.campaign_causes}
                                  contribute={data?.how_to_contribute}
                                  prerequisites={data?.prerequisites}
                                  cep={data?.campaign_address?.address?.postal_code}
                                  photoURL={photoURL}
                                  idOng={user?.user.id}
                                  idCampaign={data?.id}
                                  numero={data?.campaign_address?.address?.number}
                                  complemento={data?.campaign_address?.address?.complement}

                />
            </div>
        </div>
    )

}
