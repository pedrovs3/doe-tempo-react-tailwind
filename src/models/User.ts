import {UserAddress} from "./UserAddress";
import {Gender} from "./Gender";
import {Phone} from "./Phone";
import {SupportedCampaign} from "./SupportedCampaign";
import {PostUser} from "./PostUser";
import {UserCount} from "./UserCount";

export interface User {
	id:                  string;
	name:                string;
	email:               string;
	password:            string;
	cpf:                 string;
	id_gender:           string;
	birthdate:           Date;
	rg:                  null;
	id_type:             string;
	description:         null;
	banner_photo:        string;
	attached_link:       null;
	photo_url:           string;
	created_at:          Date;
	user_address:        UserAddress;
	gender:              Gender;
	user_phone?:         Phone;
	supported_campaigns: SupportedCampaign[];
	post_user:           PostUser[];
	_count:              UserCount;
}
