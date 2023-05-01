import {DetalhesBody} from "../../components/DetalhesBody";
import {useParams, useNavigate, Link} from "react-router-dom"
import React, {useEffect, useState} from "react";
import {api} from "../../lib/axios";
import Loading from "../../components/Loading";
import {decodeJwt} from "../../utils/jwtDecode";
import {DetalhesBodyDois} from "../../components/DetalhesBodyDois";


export default function DetalhesCampanha() {
    const [data, setData] = useState({})
    const [campaign, setCampaign] = useState({})
    const [loading, setLoading] = useState(true);
    const routeParams = useParams();
    const id = routeParams.id
    const [user, setUser ] = useState<object>();
    const decodeJWT = decodeJwt();
    const userId = decodeJWT.id;



    useEffect(() => {

        const fetchAPI = async () => {
            const userResponse = await api.get(`/user/${decodeJWT.id}`)
            const user = await userResponse.data
            setUser(user)

        }

        fetchAPI().catch(console.error)
    }, [])


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
        const campaign = await api.post(`${url}`)
        setCampaign(campaign.data)

    }
    const fetchData = async () => {
        const {data} = await api.get(`/count`);
        setData(data.counts)
    }

    console.log(data)

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
                                  descriptionOng={data?.tbl_ngo?.description}
                                  prerequisite={data?.prerequisites}
                                  nameOng={data?.tbl_ngo?.name}
                                  profileOng={data?.tbl_ngo?.photoURL}/>
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
                        {decodeJWT.type === 'ONG' ? (
                            <button className="hidden"></button>
                        ) : (
                            <label onClick={handleInscricao} htmlFor="my-modal"
                                   className="btn gap-2 w-48 rounded-full bg-maya_blue border-0 text-neutral-900 hover:bg-turquoise-700">QUERO
                                ME INSCREVER</label>
                        )}
                    </div>
                    <input type="checkbox" id="my-modal" class="modal-toggle" />
                    <div class="modal">
                        <div class="modal-box">
                            <h3 class="font-bold text-lg">{campaign.message}</h3>
                            <p class="py-4">Obrigado por se inscrever! Seu cadastro foi {campaign.message}</p>
                            <div class="modal-action">
                                <Link to={'/'}>
                                <label for="my-modal" class="btn"> 👍 Entendido!</label>
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

