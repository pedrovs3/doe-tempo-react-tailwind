import {Header} from "../../components/HeaderCampanha";
import {Form} from "../../components/Form";
import {CampanhaForm} from "../../components/FormCampanha";
import {CampanhaFormDois} from "../../components/FormCampanhaDois";
import {decodeJwt} from "../../utils/jwtDecode";
import {api} from "../../lib/axios";
import {FormEvent, useEffect, useState} from "react";
import {apiCep} from "../../api/consulta_cep";

export default function NovaCampanha() {
    const [user, setUser ] = useState<object>();
    const decodeJWT = decodeJwt();
    const [cep, setCep] = useState('');
    const userId = decodeJWT.id;


    useEffect(() => {

        const fetchAPI = async () => {
            const userResponse = await api.get(`/ngo/${decodeJWT.id}`)
            const user = await userResponse.data
            setUser(user)

        }

        fetchAPI().catch(console.error)
    }, [])

    useEffect(() => {

        const fetchAPI = async () => {
            const userResponse = await api.get(`/ngo/${decodeJWT.id}`)
            const user = await userResponse.data
            setUser(user)

            const consultarCep = await apiCep.get(`/${user?.tbl_ngo_address.tbl_address.postal_code}/json/`)
            const cep = await consultarCep.data
            setCep(cep)

        }

        fetchAPI().catch(console.error)
    }, [])



    return (
        <div className={'p-4'}>
            <Header/>
            <form name={"campanha"} className={'pr-6 flex flex-col justify-between pt-2'}>
            <h1 className={'text-4xl font-bold text-blueberry text-start pt-8'}>Nova Campanha</h1>
            <div className={'flex justify-center items-center gap-20'}>
                <CampanhaForm logradouro={cep?.logradouro} numero={user?.tbl_ngo_address.tbl_address.number} localidade={cep?.localidade} uf={cep?.uf} complemento={user?.tbl_ngo_address.tbl_address.complement}/>
                <div className="divider divider-horizontal"></div>
                <CampanhaFormDois/>
            </div>
            </form>
        </div>
    )

}
