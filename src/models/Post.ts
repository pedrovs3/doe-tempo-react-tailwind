import {PostLike} from "./PostLike";
import {PostPhoto} from "./PostPhoto";
import {PostCount} from "./PostCount";

export interface Post {
	id:         string;
	content:    string;
	post_likes: PostLike[];
	created_at: Date;
	post_photo: PostPhoto[];
	comment:    any[];
	_count:     PostCount;
}
