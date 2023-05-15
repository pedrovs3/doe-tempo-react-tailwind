import React, {FormEvent, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {api} from "../../lib/axios";
import {decodeJwt} from "../../utils/jwtDecode";
import {Plus} from "phosphor-react";
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage';
import {storage} from "../../firebase";
import {format} from "date-fns";
import {toast} from "react-toastify";
interface Data {
    user: User;
}

interface User {
    id:                  string;
    name:                string;
    email:               string;
    password:            string;
    cpf:                 string;
    id_gender:           string;
    birthdate:           Date;
    rg:                  null;
    id_type:             string;
    description:         null;
    banner_photo:        string;
    attached_link:       null;
    photo_url:           string;
    created_at:          Date;
    user_address:        UserAddress;
    gender:              Gender;
    user_phone:          null;
    supported_campaigns: SupportedCampaign[];
    post_user:           PostUser[];
    _count:              UserCount;
}

interface UserCount {
    supported_campaigns: number;
    following:           number;
}

interface Gender {
    name:         string;
    abbreviation: string;
}

interface PostUser {
    post: Post;
}

interface Post {
    id:         string;
    content:    string;
    post_likes: PostLike[];
    created_at: Date;
    post_photo: PostPhoto[];
    comment:    Comment[];
    _count:     PostCount;
}

interface PostCount {
    comment:    string;
    post_ngo:   number;
    post_photo: number;
    post_user:  number;
    post_likes: number;
}

interface Comment {
    id:         string;
    content:    string;
    created_at: Date;
    id_post:    string;
}

interface PostLike {
    id:      string;
    id_user: string;
    id_ngo:  null;
    id_post: string;
}

interface PostPhoto {
    id:        string;
    id_post:   string;
    photo_url: string;
}

interface SupportedCampaign {
    campaign: Campaign;
}

interface Campaign {
    id:    string;
    title: string;
}

interface UserAddress {
    id:         string;
    id_address: string;
    id_user:    string;
    address:    Address;
}

interface Address {
    id:          string;
    postal_code: string;
    number:      string;
    complement:  null;
}

interface Jwt {
    id:    string;
    email: string;
    type:  string;
    iat:   number;
    exp:   number;
}


export function FormEditarPerfil(){
    const decodeJWT = decodeJwt();
    const jwt = decodeJWT as Jwt;
    const userType = jwt.type;
    const userId = jwt.id;
    const navigate = useNavigate();
    const routeParams = useParams();
    const id = routeParams.id
    const [data, setData] = useState<User | null>(null);
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
    const [imgURL, setImgURL] = useState<string[]>([]);
    const [iconURL, setIconURL] = useState<string[]>([]);

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
            setRg(data?.rg)
            setAttached(data.attached_link)
            setPhone(data.user_phone)


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
                photo_url: iconURL[0],
                attached_link: [
                    {
                        link: attached,
                        source: "aee387d7-f314-11ed-ad6b-6045bdf0a5e7",
                    }
                ]
            })

            console.log(data)
            setEditSuccess(true)

        } catch (e) {
            console.log(e)
            alert("Não mudou nada.")
        }
    }

    useEffect(() => {
        if (editSuccess && userType === 'ONG') {
            navigate(`/perfil/ONG/${id}`);
        }else if (editSuccess && userType === 'USER') {
            navigate(`/perfil/USER/${userId}`);
        }

    }, [editSuccess]);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const files = Array.from(event.target.files);

        if (!files) return;

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

    function handleChangeIcon(event: React.ChangeEvent<HTMLInputElement>) {
        const files = Array.from(event.target.files);

        if (!files) return;

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
                <img className="w-24 max-w-24 rounded-xl ring ring-blueberry ring-offset-2 -mt-10" src={iconURL[0] || data?.photo_url} alt={""} />
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
                <div className="pt-2 flex flex-row gap-2 w-full">
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
                <div className="pt-2 flex flex-row gap-2 w-full">
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
