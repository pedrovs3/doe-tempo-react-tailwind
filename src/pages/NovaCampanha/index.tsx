import {Header} from "../../components/HeaderCampanha";
import {Form} from "../../components/Form";
import {CampanhaForm} from "../../components/FormCampanha";

export default function NovaCampanha() {
    return (
        <div className={'p-4'}>
            <Header/>
            <h1 className={'text-4xl font-bold text-blueberry text-start pt-8'}>Nova Campanha</h1>
            <div className={'w-full flex flex-col h-full gap-5 items-center'}>
                <CampanhaForm/>
            </div>
        </div>
    )

}
