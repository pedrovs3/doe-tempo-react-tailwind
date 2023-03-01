import {Link, NavLink} from "react-router-dom";
import { useForm } from "react-hook-form";
import {apiCep} from "../../api/consulta_cep";
import {FormEvent, useEffect, useState} from "react";
import {api} from "../../lib/axios";
import {formToJSON} from "axios";
import getFieldValue from "react-hook-form/dist/logic/getFieldValue";

interface genderProps {
	id: string,
	name: string
}

export const Form = () => {

	const {register, handleSubmit, setValue, setFocus} = useForm();

	const [filled, setFilled] = useState(false);
	const [cepState, setCepState] = useState('');
	const [gender, setGender] = useState<genderProps[]>([]);
	const [addressNumber, setAddressNumber] = useState('');
	const [complement, setComplement] = useState('');



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

	const handleSubmitForm = async (e: any) => {
		e.preventDefault();

		console.log(e.target.firstChild);
		const formData = new FormData(e.target.firstChild)
		formData.delete('address[number]')
		formData.delete('address[postal_code]')
		// @ts-ignore
		formData.set('address', { number: addressNumber, postal_code: cepState, complement: complement})

		for (const pair of formData.entries()) {
			console.log(`${pair[0]}, ${pair[1]}`);
		}

		const response = await api.post('/user/', formData, {
			headers: {
				"Content-Type": "multipart/form-data"
			}
		});
		console.log(response)

		// try {
		// 	const user = await fetch('http://localhost:3333/user/', {
		// 		body: formData,
		// 		method: 'POST',
		// 	})
		//
		// 	console.log(user)
		//
		// 	alert('Criado com exito')
		// } catch (e) {
		// 	alert(e)
		// }

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

	const handleChange = (e) => {
		setAddressNumber(e.target.value)
		setComplement(e.target.value)
	}

	return (
			<form name={"cadastro"} className={'w-full h-full pr-6 flex flex-col justify-between'} onSubmit={handleSubmitForm}>
				<form className={"flex flex-col gap-3 pt-24"}>
					<input id="nome" name={'name'} type="text" className="input bg-white text-black w-full focus:input-bordered focus:input-success capitalize" placeholder="Nome Completo"/>
					<div className="flex flex-2 justify-between">
						<input id="cpf" name={'cpf'} type="Number" className="input bg-white text-black w-full focus:input-bordered focus:input-success mr-1" placeholder="CPF" required/>
						<input id="cep" name={'postal_code'} type="text" className="input bg-white text-black w-full focus:input-bordered focus:input-success ml-1" placeholder="CEP (apenas números)" {...register("cep")} onChange={checkCEP} maxLength={11} value={cepState}/>
					</div>
					<input id="email" name={'email'} type="email" className="input bg-white text-black w-full focus:input-bordered focus:input-success" placeholder="E-mail"/>
					<input id="senha" name={'password'} type="password" className="input bg-white text-black w-full focus:input-bordered focus:input-success" placeholder="Senha"/>
					<input id="nascimento" name={'birthdate'} type="date" className="input bg-white text-black w-full focus:input-bordered focus:input-success placeholder-blue-500" placeholder="Data de Nascimento"/>
					<select className="select w-full max-w-xs" name={'gender'}>
						{ gender.map((gender) => (<option key={gender.id} value={gender.id} className={'input'}>{gender.name}</option>)) }
					</select>
					<input id="estado" type="text" className="input bg-white text-black w-full focus:input-bordered focus:input-success" placeholder="Estado" {...register("uf" )} disabled={filled}/>
					<div className="flex flex-2 justify-between">
						<input id="cidade" type="text" className="input bg-white text-black w-full focus:input-bordered focus:input-success mr-1" placeholder="Cidade" {...register("city" )} disabled={filled}/>
						<input id="bairro" type="text" className="input bg-white text-black w-full focus:input-bordered focus:input-success ml-1" placeholder="Bairro" {...register("neighborhood" )} disabled={filled}/>
					</div>
					<div className="flex flex-2 justify-between">
						<input id="rua" type="text" className="input bg-white text-black w-full focus:input-bordered focus:input-success mr-1" placeholder="Rua"  {...register("address" )} disabled={filled}/>
						<input id="numero" name={'address[number]'} type="text" className="input bg-white text-black w-full focus:input-bordered focus:input-success ml-1" placeholder="Número" onChange={handleChange} value={addressNumber} />
					</div>
					<input id="complemento" name={'address[complement]'} type="text" className="input bg-white text-black w-full focus:input-bordered focus:input-success" placeholder="Complemento" onChange={handleChange} value={complement} />
				</form>
				<div className="flex flex-col gap-3 items-end pb-56">
					<button className={"btn btn-primary w-1/4 rounded-full bg-turquoise-700 border-0 text-xl text-black hover:bg-blue-600 hover:text-white"} type="submit">Enviar</button>
					<button className={"btn btn-accent w-1/8 rounded-full bg-tufts-blue px-6 border-0 text-l text-black hover:bg-blue-600 hover:text-white"} type="submit"><p><NavLink to={'/login'}>Sou uma ONG</NavLink></p></button>
				</div>
			</form>
	)
}
