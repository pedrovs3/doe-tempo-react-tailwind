import {Header} from "../../components/HeaderLogin";
import { LoginForm } from "../../components/FormLogin";
import DoeTempo from "../../assets/img/logo-login.svg"

export default function Login() {
    return (
        <div className={'bg-white-blue flex flex-2 flex-row bg-image w-screen h-screen p-2'}>
            <Header/>
            <div className={'w-full flex flex-col h-full gap-10 items-center justify-center'}>
                <img src={DoeTempo} alt={'Logo da empresa AMPI'} className={'scale-150'}/>
                <LoginForm/>
            </div>
        </div>

    )
}
