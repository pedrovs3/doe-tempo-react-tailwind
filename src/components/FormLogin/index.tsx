import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { toast } from "react-toastify";


export function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginSuccess, setLoginSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmitForm = async (e: FormEvent) => {
        e.preventDefault();
        if (localStorage.getItem("token")) {
            localStorage.removeItem("token");
        }
        try {
            const { data } = await api.post("/auth/", {
                email: email,
                password: password,
            });

            api.defaults.headers.common.Authorization = `Bearer ${await data.token}`
            console.log(await data);
            console.log(data.token);
            localStorage.setItem("token", `Bearer ${await data.token}`);

            setLoginSuccess(true);

        } catch (e) {
            console.log(e);
            toast.error("E-mail ou senha incorretos!");
        }
    };

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
                <div className="form-control w-full flex flex-2 justify-between">
                    <input
                        id="senha"
                        type="password"
                        className="p-5 bg-little-white flex-1 py-2 border-b-2 border-gray-400 focus:border-blueberry text-gray-600 placeholder-gray-400 outline-none"
                        placeholder="Senha"
                        onChange={event => setPassword(event.target.value)}
                        value={password}
                    />
                    <label className="label">
                        <Link to={"/redefinir-senha"} >
                        <a className="link link-info">Esqueceu a senha?</a>
                        </Link>
                    </label>
                </div>
            </div>
            <div className="flex flex-col gap-12 items-center pt-14">
                <button
                    className={"btn bg-turquoise-700 rounded-full border-none w-96 text-neutral-900 hover:bg-accent"}
                    type="submit"> Entrar
                </button>
                <div>
                    <p>Não possui uma conta?
                        <br/>
                        <Link to={"/signup"} >
                        <a className="link link-info">Faça seu cadastro aqui.</a>
                        </Link>
                    </p>
                </div>

            </div>
        </form>
    )
}
