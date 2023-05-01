import Line from "../../assets/img/linha.png";
import {NavLink, useNavigate} from "react-router-dom";
import Google from "../../assets/img/google.png";
import {FormEvent, useEffect, useState} from "react";
import {api} from "../../lib/axios";

export function LoginForm(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginSuccess, setLoginSuccess] = useState(false);
    const navigate = useNavigate();



    const handleSubmitForm = async (e: FormEvent)    => {
        e.preventDefault();

        try {
            const {data} = await api.post('/auth/', {
                email: email,
                password: password
            })

            console.log(data)
            console.log(data.token)
            localStorage.setItem("token", `Bearer ${data.token}`)

            if (data.token) {
                api.defaults.headers.common.Authorization = `Bearer ${data.token}`
            }
            setLoginSuccess(true)

            // alert(data.token || data.token && "Login Correto.")

        } catch (e) {
            console.log(e)
            alert("Usuário ou senha incorreto.")
        }
    }

    useEffect(() => {
        if (loginSuccess) {
            navigate("/feed");
        }
    }, [loginSuccess]);



    return (
        <form name={"login"} className={'w-1/2 pr-6 flex flex-col justify-between py-6'} onSubmit={handleSubmitForm}>
            <div className={"flex flex-col gap-3 pt-6"}>
                <input
                    id="email"
                    type="email"
                    className="p-5 bg-little-white flex-1 py-2 border-b-2 border-gray-400 focus:border-blueberry text-gray-600 placeholder-gray-400 outline-none"
                    placeholder="Login / Email"
                    onChange={event => setEmail(event.target.value)}
                    value={email}
                />
                <div className="flex flex-2 justify-between">
                    <input
                        id="senha"
                        type="password"
                        className="p-5 bg-little-white flex-1 py-2 border-b-2 border-gray-400 focus:border-blueberry text-gray-600 placeholder-gray-400 outline-none"
                        placeholder="Senha"
                        onChange={event => setPassword(event.target.value)}
                        value={password}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-12 items-center pt-14">
                <button
                    className={"btn bg-turquoise-700 rounded-full border-none w-96 text-neutral-900 hover:bg-accent"}
                    type="submit"> Entrar
                </button>
                {/*<img src={Line} className={'sm: w-96'}/>*/}
                {/*<button className="btn-circle bg-tufts-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full sm: bg-blue-600">*/}
                {/*    <img src={Google}/>*/}
                {/*</button>*/}
            </div>
        </form>
    )
}
