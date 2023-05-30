import { format } from 'date-fns'
import { pt } from 'date-fns/locale'
import React, {useEffect, useState} from "react";
import {Chat, Heart, PaperPlaneRight, TrashSimple} from "phosphor-react";
import {Link} from "react-router-dom";
import {api} from "../../lib/axios";
import {decodeJwt} from "../../utils/jwtDecode";
import { toast } from 'react-toastify';
import {PostLike} from "../../models/PostLike";

export interface Comentario {
    id:            string;
    content:       string;
    created_at:    string;
    comment_likes: any[];
    comment_user:  CommentUser[];
    comment_ngo:   any[];
    _count:        Count;
}

export interface Count {
    comment_ngo:   number;
    comment_user:  number;
    comment_likes: number;
}

export interface CommentUser {
    user: User;
}

export interface User {
    id:        string;
    name:      string;
    email:     string;
    type:      Type;
    photo_url: string;
}

export interface Type {
    id:   string;
    name: string;
}


interface Image {
    photo_url: string;
    id: string;
}

interface PostProps {
    id : string,
    idUser: string,
    photoUser: string,
    nameUser: string,
    content : string,
    created : string,
    images: Image[],
    comments: Comentario[],
    post_likes: PostLike[];
    liked: [string],
    type: string,
    count_likes: number,
    count_comments: number
}

interface Jwt {
    id:    string;
    email: string;
    type:  string;
    iat:   number;
    exp:   number;
}

