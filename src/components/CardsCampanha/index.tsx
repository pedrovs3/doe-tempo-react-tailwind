import avatar from "../../assets/img/avatar-ong.png";
import {useEffect, useState} from "react";
import {api} from "../../lib/axios";

interface CardProps {
    id: Number,
    imgAvatar: string,
    title: string,
    description: string,

}

export function CardsCampanha(props : CardProps) {
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {

            const data = await api.get('/campaign/');
            setData(data.data.causes);
            console.log(setData)
        }

        fetchData().catch(console.error);

    }, [])

    return (
        <div className={'pt-5 h-full w-full flex flex-col justify-between'}>
            <div className="card w-96 bg-card-campanha">
                <div className="card-body">
                    <div className="avatar">
                        <div className="w-1/6 rounded-xl ring ring-primary ring-tufts-blue ring-offset-2">
                            <img src={avatar}/>
                        </div>
                            <h2 className={"text-blueberry font-bold text-2xl p-2.5"}>{props .title}</h2>
                    </div>
                    <h2 className={"pt-3 text-blueberry font-bold text-xl"}>Sobre:</h2>
                    <p className={"font-medium text-texto-campanha pb-3.5"}>
                        {props .description}
                        {/*Donec id aliquam leo.*/}
                        {/*Curabitur nec erat semper,*/}
                        {/*mollis metus at, volutpat enim.*/}
                        {/*Mauris at tortor ultricies,*/}
                        {/*auctor purus et, accumsan nunc.*/}
                        {/*Fusce dictum enim eget arcu tristique,*/}
                        {/*in laoreet ipsum tristique.*/}
                    </p>
                    <progress className="progress progress-info w-80" value="50" max="100"></progress>
                    <div className="flex justify-end">
                        <p className={"flex justify-end font-medium"}>70 Vagas Disponíveis</p>
                    </div>
                    <div className="card-actions justify-end pt-3">
                        <button className="btn w-32 rounded-full bg-blueberry border-0 text-white flex justify-center hover:bg-turquoise-700 hover:text-blueberry">Saiba Mais</button>
                    </div>
                </div>
            </div>
        </div>

    )
}
