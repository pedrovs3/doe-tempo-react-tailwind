import {Header} from "../../components/HeaderCampanha";
import {CampanhaForm} from "../../components/FormCampanha";

export default function EditarCampanha() {
    return (
        <div className={'p-4'}>
            <Header/>
            <h1 className={'text-4xl font-bold text-blueberry text-start pt-8'}>Editar Campanha</h1>
            <div className={'flex justify-center items-center gap-20'}>
                <CampanhaForm/>
                <div className="divider divider-horizontal"></div>
                <CampanhaFormDois/>
            </div>
        </div>
    )

}
