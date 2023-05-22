import React, {useEffect, useState} from "react";
import {HeaderPosts} from "../../components/HeaderPosts";
import WaveDown from "../../assets/img/Wave_down_turquoise.svg";
import {NewPost} from "../../components/NewPost/Index";
import {decodeJwt} from "../../utils/jwtDecode";
import {api} from "../../lib/axios";
import {FeedPosts} from "../../components/FeedPosts";
import { ToastContainer } from 'react-toastify';

interface AllPosts {
    id:         string;
    content:    string;
    created_at: Date;
    post_ngo:   PostNgo[];
    post_user:  any[];
    post_likes: PostLike[];
    post_photo: PostPhoto[];
    comment:    Comment[];
}

interface WelcomeCount {
    comment:    number;
    post_ngo:   number;
    post_photo: number;
    post_user:  number;
    post_likes: number;
}

interface Comment {
    id:            string;
    content:       string;
    created_at:    Date;
    comment_likes: any[];
    comment_user:  any[];
    comment_ngo:   CommentNgo[];
    _count:        CommentCount;
}

interface CommentCount {
    comment_ngo:   number;
    comment_user:  number;
    comment_likes: number;
}

interface CommentNgo {
    ngo: CommentNgoNgo;
}

interface CommentNgoNgo {
    id:        string;
    name:      string;
    email:     string;
    type:      PurpleType;
    photo_url: string;
}

interface PurpleType {
    id:   string;
    name: string;
}

interface PostLike {
    id:      string;
    ngo:     null;
    user:    User;
    id_post: string;
}

interface User {
    id:           string;
    name:         string;
    email:        string;
    password:     string;
    cpf:          string;
    id_gender:    string;
    birthdate:    Date;
    rg:           string;
    id_type:      string;
    description:  string;
    banner_photo: string;
    photo_url:    string;
    created_at:   Date;
}

interface PostNgo {
    ngo: PostNgoNgo;
}

interface PostNgoNgo {
    id:        string;
    name:      string;
    email:     string;
    photo_url: string;
    type:      FluffyType;
}

interface FluffyType {
    name: string;
}

interface PostPhoto {
    photo_url: string;
    id:        string;
}


interface Jwt {
    id:    string;
    email: string;
    type:  string;
    iat:   number;
    exp:   number;
}

export default function Feed() {

    const decodeJWT = decodeJwt();
    const jwt = decodeJWT as Jwt;
    const userType = jwt.type;
    const userId = jwt.id;
    const [user, setUser ] = useState<any>();
    const [allPosts, setAllPosts] = useState<AllPosts[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            let endpoint = "";
            if (userType === "ONG") {
                endpoint = `/ngo/${userId}`;
            } else if (userType === "USER") {
                endpoint = `/user/${userId}`;
            }
            console.log(endpoint)

            const response = await api.get(endpoint);
            const user = response.data;
            console.log(user)
            setUser(user);
        };

        fetchData();
    }, [jwt.id]);

    useEffect(() => {
        const fetchAPI = async () => {
            const response = await api.get(`/post`)
            const AllPosts = await response.data.all_posts

            const updatedPosts = AllPosts.map(post => {
                let updatedPost = post;
                if (post.PostNgo && post.PostNgo.length > 0) {
                    updatedPost.user = post.PostNgo[0].ngo;
                    delete updatedPost.PostNgo;
                } else if (post.PostUser && post.PostUser.length > 0) {
                    updatedPost.user = post.PostUser[0].user;
                    delete updatedPost.PostUser;
                }
                return updatedPost;
            });
            setAllPosts(updatedPosts)
        }
        fetchAPI().catch(console.error)
    }, [allPosts])

    return (
        <><ToastContainer/>
            <div className={''}>
                <div className={'navbar bg-turquoise-500'}>
                    <HeaderPosts id={jwt.id} photoURL={user?.user?.photo_url || user?.photo_url}/>
                </div>
                <img className={'w-full'} src={WaveDown}/>
                <div className={'flex justify-center items-center pb-8 mx-auto'}>
                    <NewPost typeUser={jwt.type} idUser={jwt.id}/>
                </div>
                <div className={'flex justify-center items-center flex-col gap-7'}>
                    {allPosts.map((item) => (
                        item.post_ngo.length < 1 ?
                            (
                                <FeedPosts id={item.id}
                                           idUser={item.post_user[0].user.id}
                                           type={item.post_user[0].user.type.name}
                                           nameUser={item.post_user[0].user.name}
                                           photoUser={item.post_user[0].user.photo_url}
                                           content={item.content} created={item.created_at}
                                           images={item.post_photo}
                                           comments={item.comment}
                                           count_likes={item._count?.post_likes}
                                           post_likes={item.post_likes}
                                           count_comments={item._count?.comment}

                                />
                            ) : (
                                <FeedPosts id={item.id}
                                           type={item.post_ngo[0].ngo.type.name}
                                           idUser={item.post_ngo[0].ngo.id}
                                           nameUser={item.post_ngo[0].ngo.name}
                                           photoUser={item.post_ngo[0].ngo.photo_url}
                                           content={item.content}
                                           created={item.created_at}
                                           images={item.post_photo}
                                           comments={item.comment}
                                           post_likes={item.post_likes}
                                           count_likes={item._count?.post_likes}
                                           count_comments={item._count?.comment}/>
                            )
                    ))}
                </div>
            </div>
        </>
    )
}

