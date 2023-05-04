import {Header} from "../../components/HeaderCampanha";
import {CampanhaForm} from "../../components/FormCampanha";
import {decodeJwt} from "../../utils/jwtDecode";
import {api} from "../../lib/axios";
import React, {FormEvent, useEffect, useState} from "react";
import {apiCep} from "../../api/consulta_cep";
import Loading from "../../components/Loading";




export default function NovaCampanha() {
    const [user, setUser ] = useState<object>();
    const decodeJWT = decodeJwt();
    const [cep, setCep] = useState('');
    const userId = decodeJWT.id;
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const fetchAPI = async () => {
            const userResponse = await api.get(`/ngo/${decodeJWT.id}`)
            const user = await userResponse.data
            setUser(user)

            const consultarCep = await apiCep.get(`/${user?.ngo_address.address.postal_code}/json/`)
            const cep = await consultarCep.data
            setCep(cep)
            setLoading(false)

        }

        fetchAPI().catch(console.error)
    }, [])


    return (
        <div>
            {loading ? (
                <Loading />
            ) : (
        <div className={'p-4'}>
            <Header/>
            <h1 className={'text-4xl font-bold text-blueberry text-start pt-8'}>Nova Campanha</h1>
            <div className={'flex justify-center items-center gap-20'}>
                <CampanhaForm idOng={userId}
                              logradouro={cep?.logradouro}
                              numero={user?.ngo_address.address.number}
                              localidade={cep?.localidade} uf={cep?.uf}
                              complemento={user?.ngo_address.address.complement}
                              cep={user?.ngo_address.address.postal_code}/>
            </div>
        </div>
            )}
        </div>
    )

}
