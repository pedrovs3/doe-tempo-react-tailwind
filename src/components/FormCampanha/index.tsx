import {CalendarBlank, CaretDown, Clock, HouseSimple, Plus} from "phosphor-react";
import React, {FormEvent, useEffect, useState} from "react";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../../firebase";
import {api} from "../../lib/axios";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Loading from "../Loading";
import {Navigate, NavLink, useNavigate} from "react-router-dom";
import {apiCep} from "../../api/consulta_cep";

interface AddressProps {
    idOng : string,
    cep : number,
    logradouro : string,
    numero: number,
    localidade? : string,
    uf?: string,
    complemento?: string
}

interface itemProps {
    id: string,
    title: string

}


export function CampanhaForm(props : AddressProps) {

        const [preview, setPreview] = useState(null);
        const [inputVisible, setInputVisible] = useState(true);
        const [imgURL, setImgURL] = useState([])
        const [causes, setCauses] = useState([]);
        const [contributeState, setStateContribute] = useState('');
        const [prerequisitesState, setStatePrerequisites] = useState('');
        const [titleState, setStateTitle] = useState('');
        const [descriptionState, setStateDescription] = useState('');
        const [beginDateState, setStateDateBegin] = useState('')
        const [endDateState, setStateDateEnd] = useState('')
        const [selectedOption, setSelectedOption] = useState([]);

        const [cepState, setCepState] = useState('');
        const [logradouroState, setLogradouroState] = useState(props.logradouro);
        const [numeroState, setNumeroState] = useState(props.numero);
        const [complementoState, setComplementoState] = useState(props.complemento);
        const [localidadeState, setLocalidadeState] = useState(props.localidade);
        const [UfState, setUfState] = useState(props.uf);

        const checkCEP = async (e: any) => {
        setCepState(e.target.value.replace(/\D/g, ''))

        if(cepState.length === 7) {
            console.log(cepState)
            const cep = e.target.value;

            const { data } = await apiCep.get(`/${cep}/json/`)

            setLogradouroState(data.logradouro)
            setLocalidadeState(data.localidade);
            setUfState(data.uf)
        }
    }

    function handleLogradouroChange(event) {
        setLogradouroState(event.target.value);
    }

    function handleNumeroChange(event) {
        setNumeroState(event.target.value);
    }
    function handleComplementoChange(event) {
        setComplementoState(event.target.value);
    }
    function handleLocalidadeChange(event) {
        setLocalidadeState(event.target.value);
    }

    function handleUfChange(event) {
        setUfState(event.target.value);
    }



    function handleChange(event) {
            const files = Array.from(event.target.files);
        console.log(files)

            if (!files) return
        files.forEach((file) => {
            const storageRef = ref(storage, `images/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on("state_changed", (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
            });

            uploadTask.then(() => {
                getDownloadURL(storageRef).then((url) => {
                    setImgURL((prevImages) => [...prevImages, url]);
                     });
                });
            });
        }

        const handleFileSelect = (event) => {
            const files = event.target.files;
            console.log(files);
        }


        useEffect(() => {
            const fetchData = async () => {

                const data = await api.get('/causes/');
                setCauses(data.data.causes);

            }

            fetchData().catch(console.error);

        }, [])

        const [progress, setProgress] = useState(0)

        const [value, setValue] = useState(false);

        const handleRadioChange = (event) => {
            setValue(event.target.value === 'true');
        };

        const handleSubmitForm = async (e: FormEvent) => {
            e.preventDefault()


            try {
                const campaign = await api.post('/campaign/', {
                    title: titleState,
                    description: descriptionState,
                    begin_date: beginDateState,
                    end_date: endDateState,
                    home_office: value,
                    how_to_contribute: contributeState,
                    prerequisites: prerequisitesState,
                    id_ngo: props.idOng,
                    photo_url: imgURL,
                    causes: causesJson,
                    address: {
                        postal_code: props.cep,
                        number: props.numero,
                        complement: props.complemento || null
                    }
                })

                alert(campaign.data)
            } catch (e) {
                console.log(e)
                alert("Houve um erro!")
            }

        }

        const animatedComponents = makeAnimated();

    const causesOptions = causes.map(el => {
        return { label: el.title, value: el.id}
    })

    const causesJson = selectedOption.map(el => {
        return {id: el.value}
    })

    return (
                <form name={"campanha"} className={'pr-6 flex pt-2 gap-32'} onSubmit={handleSubmitForm}>
                    <div className={"flex flex-col"}>
                        <h2 className={'text-2xl font-bold text-slate-400'}>Nome da campanha</h2>
                        <div className="flex flex-col gap-3 pt-2">
                            <input type="text" placeholder="O nome da sua ação"
                                   className="input input-bordered input-branco-bem-claro w-full max-w-xs"
                                   value={titleState}
                                   onChange={it => setStateTitle(it.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-3 pt-2">
                            <h2 className={'text-2xl font-bold text-slate-100'}>Sobre a campanha</h2>
                            <textarea placeholder="Nos conte mais sobre a sua ação..."
                                      value={descriptionState}
                                      onChange={it => setStateDescription(it.target.value)}
                                      className="resize-none textarea textarea-bordered textarea-lg w-full max-w-xs">
                            </textarea>
                        </div>

                        <div className="flex flex-col gap-3 pt-2">
                            <h2 className={'text-2xl font-bold text-slate-100'}>Local</h2>
                            <label htmlFor="my-modal" className="btn bg-blend-color">
                                Editar Local
                                <Plus size={22} />
                            </label>
                            <input type="checkbox" id="my-modal" className="modal-toggle" />
                            <div className="modal">
                                <div className="modal-box">
                                    <h3 className="font-bold text-lg">🏠 Edite o endereço da sua campanha!</h3>
                                    <p className="py-4">Você pode editar o endereço da campanha que não seja diretamente no local da ONG.</p>
                                    <div className={'flex flex-col gap-4'}>
                                    <input type="text" placeholder="Cep (apenas números)"
                                           className="input input-bordered input-branco-bem-claro w-full max-w-xs"
                                           value={cepState}
                                           onChange={checkCEP}
                                           maxLength={11}
                                    />
                                    <input type="text" placeholder="Número do Local"
                                           className="input input-bordered input-branco-bem-claro w-full max-w-xs"
                                           value={numeroState}
                                           onChange={it => setNumeroState(it.target.value)}

                                    />
                                    <input type="text" placeholder="Complemento"
                                           className="input input-bordered input-branco-bem-claro w-full max-w-xs"
                                           value={complementoState}
                                           onChange={it => setComplementoState(it.target.value)}
                                    />
                                    <div className="modal-action">
                                        <label htmlFor="my-modal" className="btn">Confirmar</label>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card w-80 bg-base-100 shadow-xl">
                                <div className="card-body flex">
                                    <div className={'flex gap-2 items-center'}>
                                        <HouseSimple size={32}/>
                                        <p className={'text-1xl font-bold text-slate-100'}>Endereço registrado</p>
                                    </div>
                                    <span>{logradouroState}, {numeroState}, {localidadeState}, {UfState}</span>
                                    <span>{complementoState}</span>
                                </div>
                            </div>
                        </div>
                        <div className={"flex flex-col gap-5 pt-2"}>
                            <h2 className={'text-2xl font-bold text-slate-400'}>Informações adicionais</h2>
                            <div className={'flex gap-2'}>
                                <CalendarBlank size={32}/>
                                <h2 className={'text-[1.3rem] font-bold text-slate-100 text-start'}>Dia de ínicio</h2>
                            </div>
                            <div className={'flex flex-col w-64'}>
                                <input
                                    id="beginDate"
                                    type="date"
                                    className="input input-bordered bg-white text-black w-full focus:input-bordered focus:input-success placeholder-blue-500"
                                    placeholder="Data de Ínicio"
                                    onChange={event => setStateDateBegin(event.target.value)}
                                    value={beginDateState}
                                />
                            </div>
                            <div className={'flex gap-2'}>
                                <CalendarBlank size={32}/>
                                <h2 className={'text-[1.3rem] font-bold text-slate-100 text-start'}>Dia de término</h2>
                            </div>
                            <div className={'flex flex-col w-64'}>
                                <input
                                    id="endDate"
                                    type="date"
                                    className="input input-bordered bg-white text-black w-full focus:input-bordered focus:input-success placeholder-blue-500"
                                    placeholder="Data de Término"
                                    onChange={event => setStateDateEnd(event.target.value)}
                                    value={endDateState}
                                />
                            </div>
                            <h2 className={'pt-4 text-[1.3rem] font-medium'}>A ação pode ser feita à distância?</h2>
                            <div className={'flex gap-5 items-center'}>
                                <h2 className={'text-[1.3rem] font-medium'}>Sim</h2>
                                <input type="radio"
                                       name="radio-6"
                                       value="true"
                                       checked={value === true}
                                       className="radio radio-success"
                                       onChange={handleRadioChange}/>
                                <h2 className={'text-[1.3rem] font-medium'}>Não</h2>
                                <input type="radio"
                                       name="radio-6"
                                       className="radio radio-error"
                                       value="false"
                                       checked={value === false}
                                       onChange={handleRadioChange}/>
                            </div>
                        </div>
                    </div>
                    <div className={''}>
                        <h2 className={'text-2xl font-bold text-slate-400'}>Foto de Capa da Campanha</h2>
                        <div className="flex flex-col items-center">
                            <input
                                className={'file-input file-input-bordered file-input-info w-full max-w-xs'}
                                id="input-file"
                                type="file"
                                accept="image/*"
                                onChange={handleChange}
                                hidden={!inputVisible}
                            />
                            {
                                imgURL.map((image, index) => (
                                    <img key={index} src={image} alt="Imagem" className="w-[20rem] h-[13rem] object-cover rounded-lg grid grid-cols-2 gap-4 w-full" />
                                ))
                            }
                        </div>
                        <h2 className={'text-2xl font-bold text-slate-400 pt-2'}>Adicione Tags</h2>
                        <div className={'pt-2 w-80'}>
                            <Select
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                isMulti
                                options={causesOptions}
                                value={selectedOption}
                                onChange={setSelectedOption}
                            />
                        </div>
                        <div className="flex flex-col gap-3 pt-2">
                            <h2 className={'text-2xl font-bold text-slate-100'}>Como Contribuir</h2>
                            <textarea placeholder="Diga ao voluntário como ajudar..."
                                      className="resize-none textarea textarea-bordered textarea-lg w-full max-w-xs"
                                      value={contributeState}
                                      onChange={it => setStateContribute(it.target.value)}></textarea>
                        </div>
                        <div className="flex flex-col gap-3 pt-2">
                            <h2 className={'text-2xl font-bold text-slate-100'}>Pré-requisitos</h2>
                            <textarea placeholder="Diga ao voluntário como ajudar..."
                                      className="resize-none textarea textarea-bordered textarea-lg w-full max-w-xs"
                                      value={prerequisitesState}
                                      onChange={it => setStatePrerequisites(it.target.value)}></textarea>
                        </div>
                        <div className={'pt-5 flex justify-end'}>
                            <button
                                className={'btn w-40 rounded-full bg-blueberry border-0 text-white flex justify-center hover:bg-accent'}
                                type={'submit'}>
                                Publicar
                            </button>
                        </div>
                    </div>
                </form>
    );
}

