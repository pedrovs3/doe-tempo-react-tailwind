import {CaretLeft} from "phosphor-react";
import AuthImg from "../../assets/img/IconAuth.svg";

export function Header() {
    return (
        <div className={'h-full w-full flex  justify-between'}>
            <button className={'btn w-40 rounded-full bg-turquoise-700 border-0 text-white flex justify-center hover:bg-accent'} type={'submit'}>
                <CaretLeft size={32} className={'text-blueberry'} />
                <p className={'text-blueberry'}>Voltar</p>
            </button>
            <img src={AuthImg} className={'align-center justify-start'} alt={'image people authenthication'}/>
        </div>

    )
}
