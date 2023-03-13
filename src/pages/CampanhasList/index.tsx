import {Header} from "../../components/HeaderCampanha";
import {CampanhaForm} from "../../components/FormCampanha";
import {CampanhaFormDois} from "../../components/FormCampanhaDois";
import {CardsCampanha} from "../../components/CardsCampanha";
import {CardsBar} from "../../components/CardsBar";

export default function CampanhasList() {
    return (
        <div className={'p-4'}>
            <CardsBar/>
            <h1 className={'text-4xl font-bold text-blueberry text-start pt-8'}>Oportunidades</h1>
            <div className={'flex justify-center items-center gap-20'}>
                <CardsCampanha/>
            </div>
        </div>
    )

}
