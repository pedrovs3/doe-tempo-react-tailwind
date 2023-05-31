import React, {FormEvent, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {api} from "../../lib/axios";
import {decodeJwt} from "../../utils/jwtDecode";
import {Plus, X} from "phosphor-react";
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage';
import {storage} from "../../firebase";
import {format} from "date-fns";
import {toast} from "react-toastify";

interface UserPayload {
    name: string;
    email: string;
    password: string;
    cpf: string;
    birthdate: string;
    description: string;
    address: {
        postal_code: string;
        number: string;
        complement: string;
    };
    gender: string;
    rg: string;
    banner_photo: string;
    photo_url: string;
    phone?: { number: string }[];
    attached_link?: { link: string; source: string }[];
}
export interface Link {
    id: string;
    attached_link: string;
    id_source: string;
    id_user: string;
    id_ngo: string | null;
    source: {
        id: string;
        name: string;
    };
}
export interface SourceResponse {
    sources: Source[];
}

export interface Source {
    id:     string;
    name:   string;
    _count: Count;
}

export interface Count {
    attached_link: number;
}

export interface User {
    id:                  string;
    name:                string;
    email:               string;
    password:            string;
    cpf:                 string;
    id_gender:           string;
    birthdate:           string;
    rg:                  null;
    id_type:             string;
    description:         null;
    banner_photo:        string;
    photo_url:           string;
    created_at:          Date;
    attached_link:       AttachedLink[];
    user_address:        UserAddress;
    gender:              Gender;
    user_phone:          UserPhone;
    supported_campaigns: SupportedCampaign[];
    post_user:           any[];
    _count:              Count;
}

export interface Count {
    supported_campaigns: number;
    following:           number;
}

export interface AttachedLink {
    id:            string;
    attached_link: string;
    id_source:     string;
    id_user:       string;
    id_ngo:        null;
    source:        Source;
}

export interface Source {
    id:   string;
    name: string;
}

export interface Gender {
    name:         string;
    abbreviation: string;
}

export interface SupportedCampaign {
    campaign: Campaign;
}

export interface Campaign {
    id:              string;
    title:           string;
    description:     string;
    campaign_photos: CampaignPhoto[];
    is_active:       boolean;
}

export interface CampaignPhoto {
    photo_url: string;
}

export interface UserAddress {
    id:         string;
    id_address: string;
    id_user:    string;
    address:    Address;
}

export interface Address {
    id:          string;
    postal_code: string;
    number:      string;
    complement:  null;
}

export interface UserPhone {
    phone: Phone;
}

export interface Phone {
    number: string;
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
    const maxLength = 20;
    const navigate = useNavigate();
    const routeParams = useParams();
    const id = routeParams.id
    const [data, setData] = useState<User>();
    const [user, setUser ] = useState<object>();
    const [linkSocial, setLinkSocial] = useState<Source[]>([]);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [cpf, setCpf] = useState('')
    const [rg, setRg] = useState('')
    const [attached, setAttached] = useState('')
    const [sourceLink, setSourcelink] = useState('')
    const [attachedLink, setAttachedLink] = useState<Link[]>([]);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [birthdate, setBirthdate] = useState<string>("")
    const [description, setDescription] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [postalNumber, setPostalNumber] = useState('')
    const [complement, setComplement] = useState('')
    const [gender, setGender] = useState('')
    const [editSuccess, setEditSuccess] = useState(false);
    const [imgURL, setImgURL] = useState<string>();
    const [iconURL, setIconURL] = useState<string[]>([]);

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
            setData(user.user);
        };

        fetchData();
    }, [imgURL]);


    function limitLinkSize(link: string, maxLength: number): string {
        if (!link) {
            return '';
        }

        if (link.length <= maxLength) {
            return link;
        } else {
            return link.substring(0, maxLength - 3) + '...';
        }
    }

    useEffect(() => {
        if(data?.name) {
            setName(data?.name)
            setEmail(data?.email)
            setBirthdate(data.birthdate.split("T")[0])
            setDescription(data?.description)
            setCpf(data?.cpf)
            setPostalCode(data?.user_address?.address.postal_code)
            setPostalNumber(data?.user_address?.address.number)
            setComplement(data?.user_address?.address.complement)
            setGender(data?.id_gender)
            setRg(data?.rg)
            setPhone(data?.user_phone?.phone.number)
            setAttachedLink(data?.attached_link)

        }
    }, [data]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get("/sources");
            const data = response.data;
            setLinkSocial(data.sources)
        };

        if (linkSocial) {
            fetchData();
        }
    }, []);



    const handleSubmitForm = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const prevAttachedLink = attachedLink.map((link) => ({ link: link.attached_link, source: link.source.id }))
            const payload: UserPayload = {
                name: name,
                email: email,
                password: password,
                cpf: cpf,
                birthdate: birthdate,
                description: description,
                address: {
                    postal_code: postalCode,
                    number: postalNumber,
                    complement: complement,
                },
                gender: gender,
                rg: rg,
                banner_photo: imgURL,
                photo_url: iconURL[0],
                attached_link: prevAttachedLink
            };

            if (phone) {
                payload.phone = [{ number: phone }];
            }
            console.log(...prevAttachedLink)
            if (attached !== '' && sourceLink !== '') {
                payload.attached_link = [ ...prevAttachedLink, { link: attached, source: sourceLink }];
            }

            console.log(payload)

            const { data } = await api.put(`/user/${id}`, payload);
            console.log(data);
            setEditSuccess(true);
        } catch (e) {
            console.log(data);
            alert("Não mudou nada.");
        }
    };




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
                    setImgURL(url);
                    console.log(imgURL)
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
                    setIconURL([url]);
                    console.log(url)
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

    const handleSelectChange = (event) => {
        const selectedId = event.target.value;
        setSourcelink(selectedId);
    };

    const removeIndex = (e: any) => {
        e.preventDefault();
        const link = e.target.parentElement.parentElement.children[1].attributes.item("href").value
        console.log(link)
        const containsLink = attachedLink.map((linkAttached) => {
            return linkAttached.attached_link == link;
        })
        console.log(containsLink)

        if (containsLink.includes(true)) {
            const links = attachedLink.filter((linkAttached) => {
                if (linkAttached.attached_link != link) {
                    return linkAttached
                }
            })
            console.log(links)
            setAttachedLink(links)
        }
    }


    return (
        <form name={"edit"} className={''} onSubmit={handleSubmitForm}>
            <div className="relative w-full sm:w-[28rem] bg-gray-200">
                <img className="rounded-xl h-[200px] w-full" src={imgURL || data?.banner_photo} alt={""} />
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
                <input type="email" placeholder="Email" className="input input-bordered input-info w-full" value={email}  onChange={it => setEmail(it.target.value)} />
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
                <div className="pt-2 flex flex-row gap-2 w-full">
                <select className="select select-info" onChange={handleSelectChange}>
                    <option disabled selected>Selecione uma rede social</option>
                    {linkSocial.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.name}
                        </option>
                    ))}
                </select>
                <input type="text"
                       placeholder="Link Opcional"
                       className="input input-bordered input-info w-full"
                       value={attached}
                       onChange={it => setAttached(it.target.value)}
                       />
            </div>
                <div className={"flex flex-col gap-2"}>
                    {attachedLink.map((link : Link) => (
                        <div key={link.id} className={"flex flex-row gap-2 badge badge-ghost h-10"}>
                            {link.source.name === "Twitter" && (
                                <i className="fa-brands fa-twitter fa-xl"></i>
                            )}
                            {link.source.name === "LinkedIn" && (
                                <i className="fa-brands fa-linkedin fa-xl"></i>
                            )}
                            {link.source.name === "Instagram" && (
                                <i className="fa-brands fa-instagram fa-xl"></i>
                            )}
                            {link.source.name === "Facebook" && (
                                <i className="fa-brands fa-facebook fa-xl"></i>
                            )}
                            <a href={link.attached_link} target="_blank" rel="noopener noreferrer" className="link link-hover text-xl font-semibold">
                                {limitLinkSize(link.attached_link, maxLength)}
                            </a>
                            <button className="btn btn-circle btn-xs" type={"button"} onClick={removeIndex}>
                                <X size={20} />
                            </button>
                        </div>

                    ))}
                </div>
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
