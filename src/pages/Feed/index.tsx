import React, {useEffect, useState} from "react";
import Loading from "../../components/Loading";
import {HeaderPosts} from "../../components/HeaderPosts";
import WaveDown from "../../assets/img/Wave_down_turquoise.svg";

export default function Feed() {



    return (
                <div className={''}>
                    <HeaderPosts/>
                    <img className={'w-full'} src={WaveDown}/>

                </div>
    )
}

