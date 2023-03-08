import {Link, NavLink} from "react-router-dom";
import { useForm } from "react-hook-form";
import {apiCep} from "../../api/consulta_cep";
import {FormEvent, useEffect, useState} from "react";
import {api} from "../../lib/axios";


export const Form = () => {

    const {register, handleSubmit, setValue, setFocus} = useForm();

    const [filled, setFilled] = useState(false);
    const [cepState, setCepState] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [foundation_date, setFoundation_date] = useState('');
    const [nameState, setNameState] = useState('')
    const [addressNumber, setAddressNumber] = useState('');
    const [complement, setComplement] = useState('');


    const onSubmit = (e) => {
        console.log(e);
    }

    const checkCEP = async (e: any) => {
        setCepState(e.target.value.replace(/\D/g, ''))

        if(cepState.length === 7) {
            console.log(cepState)
            const cep = e.target.value;

            const { data } = await apiCep.get(`/${cep}/json/`)

            setValue('address', data.logradouro);
            setValue('neighborhood', data.bairro);
            setValue('city', data.localidade);
            setValue('uf', data.uf);
            setValue('cep', data.cep)
            setFilled(true)
        }
    }

    const handleSubmitForm = async (e: FormEvent) => {
        e.preventDefault()

        try {
            const ngo = await api.post('/ngo/', {
                name: nameState,
                cnpj: cnpj,
                email: email,
                password: password,
                foundation_date: foundation_date,
                address: {
                    postal_code: cepState,
                    number: addressNumber,
                    complement: complement || null
                },
            })

            alert(ngo)
        }
        catch (e) {
            console.log(e)
            alert("Houve um erro!")
        }

    }

    const handleChangeNumber = (e) => {
        setAddressNumber(e.target.value)
    }

    return (
        <form name={"cadastro"} className={'w-full h-full pr-6 flex flex-col justify-between'} onSubmit={handleSubmitForm}>
            <div className={"flex flex-col gap-3 pt-24"}>
                <input
                    id="nome"
                    type="text"
                    className="input bg-white text-black w-full focus:input-bordered focus:input-success capitalize"
                    placeholder="Nome completo da instituição"
                    onChange={(e) => setNameState(e.target.value)}
                    value={nameState}
                />
                <div className="flex flex-2 justify-between">
                    <input id="cnpj"
                           type="Number"
                           className="input bg-white text-black w-full focus:input-bordered focus:input-success mr-1"
                           placeholder="CNPJ"
                           onChange={event => setCnpj(event.target.value)}
                           value={cnpj}
                           required
                    />
                    <input id="cep"
                           type="text"
                           className="input bg-white text-black w-full focus:input-bordered focus:input-success ml-1"
                           placeholder="CEP (apenas números)"
                           {...register("cep")}
                           onChange={checkCEP} maxLength={11}
                           value={cepState}
                    />
                </div>
                <input
                    id="email"
                    type="email"
                    className="input bg-white text-black w-full focus:input-bordered focus:input-success"
                    placeholder="E-mail"
                    onChange={event => setEmail(event.target.value)}
                    value={email}
                />
                <input id="senha"
                       type="password"
                       className="input bg-white text-black w-full focus:input-bordered focus:input-success"
                       placeholder="Senha"
                       onChange={event => setPassword(event.target.value)}
                       value={password}
                />
                <input id="foundation"
                       type="text" onFocus={(e) => (e.target.type = "date")}
                       className="input bg-white text-black w-full focus:input-bordered focus:input-success placeholder-blue-500"
                       placeholder="Data de Fundação"
                       onChange={event => setFoundation_date(event.target.value)}
                       value={foundation_date}
                />
                <input id="estado"
                       type="text"
                       className="input bg-white text-black w-full focus:input-bordered focus:input-success"
                       placeholder="Estado" {...register("uf" )}
                       disabled={filled}
                />
                <div className="flex flex-2 justify-between">
                    <input id="cidade"
                           type="text"
                           className="input bg-white text-black w-full focus:input-bordered focus:input-success mr-1"
                           placeholder="Cidade" {...register("city" )}
                           disabled={filled}
                    />
                    <input id="bairro"
                           type="text"
                           className="input bg-white text-black w-full focus:input-bordered focus:input-success ml-1"
                           placeholder="Bairro" {...register("neighborhood" )}
                           disabled={filled}/>
                </div>
                <div className="flex flex-2 justify-between">
                    <input id="rua"
                           type="text" className="input bg-white text-black w-full focus:input-bordered focus:input-success mr-1"
                           placeholder="Rua"  {...register("address" )}
                           disabled={filled}/>
                    <input id="numero"
                           type="text"
                           className="input bg-white text-black w-full focus:input-bordered focus:input-success ml-1"
                           placeholder="Número"
                           onChange={handleChangeNumber}
                           value={addressNumber}
                    />
                </div>
                <input id="complemento"
                       type="text"
                       className="input bg-white text-black w-full focus:input-bordered focus:input-success"
                       placeholder="Complemento"
                       onChange={event => setComplement(event.target.value)}
                       value={complement}
                />
            </div>
            <div className="flex flex-col gap-3 items-end pb-56">
                <button className={"btn btn-primary w-1/4 rounded-full bg-blueberry border-0 text-xl text-black hover:bg-blue-600 hover:text-white"} type="submit"><p className={'text-turquoise-700'}>Enviar</p></button>
                <button className={"btn btn-accent w-1/8 rounded-full bg-maya-blue px-6 border-0 text-l text-black hover:bg-blue-600 hover:text-white"} type="submit"><p><NavLink to={'/signup'}>Sou um Voluntário</NavLink></p></button>
            </div>
        </form>
    )
}
