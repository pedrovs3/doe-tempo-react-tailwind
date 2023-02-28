import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import ptBR from 'date-fns/locale/pt-BR';
import {CaretDown, HouseSimple, Plus} from "phosphor-react";
import TimePicker from "rc-time-picker";
import 'rc-time-picker/assets/index.css';
import React, { useState } from "react";


export function CampanhaForm(){

    registerLocale("pt-BR", ptBR);

    const [selectedDate, setSelectedDate] = useState(null);

    const [time, setTime] = useState('');

    return (
        <form name={"campanha"} className={'w-1/2 pr-6 flex flex-col justify-between py-6'}>
            <div className={"flex flex-col gap-3 pt-6"}>
                <h2 className={'text-1xl font-bold text-slate-400'}>Nome da campanha</h2>
                <input type="text" placeholder="O nome da sua ação" className="input input-bordered input-branco-bem-claro w-full max-w-xs" />
                <div className="flex flex-col gap-3 pt-2">
                    <h2 className={'text-1xl font-bold text-slate-100'}>Sobre a campanha</h2>
                    <textarea placeholder="Nos conte mais sobre a sua ação..." className="textarea textarea-bordered textarea-lg w-full max-w-xs"></textarea>
                </div>
                <div className="flex flex-col gap-3 pt-2">
                    <h2 className={'text-1xl font-bold text-slate-100'}>Local</h2>
                    <div className="card w-80 bg-base-100 shadow-xl">
                        <div className="card-body">
                            <div className={'flex gap-4'}>
                                <HouseSimple size={32}/>
                                <p className={'text-1xl font-bold text-slate-100'}>Endereço registrado</p>
                            </div>
                            <span>Av. Paulista, 19, Bloco 3</span>
                            <span>São  Paulo, SP</span>
                            <div className="card-actions">
                                <button className="btn btn-square  rounded-full btn-sm absolute top-0 right-0 mt-2 mr-2">
                                    <Plus size={32} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"flex flex-col gap-3 pt-2"}>

                    <h2 className={'text-1xl font-bold text-slate-400'}>Informações adicionais</h2>
               <div className={'bg-blueberry flex gap-2 w-3/5'}>
                    <DatePicker
                        className={'border-2 border-branco-bem-claro rounded-lg p-1 w-32'}
                        dateFormat="dd/MM/yyyy"
                        locale="pt-BR"
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                    />
                    <TimePicker
                        className={'border-2 border-branco-bem-claro rounded-lg p-1 w-32'}
                        use12Hours
                        showSecond={false}
                        focusOnOpen={true}
                        format="hh:mm A"
                        onChange={e => setTime(e.format('LT'))}
                    />
                   <TimePicker
                       className={'border-2 border-branco-bem-claro rounded-lg p-1 w-32'}
                       use12Hours
                       showSecond={false}
                       focusOnOpen={true}
                       format="hh:mm A"
                       onChange={e => setTime(e.format('LT'))}
                   />
                    </div>
                </div>


            </div>
        </form>
    )
}