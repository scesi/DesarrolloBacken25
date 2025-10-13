import { UserRole } from '../interfaces/users.interface';

export interface IUpdateUser {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  phoneCountryCode?: string;
  country?: string;
  city?: string;
  email?: string;
  role?: UserRole;
}
