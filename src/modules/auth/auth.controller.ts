import e, { Request, Response } from 'express';
import { registerService, loginService, forgotPasswordService, resetPasswordService } from './auth.service';
import { LoginSchema } from './schemas/Login.schema';
import { ENV } from '../../config/env.config';

export const register = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const result = await registerService(data);
    res.status(result.ok ? 201 : 400).send({ ...result, status: result.ok ? 201 : 400 });
  } catch (error) {
    console.error('Error in register:', error);
    res.status(500).send({ message: 'Internal server error', status: 500, ok: false });
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { success, data, error} = LoginSchema.safeParse(req.body);

    if (error && !success) {
      res.status(400).send({
        // message: error.issues,
        message: ENV.NODE_ENV === 'development' ? error.issues : "Bad request",
        status: 400,
        ok: false,
      });
      return;
    }

    const result = await loginService(data);

    res.status(result.ok ? 200 : 401).send({ 
      ...result,
      status: result.ok ? 200 : 401,
    });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).send({ message: 'Internal server error', status: 500, ok: false });
  }
}

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    if (!data.email) {
      res.status(400).send({ message: 'Email is required', status: 400, ok: false });
      return;
    }
    const result = await forgotPasswordService(data);
    res.status(result.ok ? 200 : 400).send({ ...result, status: result.ok ? 200 : 400 });
  } catch (error) {
    console.error('Error in forgotPassword:', error);
    res.status(500).send({ message: 'Internal server error', status: 500, ok: false });
  }
}

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    if (!data.token || !data.newPassword) {
      res.status(400).send({ message: 'Token and newPassword are required', status: 400, ok: false });
      return;
    }
    const result = await resetPasswordService(data);
    res.status(result.ok ? 200 : 400).send({ ...result, status: result.ok ? 200 : 400 });
  } catch (error) {
    console.error('Error in resetPassword:', error);
    res.status(500).send({ message: 'Internal server error', status: 500, ok: false });
  }
}

