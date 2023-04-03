import {Header} from "../../components/HeaderCampanha";
import {CampanhaForm} from "../../components/FormCampanha";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {api} from "../../lib/axios";
import {EditCampanhaForm} from "../../components/EditarCampanha";

export default function EditarCampanha() {
    const [data, setData] = useState({})
    const routeParams = useParams();
    const id = routeParams.id

    console.log(data)

    useEffect(() => {
        const fetchData = async () => {
            const {data} = await api.get(`/campaign/${id}`);
            setData(data.campaign)

        }

        fetchData().catch(console.error);

    }, [])


    return (
        <div className={'p-4'}>
            <Header/>
            <h1 className={'text-4xl font-bold text-blueberry text-start pt-8'}>Editar Campanha</h1>
            <div className={'flex justify-center items-center gap-20'}>
                <EditCampanhaForm title={data?.title}/>
            </div>
        </div>
    )

}
