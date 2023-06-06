import Forgot from '../../assets/img/forgot.svg'
import React, {FormEvent, useEffect, useState} from "react";
import {api} from "../../lib/axios";
import {useNavigate} from "react-router-dom";
import {CaretLeft} from "phosphor-react";
import {toast, ToastContainer} from "react-toastify";

export default function RedefinirSenha() {
    const [email, setEmail] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [verificationCode, setVerificationCode] = useState('');
    const [isCodeVerified, setIsCodeVerified] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingVerification, setIsLoadingVerification] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const navigate = useNavigate();
    let reloaded = false;
    console.log(reloaded)

    useEffect(() => {
        if (loginSuccess) {
            navigate("/feed");
        }
    }, [loginSuccess]);

    useEffect(() => {
        reloaded = true
        if (!reloaded) {

            window.location.reload()
        }
    }, [])



    useEffect(() => {
        let timer;
        if (isCodeSent && countdown > 0) {
            timer = setTimeout(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
        }
        return () => clearTimeout(timer);
    }, [isCodeSent, countdown]);

    const handleSubmitForm = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true); // Ativar o estado de carregamento

            const response = await api.post("/recover/account/", {
                email: email,
            });

            if (response.data) {
                setIsCodeSent(true);
                setCountdown(60);
            }

            console.log("Email enviado com sucesso:", response.data);
        } catch (error) {
            console.error("Erro ao enviar o email:", error);
            alert("Ocorreu um erro ao enviar o email. Por favor, tente novamente mais tarde.");
        } finally {
            setIsLoading(false); // Desativar o estado de carregamento
        }
    };


    const handleSubmitVerificationCode = async (e) => {
        e.preventDefault();

        try {
            setIsLoadingVerification(true); // Ativar o estado de carregamento

            const response = await api.post("/recover/account/verify", {
                email: email,
                verificationCode: verificationCode,
            });
            api.defaults.headers.common["Authorization"] = `Bearer ${await response.data.token}`
            localStorage.setItem("token", `Bearer ${await response.data.token}`);
            setIsCodeVerified(true);
        } catch (error) {
            console.error("Erro ao verificar o código:", error);
            toast.error("Código errado. Insira novamente");
        } finally {
            setIsLoadingVerification(false); // Desativar o estado de carregamento
        }
    };


    const handleSubmitNewPassword = async (e) => {
        e.preventDefault();

        try {
            const response = await api.put("/recover/password", {
                password: newPassword,
            });

            setLoginSuccess(true)

            // Resetar o estado após a definição da nova senha
            setNewPassword("");
            setIsCodeVerified(false);

        } catch (error) {
            toast.error("Ocorreu um erro ao definir a nova senha. Por favor, tente novamente.");
        }
    };

    const handleClick = () => {
        history.back()
    };

    return (
        <><ToastContainer/>
            <form
                onSubmit={isCodeVerified ? handleSubmitNewPassword : (isCodeSent ? handleSubmitVerificationCode : handleSubmitForm)}>
                <div className={"w-screen h-screen overflow-hidden flex flex-col justify-center items-center"}>
                    <img src={Forgot} alt={"unauthorized"} className={"h-1/4 pb-20"}/>
                    <div className={"flex flex-col items-center justify-center"}>
                        <h1 className={"text-5xl font-medium text-blueberry"}>Redefinir sua senha:</h1>
                    </div>
                    {!isCodeSent ? (
                        <div>
                        <span className={"pb-5 text-xl pt-5 text-gray-500"}>
                            Insira seu endereço de email para receber um código de verificação.
                        </span>
                            <div className={"justify-center flex gap-5 pb-5 pt-5"}>
                                <input
                                    type="email"
                                    placeholder="E-mail"
                                    className="input input-bordered input-info w-full max-w-xs"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    disabled={isCodeSent || isCodeVerified}
                                    required/>
                                <button type="submit" className="btn btn-outline btn-info"
                                        disabled={isCodeSent || isCodeVerified}>
                                    {isLoading ? (
                                        <>
                                            Aguarde...
                                            <span className="cursor-not-allowed	"></span>
                                        </>
                                    ) : (
                                        "Enviar"
                                    )}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            {!isCodeVerified ? (
                                <div>
                                <span className={"pb-5 text-xl pt-2 text-gray-500"}>
                                    Insira o código de verificação enviado para o seu email:
                                </span>
                                    <div className={"justify-center flex gap-5 pb-5 pt-5"}>
                                        <input
                                            type="text"
                                            placeholder="Código de verificação"
                                            className="input input-bordered input-info w-full max-w-xs"
                                            value={verificationCode}
                                            onChange={(event) => setVerificationCode(event.target.value)}
                                            required/>
                                        <button type="submit" className="btn btn-outline btn-info">
                                            {isLoadingVerification ? (
                                                <>
                                                    Aguarde...
                                                    <span className="cursor-not-allowed	"></span>
                                                </>
                                            ) : (
                                                "Verificar"
                                            )}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className={"justify-center flex gap-5 pb-5 pt-5"}>
                                        <input
                                            type="password"
                                            placeholder="Nova senha"
                                            className="input input-bordered input-info w-full max-w-xs"
                                            value={newPassword}
                                            onChange={(event) => setNewPassword(event.target.value)}
                                            required/>
                                        <button type="submit" className="btn btn-outline btn-info">
                                            Redefinir Senha
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </form>
        </>

    );
}
