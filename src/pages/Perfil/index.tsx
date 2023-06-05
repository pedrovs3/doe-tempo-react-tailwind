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
import {ToastContainer} from "react-toastify";
import {ClockCounterClockwise} from "phosphor-react";

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
    const [id, setId] = useState<string>("")
    const typeUser = routeParams.type
    const decodeJWT = decodeJwt();
    const jwt = decodeJWT as Jwt;
    const userType = jwt.type;
    const userId = jwt.id;
    const [user, setUser ] = useState<object>();

    useEffect(() => {
        setId(routeParams.id)
        const fetchData = async () => {
            if (typeUser === 'USER') {
                const data = await api.get(`/user/${routeParams.id}`);
                setData(data.data.user)
            } else {
                const { data } = await api.get(`/ngo/${routeParams.id}`);
                setData(data)
            }

        }


        fetchData().catch(console.error);

    }, [routeParams.id])

    useEffect(() => {
        const fetchData = async () => {
            if (userType == 'USER') {
                const {data} = await api.get(`/user/${jwt.id}`);
                setUser(data.user)
            } else {
                const { data } = await api.get(`/ngo/${jwt.id}`);
                setUser(data)
            }
        }
        fetchData().catch(console.error);

    }, [jwt.id])


    return (
        <><ToastContainer/>
            <div className={'h-full bg-little-white'}>
                <div className={'h-screen bg-little-white'}>
                    <div className={"navbar absolute top-0 left-0 w-full bg-transparent"}>
                        {/*// @ts-ignore*/}
                        <HeaderPosts id={jwt.id} photoURL={user?.user?.photo_url || user?.photo_url}/>
                    </div>
                    {/*// @ts-ignore*/}
                    <img src={data?.banner_photo} alt="Header image"
                         className="object-cover w-full h-64 md:h-96 lg:h-128"/>
                    <div className={'flex flex-col'}>
                        <img src={wave} className={'self-start w-full'} style={{transform: `translateY(-90%)`}}/>
                        <div className="flex flex-row p-5 pl-10 pr-10">
                            <div className="">
                                {typeUser === 'USER' ? (
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
                                )}
                            </div>
                            {id == userId ? (
                                <div className="flex flex-col w-full gap-5">
                                    <NovoPost/>
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
                                                count_comments={item.post._count?.comment}
                                                count_likes={item.post._count?.post_likes}
                                                post_likes={item.post.post_likes}/>
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
                                                count_comments={item.post._count?.comment}
                                                count_likes={item.post._count?.post_likes}
                                                post_likes={item.post.post_likes}/>
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
                                                count_comments={item.post._count?.comment}
                                                count_likes={item.post._count?.post_likes}/>
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
                                                count_comments={item.post._count?.comment}
                                                count_likes={item.post._count?.post_likes}/>
                                        ))}
                                    </div>
                                    <div className={"w-1/3"}>
                                        {typeUser === 'USER' && data?.supported_campaigns && data.supported_campaigns.length > 0 && (
                                            <div>
                                                <div className="flex flex-row">
                                                    <ClockCounterClockwise size={30}/>
                                                    <h1 className="pl-2 text-2xl font-bold text-blueberry">Histórico de
                                                        Campanhas</h1>
                                                </div>
                                                {data.supported_campaigns.map(campaign => {
                                                    const currentDate = new Date();
                                                    const endDate = new Date(campaign.campaign.end_date);
                                                    if (endDate < currentDate) {
                                                        return (
                                                            <div className={"pb-5"} key={campaign.campaign.id}>
                                                                <CardHistorico
                                                                    begin_date={campaign.campaign.begin_date}
                                                                    campaign_photo={campaign.campaign.ngo.photo_url}
                                                                    end_date={campaign.campaign.end_date}
                                                                    id={campaign.campaign.id}
                                                                    tituloCampanha={campaign.campaign.title}/>
                                                            </div>
                                                        );
                                                    }
                                                    return null;
                                                })}
                                            </div>
                                        )}
                                        {typeUser === 'ONG' && data?.campaign && data.campaign.length > 0 && (
                                            <div>
                                                <div className="flex flex-row">
                                                    <ClockCounterClockwise size={30}/>
                                                    <h1 className="pl-2 text-2xl font-bold text-blueberry">Histórico de
                                                        Campanhas</h1>
                                                </div>
                                                {data.campaign.map(campaign => (
                                                    <div className={"pb-5"} key={campaign.id}>
                                                        <CardHistorico
                                                            key={campaign.id}
                                                            campaign_photo={data.photo_url}
                                                            id={campaign.id}
                                                            tituloCampanha={campaign.title}
                                                            begin_date={campaign.begin_date}
                                                            end_date={campaign.end_date}/>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

