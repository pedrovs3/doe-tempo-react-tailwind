import React, {useEffect, useState} from "react";
import {decodeJwt} from "../../utils/jwtDecode";
import {api} from "../../lib/axios";
import Loading from "../../components/Loading";
import {NewPost} from "../../components/NewPost";

export default function NovoPost() {
    const [loading, setLoading] = useState(true);
    const [user, setUser ] = useState<object>();
    const decodeJWT = decodeJwt();


    useEffect(() => {

        const fetchAPI = async () => {
            const userResponse = await api.get(`/ngo/${decodeJWT.id}`)
            const user = await userResponse.data
            setUser(user)

        }

        fetchAPI().catch(console.error)
    }, [])

console.log(user)

    return (<div className={'p-20'}>
                <NewPost/>
                </div>
    )
}
