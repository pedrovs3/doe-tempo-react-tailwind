import {CardsCampanha} from "../../components/CardsCampanha";
import {CardsBar} from "../../components/CardsBar";
import React, {useEffect, useState} from "react";
import {api} from "../../lib/axios";

export default function CampanhasList() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const {data} = await api.get('/campaign/');
            console.log(data.campaigns)

            setData(data.campaigns);
        }
        console.log(data)

        fetchData().catch(console.error);

    },[])


    return (
        <div className={'p-4'}>
            <h1 className={'text-4xl font-bold text-blueberry text-start pt-8'}>Oportunidades</h1>
            <CardsBar/>
            <div className={'flex'}>
                {
                    data.map((item) => (
                        <CardsCampanha id={item.id}  title={item.title}  description={item.description}/>
                    ))}

            </div>
        </div>
    )

}
