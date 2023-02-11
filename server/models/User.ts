import bcrypt from 'bcrypt';
import { Document, model, Schema } from 'mongoose';

export interface IUser {
	name: string;
	surname: string;
	email: string;
	password: string;
	isAdmin?: boolean;
}

export interface UserDocument extends Document, IUser {
	matchPassword: (password: string) => Promise<Boolean>;
}

const UserSchema = new Schema<IUser>(
	{
		name: { type: String, required: true },
		surname: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		isAdmin: {
			type: Boolean,
			required: true,
			default: false
		}
	},
	{
		versionKey: false,
		timestamps: true
	}
);

UserSchema.methods.matchPassword = async function (this: any, enteredPassword: string) {
	return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.pre('save', async function (this: UserDocument, next) {
	if (!this.isModified('password')) next();
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

export default model<UserDocument>('User', UserSchema);
