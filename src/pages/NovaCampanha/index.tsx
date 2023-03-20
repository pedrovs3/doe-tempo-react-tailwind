import {Header} from "../../components/HeaderCampanha";
import {Form} from "../../components/Form";
import {CampanhaForm} from "../../components/FormCampanha";
import {CampanhaFormDois} from "../../components/FormCampanhaDois";
import {decodeJwt} from "../../utils/jwtDecode";
import {api} from "../../lib/axios";
import {useEffect, useState} from "react";
import {set} from "react-hook-form";

export default function NovaCampanha() {
    const [user, setUser ] = useState<object>();
    const decodeJWT = decodeJwt();

    useEffect(() => {

        const fetchAPI = async () => {
            const userResponse = await api.get(`/ngo/${decodeJWT.id}`)
            console.log(userResponse);
        }

        fetchAPI().catch(console.error)
    }, [])

    // @ts-ignore
    console.log(decodeJWT.id)
    return (
        <div className={'p-4'}>
            <Header/>
            <h1 className={'text-4xl font-bold text-blueberry text-start pt-8'}>Nova Campanha</h1>
            <div className={'flex justify-center items-center gap-20'}>
                <CampanhaForm/>
                <div className="divider divider-horizontal"></div>
                <CampanhaFormDois/>
            </div>
        </div>
    )

}
