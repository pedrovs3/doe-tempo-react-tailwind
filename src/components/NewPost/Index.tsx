import React, {FormEvent, useState} from "react";
import {Camera, Check} from "phosphor-react";
import {api} from "../../lib/axios";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {storage} from "../../firebase";

interface PostProps {
    typeUser: string,
    idUser: string
}

export function NewPost(props : PostProps) {

    const [contentState, setContentState] = useState('');
    const [images, setImages] = useState([]);
    const [progress, setProgress] = useState(0);
    const [isLoadingImage, setIsLoadingImage] = useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files);
        const urls: string[] = []; // novo array para armazenar os URLs das imagens
        setIsLoadingImage(true);

        files.forEach((file) => {
            const storageRef = ref(storage, `images/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on("state_changed", (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
            });

            uploadTask.then(() => {
                getDownloadURL(storageRef).then((url) => {
                    setImages((prevImages) => [...prevImages, url]);
                    setIsLoadingImage(false);
                });
            });
        });
    };

    const handleSubmitForm = async (e: FormEvent) => {
        e.preventDefault()

        try {
            const publish = await api.post(`/post/?user=${props.idUser}`, {
                content: contentState,
                type_of_user: props.typeUser,
                photos: images,
            })

            if (publish.data) {
                setContentState('')
                setImages([])
            }

        } catch (e) {
            console.log(e)
            alert("Houve um erro!")

        }

    }

    return (
        <form onSubmit={handleSubmitForm} className={"w-full flex justify-center"}>
            <div className="w-full lg:w-3/4 xl:w-1/2 flex items-center bg-base-100 shadow-xl rounded-lg">
                <div className="card-body w-full">
                    <h2 className="card-title text-blueberry justify-center">Nova Publicação</h2>
                    <div className={'flex flex-col lg:flex-row gap-5 justify-center'}>
                <textarea placeholder="Fale um pouco sobre sua última ação..."
                          className="resize-none textarea textarea-bordered textarea-md w-full lg:w-3/4"
                          value={contentState}
                          onChange={it => setContentState(it.target.value)}
                          required
                >
                </textarea>
                        <div className="card-actions justify-center lg:justify-end">
                            <button className="text-sm btn btn-square border-neutral-300 bg-neutral-100 hover:bg-neutral-300 hover:border-neutral-300">
                                <Check size={32} className={''} color={'blue'} type='submit'/>
                            </button>
                        </div>
                    </div>
                    <div className="card-actions">
                        <label className="text-sm btn btn-square border-neutral-300 bg-neutral-100 hover:bg-neutral-300 hover:border-neutral-300 flex items-center justify-center">
                            <Camera size={32} color={'gray'}/>
                            <input type="file" className="sr-only" onChange={handleImageChange} multiple />
                        </label>
                        {isLoadingImage ? (
                            <div className={"pl-10 flex justify-center items-center"}>
                                <progress className="progress w-56"></progress>
                            </div>
                        ) : (
                            <div className={"flex flex-row gap-5 justify-start"}>
                                {images.map((image, index) => (
                                    <img key={index} src={image} alt="Imagem" className="w-full lg:w-1/2 xl:w-1/3 object-cover rounded-lg grid grid-cols-2 gap-4 mt-4" />
                                ))}
                            </div>
                        )}
                </div>
                </div>
            </div>
        </form>

    )
}

