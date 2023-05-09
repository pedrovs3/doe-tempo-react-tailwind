import React, {useEffect, useState} from "react";
import {HeaderPosts} from "../../components/HeaderPosts";
import {decodeJwt} from "../../utils/jwtDecode";
import {api} from "../../lib/axios";
import wave from "../../assets/img/wave_white.svg";
import {CardPerfil} from "../../components/CardPerfil";
import {useParams} from "react-router-dom";
import NovoPost from "../NovoPost";
import {FeedPosts} from "../../components/FeedPosts";
import 'react-toastify/dist/ReactToastify.css';
import {CardHistorico} from "../../components/CardHistorico";

export default function Perfil() {
    const routeParams = useParams();
    const [data, setData] = useState({ post_user: [], post_ngo: [] });
    const id = routeParams.id
    const typeUser = routeParams.type
    const decodeJWT = decodeJwt();
    const userType = decodeJWT.type;
    const userId = decodeJWT.id;
    const [user, setUser ] = useState<object>();

    console.log(userId)
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

    console.log(user)

    return (
        <div className={'bg-little-white'}>
            <div className={"navbar absolute top-0 left-0 w-full bg-transparent"}>
            <HeaderPosts id={user?.user?.id || user?.id} photoURL={user?.user?.photo_url || user?.photo_url}/>
            </div>
            <img src={data?.banner_photo} alt="Header image" className="object-cover w-full h-64 md:h-96 lg:h-128" />
            <img src={wave} className={'relative -mt-12 w-full'}/>
            <div className="flex flex-row">
                <div className="w-full sm:w-1/3">
                    {
                        typeUser === 'USER' ? (
                            <CardPerfil id={data?.id} name={data?.name} photoURL={data?.photo_url} postal_code={data?.user_address?.address?.postal_code}  attached_link={data?.attached_link} description={data?.description}/>
                        ) : (
                            <CardPerfil id={data?.id} name={data?.name} photoURL={data?.photo_url} postal_code={data?.ngo_address?.address?.postal_code}  attached_link={data?.attached_link} description={data?.description}/>
                        )
                    }
                </div>
                    {
                        id === userId ?
                        <NovoPost /> : (
                            <div className={'flex flex-col gap-5'}>
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
                                                       comments={item.post.comment}
                                                       count_comments={item._count?.comments}
                                                       count_likes={item._count?.post_likes}/>

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
                                                       comments={item.post.comment}
                                                    />
                                        )
                                    ))

                                }
                            </div>
                            )
                    }
                    <CardHistorico/>
            </div>
        </div>
    )
}

