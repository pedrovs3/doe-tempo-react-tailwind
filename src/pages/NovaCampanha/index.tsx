import {Header} from "../../components/HeaderCampanha";
import {Form} from "../../components/Form";
import {CampanhaForm} from "../../components/FormCampanha";
import {CampanhaFormDois} from "../../components/FormCampanhaDois";

export default function NovaCampanha() {
    return (
        <div className={'p-4'}>
            <Header/>
            <h1 className={'text-4xl font-bold text-blueberry text-start pt-8'}>Nova Campanha</h1>
            <div className={'flex justify-center items-center gap-20'}>
                <CampanhaForm/>
                <div className="divider divider-horizontal"></div>
                <CampanhaFormDois/>
            </div>
        </div>
    )

}
