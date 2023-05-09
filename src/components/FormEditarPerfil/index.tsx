import React, {FormEvent, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {api} from "../../lib/axios";
import {decodeJwt} from "../../utils/jwtDecode";
import {Plus} from "phosphor-react";
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage';
import {storage} from "../../firebase";
import {format} from "date-fns";
import {toast} from "react-toastify";
export function FormEditarPerfil(){
    const navigate = useNavigate();
    const routeParams = useParams();
    const [data, setData] = useState({})
    const id = routeParams.id
    const decodeJWT = decodeJwt();
    const userType = decodeJWT.type;
    const userId = decodeJWT.id;
    const [user, setUser ] = useState<object>();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [cpf, setCpf] = useState('')
    const [rg, setRg] = useState('')
    const [attached, setAttached] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('');
    const [birthdate, setBirthdate] = useState('')
    const [description, setDescription] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [postalNumber, setPostalNumber] = useState('')
    const [complement, setComplement] = useState('')
    const [gender, setGender] = useState('')
    const [editSuccess, setEditSuccess] = useState(false);
    const [imgURL, setImgURL] = useState([])
    const [IconURL, setIconURL] = useState([])

    useEffect(() => {
        if(data?.name) {
            setName(data?.name)
            setEmail(data?.email)
            const dataFormatada = format(new Date(data?.birthdate), "yyyy-MM-dd");
            setBirthdate(dataFormatada)
            setDescription(data?.description)
            setCpf(data?.cpf)
            setPostalCode(data?.user_address?.address.postal_code)
            setPostalNumber(data?.user_address?.address.number)
            setComplement(data?.user_address?.address.complement)
            setGender(data?.id_gender)


        }
    }, [data?.banner_photo]);

    useEffect(() => {
        const fetchData = async () => {
            let endpoint = "";
            if (userType === "ONG") {
                endpoint = `/ngo/${userId}`;
            } else if (userType === "USER") {
                endpoint = `/user/${userId}`;
            }

            const response = await api.get(endpoint);
            const user = response.data;
            setUser(user);
        };

        fetchData();
    }, [userId, userType]);

    useEffect(() => {
        const fetchData = async () => {
            const {data} = await api.get(`/user/${id}`);
            setData(data.user)
        }


        fetchData().catch(console.error);

    }, [])

    console.log(data)

    const handleSubmitForm = async (e: FormEvent)    => {
        e.preventDefault();

        try {
            const {data} = await api.put(`/user/${id}`, {
                name: name,
                email: email,
                password: password,
                cpf: cpf,
                birthdate: birthdate,
                address: {
                    postal_code: postalCode,
                    number: postalNumber,
                    complement: complement,
                },
                gender: gender,
                rg: rg,
                banner_photo: imgURL[0],
                photo_url: IconURL[0],
                attached_link: attached,
            })

            console.log(data)
            setEditSuccess(true)

        } catch (e) {
            console.log(e)
            alert("Não mudou nada.")
        }
    }

    useEffect(() => {
        if (editSuccess) {
            navigate(`/perfil/${id}`);
        }
    }, [editSuccess]);

    function handleChange(event) {
        const files = Array.from(event.target.files);
        console.log(files)

        if (!files) return
        files.forEach((file) => {
            const storageRef = ref(storage, `images/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on("state_changed", (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            });

            uploadTask.then(() => {
                getDownloadURL(storageRef).then((url) => {
                    setImgURL((prevImages) => [...prevImages, url]);
                });
            });
        });
    }

    function handleChangeIcon(event) {
        const files = Array.from(event.target.files);


        if (!files) return
        files.forEach((file) => {
            const storageRef = ref(storage, `images/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on("state_changed", (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            });

            uploadTask.then(() => {
                getDownloadURL(storageRef).then((url) => {
                    setIconURL((prevImages) => [...prevImages, url]);
                });
            });
        });
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleConfirmPasswordChange(event) {
        setConfirmPassword(event.target.value);

    }

    function comparePasswords(password, confirmPassword) {
        if (password === confirmPassword) {
            return true;
        } else {
            return false;
        }
    }


    function handleConfirmPasswordBlur() {
        const passwordsMatch = comparePasswords(password, confirmPassword);
        if (!password || !confirmPassword) {
            console.log("vazio")
        }

        if (password === confirmPassword) {
            setPassword(password)
        } else {
            toast.error('As senhas não são iguais')
        }
    }

    return (
        <form name={"edit"} className={''} onSubmit={handleSubmitForm}>
            <div className="relative w-full sm:w-[28rem] bg-gray-200">
                <img className="rounded-xl h-[200px] w-full" src={imgURL[0] || data?.banner_photo} alt={""} />
                <label htmlFor="uploadHeader"
                       className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer">
                    <span className="bg-blueberry rounded-xl"><Plus size={32} color={"white"} /></span>
                    <input id="uploadHeader" type="file" className="hidden" onChange={handleChange} />
                </label>
            </div>
            <div className="relative rounded w-24 h-24 bg-gray-200">
                <img className="w-24 max-w-24 rounded-xl ring ring-blueberry ring-offset-2 -mt-10" src={IconURL[0] || data?.photo_url} alt={""} />
                    <label htmlFor="uploadIcon"
                           className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer">
                        <span className="bg-blueberry rounded-xl"><Plus size={32} color={"white"} /></span>
                        <input id="uploadIcon" type="file" className="hidden" onChange={handleChangeIcon} />
                    </label>
            </div>
            <div className={"pt-5 grid grid-cols-1 gap-3"}>
            <input type="text" placeholder="Nome" className="input input-bordered input-info w-full" value={name}  onChange={it => setName(it.target.value)}/>
                <input type="email" placeholder="Email" className="input input-bordered input-info w-full" value={email} />
            </div>

            <div className="flex flex-col items-center w-full gap-2">
                <div className="pt-2 flex flex-row gap-2">
                    <input type="password"
                           placeholder="Nova Senha" className="input input-bordered input-info w-full"
                           value={password}
                           onChange={handlePasswordChange}/>
                    <input type="password"
                           placeholder="Confirmar Senha"
                           className="input input-bordered input-info w-full"
                           value={confirmPassword}
                           onChange={handleConfirmPasswordChange}
                           onBlur={handleConfirmPasswordBlur} />
                </div>
                <div className="pt-2 flex flex-row gap-2 w-full">
                    <input type="tel"
                           placeholder="Telefone"
                           className="input input-bordered input-info w-full"
                           value={phone}
                           onChange={it => setPhone(it.target.value)}
                    />
                </div>
                <input
                    type="date" placeholder="Data de Nascimento"
                    value={birthdate}
                    className="input input-bordered input-info w-full" disabled />
                <textarea
                    placeholder="Bio"
                    className="resize-none textarea textarea-bordered textarea-info textarea-lg w-full"
                    value={description}
                    onChange={it => setDescription(it.target.value)}
                >

                </textarea>
                <div className="pt-2 flex flex-row gap-2">
                    <input type="text"
                           placeholder="RG"
                           className="input input-bordered input-info w-full"
                           onChange={it => setRg(it.target.value)}
                           value={rg}
                    />
                    <input type="text"
                           placeholder="CPF"
                           className="input input-bordered input-info w-full"
                           value={cpf}
                           disabled/>
                </div>
                <input type="text"
                       placeholder="Link Opcional"
                       className="input input-bordered input-info w-full"
                       value={attached}
                       onChange={it => setAttached(it.target.value)}
                       />

            </div>
            <div className={'pt-5 flex justify-end'}>
                <button
                    className={'btn w-40 rounded-full bg-accent border-0 text-white flex justify-center hover:bg-turquoise-500'}
                    type={'submit'}>
                    ATUALIZAR
                </button>
            </div>
        </form>
    )
}
