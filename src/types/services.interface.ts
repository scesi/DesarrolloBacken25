
export interface IServiceResponse <T = undefined> {
  message: string;
  ok: boolean;
  data?: T;
}
