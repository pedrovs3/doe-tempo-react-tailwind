import {Header} from "../../components/Header";
import {Form} from "../../components/Form";

export default function Cadastro() {
    return (
        <div className={'flex flex-2 flex-row bg-image w-screen h-screen p-4'}>
                <Header />
                <div className={'w-full flex flex-col h-full gap-5 items-center'}>
                    <h1 className={'text-5xl font-bold text-white text-center pt-8'}>Voluntário</h1>
                    <Form/>
                </div>
            </div>
        )
}
