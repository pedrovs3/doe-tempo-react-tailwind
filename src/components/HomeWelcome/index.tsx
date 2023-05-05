
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {api} from "../../lib/axios";

export function HomeWelcome() {

    const [data, setData] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const {data} = await api.get(`/count`);
            setData(data.counts)
        }


        fetchData().catch(console.error);

    }, [])



    return (
            <div className={'flex flex-col p-20'}>
                <h1 className="text-5xl font-bold">Em busca de <span className="text-blueberry">ajudar</span> outras <br/>
                    pessoas de maneira <span className="text-blueberry">voluntária</span>?</h1>
                <p className="py-6">Embarque com a gente nessa jornada de fazer o mundo um lugar melhor!</p>
                <div className={'flex gap-5 pb-5'}>
                    <Link to="/signup">
                        <button className="btn w-60 rounded-full bg-blueberry border-0 text-white flex justify-center hover:bg-accent">Junte-se a nós</button>
                    </Link>
                    <Link to="/signup-ong">
                        <button className="btn w-60 rounded-full bg-blueberry border-0 text-white flex justify-center hover:bg-accent">Registre sua ONG</button>
                    </Link>
                </div>
                <div className="stats shadow">
                    <div className="stat place-items-center">
                        <div className="stat-value">{data.users}</div>
                        <div className="stat-desc">Voluntários cadastrados</div>
                    </div>
                    <div className="stat place-items-center">
                        <div className="stat-value text-blueberry">{data.campaigns}</div>
                        <div className="stat-desc">Campanhas cadastradas</div>
                    </div>
                    <div className="stat place-items-center">
                        <div className="stat-value">{data.ngos}</div>
                        <div className="stat-desc">Ong’s cadastradas</div>
                    </div>
                </div>
            </div>
    );
}
