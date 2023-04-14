import React, {useEffect, useState} from "react";
import {decodeJwt} from "../../utils/jwtDecode";
import {api} from "../../lib/axios";
import Loading from "../../components/Loading";
import {NewPost} from "../../components/NewPost";

export default function NovoPost() {
    const decodeJWT = decodeJwt();
    console.log(decodeJWT)

    return (<NewPost typeUser={decodeJWT?.type} idUser={decodeJWT?.id}/>)
}
