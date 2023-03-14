import {Clock, GlobeHemisphereEast, Heart, MagnifyingGlass, MapPin, ShareNetwork} from "phosphor-react";

export function DetalhesBody(){

    return (
            <div className={"flex flex-col gap-3 pt-6 w-1/4"}>
                <h1 className={'text-4xl font-bold text-blueberry text-start pt-8'}>Professor(a) de Matemática</h1>
                <div className="input-group flex items-center gap-3 pt-3">
                    <Heart size={32} />
                    <p>Favoritar</p>
                    <ShareNetwork size={32} />
                    <p>Compartilhar</p>
                </div>
                <div>
                    <h1 className={"font-bold text-2xl pb-2"}>Sobre o Projeto:</h1>
                    <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </span>
                </div>
                <div className={"flex flex-col"}>
                    <h1 className={"font-bold text-2xl pb-2"}>Detalhes:</h1>
                   <ul className={""}>
                       <li className={"flex flex-row items-center gap-2"}><Clock size={32} /> 4 Horas</li>
                       <li className={"flex flex-row items-center gap-2"}><GlobeHemisphereEast size={32} /> Pode ser feito a distância</li>
                       <li className={"flex flex-row items-center gap-2"}><MapPin size={32} /> Rua das Rosas, Goth City, 666</li>
                   </ul>
                </div>
            </div>
    )
}