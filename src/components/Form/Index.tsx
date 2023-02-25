import {Link, NavLink} from "react-router-dom";
import { useForm } from "react-hook-form";

export function Form() {

	const {register, handleSubmit, setValue, setFocus} = useForm();

	const onSubmit = (e) => {
		console.log(e);
	}

	const checkCEP = (e) => {
		const cep = e.target.value.replace(/\D/g, '');
		console.log(cep);
		fetch(`https://viacep.com.br/ws/${cep}/json/`).then(res => res.json()).then(data => {
			console.log(data);
			setValue('address', data.logradouro);
			setValue('neighborhood', data.bairro);
			setValue('city', data.localidade);
			setValue('uf', data.uf);
			setFocus()
		});
	}

	return (
			<form name={"cadastro"} className={'w-full pr-6 flex flex-col justify-between'} onSubmit={handleSubmit(onSubmit)}>
				<div className={"flex flex-col gap-3 pt-6"}>
					<input id="nome" type="text" className="input bg-white text-black w-full focus:input-bordered focus:input-success capitalize" placeholder="Nome Completo"/>
					<div className="flex flex-2 justify-between">
						<input id="cpf" type="Number" className="input bg-white text-black w-full focus:input-bordered focus:input-success mr-1" placeholder="CPF" required/>
						<input id="cep" type="Number" className="input bg-white text-black w-full focus:input-bordered focus:input-success ml-1" placeholder="CEP (apenas números)" {...register("cep")} onBlur={checkCEP}/>
					</div>
					<input id="email" type="email" className="input bg-white text-black w-full focus:input-bordered focus:input-success" placeholder="E-mail"/>
					<input id="senha" type="password" className="input bg-white text-black w-full focus:input-bordered focus:input-success" placeholder="Senha"/>
					<input id="nascimento" type="date" className="input bg-white text-black w-full focus:input-bordered focus:input-success placeholder-blue-500" placeholder="Data de Nascimento"/>
					<input id="estado" type="text" className="input bg-white text-black w-full focus:input-bordered focus:input-success" placeholder="Estado" {...register("uf" )}/>
					<div className="flex flex-2 justify-between">
						<input id="cidade" type="text" className="input bg-white text-black w-full focus:input-bordered focus:input-success mr-1" placeholder="Cidade" {...register("city" )}/>
						<input id="bairro" type="text" className="input bg-white text-black w-full focus:input-bordered focus:input-success ml-1" placeholder="Bairro" {...register("neighborhood" )}/>
					</div>
					<div className="flex flex-2 justify-between">
						<input id="rua" type="text" className="input bg-white text-black w-full focus:input-bordered focus:input-success mr-1" placeholder="Rua"  {...register("address" )}/>
						<input id="numero" type="text" className="input bg-white text-black w-full focus:input-bordered focus:input-success ml-1" placeholder="Número"/>
					</div>
				</div>
				<div className="flex flex-col gap-3 items-end pt-14">
					<button className={"btn btn-primary w-1/4 rounded-full bg-success border-0 text-xl text-black hover:bg-blue-600 hover:text-white"} type="submit">Enviar</button>
					<button className={"btn btn-accent w-1/8 rounded-full bg-success px-6 border-0 text-l text-black hover:bg-blue-600 hover:text-white"} type="submit"><p><NavLink to={'/login'}>Sou uma ONG</NavLink></p></button>
				</div>
			</form>
	)
}
