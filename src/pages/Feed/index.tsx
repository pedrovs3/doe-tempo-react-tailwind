import React, {useEffect, useState} from "react";
import {HeaderPosts} from "../../components/HeaderPosts";
import WaveDown from "../../assets/img/Wave_down_turquoise.svg";
import {NewPost} from "../../components/NewPost";
import {decodeJwt} from "../../utils/jwtDecode";
import {api} from "../../lib/axios";

export default function Feed() {

    const decodeJWT = decodeJwt();
    const userType = decodeJWT.type;
    const userId = decodeJWT.id;
    const [user, setUser ] = useState<object>();

    useEffect(() => {
        const fetchData = async () => {
            let endpoint = "";
            if (userType === "ONG") {
                endpoint = `/ngo/${userId}`;
            } else if (userType === "USER") {
                endpoint = `/user/${userId}`;
            }

            const response = await api.get(endpoint);
            const user = response.data;
            setUser(user);
        };

        fetchData();
    }, [userId, userType]);
    

    return (
                <div className={''}>
                    <HeaderPosts id={user?.user?.id} photoURL={user?.user?.photoURL}/>
                    <img className={'w-full'} src={WaveDown}/>
                    <div className={'flex justify-center items-center'}>
                        <NewPost typeUser={decodeJWT?.type} idUser={decodeJWT?.id}/>
                    </div>

                </div>
    )
}

