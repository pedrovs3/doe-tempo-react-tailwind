import {Header} from "../../components/Header/Index";
import {Form} from "../../components/Form/Index";

export default function Cadastro() {
    return (
        <div className="flex flex-2 flex-row bg-image overflow-hidden min-h-screen p-4">
            <Header />
            <div className="w-full h-full flex flex-col gap-5 items-center">
                <h1 className="text-5xl font-bold text-neutral-100 text-center pt-8">Voluntário</h1>
                <Form/>
            </div>
        </div>

    )
}
