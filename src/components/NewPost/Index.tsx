import React, {useEffect, useState} from "react";
import {Camera, Check, MapPin} from "phosphor-react";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
interface PostProps {
    id: string,
}


export function NewPost(props : PostProps) {

    const [preview, setPreview] = useState(null);
    const [inputVisible, setInputVisible] = useState(true);
    const [imgURL, setImgURL] = useState("")


    function handleChange(event) {
        const file = event.target.files[0];

        if (!file) return

        const storageRef = ref(storage, `images/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setProgress(progress)
            },
            error => {
                alert(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(url => {
                    setImgURL(url)
                    console.log(url)
                })
            }
        )

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            // @ts-ignore
            setPreview(reader.result);
            setInputVisible(false);
        }
        setPreview(null);
        setInputVisible(true);

    }


    return (
        <div className="card w-1/5 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-blueberry">Nova Publicação</h2>
                <div className={'flex flex-row gap-5'}>
                    <textarea placeholder="Fale um pouco sobre sua última ação..."
                              className="resize-none textarea textarea-bordered textarea-md w-full max-w-xs" >

                    </textarea>
                <div className="card-actions justify-end">
                    <button className="text-sm btn btn-square border-neutral-300 bg-neutral-100 hover:bg-neutral-300 hover:border-neutral-300">
                        <Check size={32} className={''} color={'blue'}/>
                    </button>
                </div>
                </div>
                <div className="card-actions">
                    <input
                        className={'file-input file-input-bordered file-input-info w-full max-w-xs'}
                        id="input-file"
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                        hidden={!inputVisible}
                    />
                    {preview && (
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-[20rem] h-[13rem] object-cover rounded-lg pt-1.5"
                            onClick={() => setInputVisible(true)}
                        />
                    )}
                    <button className="text-sm btn btn-square border-neutral-300 bg-neutral-100 hover:bg-neutral-300 hover:border-neutral-300">
                        <MapPin size={32} color={'gray'} />
                    </button>
                </div>
            </div>
        </div>
    )
}

