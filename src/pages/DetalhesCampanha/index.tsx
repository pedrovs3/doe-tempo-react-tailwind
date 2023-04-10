import {DetalhesBody} from "../../components/DetalhesBody";
import {useParams, useNavigate} from "react-router-dom"
import React, {useEffect, useState} from "react";
import {api} from "../../lib/axios";
import Loading from "../../components/Loading";
import {decodeJwt} from "../../utils/jwtDecode";
import {DetalhesBodyDois} from "../../components/DetalhesBodyDois";


export default function DetalhesCampanha() {
    const [data, setData] = useState({})
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
            setData(data.campaigns)
            setLoading(false)
        }


        fetchData().catch(console.error);

    }, [])

    const navigate = useNavigate();

    function handleInscricao() {
        const idUser = user?.user.id;
        const idCampaign = id;
        const url = `/user/campaign/?idUser=${idUser}&idCampaign=${idCampaign}`

        const campaign = api.post(`${url}`)


    }

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
                                       causes={data?.tbl_campaign_causes}
                                       home_office={data?.home_office}
                                       photoUrl={data?.tbl_campaign_photos[0].photo_url}
                                       postal_code={data?.tbl_campaign_address?.tbl_address?.postal_code}
                                       complement={data?.tbl_campaign_address?.tbl_address?.complement}
                                       number={data?.tbl_campaign_address?.tbl_address?.number}/>
                </div>
                <div className={"flex pt-5"}>
                    <label onClick={handleInscricao} for="my-modal"  className="btn gap-2 w-48 rounded-full bg-maya_blue border-0 text-neutral-900 hover:bg-turquoise-700">QUERO ME INSCREVER</label>
                    <input type="checkbox" id="my-modal" class="modal-toggle" />
                    <div class="modal">
                        <div class="modal-box">
                            <h3 class="font-bold text-lg">🎉 Sua inscrição foi feita!</h3>
                            <p class="py-4">Em breve você receberá mais informações sobre a campanha!</p>
                            <div class="modal-action">
                                <label for="my-modal" class="btn"> 👍 Entendido!</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
)

}
