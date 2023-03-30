import React from "react";
import {Camera, Check, MapPin} from "phosphor-react";
import Loading from "../Loading";

export function NewPost() {

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
                    <button className="text-sm btn btn-square border-neutral-300 bg-neutral-100 hover:bg-neutral-300 hover:border-neutral-300">
                        <Camera size={32} color={'gray'} />
                    </button>
                    <button className="text-sm btn btn-square border-neutral-300 bg-neutral-100 hover:bg-neutral-300 hover:border-neutral-300">
                        <MapPin size={32} color={'gray'} />
                    </button>
                </div>
            </div>
        </div>
    )
}

