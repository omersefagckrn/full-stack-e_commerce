import { Document, model, Schema, Types } from 'mongoose';

export interface IAddress {
	_id?:string;
	user_id: Types.ObjectId;
	title: string;
	address: string;
	zip_code: string;
	city_name: string;
	country_name: string;
}

export interface IAddress extends Document {}

const AddressSchema = new Schema(
	{
		user_id: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User'
		},
		title: {
			type: String,
			required: true
		},
		address: {
			type: String,
			required: true
		},
		zip_code: {
			type: String,
			required: true
		},
		city_name: {
			type: String,
			required: true
		},
		country_name: {
			type: String,
			required: true
		}
	},
	{
		versionKey: false
	}
);

export default model<IAddress>('Address', AddressSchema);
