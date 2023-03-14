import {CardsCampanha} from "../../components/CardsCampanha";
import {CardsBar} from "../../components/CardsBar";

export default function CampanhasList() {
    return (
        <div className={'p-4'}>
            <h1 className={'text-4xl font-bold text-blueberry text-start pt-8'}>Oportunidades</h1>
            <CardsBar/>
            <div className={'flex'}>
                <CardsCampanha/>
                <CardsCampanha/>
                <CardsCampanha/>
                <CardsCampanha/>
            </div>
        </div>
    )

}