export function FeedPosts(props : PostProps) {
    const [showCommentInput, setShowCommentInput] = useState({});
    const dataFormatada = format(new Date(props.created), "d 'de' MMMM 'às' HH:mm", { locale: pt });
    const [liked, setLiked] = useState(false);
    const photoUrls = props.images.map((photo) => photo.photo_url);
    const showNavigation = photoUrls.length > 1;
    const [comentario, setComentario] = useState('');
    const decodeJWT = decodeJwt();
    const jwt = decodeJWT as Jwt;
    const isCurrentUserOwner = jwt.id === props.idUser;
    const [countLikes, setCountLikes] = useState(props.count_likes);

    const handleDeletePost = async () => {
        try {
            const response = await api.delete(`/post/${props.id}`);
            toast.success('Post excluído com sucesso!');
        } catch (error) {
            console.error(error);
            toast.error('Houve um erro ao excluir o post!');
        }
    };
    const handleDeleteComment = async (commentId) => {
        try {
            const response = await api.delete(`/post/comment/${commentId}`);
            toast.success('Comentário excluído com sucesso!');
        } catch (error) {
            console.error(error);
            toast.error('Houve um erro ao excluir o post!');
        }
    };

    console.log()
    function handleLike() {
        const url = `/post/${props.id}/like`;

        if (liked) {
            // Remover o like
            api.delete(url)
                .then((res) => {
                    console.log(res.data);
                    setLiked(false);
                    setCountLikes(prevCountLikes => prevCountLikes - 1);
                })
                .catch(error => {
                    console.error('Erro ao remover o like:', error);
                });
        } else {
            // Dar o like
            api.post(url)
                .then((res) => {
                    console.log(res.data);
                    setLiked(true);
                    setCountLikes(prevCountLikes => prevCountLikes + 1);
                })
                .catch(error => {
                    console.error('Erro ao realizar o like:', error);
                });
        }
    }


    const handleCommentClick = (postId) => {
        setShowCommentInput(prevState => ({ ...prevState, [props.id]: !prevState[props.id] }));
    }


    const handleSubmitForm = async () => {
        try {
            const comment = await api.post(`/post/${props.id}/comment`, {
                content: comentario,
            } )
        } catch (e) {
            alert("Houve um erro!")
        }
        setComentario("")
    }

    const contentLines = props.content.split('\n');


    return (
        <div className="bg-base-100 shadow-xl w-full md:w-1/2 lg:w-1/2 text-primary-content rounded-lg relative">
            {isCurrentUserOwner && (
                <div className="dropdown absolute top-0 right-0 p-2">
                    <label tabIndex={0} className="btn-unstyled m-1 text-neutral-800 text-4xl">...</label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li className={"text-[#ef4444] text-lg font-bold"}>
                            <button onClick={handleDeletePost}><TrashSimple size={32} color={"red"}/>Apagar Post</button>
                        </li>
                    </ul>
                </div>

            )}
            <div className="card-body gap-5">
                <div className={"gap-5 flex flex-row"}>
                    <div className={"avatar"}>
                        <div className="w-16 rounded-xl ring ring-primary ring-tufts-blue ring-offset-2 bg-blueberry">
                            <Link to={`/perfil/${props.type}/${props.idUser}`}>
                                <img src={props.photoUser} />
                            </Link>
                        </div>
                    </div>
                    <div className={""}>
                        <h2 className="card-title text-neutral-900">{props.nameUser}</h2>
                        <p className={"text-neutral-800 text-xs"}>{dataFormatada}</p>
                    </div>
                </div>
                {contentLines.map((line, index) => (
                    <p key={index} className="text-neutral-900">
                        {line}
                    </p>
                ))}
                <div className="card-actions justify-start">
                    <div className="carousel w-full">
                        {photoUrls.map((url, index) => (
                            <div id={`slide${index + 1}`} className="carousel-item relative w-full" key={index}>
                                <img src={url} className="w-full rounded-3xl" alt={`Photo ${index + 1}`} />
                                {showNavigation && (
                                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                        <a href={`#slide${index === 0 ? photoUrls.length : index}`} className="btn btn-circle">❮</a>
                                        <a href={`#slide${index === photoUrls.length - 1 ? 1 : index + 2}`} className="btn btn-circle">❯</a>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className={"flex gap-2"}>
                    <h2 className={"text-xl font-bold text-neutral-500"}>{countLikes}</h2>
                    {jwt.type === 'USER' ? (
                     //pra usar no feed é user.id
                        props.post_likes && props.post_likes.filter((like) =>  like.id_user === jwt.id).length > 0 ? (

                                <button onClick={handleLike}>
                                    <Heart size={32} weight="fill" color={'red'} />
                                </button>
                        ) : (
                            <button onClick={handleLike}>
                                <Heart
                                    size={32}
                                    weight={liked ? 'fill' : 'regular'}
                                    color={liked ? 'red' : 'gray'}
                                />
                            </button>
                        )
                    ) : (
                        props.post_likes && props.post_likes.filter((like) => like.id_ngo === jwt.id).length > 0 ? (
                            <button onClick={handleLike}>
                                <Heart size={32} weight="fill" color={'red'} />
                            </button>
                        ) : (
                            <button onClick={handleLike}>
                                <Heart
                                    size={32}
                                    weight={liked ? 'fill' : 'regular'}
                                    color={liked ? 'red' : 'gray'}
                                />
                            </button>
                        )
                    )}
                <h2 className={"text-xl font-bold text-neutral-500"}>{props.count_comments}</h2>
                    <button onClick={() => handleCommentClick(props.id)}>
                        <Chat
                            size={32}
                            color={'gray'}
                        />
                    </button>
                </div>
                {showCommentInput[props.id] && (
                    <div className={"flex flex-col gap-2"}>
                        {props.comments.map((item) => (
                            <div className="bg-base-100 text-primary-content rounded-lg">
                                <div className="card-body gap-5">
                                    <div className={"gap-5 flex flex-row"}>
                                        <div className={"avatar"}>
                                            <div className="w-[56px] rounded-xl ring ring-tufts-blue ring-offset-2 bg-blueberry">
                                                <Link to={``}>
                                                    {
                                                        item._count.comment_user === 1 ? (
                                                            <img src={item?.comment_user[0].user?.photo_url}/>
                                                        ) : (
                                                            <img src={item?.comment_ngo[0].ngo?.photo_url}/>
                                                        )
                                                    }
                                                </Link>
                                            </div>
                                        </div>
                                        <div className={'flex flex-row flex-1 justify-between'}>
                                            <div className={""}>
                                                {
                                                    item._count.comment_user === 1 ? (
                                                        <h2 className="card-title text-neutral-900">{item?.comment_user[0].user?.name}</h2>
                                                    ) : (
                                                        <h2 className="card-title text-neutral-900">{item?.comment_ngo[0].ngo?.name}</h2>
                                                    )
                                                }
                                                <p className={"text-neutral-800 text-xs"}>{format(new Date(item.created_at), "d 'de' MMMM 'às' HH:mm", { locale: pt })}</p>
                                            </div>
                                            {(
                                                <div className="dropdown top-0 right-0 p-2 align-top">
                                                    <label tabIndex={0} className="btn-unstyled m-1 text-neutral-800 text-4xl">...</label>
                                                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                                        <li className={"text-[#ef4444] text-lg font-bold"}>
                                                            <button onClick={() => handleDeleteComment(item.id)}>
                                                                <TrashSimple size={32} color={"red"} />Apagar
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}

                                        </div>
                                    </div>
                                    <p className={"text-neutral-900"}>{item.content}</p>
                                </div>

                            </div>


                        ))}
                        <textarea value={comentario} style={{ color: "black" }} className="resize-none textarea textarea-info w-full" placeholder="Digite seu comentário.."
                                  onChange={it => setComentario(it.target.value)}></textarea>
                        <button className={"btn btn-square btn-info"} onClick={() => handleSubmitForm()}>
                            <PaperPlaneRight size={32} color={'white'} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );

}
