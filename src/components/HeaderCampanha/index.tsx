import {CaretLeft} from "phosphor-react";

export function Header() {
    return (
        <div className={'h-full w-full flex flex-row justify-between'}>
            <button className={'btn w-40 rounded-full bg-blue-600 bg- border-0 text-white flex justify-center hover:bg-accent'} type={'submit'}>
                <CaretLeft size={32} />
                Voltar
            </button>
        </div>

    )
}
