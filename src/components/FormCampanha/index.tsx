import {CalendarBlank, CaretDown, Clock, HouseSimple, Plus} from "phosphor-react";
import React, {useState} from "react";

interface AddressProps {
    logradouro : string,
    numero: number,
    localidade? : string,
    uf?: string,
    complemento?: string

}
export function CampanhaForm(props : AddressProps) {


    const [titleState, setStateTitle] = useState('');
    const [descriptionState, setStateDescription] = useState('');
    const [beginDateState, setStateDateBegin] = useState('')
    const [endDateState, setStateDateEnd] = useState('')
    const [radioValue, setRadioValue] = useState('');

    const handleRadioChange = (event) => {
        setRadioValue(event.target.value);
    }

    console.log(radioValue)

    return (
            <div className={"flex flex-col gap-3"}>
                <h2 className={'text-2xl font-bold text-slate-400'}>Nome da campanha</h2>
                <input type="text" placeholder="O nome da sua ação"
                       className="input input-bordered input-branco-bem-claro w-full max-w-xs"
                       value={titleState}
                />
                <div className="flex flex-col gap-3 pt-2">
                    <h2 className={'text-2xl font-bold text-slate-100'}>Sobre a campanha</h2>
                    <textarea  placeholder="Nos conte mais sobre a sua ação..." value={descriptionState} className="resize-none textarea textarea-bordered textarea-lg w-full max-w-xs">
                    </textarea>
                </div>
                <div className="flex flex-col gap-3 pt-2">
                    <h2 className={'text-2xl font-bold text-slate-100'}>Local</h2>
                    <div className="card w-80 bg-base-100 shadow-xl">
                        <div className="card-body">
                            <div className={'flex gap-4'}>
                                <HouseSimple size={32}/>
                                <p className={'text-1xl font-bold text-slate-100'}>Endereço registrado</p>
                            </div>
                            <span>{props.logradouro}, {props.numero}, {props.localidade}, {props.uf}</span>
                            <span>{props .complemento}</span>
                        </div>
                    </div>
                </div>

                <div className={"flex flex-col gap-5 pt-2"}>

                    <h2 className={'text-2xl font-bold text-slate-400'}>Informações adicionais</h2>

                    <div className={'flex gap-2'}>
                    <CalendarBlank size={32} />
                        <h2 className={'text-[1.3rem] font-bold text-slate-100 text-start'}>Dia de ínicio</h2>
                    </div>
                    <div className={'flex flex-col w-64'}>
                        <input
                            id="beginDate"
                            type="date"
                            className="input input-bordered bg-white text-black w-full focus:input-bordered focus:input-success placeholder-blue-500"
                            placeholder="Data de Ínicio"
                            onChange={event => setStateDateBegin(event.target.value)}
                            value={beginDateState}
                        />
                    </div>
                    <div className={'flex gap-2'}>
                        <CalendarBlank size={32} />
                        <h2 className={'text-[1.3rem] font-bold text-slate-100 text-start'}>Dia de término</h2>
                    </div>
                    <div className={'flex flex-col w-64'}>
                        <input
                            id="endDate"
                            type="date"
                            className="input input-bordered bg-white text-black w-full focus:input-bordered focus:input-success placeholder-blue-500"
                            placeholder="Data de Término"
                            onChange={event => setStateDateEnd(event.target.value)}
                            value={endDateState}
                        />
                    </div>
                    <h2 className={'pt-4 text-[1.3rem] font-medium'}>A ação pode ser feita  à distância?</h2>
                    <div className={'flex gap-5 items-center'}>
                        <h2 className={'text-[1.3rem] font-medium'}>Sim</h2>
                    <input type="radio"
                           name="radio-6"
                           className="radio radio-success"
                           value="sim"
                           checked={radioValue === 'sim'}
                           onChange={handleRadioChange}/>
                        <h2 className={'text-[1.3rem] font-medium'}>Não</h2>
                    <input type="radio"
                           name="radio-6"
                           className="radio radio-error"
                           value="nao"
                           checked={radioValue === 'nao'}
                           onChange={handleRadioChange}/>
                    </div>
                    </div>
                </div>

    )
}
