export interface IAuthResponse<T = unknown> {
  ok: boolean;
  status?: number;
  message: string;
  data?: T;
}

export interface IAuthTokenPayload {
  userId: number;
  email: string;
  role: string;
}

