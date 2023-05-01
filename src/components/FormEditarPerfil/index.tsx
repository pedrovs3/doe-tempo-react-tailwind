import {FormEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {api} from "../../lib/axios";

export function FormEditarPerfil(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [editSuccess, setEditSuccess] = useState(false);
    const navigate = useNavigate();



    const handleSubmitForm = async (e: FormEvent)    => {
        e.preventDefault();

        try {
            const {data} = await api.post('/auth/', {
                email: email,
                password: password
            })

            console.log(data)
            setEditSuccess(true)

        } catch (e) {
            console.log(e)
            alert("Usuário ou senha incorreto.")
        }
    }

    useEffect(() => {
        if (editSuccess) {
            navigate("/editar-perfil/:id");
        }
    }, [editSuccess]);



    return (
        <form name={"edit"} className={''} onSubmit={handleSubmitForm}>
            <input type="text" placeholder="Type here" className="input input-bordered input-info w-full max-w-xs" />
            <div className="flex w-full">
                <div className="grid h-20 flex-grow rounded-box place-items-center">
                    <input type="text" placeholder="Type here" className="input input-bordered input-info w-full max-w-xs" />
                </div>
                <div className="grid h-20 flex-grow rounded-box place-items-center">
                    <input type="text" placeholder="Type here" className="input input-bordered input-info w-full max-w-xs" />
                </div>
            </div>
        </form>
    )
}
