import {Campaign} from "./Campaign";
import {PostNgo} from "./PostNgo";
import {NgoAddress} from "./NgoAddress";
import {Type} from "./Type";

export interface Ngo {
	id:              string;
	photo_url:       string;
	created_at:      Date;
	attached_link:   null;
	banner_photo:    string;
	post_ngo:        PostNgo[];
	ngo_address:     NgoAddress;
	ngo_causes:      any[];
	email:           string;
	name:            string;
	password:        string;
	foundation_date: Date;
	type:            Type;
	cnpj:            string;
	campaign:        Campaign[];
	description:     null;
	following:       any[];
	ngo_phone:       any[];
}
