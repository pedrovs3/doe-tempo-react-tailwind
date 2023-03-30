import {DetalhesBody} from "../../components/DetalhesBody";
import {DetalhesBodyDois} from "../../components/DetalhesBodyDois";
import { useParams } from "react-router-dom"
import {useEffect, useState} from "react";
import {api} from "../../lib/axios";


export default function DetalhesCampanha() {
    const [data, setData] = useState([])
    const routeParams = useParams();
    const id = routeParams.id

    console.log(id)

    useEffect(() => {
        const fetchData = async () => {

            const data = await api.get(`/campaign/{$id}`);
            setData(data.data)
            console.log(data)
        }

        fetchData().catch(console.error);

    }, [])


    return (
        <div className={'p-20'}>
            <div className={'flex w-full justify-between'}>
                <DetalhesBody/>
                <DetalhesBodyDois />
            </div>r
        </div>
    )

}
