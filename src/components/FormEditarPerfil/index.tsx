import {FormEvent, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {api} from "../../lib/axios";

export function FormEditarPerfil(){
    const navigate = useNavigate();
    const routeParams = useParams();
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [birthdate, setBirthdate] = useState('')
    const [description, setDescription] = useState('')
    const [editSuccess, setEditSuccess] = useState(false);
    const id = routeParams.id


    const handleSubmitForm = async (e: FormEvent)    => {
        e.preventDefault();

        try {
            const {data} = await api.post(`/user/${id}`, {
                name: name,
                email: email,
                password: password,
                cpf: cpf,
                birthdate: birthdate,
                address: {
                    postal_code: props.cep,
                    number: props.numero,
                    complement: props.complemento || null
                },
                gender: gender,
                rg: rg,
                photo_url: link,
                attached_link: link,
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
            navigate("/perfil/:id");
        }
    }, [editSuccess]);



    return (
        <form name={"edit"} className={''} onSubmit={handleSubmitForm}>
            <input type="text" placeholder="Nome" className="input input-bordered input-info w-full" />
            <div className="flex flex-col items-center w-full gap-2">
                <div className="pt-2 flex flex-row gap-2">
                    <input type="password" placeholder="Senha" className="input input-bordered input-info w-full" />
                    <input type="password" placeholder="Confirmar Senha" className="input input-bordered input-info w-full" />
                </div>
                <div className="pt-2 flex flex-row gap-2">
                    <input type="tel"
                           placeholder="Telefone"
                           className="input input-bordered input-info w-full" />
                    <input onFocus={(e) => (e.target.type = "date")}
                           type="text" placeholder="Data de Nascimento"
                           className="input input-bordered input-info w-full" />
                </div>
                <textarea placeholder="Bio" className="textarea textarea-bordered textarea-info textarea-lg w-full" ></textarea>

            </div>

        </form>
    )
}
