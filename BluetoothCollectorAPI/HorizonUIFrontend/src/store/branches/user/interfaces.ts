import { UserActionType } from './enums';

export interface UserState {
	error: boolean;
	loading: boolean;
	users: IUser[];
}

export interface IUser {
	name: string;
	email: string;
	role: Role;
}

export enum Role {
	Admin = 0,
	User = 1,
	Device = 2
}

export interface UserAction {
	type: UserActionType;
	payload?: Partial<UserState>;
}
