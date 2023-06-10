
import NotFoundSvg from "../../assets/img/pageNotFound.svg"
import {Navigate, NavLink, useNavigate} from "react-router-dom";
export default function PageNotFound() {
    const navigate = useNavigate()

    return (
        <div className={'w-screen h-screen flex justify-center items-center flex-col gap-20 overflow-hidden'}>
            <img src={NotFoundSvg} alt={"Not found image"} className={"h-1/4"}/>
            <div className={'flex flex-col items-center justify-center'}>
                <h1 className={'text-8xl font-bold text-blueberry'}>404</h1>
                <h1 className={'text-5xl font-medium text-blueberry'}>Página não encontrada!</h1>
            </div>
            <NavLink to={'/'}>
                <button className={'btn bg-blueberry border-0 hover:bg-little-white hover:text-blueberry'}>
                        Voltar para tela inicial
                </button>
            </NavLink>
        </div>
    )
}
