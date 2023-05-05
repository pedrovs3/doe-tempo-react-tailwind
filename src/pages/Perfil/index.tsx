import React, {useEffect, useState} from "react";
import {HeaderPosts} from "../../components/HeaderPosts";
import {decodeJwt} from "../../utils/jwtDecode";
import {api} from "../../lib/axios";
import header from "../../assets/img/header-profile.png";
import wave from "../../assets/img/wave_white.svg";
import {CardPerfil} from "../../components/CardPerfil";
import {useParams} from "react-router-dom";
import NovoPost from "../NovoPost";
import Feed from "../Feed";
import {FeedPosts} from "../../components/FeedPosts";




export default function Perfil() {
    const routeParams = useParams();
    const [data, setData] = useState({})
    const id = routeParams.id
    const typeUser = routeParams.type

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

    useEffect(() => {
        const fetchData = async () => {
            if (typeUser === 'USER') {
                const {data} = await api.get(`/user/${id}`);
                setData(data.user)
            } else {
                const {data} = await api.get(`/ngo/${id}`)
                setData(data)
            }
            console.log(data?.post_user[0].created_at)

        }


        fetchData().catch(console.error);

    }, [id])

    return (
        <div className={'bg-little-white'}>
            <div className={"navbar absolute top-0 left-0 w-full bg-transparent"}>
            <HeaderPosts id={user?.user?.id || user?.id} photoURL={user?.user?.photo_url || user?.photo_url}/>
            </div>
            <img src={data?.banner_photo} alt="Header image" className="object-cover w-full h-64 md:h-96 lg:h-128" />
            <img src={wave} className={'relative -mt-8 w-full'}/>
            <div className="flex flex-row">
                <div className="w-1/3 px-10">
                    {
                        typeUser === 'USER' ? (
                            <CardPerfil id={data?.id} name={data?.name} photoURL={data?.photo_url} postal_code={data?.user_address?.address?.postal_code}  attached_link={data?.attached_link} description={data?.description}/>
                        ) : (
                            <CardPerfil id={data?.id} name={data?.name} photoURL={data?.photo_url} postal_code={data?.ngo_address?.address?.postal_code}  attached_link={data?.attached_link} description={data?.description}/>
                        )
                    }
                </div>
                <div className="w-1/3 justify-center items-center">
                    {
                        id === userId ?
                        <NovoPost /> : (
                            <div className={'flex justify-center items-center w-full'}>
                                {
                                    data?.post_user ? (
                                    data?.post_user.map((item) => (
                                            <FeedPosts id={item.post.id}
                                                       idUser={id}
                                                       type={decodeJwt().type}
                                                       nameUser={data?.name}
                                                       photoUser={data?.photo_url}
                                                       content={item.post.content}
                                                       created={item.post.created_at}
                                                       images={item.post.post_photo}
                                                       comments={item.post.comment}/>

                                ))) : (
                                        data?.post_ngo.map((item) => (
                                            <FeedPosts id={item.post.id}
                                                       idUser={id}
                                                       type={decodeJwt().type}
                                                       nameUser={data?.name}
                                                       photoUser={data?.photo_url}
                                                       content={item.post.content}
                                                       created={item.post.created_at}
                                                       images={item.post.post_photo}
                                                       comments={item.post.comment}/>

                                        )
                                    ))
                                }
                            </div>
                            )
                            // <FeedPorUsuario id={id}}></FeedPorUsuario>
                    }

                </div>
            </div>


        </div>
    )
}

