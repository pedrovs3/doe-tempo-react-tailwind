import Denied from '../../assets/img/undraw_cancel_re_pkdm.svg'
import {NavLink} from "react-router-dom";

export default function UnauthorizedPage() {
    return (
        <div className={'w-screen h-screen overflow-hidden flex flex-col justify-center items-center'}>
            <img src={Denied} alt={"unauthorized"} className={"h-1/4 pb-20"}/>
            <div className={'flex flex-col items-center justify-center'}>
                <h1 className={'text-8xl font-bold text-blueberry'}>401</h1>
                <h1 className={'text-5xl font-medium text-blueberry'}>Ação não autorizada!</h1>
            </div>
            <span className={'pb-5 pt-2 text-gray-500'}>Possivelmente você não está autenticado.</span>
            <div className={'flex flex-row gap-5 pb-2 w-1/5'}>
                <NavLink to={'/signup'} className={'flex-1'}>
                    <button className={'w-full flex-1 btn bg-blueberry border-0 hover:bg-little-white hover:text-blueberry'}>
                        Cadastrar-se
                    </button>
                </NavLink>
                <NavLink to={'/login'} className={'flex-1'}>
                    <button className={'w-full btn bg-blueberry border-0 hover:bg-little-white hover:text-blueberry'}>
                        Entrar
                    </button>
                </NavLink>
            </div>
            <NavLink to={'/'}>
                <button className={'btn bg-blueberry border-0 hover:bg-little-white hover:text-blueberry'}>
                    Voltar para tela inicial
                </button>
            </NavLink>
        </div>
    )
}
