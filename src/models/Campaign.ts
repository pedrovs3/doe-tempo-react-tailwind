import {CampaignAddress} from "./CampaignAddress";
import {CampaignParticipant} from "./CampaignParticipants";
import {CampaignCause} from "./CampaignCauses";
import {CampaignPhoto} from "./CampaignPhoto";
import {Ngo} from "./Ngo";

export interface Campaign {
	id:                    string;
	title:                 string;
	description:           string;
	how_to_contribute:     string;
	prerequisites:         string;
	home_office:           boolean;
	begin_date:            Date;
	end_date:              Date;
	ngo:                   Ngo;
	campaign_photos:       CampaignPhoto[];
	campaign_causes:       CampaignCause[];
	campaign_participants: CampaignParticipant[];
	campaign_address:      CampaignAddress;
}
