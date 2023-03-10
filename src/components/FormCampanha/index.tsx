import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {registerLocale} from "react-datepicker";
import ptBR from 'date-fns/locale/pt-BR';
import {CalendarBlank, CaretDown, Clock, HouseSimple, Plus} from "phosphor-react";
import TimePicker from "rc-time-picker";
import 'rc-time-picker/assets/index.css';
import React, {useState} from "react";


export function CampanhaForm() {

    registerLocale("pt-BR", ptBR);

    const [selectedDate, setSelectedDate] = useState(null);

    const [time, setTime] = useState('');

    return (
        <form name={"campanha"} className={'pr-6 flex flex-col justify-between pt-2'}>
            <div className={"flex flex-col gap-3"}>
                <h2 className={'text-2xl font-bold text-slate-400'}>Nome da campanha</h2>
                <input type="text" placeholder="O nome da sua ação"
                       className="input input-bordered input-branco-bem-claro w-full max-w-xs"/>
                <div className="flex flex-col gap-3 pt-2">
                    <h2 className={'text-2xl font-bold text-slate-100'}>Sobre a campanha</h2>
                    <textarea  placeholder="Nos conte mais sobre a sua ação..."
                              className="resize-none textarea textarea-bordered textarea-lg w-full max-w-xs"></textarea>
                </div>
                <div className="flex flex-col gap-3 pt-2">
                    <h2 className={'text-2xl font-bold text-slate-100'}>Local</h2>
                    <div className="card w-80 bg-base-100 shadow-xl">
                        <div className="card-body">
                            <div className={'flex gap-4'}>
                                <HouseSimple size={32}/>
                                <p className={'text-1xl font-bold text-slate-100'}>Endereço registrado</p>
                            </div>
                            <span>Av. Paulista, 19, Bloco 3</span>
                            <span>São  Paulo, SP</span>
                            <div className="card-actions">
                                <button
                                    type={"button"}
                                    className="btn btn-square  rounded-full btn-sm absolute top-0 right-0 mt-2 mr-2">
                                    <Plus size={24}/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"flex flex-col gap-5 pt-2"}>

                    <h2 className={'text-2xl font-bold text-slate-400'}>Informações adicionais</h2>

                    <div className={'flex gap-2'}>
                    <CalendarBlank size={32} />
                        <h2 className={'text-[1.3rem] font-bold text-slate-100 text-start'}>Dia</h2>
                    </div>

                    <div className={'flex flex-col w-1/3'}>
                        <DatePicker
                            className={'border-2 border-branco-bem-claro rounded-lg p-2'}
                            dateFormat="dd/MM/yyyy"
                            locale="pt-BR"
                            selected={selectedDate} onChange={(date) => setSelectedDate(date)}

                        />
                    </div>
                    <div className={'flex gap-4 flex-row w-96'}>
                        <div className={'flex gap-2'}>
                            <Clock size={32} />
                            <h2 className={'text-[1.3rem] font-bold text-slate-100 text-start'}>Das</h2>
                        </div>
                        <TimePicker
                            className={'border-2 border-branco-bem-claro rounded-lg p-1 w-32'}
                            placeholder={'08:PM'}
                            use12Hours
                            showSecond={false}
                            focusOnOpen={true}
                            format="hh:mm A"
                            onChange={e => setTime(e.format('LT'))}
                        />
                        <h2 className={'text-[1.3rem] font-bold text-slate-100 text-start'}>Ás</h2>
                        <TimePicker
                            className={'border-2 border-branco-bem-claro rounded-lg p-1 w-32'}
                            placeholder={'12:PM'}
                            use12Hours
                            showSecond={false}
                            focusOnOpen={true}
                            format="hh:mm A"
                            onChange={e => setTime(e.format('LT'))}
                        />
                    </div>
                    <h2 className={'pt-4 text-[1.3rem] font-medium'}>A ação pode ser feita  à distância?</h2>
                    <div className={'flex gap-5 items-center'}>
                        <h2 className={'text-[1.3rem] font-medium'}>Sim</h2>
                    <input type="radio" name="radio-6" className="radio radio-success" checked />
                        <h2 className={'text-[1.3rem] font-medium'}>Não</h2>
                    <input type="radio" name="radio-6" className="radio radio-error" />
                    </div>
                    </div>
                </div>
        </form>
    )
}
