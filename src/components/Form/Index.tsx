import {Link, NavLink} from "react-router-dom";
import { useForm } from "react-hook-form";
import {apiCep} from "../../api/consulta_cep";
import { useEffect, useState} from "react";
import {api} from "../../lib/axios";

interface genderProps {
	id: string,
	name: string
}

export const Form = () => {

	const {register, handleSubmit, setValue, setFocus} = useForm();

	const [filled, setFilled] = useState(false);
	const [cepState, setCepState] = useState('');
	const [gender, setGender] = useState<genderProps[]>([]);



	useEffect(() => {

		const fetchData = async () => {
			// get the data from the api
			const data = await api.get('/gender');
			// convert the data to json


			// set state with the result
			setGender(data.data.genders);
		}


		fetchData().catch(console.error);


		console.log(gender)
	},[])

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

	return (
			<form name={"cadastro"} className={'w-full h-full pr-6 flex flex-col justify-between'} onSubmit={handleSubmit(onSubmit)}>
				<div className={"flex flex-col gap-3 pt-24"}>
					<input id="nome" type="text" className="input bg-white text-black w-full focus:input-bordered focus:input-success capitalize" placeholder="Nome Completo"/>
					<div className="flex flex-2 justify-between">
						<input id="cpf" type="Number" className="input bg-white text-black w-full focus:input-bordered focus:input-success mr-1" placeholder="CPF" required/>
						<input id="cep" type="text" className="input bg-white text-black w-full focus:input-bordered focus:input-success ml-1" placeholder="CEP (apenas números)" {...register("cep")} onChange={checkCEP} maxLength={11} value={cepState}/>
					</div>
					<input id="email" type="email" className="input bg-white text-black w-full focus:input-bordered focus:input-success" placeholder="E-mail"/>
					<input id="senha" type="password" className="input bg-white text-black w-full focus:input-bordered focus:input-success" placeholder="Senha"/>
					<input id="nascimento" type="date" className="input bg-white text-black w-full focus:input-bordered focus:input-success placeholder-blue-500" placeholder="Data de Nascimento"/>
					<select className="select w-full max-w-xs">
						{ gender.map((gender) => (<option key={gender.id} value={gender.id} className={'input focus:borde'}>{gender.name}</option>)) }
					</select>
					<input id="estado" type="text" className="input bg-white text-black w-full focus:input-bordered focus:input-success" placeholder="Estado" {...register("uf" )} disabled={filled}/>
					<div className="flex flex-2 justify-between">
						<input id="cidade" type="text" className="input bg-white text-black w-full focus:input-bordered focus:input-success mr-1" placeholder="Cidade" {...register("city" )} disabled={filled}/>
						<input id="bairro" type="text" className="input bg-white text-black w-full focus:input-bordered focus:input-success ml-1" placeholder="Bairro" {...register("neighborhood" )} disabled={filled}/>
					</div>
					<div className="flex flex-2 justify-between">
						<input id="rua" type="text" className="input bg-white text-black w-full focus:input-bordered focus:input-success mr-1" placeholder="Rua"  {...register("address" )} disabled={filled}/>
						<input id="numero" type="text" className="input bg-white text-black w-full focus:input-bordered focus:input-success ml-1" placeholder="Número" />
					</div>
					<input id="complemento" type="text" className="input bg-white text-black w-full focus:input-bordered focus:input-success" placeholder="Complemento" />
				</div>
				<div className="flex flex-col gap-3 items-end pb-56">
					<button className={"btn btn-primary w-1/4 rounded-full bg-success border-0 text-xl text-black hover:bg-blue-600 hover:text-white"} type="submit">Enviar</button>
					<button className={"btn btn-accent w-1/8 rounded-full bg-success px-6 border-0 text-l text-black hover:bg-blue-600 hover:text-white"} type="submit"><p><NavLink to={'/login'}>Sou uma ONG</NavLink></p></button>
				</div>
			</form>
	)
}
