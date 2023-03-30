import {Clock, GlobeHemisphereEast, Heart, HeartStraight, MagnifyingGlass, MapPin, ShareNetwork} from "phosphor-react";
import avatar from '../../assets/img/avatar-ong.png'

interface CampaignProps {
    id: string,
    imgAvatar: string,
    title: string,
    description: string,

}

export function DetalhesBody(props : CampaignProps) {



    return (
        <div className={"flex flex-col gap-3 pt-6 w-1/3"}>
            <h1 className={'text-5xl font-bold text-start pt-8'}>Professor(a) de Matemática</h1>
            <div className={"flex gap-5"}>
                <button className="btn gap-2 w-48 rounded-full bg-maya_blue border-0 text-neutral-900 hover:bg-turquoise-700">
                    <HeartStraight size={32}/>
                    Favoritar
                </button>
                <button className="btn gap-2 w-48 rounded-full bg-maya_blue border-0 text-neutral-900 hover:bg-turquoise-700">
                    <ShareNetwork size={32}/>
                    Compartilhar
                </button>
            </div>
            <div className={"pt-5"}>
                <h1 className={"font-bold text-2xl pb-2 text-neutral-700"}>Sobre o Projeto:</h1>
                <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </span>
            </div>
            <div className={"pt-5"}>
                <h1 className={"font-bold text-2xl pb-2 text-neutral-700"}>Como Contribuir:</h1>
                <div className="card w-auto bg-base-100 border border-neutral-400">
                    <div className="card-body">
                        <h2 className="card-title">Professor(a)</h2>
                        <span className={"text-neutral-400 font-bold"}>FUNÇÃO:</span>
                        <p className={"text-neutral-700 font-bold"}>O professor(a) voluntário poderá ajudar o aluno ensinando funções de 1º grau,
                            gráficos e escalas. Venha com paciência e amor!</p>
                        <span className={"text-neutral-400 font-bold"}>PRÉ-REQUISITOS:</span>
                        <p className={"text-neutral-700 font-bold"}>Formação em pedagogia, soft skills.</p>
                    </div>
                </div>
            </div>
            <div className={"pt-5"}>
                <h1 className={"font-bold text-2xl pb-2 text-neutral-700"}>Realizado pela ONG</h1>
                <div className="card card-side bg-base-100 border border-neutral-400 items-center">
                    <img className={"w-24 h-24 p-1"} src={avatar} alt="Movie"/>
                    <div className="center card-body p-5">
                        <h2 className="card-title text-neutral-400 font-bold">Instituto Luisa Mell</h2>
                        <p className={"text-neutral-700 font-bold"}>ONG especializada em salvar todas formigas albinas do Oceano Pacífico.</p>
                    </div>
                </div>
            </div>
        </div>

    )
}
