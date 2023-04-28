import React, {useEffect, useState} from "react";
import {HeaderPosts} from "../../components/HeaderPosts";
import WaveDown from "../../assets/img/Wave_down_turquoise.svg";
import {NewPost} from "../../components/NewPost";
import {decodeJwt} from "../../utils/jwtDecode";
import {api} from "../../lib/axios";
import {FeedPosts} from "../../components/FeedPosts";


export default function Feed() {

    const decodeJWT = decodeJwt();
    const userType = decodeJWT.type;
    const userId = decodeJWT.id;
    const [user, setUser ] = useState<object>();
    const [AllPosts, setAllPosts ] = useState<object>([]);
    const [userInfo, setUserInfo ] = useState<object>([]);
    const [hasNewPosts, setHasNewPosts] = useState(false);

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

    const handleNewPost = () => {
        setHasNewPosts(true);
    };


    useEffect(() => {

        const fetchAPI = async () => {
            const response = await api.get(`/post`)
            const AllPosts = await response.data.allPosts

            // AllPosts.forEach(post => {
            //     if (post._count.PostNgo === 0) {
            //         delete post.PostNgo
            //         delete Object.assign(post, {  user: post.PostUser[0] })['PostUser'];
            //     } else if (post._count.PostUser === 0) {
            //        delete post.PostUser
            //         delete Object.assign(post, {  user: post.PostNgo[0] })['PostNgo'];
            //     }
            // })


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
    }, [])

console.log(AllPosts)

    return (
                <div className={''}>
                    <HeaderPosts id={user?.user?.id} photoURL={user?.user?.photoURL}/>
                    <img className={'w-full'} src={WaveDown}/>
                    <div className={'flex justify-center items-center pb-8'}>
                        <NewPost typeUser={decodeJWT?.type} idUser={decodeJWT?.id}/>
                    </div>
                    <div className={'flex justify-center items-center flex-col gap-7'}>
                    {AllPosts.map((item) => (
                        <FeedPosts id={item.id} nameUser={item.user.name} photoUser={item.user.photoURL} content={item.content} created={item.created_at} images={item.PostPhoto}/>
                    ))}
                    </div>
                </div>
    )
}

