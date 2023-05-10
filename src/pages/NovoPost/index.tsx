import React from "react";
import {decodeJwt} from "../../utils/jwtDecode";
import {NewPost} from "../../components/NewPost/Index";

interface Jwt {
    id:    string;
    email: string;
    type:  string;
    iat:   number;
    exp:   number;
}

export default function NovoPost() {
    const decodeJWT = decodeJwt();
    const jwt = decodeJWT as Jwt;

    return (<NewPost typeUser={jwt.type} idUser={jwt.id}/>)
}
