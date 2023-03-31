import {CardsCampanha} from "../../components/CardsCampanha";
import {CardsBar} from "../../components/CardsBar";
import React, {useEffect, useState} from "react";
import {api} from "../../lib/axios";
import Loading from "../../components/Loading";


export default function CampanhasList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            const {data} = await api.get('/campaign/');
            console.log(data.campaigns)

            setData(data.campaigns);
            setLoading(false)
        }
        console.log(data)

        fetchData().catch(console.error);

    },[])


return (
    <div>
        {loading ? (
            <Loading />
        ) : (
            <div className={'p-4'}>
                <h1 className={'text-4xl font-bold text-blueberry text-start pt-8'}>Oportunidades</h1>
                <CardsBar/>
                <div className={'grid grid-cols-4 gap-4'}>
                    {
                        data.map((item) => (
                            <CardsCampanha key={item.id}  id={item.id}  title={item.title}  description={item.description}/>
                        ))}

                </div>
            </div>
        )}
    </div>
    )
}
