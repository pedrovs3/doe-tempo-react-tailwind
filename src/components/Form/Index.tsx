import {ChangeEventHandler, useEffect, useState} from "react";
import {apiCep} from "../../api/consulta_cep";
import {Link, NavLink} from "react-router-dom";

type cepInfo = {
	"cep": string,
	"logradouro": string,
	"complemento": string,
	"bairro": string,
	"localidade": string,
	"uf": string,
	"ibge": string,
	"gia": string,
	"ddd": string,
	"siafi":string
}

export function Form() {
	const [cep, setCep] = useState<cepInfo>();
	const [uf, setUf] = useState('')

	const handlerCEP = async (e: Event) => {
		try {
			// @ts-ignore
			 if (e.target.value.length > 7) {
				 // @ts-ignore
				 const infoCEP = await apiCep.get(`/${e.target.value}/json/`)

				 setCep(infoCEP.data)
			 }
		} catch (e) {
			console.log(e);
		}
	}

	if (cep) {
		useEffect(()=> {
			setUf(cep.uf)
		}, [cep])
	}



	return (
			<form name={"cadastro"} className={'w-full pr-6 flex flex-col justify-between'}>
				<div className={"flex flex-col gap-3 pt-6"}>
					<input id="nome" type="text" className="input bg-white text-black w-full focus:input-bordered focus:input-success capitalize" placeholder="Nome Completo"/>
					<div className="flex flex-2 justify-between">
						<input id="cpf" type="Number" className="input bg-white text-black w-full focus:input-bordered focus:input-success mr-1" placeholder="CPF"/>
						<input id="cep" type="Number" className="input bg-white text-black w-full focus:input-bordered focus:input-success ml-1" placeholder="CEP (apenas números)" onChange={handlerCEP}/>
					</div>
					<input id="email" type="email" className="input bg-white text-black w-full focus:input-bordered focus:input-success" placeholder="E-mail"/>
					<input id="senha" type="password" className="input bg-white text-black w-full focus:input-bordered focus:input-success" placeholder="Senha"/>
					<input id="nascimento" type="date" className="input bg-white text-black w-full focus:input-bordered focus:input-success placeholder-blue-500" placeholder="Data de Nascimento"/>
					<input id="estado" type="text" className="input bg-white text-black w-full focus:input-bordered focus:input-success" placeholder="Estado" value={cep?.uf}/>
					<div className="flex flex-2 justify-between">
						<input id="cidade" type="text" className="input bg-white text-black w-full focus:input-bordered focus:input-success mr-1" placeholder="Cidade"/>
						<input id="bairro" type="text" className="input bg-white text-black w-full focus:input-bordered focus:input-success ml-1" placeholder="Bairro"/>
					</div>
					<div className="flex flex-2 justify-between">
						<input id="rua" type="text" className="input bg-white text-black w-full focus:input-bordered focus:input-success mr-1" placeholder="Rua"/>
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
