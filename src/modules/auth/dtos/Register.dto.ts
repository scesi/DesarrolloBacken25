import { IUser } from "../../users/interfaces/users.interface";

export type IRegisterDto = Omit<IUser, 'id'>
