import {CaretLeft} from "phosphor-react";
import AuthImg from "../../assets/img/IconAuth.png";

export function Header() {
    return (
        <div className={'h-full w-full flex  justify-between'}>
            <button className={'btn w-40 rounded-full bg-blue-600 bg- border-0 text-white flex justify-center hover:bg-accent'} type={'submit'}>
                <CaretLeft size={32} />
                Voltar
            </button>
            <img src={AuthImg} className={'align-center justify-start hidden sm:block'} alt={'image people authenthication'}/>
        </div>

    )
}
