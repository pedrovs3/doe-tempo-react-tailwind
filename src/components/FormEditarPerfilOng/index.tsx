import React, {FormEvent, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {api} from "../../lib/axios";
import {decodeJwt} from "../../utils/jwtDecode";
import {Plus, X} from "phosphor-react";
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage';
import {storage} from "../../firebase";
import {format} from "date-fns";
import {toast} from "react-toastify";
import {Phone} from "../FormEditarPerfil";

interface UserPayload {
    name: string;
    email: string;
    password: string;
    foundation_date: string;
    description: string;
    address: {
        postal_code: string;
        number: string;
        complement: string;
    };
    gender: string;
    cnpj: string;
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
    id:              string;
    photo_url:       string;
    created_at:      Date;
    attached_link:   AttachedLink[];
    banner_photo:    string;
    post_ngo:        PostNgo[];
    ngo_address:     NgoAddress;
    ngo_causes:      any[];
    email:           string;
    name:            string;
    password:        string;
    foundation_date: string;
    type:            Type;
    cnpj:            string;
    campaign:        Campaign[];
    description:     string;
    following:       any[];
    ngo_phone:       NgoPhone;
}

export interface NgoPhone {
    phone: Phone;
}


export interface AttachedLink {
    id:            string;
    attached_link: string;
    source:        Source;
}

export interface Source {
    id:   string;
    name: string;
}

export interface Campaign {
    title:           string;
    id:              string;
    description:     string;
    is_active:       boolean;
    campaign_photos: CampaignPhoto[];
}

export interface CampaignPhoto {
    photo_url: string;
}

export interface NgoAddress {
    address: Address;
}

export interface Address {
    id:          string;
    complement:  null;
    postal_code: string;
    number:      string;
}

export interface PostNgo {
    post: Post;
}

export interface Post {
    id:         string;
    content:    string;
    created_at: Date;
    post_photo: PostPhoto[];
    post_likes: PostLike[];
    comment:    Comment[];
}

export interface Comment {
    id:            string;
    content:       string;
    created_at:    Date;
    id_post:       string;
    comment_likes: any[];
    comment_ngo:   CommentNgo[];
    comment_user:  CommentUser[];
    _count:        Count;
}

export interface Count {
    comment_ngo:   number;
    comment_user:  number;
    comment_likes: number;
}

export interface CommentNgo {
    id:         string;
    id_comment: string;
    id_ngo:     string;
}

export interface CommentUser {
    id:         string;
    id_comment: string;
    id_user:    string;
}

export interface PostLike {
    id:      string;
    id_user: null | string;
    id_ngo:  null | string;
    id_post: string;
}

export interface PostPhoto {
    id:        string;
    id_post:   string;
    photo_url: string;
}

export interface Type {
    name: string;
}

interface Jwt {
    id:    string;
    email: string;
    type:  string;
    iat:   number;
    exp:   number;
}


export function FormEditarPerfilOng(){
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
    const [cnpj, setCnpj] = useState('')
    const [attached, setAttached] = useState('')
    const [sourceLink, setSourcelink] = useState('')
    const [attachedLink, setAttachedLink] = useState<AttachedLink[]>([]);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [birthdate, setBirthdate] = useState<string>("")
    const [description, setDescription] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [postalNumber, setPostalNumber] = useState('')
    const [complement, setComplement] = useState('')
    const [gender, setGender] = useState('')
    const [editSuccess, setEditSuccess] = useState(false);
    const [imgURL, setImgURL] = useState<string>();
    const [iconURL, setIconURL] = useState<string>();

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
            setData(user);
        };

        fetchData();
    }, []);

    console.log(data)


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
            setBirthdate(data.foundation_date.split("T")[0])
            setDescription(data?.description)
            setPostalCode(data?.ngo_address?.address.postal_code)
            setPostalNumber(data?.ngo_address?.address.number)
            setComplement(data?.ngo_address?.address.complement)
            setCnpj(data?.cnpj)
            setIconURL(data.photo_url)
            setImgURL(data.banner_photo)
            // setPhone(data?.ngo_phone?.phone.number)
            // @ts-ignore
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
            let payload: any;

            if (password == "") {
                payload = {
                    name: name,
                    email: email,
                    foundation_date: birthdate,
                    description: description,
                    address: {
                        postal_code: postalCode,
                        number: postalNumber,
                        complement: complement,
                    },
                    cnpj: cnpj,
                    banner_photo: imgURL,
                    photo_url: iconURL,
                    attached_link: prevAttachedLink
                };
            } else {
                payload = {
                    name: name,
                    email: email,
                    password: password,
                    foundation_date: birthdate,
                    description: description,
                    address: {
                        postal_code: postalCode,
                        number: postalNumber,
                        complement: complement,
                    },
                    cnpj: cnpj,
                    banner_photo: imgURL,
                    photo_url: iconURL,
                    attached_link: prevAttachedLink
                };
            }

            console.log(payload)

            if (phone) {
                payload.phone = [{ number: phone }];
            }

            console.log(...prevAttachedLink)
            if (attached !== '' && sourceLink !== '') {
                payload.attached_link = [ ...prevAttachedLink, { link: attached, source: sourceLink }];
            }


            const { data } = await api.put(`/ngo/${jwt.id}`, payload);
            console.log(data);
            setEditSuccess(true);
        } catch (e) {
            console.log(data);
            alert("Não mudou nada.");
        }
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
                    console.log(url)
                    setImgURL(url);
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
                    console.log(url)
                    setIconURL(url);
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


    // @ts-ignore
    return (
        <form name={"edit"} className={''} onSubmit={handleSubmitForm}>
            <div className="relative w-full bg-gray-200">
                <img className="rounded-xl h-[200px] w-full" src={imgURL || data?.banner_photo} alt={""} />
                <label htmlFor="uploadHeader"
                       className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer">
                    <span className="bg-blueberry rounded-xl"><Plus size={32} color={"white"} /></span>
                    <input id="uploadHeader" type="file" className="hidden" onChange={handleChange} />
                </label>
            </div>
            <div className="relative rounded w-24 h-24 bg-gray-200">
                <img className="w-24 max-w-24 rounded-xl ring ring-blueberry ring-offset-2 -mt-10" src={iconURL || data?.photo_url} alt={""} />
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
                    <input
                           placeholder="Cep" className="input input-bordered input-info w-full"
                           value={postalCode}
                           onChange={it => setPostalCode(it.target.value)}
                    />
                    <input
                        placeholder="Número" className="input input-bordered input-info w-full"
                        value={postalNumber}
                        onChange={it => setPostalNumber(it.target.value)}
                    />
                    <input
                        placeholder="Complemento" className="input input-bordered input-info w-full"
                        value={complement}
                        onChange={it => setComplement(it.target.value)}
                    />
                </div>
                <div className="pt-2 flex flex-row gap-2 w-full">
                    <input type="tel"
                           placeholder="Telefone"
                           className="input input-bordered input-info w-full"
                           value={phone}
                           onChange={it => setPhone(it.target.value)}
                    />
                    <input
                        type="date" placeholder="Data de Nascimento"
                        value={birthdate}
                        className="input input-bordered input-info w-full" disabled />
                </div>
                <textarea
                    placeholder="Bio"
                    className="resize-none textarea textarea-bordered textarea-info textarea-lg w-full"
                    value={description}
                    onChange={it => setDescription(it.target.value)}
                >
                </textarea>
                <div className="pt-2 flex flex-row gap-2 w-full">
                    <input type="text"
                           placeholder="CNPJ"
                           className="input input-bordered input-info w-full"
                           onChange={it => setCnpj(it.target.value)}
                           value={cnpj}
                    />
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
                    {
                        // @ts-ignore
                        attachedLink.map((link: Link, index: number) => (
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
