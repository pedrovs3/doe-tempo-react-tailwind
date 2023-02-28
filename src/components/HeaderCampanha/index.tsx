import {CaretLeft} from "phosphor-react";
import avatar from "../../assets/img/avatar-ong.png"

export function Header() {
    return (
        <div className={'h-full w-full flex flex-row justify-between'}>
            <button className={'btn w-40 rounded-full bg-blue-600 bg- border-0 text-white flex justify-center hover:bg-accent'} type={'submit'}>
                <CaretLeft size={32} />
                Voltar
            </button>

            <div className="avatar bg-inherit">
                <div className="w-12 rounded-xl ring ring-primary ring-tufts-blue ring-offset-2">
                    <img src={avatar}/>
                </div>
            </div>

        </div>

    )
}