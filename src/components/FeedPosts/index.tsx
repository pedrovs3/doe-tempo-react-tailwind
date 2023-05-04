import { format } from 'date-fns'
import { pt } from 'date-fns/locale'
import React, {FormEvent, useState} from "react";
import {Chat, Heart, PaperPlaneRight} from "phosphor-react";
import {Link} from "react-router-dom";
import {api} from "../../lib/axios";

interface PostProps {
    id : string,
    idUser: string,
    photoUser: string,
    nameUser: string,
    content : string,
    created : string,
    images: []
    comments: []

}


export function FeedPosts(props : PostProps) {


    const [showCommentInput, setShowCommentInput] = useState({});
    const dataFormatada = format(new Date(props.created), "d 'de' MMMM 'às' HH:mm", { locale: pt });
    const [liked, setLiked] = useState(false);
    const photoUrls = props.images.map((photo) => photo.photo_url);
    const showNavigation = photoUrls.length > 1;
    const [comentario, setComentario] = useState('');


    function handleLike() {
        setLiked(!liked)

    }


    const handleCommentClick = (postId) => {
        setShowCommentInput(prevState => ({ ...prevState, [postId]: true }));
    }

    const handleSubmitForm = async () => {

        try {
            const comment = await api.post(`/post/${props.id}/comment`, {
                content: comentario,
            })
            alert("foi")
        } catch (e) {
            console.log(e)
            alert("Houve um erro!")
        }

    }

    return (
        <div className="bg-base-100 shadow-xl w-1/3 text-primary-content rounded-lg">
            <div className="card-body gap-5">
                <div className={"gap-5 flex flex-row"}>
                    <div className={"avatar"}>
                        <div className="w-16 rounded-xl ring ring-primary ring-tufts-blue ring-offset-2 bg-blueberry">
                                <Link to={`/perfil/${props.idUser}`}>
                                    <img src={props.photoUser} />
                                </Link>
                        </div>
                    </div>
                    <div className={""}>
                        <h2 className="card-title text-neutral-900">{props.nameUser}</h2>
                        <p className={"text-neutral-800 text-xs"}>{dataFormatada}</p>
                    </div>
                </div>
                <p className={"text-neutral-900"}>{props.content}</p>
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
                <div className={"flex gap-5"}>
                    <button onClick={handleLike}>
                        <Heart
                            size={32}
                            weight={liked ? 'fill' : 'regular'}
                            color={liked ? 'red' : 'gray'}
                        />
                    </button>
                    <button onClick={() => handleCommentClick(props.id)}>
                        <Chat
                            size={32}
                            color={'gray'}
                        />
                    </button>
                </div>
                {showCommentInput[props.id] && (
                    <div className={"flex gap-2"}>
                        {props.comments.map((item) => (
                            <div className="card card-side bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title">{item.content}</h2>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary">Watch</button>
                                    </div>
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
