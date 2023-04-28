import { format } from 'date-fns'
import { pt } from 'date-fns/locale'
import {useState} from "react";
import {Chat, Heart} from "phosphor-react";

interface PostProps {
    id : string,
    photoUser: string,
    nameUser: string,
    content : string,
    created : string,
    images: []

}


export function FeedPosts(props : PostProps) {

    const dataFormatada = format(new Date(props.created), "d 'de' MMMM 'às' HH:mm", { locale: pt });
    const [liked, setLiked] = useState(false);
    const photoUrls = props.images.map((photo) => photo.photo_url);
    const showNavigation = photoUrls.length > 1;


    function handleLike() {
        setLiked(!liked)

    }



    return (
        <div className="bg-base-100 shadow-xl w-1/3 text-primary-content rounded-lg">
            <div className="card-body gap-5">
                <div className={"gap-5 flex flex-row"}>
                    <div className={"avatar"}>
                        <div className="w-16 rounded-xl ring ring-primary ring-tufts-blue ring-offset-2 bg-blueberry">
                            <img src={props.photoUser} />
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
                <button>
                    <Chat
                        size={32}
                        color={'gray'}
                    />
                </button>
                </div>
            </div>
        </div>
    );
}
