import React, {useEffect, useState} from "react";
import {decodeJwt} from "../../utils/jwtDecode";
import {api} from "../../lib/axios";
import Loading from "../../components/Loading";
import {NewPost} from "../../components/NewPost";

export default function NovoPost() {
    const decodeJWT = decodeJwt();
    console.log(decodeJWT)

    //
    // useEffect(() => {
    //
    //     const fetchAPI = async () => {
    //         const userResponse = await api.get(`/user/${decodeJWT.id}`)
    //         const user = await userResponse.data
    //         setUser(user)
    //
    //     }
    //
    //     fetchAPI().catch(console.error)
    // }, [])
    //
    // console.log(user)

    return (<NewPost typeUser={decodeJWT?.type} idUser={decodeJWT?.id}/>)
}
