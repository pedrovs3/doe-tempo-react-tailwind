import React, {useEffect, useState} from "react";
import Loading from "../../components/Loading";
import {HeaderPosts} from "../../components/HeaderPosts";
import WaveDown from "../../assets/img/Wave_down_turquoise.svg";
import {NewPost} from "../../components/NewPost";
import NovoPost from "../NovoPost";
import {decodeJwt} from "../../utils/jwtDecode";
import {FeedPosts} from "../../components/FeedPosts";

export default function Feed() {

    const decodeJWT = decodeJwt();
    console.log(decodeJWT)

    return (
                <div className={''}>
                    <HeaderPosts/>
                    <img className={'w-full'} src={WaveDown}/>
                    <div className={'flex justify-center items-center'}>
                        <NewPost typeUser={decodeJWT?.type} idUser={decodeJWT?.id}/>
                    </div>

                </div>
    )
}

