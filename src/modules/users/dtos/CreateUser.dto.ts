import { IUser, UserRole } from '../interfaces/users.interface';

// export interface ICreateUser {
//   firstName: string;
//   lastName: string;
//   phoneNumber: string;
//   phoneCountryCode: string;
//   country: string;
//   city: string;
//   email: string;
//   role: UserRole;
//   password: string;
// }
export type ICreateUser = Omit<IUser, 'id'>