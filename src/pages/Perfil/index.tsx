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

interface Jwt {
    id:    string;
    email: string;
    type:  string;
    iat:   number;
    exp:   number;
}



export default function Perfil() {
    const routeParams = useParams();
    const [data, setData] = useState<any>()
    const id = routeParams.id
    const typeUser = routeParams.type
    const decodeJWT = decodeJwt();
    const jwt = decodeJWT as Jwt;
    const userType = jwt.type;
    const userId = jwt.id;
    const [user, setUser ] = useState<object>();

    useEffect(() => {
        const fetchData = async () => {
            if (typeUser === 'USER') {
                const data = await api.get(`/user/${id}`);
                setData(data.data.user)
            } else {
                const { data } = await api.get(`/ngo/${id}`);
                setData(data)
            }

        }


        fetchData().catch(console.error);

    }, [typeUser])

    useEffect(() => {
        const fetchData = async () => {
            if (userType === 'USER') {
                const {data} = await api.get(`/user/${userId}`);
                setUser(data.user)
            } else {
                const { data } = await api.get(`/ngo/${userId}`);
                setUser(data)
            }
        }
        fetchData().catch(console.error);

    }, [id])

    console.log(user)

    return (
        <div className={'bg-little-white'}>
            <div className={"navbar absolute top-0 left-0 w-full bg-transparent"}>
                {/*// @ts-ignore*/}
                <HeaderPosts id={jwt.id} photoURL={user?.user?.photo_url || user?.photo_url}/>
            </div>
            {/*// @ts-ignore*/}
            <img src={data?.banner_photo} alt="Header image" className="object-cover w-full h-64 md:h-96 lg:h-128" />
            <img src={wave} className={'relative -mt-12 w-full'}/>
            <div className="flex flex-row">
                <div className="">
                    {
                        typeUser === 'USER' ? (
                               // @ts-ignore
                            <CardPerfil
                                id={data?.id}
                                name={data?.name}
                                photoURL={data?.photo_url}
                                postal_code={data?.user_address?.address?.postal_code}
                                attached_link={typeof data?.attached_link === 'object' ? data?.attached_link : data?.attached_link}
                                description={data?.description}/>
                        ) : (
                            // @ts-ignore
                            <CardPerfil
                                id={data?.id}
                                name={data?.name}
                                photoURL={data?.photo_url}
                                postal_code={data?.ngo_address?.address?.postal_code}
                                attached_link={typeof data?.attached_link === 'object' ? data?.attached_link : data?.attached_link}
                                description={data?.description}/>
                        )
                    }
                </div>
                    {id === userId ? (
                        <div className="flex flex-col w-full gap-5">
                                <NovoPost />
                            <div className="flex flex-col gap-5 items-center justify-center">
                                {data?.post_user?.map((item) => (
                                    <FeedPosts
                                        id={item.post.id}
                                        idUser={id}
                                        type={userType}
                                        nameUser={data?.name}
                                        photoUser={data?.photo_url}
                                        content={item.post.content}
                                        created={item.post.created_at}
                                        images={item.post.post_photo}
                                        comments={item.post.comment}
                                        count_comments={item._count?.comments}
                                        count_likes={item._count?.post_likes}
                                    />
                                ))}
                                {data?.post_ngo?.map((item) => (
                                    <FeedPosts
                                        id={item.post.id}
                                        idUser={id}
                                        type={userType}
                                        nameUser={data?.name}
                                        photoUser={data?.photo_url}
                                        content={item.post.content}
                                        created={item.post.created_at}
                                        images={item.post.post_photo}
                                        comments={item.post.comment}
                                        count_comments={item._count?.comments}
                                        count_likes={item._count?.post_likes}
                                    />
                                ))}
                            </div>
                        </div>

                    ) : (
                        <div className="flex flex-row gap-5 justify-between w-full">
                            <div className="flex flex-col items-center justify-center gap-5 w-full">
                                {data?.post_user?.map((item) => (
                                    <FeedPosts
                                        id={item.post.id}
                                        idUser={id}
                                        type={userType}
                                        nameUser={data?.name}
                                        photoUser={data?.photo_url}
                                        content={item.post.content}
                                        created={item.post.created_at}
                                        images={item.post.post_photo}
                                        comments={item.post.comment}
                                        count_comments={item._count?.comments}
                                        count_likes={item._count?.post_likes}
                                    />
                                ))}
                                {data?.post_ngo?.map((item) => (
                                    <FeedPosts
                                        id={item.post.id}
                                        idUser={id}
                                        type={userType}
                                        nameUser={data?.name}
                                        photoUser={data?.photo_url}
                                        content={item.post.content}
                                        created={item.post.created_at}
                                        images={item.post.post_photo}
                                        comments={item.post.comment}
                                        count_comments={item._count?.comments}
                                        count_likes={item._count?.post_likes}
                                    />
                                ))}

                            </div>
                            <div className={"w-1/3"}>
                            <CardHistorico />
                            </div>
                        </div>

                        )
                }


            </div>
        </div>
    )
}

