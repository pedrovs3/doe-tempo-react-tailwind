import axios from "axios";

export const api = axios.create({
	// baseURL: 'https://api-doe-tempo.azurewebsites.net/',
	baseURL: "http://localhost:3333/",
})
