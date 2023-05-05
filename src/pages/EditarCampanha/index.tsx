import {Header} from "../../components/HeaderCampanha";
import {CampanhaForm} from "../../components/FormCampanha";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {api} from "../../lib/axios";
import {EditCampanhaForm} from "../../components/EditarCampanha";
import {decodeJwt} from "../../utils/jwtDecode";

export default function EditarCampanha() {
    const [data, setData] = useState({
        campaign_photos: [{ photoURL: String }]
    })
    const [user, setUser ] = useState<object>();
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

        }

        fetchData().catch(console.error);

    }, [])

    console.log(data)


    const photoURL = data?.campaign_photos.map(photo => ({photoURL: photo.photo_url}))[0].photoURL

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
                                  idOng={user?.id}
                                  idCampaign={data?.id}
                                  numero={data?.campaign_address?.address?.number}
                                  complemento={data?.campaign_address?.address?.complement}

                />
            </div>
        </div>
    )

}
