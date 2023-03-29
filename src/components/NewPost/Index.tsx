import React from "react";
import {Check} from "phosphor-react";

export function NewPost() {

    return (
        <div className="card w-1/4 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-blueberry">Nova Publicação</h2>
                <div className={'flex flex-row gap-5'}>
                    <textarea placeholder="Fale um pouco sobre sua última ação..."
                              className="resize-none textarea textarea-bordered textarea-xs w-full max-w-xs bg-neutral-200">
                    </textarea>
                <div className="card-actions justify-end">
                    <button className="btn btn-square border-neutral-200 bg-neutral-300">
                        <Check size={32} color={'blueberry'} />
                    </button>
                </div>
                </div>
            </div>
        </div>
    )
}

