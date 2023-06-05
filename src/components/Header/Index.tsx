import {CaretLeft} from "phosphor-react";
import Voluntaries from "../../assets/img/voluntaries.svg";

const handleClick = () => {
	history.back()
};
export function Header() {
	return (
			<div className={'h-full w-full flex flex-col justify-between'}>
				<button className={'btn w-40 rounded-full bg-blueberry border-0 text-white flex justify-center hover:bg-accent'} type={'submit'} onClick={handleClick}>
					<CaretLeft size={32} />
					Voltar
				</button>
				<img src={Voluntaries} className={'align-center hidden lg:block'} alt={'image for peoples united'}/>
			</div>

	)
}
