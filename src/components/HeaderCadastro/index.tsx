import {CaretLeft} from "phosphor-react";
import Business from "../../assets/img/business.svg";

const handleClick = () => {
    history.back()
};


export function Header() {
    return (
        <div className={'h-full w-full flex flex-col justify-between'}>
            <button className={'btn w-40 rounded-full bg-turquoise-700 border-0 text-white flex justify-center hover:bg-accent'} type={'submit'}>
                <CaretLeft size={32} className={'text-blueberry'} />
                <p className={'text-blueberry'} onClick={handleClick} >Voltar</p>
            </button>
            <img src={Business} className="hidden lg:hidden xl:block" alt="image for peoples united" />
        </div>

    )
}
