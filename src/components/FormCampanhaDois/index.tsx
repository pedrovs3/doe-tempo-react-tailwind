import React, {useEffect, useState} from "react";
import {CaretLeft, FileImage, Plus, X} from "phosphor-react";
import {api} from "../../lib/axios";



export function CampanhaFormDois() {
    {
        const [preview, setPreview] = useState(null);
        const [inputVisible, setInputVisible] = useState(true);
        const [causes, setCauses] = useState([]);

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
            const handleFileSelect = (event) => {
                const files = event.target.files;
                console.log(files);
            }

        function randomColor() {
            const randomColor = Math.floor(Math.random() * 0xfffff * 1000000).toString(16);
            return `[#${randomColor.slice(0,6)}]`;
        }

        useEffect(() => {
            const fetchData = async () => {

                const data = await api.get('/causes/');
                setCauses(data.data.causes);
                console.log(setCauses)
            }

            fetchData().catch(console.error);

            }, [])


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
                        <div className="dropdown dropdown-right">
                            <label tabIndex={0} className="btn m-1"><Plus size={24}/></label>
                            <ul tabIndex={0}  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box gap-2 w-64 flex flex-row">
                                {
                                    causes.map((item) => (
                                    <div key={item.id} className={`badge bg-${randomColor()}`}>{item.title}</div>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <h2 className={'text-2xl font-bold text-slate-400 pt-2'}>Adicione Imagens</h2>
                    <input type="file" multiple onChange={handleFileSelect} className="file-input file-input-bordered file-input-sm w-full max-w-xs" accept="image/*"/>
                    <div className="flex flex-col gap-3 pt-2">
                        <h2 className={'text-2xl font-bold text-slate-100'}>Como Contribuir</h2>
                        <textarea  placeholder="Diga ao voluntário como ajudar..."
                                   className="resize-none textarea textarea-bordered textarea-lg w-full max-w-xs"></textarea>
                    </div>
                    <div className="flex flex-col gap-3 pt-2">
                        <h2 className={'text-2xl font-bold text-slate-100'}>Pré-requisitos</h2>
                        <textarea  placeholder="Diga ao voluntário como ajudar..."
                                   className="resize-none textarea textarea-bordered textarea-lg w-full max-w-xs"></textarea>
                    </div>
                    <div className={'pt-5 flex justify-end'}>
                    <button className={'btn w-40 rounded-full bg-blueberry border-0 text-white flex justify-center hover:bg-accent'} type={'submit'}>
                        Publicar
                    </button>
                    </div>
                </div>
            </form>
        );
    }
}
