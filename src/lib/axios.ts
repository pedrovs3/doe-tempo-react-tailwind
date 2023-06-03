import axios from "axios";

export const api = axios.create({
	// baseURL: 'https://api-doe-tempo.azurewebsites.net/',
	baseURL: "http://localhost:3333/",
})

if (api.defaults.headers.common["Authorization"] === undefined) {
	api.defaults.headers.common['Authorization'] = localStorage.getItem("token")
}
