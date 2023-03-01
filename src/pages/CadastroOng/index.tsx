import {Header} from "../../components/HeaderCadastro";
import {Form} from "../../components/FormOng";

export default function CadastroOng() {
    return (
        <div className={'bg-ong flex flex-2 flex-row w-screen h-screen p-4'}>
            <Header />
            <div className={'w-full flex flex-col h-full gap-5 items-center'}>
                <h1 className={'text-5xl font-bold text-blueberry text-center pt-8'}>ONG's</h1>
                <Form/>
            </div>
        </div>
    )

}
