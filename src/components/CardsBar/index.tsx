import {Divide, MagnifyingGlass} from "phosphor-react";

export function CardsBar() {
    return (
        <div className={'pt-5 h-full w-full flex'}>
            <select className="select select-ghost w-full max-w-xs">
                <option disabled selected>Causas</option>
                <option>Svelte</option>
                <option>Vue</option>
                <option>React</option>
            </select>
            <select className="select select-ghost w-full max-w-xs">
                <option disabled selected>Habilidades</option>
                <option>Svelte</option>
                <option>Vue</option>
                <option>React</option>
            </select>
                <input type="text"  placeholder="Pesquise alguma oportunidade" className="input w-full max-w-xs"/>
        </div>
    )
}
