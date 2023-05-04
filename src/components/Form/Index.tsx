import {Link, NavLink} from "react-router-dom";
import { useForm } from "react-hook-form";
import {apiCep} from "../../api/consulta_cep";
import {FormEvent, useEffect, useState} from "react";
import {api} from "../../lib/axios";
import {formToJSON} from "axios";
import getFieldValue from "react-hook-form/dist/logic/getFieldValue";
import {Gender} from "../../models/Gender";


export const Form = () => {

	const {register, handleSubmit, setValue, setFocus} = useForm();

	const [filled, setFilled] = useState(false);
	const [cepState, setCepState] = useState('');
	const [genderSelect, setGenderSelect] = useState('')
	const [cpf, setCpf] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [birthdate, setBirthdate] = useState('');
	const [nameState, setNameState] = useState('')
	const [gender, setGender] = useState<Gender[]>([]);
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

	const checkCEP = async (e: Event) => {
		// @ts-ignore
		setCepState(e?.target.value.replace(/\D/g, ''))

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
			const user = await api.post('/user/', {
				name: nameState,
				email: email,
				password: password,
				cpf: cpf,
				birthdate: birthdate,
				address: {
					postal_code: cepState,
					number: addressNumber,
					complement: complement || null
				},
				gender: genderSelect
			})

			alert(`Parabens ${user.data.name} seu perfil foi criado com sucesso!`)

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
			<form id={'formRegister'} name={"cadastro"} className={'w-full h-full pr-6 flex flex-col justify-between'} onSubmit={handleSubmitForm}>
				<form className={"flex flex-col gap-3 pt-24"}>
					<input id="nome"
						   name={'name'}
						   type="text"
						   className="input bg-white text-black w-full focus:input-bordered focus:input-success capitalize"
						   placeholder="Nome Completo"
						   onChange={(e) => setNameState(e.target.value)}
						   value={nameState}
					/>
					<div className="flex flex-2 justify-between">
						<input
							id="cpf"
							name={'cpf'}
							type="Number"
							className="input bg-white text-black w-full focus:input-bordered focus:input-success mr-1"
							placeholder="CPF"
							onChange={event => setCpf(event.target.value)}
							value={cpf}
							required
						/>
						<input
							id="cep"
							name={'postal_code'}
							type="text"
							className="input bg-white text-black w-full focus:input-bordered focus:input-success ml-1"
							placeholder="CEP (apenas números)" {...register("cep")}
							onChange={checkCEP}
							maxLength={11}
							value={cepState}
						/>
					</div>
					<input
						id="email"
						name={'email'}
						type="email"
						className="input bg-white text-black w-full focus:input-bordered focus:input-success"
						placeholder="E-mail"
						onChange={event => setEmail(event.target.value)}
						value={email}
					/>
					<input
						id="senha"
						name={'password'}
						type="password"
						className="input bg-white text-black w-full focus:input-bordered focus:input-success"
						placeholder="Senha"
						onChange={event => setPassword(event.target.value)}
						value={password}
					/>
					<input
						id="nascimento"
						name={'birthdate'}
						type="text"
						onFocus={(e) => (e.target.type = "date")}
						className="input bg-white text-black w-full focus:input-bordered focus:input-success placeholder-blue-500"
						placeholder="Data de Nascimento"
						onChange={event => setBirthdate(event.target.value)}
						value={birthdate}
					/>
					<select
						className="select w-full max-w-xs"
						name={'gender'}
						onChange={event => setGenderSelect(event.target.value)}
					>
						{
							gender.map((gender) => (
									<option key={gender.id} value={gender.id} className={'input'}>{gender.name}</option>
								)
							)
						}
					</select>
					<input
						id="estado"
						type="text"
						className="input bg-white text-black w-full focus:input-bordered focus:input-success"
						placeholder="Estado"
						{...register("uf" )}
						disabled={filled}
					/>
					<div className="flex flex-2 justify-between">
						<input
							id="cidade"
							type="text"
							className="input bg-white text-black w-full focus:input-bordered focus:input-success mr-1"
							placeholder="Cidade"
							{...register("city" )}
							disabled={filled}
						/>
						<input
							id="bairro"
							type="text"
							className="input bg-white text-black w-full focus:input-bordered focus:input-success ml-1"
							placeholder="Bairro"
							{...register("neighborhood" )}
							disabled={filled}
						/>
					</div>
					<div className="flex flex-2 justify-between">
						<input
							id="rua"
							type="text"
							className="input bg-white text-black w-full focus:input-bordered focus:input-success mr-1"
							placeholder="Rua"
							{...register("address" )}
							disabled={filled}
						/>
						<input
							id="numero"
							name={'address[number]'}
							type="text"
							className="input bg-white text-black w-full focus:input-bordered focus:input-success ml-1"
							placeholder="Número"
							onChange={handleChangeNumber}
							value={addressNumber}
						/>
					</div>
					<input
						id="complemento"
						name={'address[complement]'}
						type="text"
						className="input bg-white text-black w-full focus:input-bordered focus:input-success"
						placeholder="Complemento"
						onChange={event => setComplement(event.target.value)}
						value={complement}
					/>
				</form>
				<div className="flex flex-col gap-3 items-end pb-56">
					<button
						className={"btn btn-primary w-1/4 rounded-full bg-turquoise-700 border-0 text-xl text-neutral-900 hover:bg-blue-600 hover:text-branco"}
						type="submit"
					>
						Enviar
					</button>
					<button
						className={"btn btn-accent w-1/8 rounded-full bg-maya_blue px-6 border-0 text-l text-black hover:bg-turquoise-700 hover:text-white"}>
						<p><NavLink to={'/signup-ong'}>Sou uma ONG</NavLink></p>
					</button>
				</div>
			</form>
	)
}
