import {DetalhesBody} from "../../components/DetalhesBody";
import {DetalhesBodyDois} from "../../components/DetalhesBodyDois";
import { useParams } from "react-router-dom"
import React, {useEffect, useState} from "react";
import {api} from "../../lib/axios";
import Loading from "../../components/Loading";
import {Header} from "../../components/HeaderCampanha";
import {CampanhaForm} from "../../components/FormCampanha";


export default function DetalhesCampanha() {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true);
    const routeParams = useParams();
    const id = routeParams.id

    console.log(id)

    useEffect(() => {
        const fetchData = async () => {
            const {data} = await api.get(`/campaign/${id}`);
            setData(data.campaign)
            setLoading(false)

        }

        fetchData().catch(console.error);

    }, [])


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
                                       photoUrl={data?.tbl_campaign_photos[0].photo_url}/>
                </div>
            </div>
        )}
    </div>
)

}