import React, {useState} from "react";
import {FileImage, X} from "phosphor-react";


export function CampanhaFormDois() {
    {
        const [preview, setPreview] = useState(null);
        const [inputVisible, setInputVisible] = useState(true);

        function handleChange(event) {
            const file = event.target.files[0];

            if (file) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    setPreview(reader.result);
                    setInputVisible(false);
                };
            } else {
                setPreview(null);
                setInputVisible(true);
            }
        }

        return (
            <form name={"campanha"} className={'pr-6 flex flex-col justify-between pt-2'}>
                <div className={"flex flex-col gap-3"}>
                    <h2 className={'text-2xl font-bold text-slate-400'}>Foto de Capa da Campanha</h2>
                    <div className="flex flex-col items-center">
                        {inputVisible && (
                            <input
                                className={'file-input file-input-bordered file-input-info w-full max-w-xs'}
                                id="input-file"
                                type="file"
                                accept="image/*"
                                onChange={handleChange}
                            />
                        )}
                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-[20rem] h-[13rem] object-cover rounded-lg pt-1.5"
                                onClick={() => setInputVisible(true)}
                            />
                        )}
                    </div>
                    <h2 className={'text-2xl font-bold text-slate-400 pt-2'}>Adicione Tags</h2>
                    <div className={'flex gap-2'}>
                        <div className="badge">neutral</div>
                        <div className="badge badge-primary">primary</div>
                        <div className="badge badge-secondary">secondary</div>
                        <div className="badge badge-accent">accent</div>

                    </div>
                </div>
            </form>
        );
    }
}
