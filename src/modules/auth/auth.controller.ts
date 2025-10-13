import { Request, Response } from 'express';
import { registerService, loginService, forgotPasswordService, resetPasswordService } from './auth.service';

export const register = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    if (!data.firstName || !data.lastName || !data.email || !data.password) {
      res.status(400).send({ message: 'Missing required fields', status: 400, ok: false });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      res.status(400).send({ message: 'Invalid email format', status: 400, ok: false });
      return;
    }
    const result = await registerService(data);
    res.status(result.ok ? 201 : 400).send({ ...result, status: result.ok ? 201 : 400 });
  } catch (error) {
    console.error('Error in register:', error);
    res.status(500).send({ message: 'Internal server error', status: 500, ok: false });
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    if (!data.email || !data.password) {
      res.status(400).send({ message: 'Missing credentials', status: 400, ok: false });
      return;
    }
    const result = await loginService(data);
    res.status(result.ok ? 200 : 401).send({ ...result, status: result.ok ? 200 : 401 });
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

