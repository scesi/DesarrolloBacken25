export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  USER = 'user'
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  phoneCountryCode: string;
  country: string;
  city: string;
  email: string;
  role: UserRole;
}

export interface IUserFilter {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: UserRole;
  country?: string;
  city?: string;
}
