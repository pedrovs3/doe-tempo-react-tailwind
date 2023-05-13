import {CaretLeft} from "phosphor-react";


export function Header() {

    const handleClick = () => {
        history.back()
    };

    return (
        <div className={'h-full w-full flex flex-row justify-between'}>
            <button  onClick={handleClick} className={'btn w-40 rounded-full bg-blueberry border-0 text-white flex justify-center hover:bg-accent'} type={'submit'}>
                <CaretLeft size={32} />
                Voltar
            </button>
        </div>

    )
}
