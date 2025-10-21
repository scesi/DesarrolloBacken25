import { IRegisterDto } from './dtos/Register.dto';
import { ILoginDto } from './dtos/Login.dto';
import { IForgotPasswordDto } from './dtos/ForgotPassword.dto';
import { IResetPasswordDto } from './dtos/ResetPassword.dto';
import { IAuthResponse } from './interfaces/auth.interfaces';
import User from '../users/models/users.model';
import { UserRole } from '../users/interfaces/users.interface';
import { securePass } from '../../tools/crypto.tool';
import { generateAccessToken } from '../../tools/jwt.tool';

export const registerService = async (payload: IRegisterDto): Promise<IAuthResponse> => {
  try {
    const existing = await User.findOne({ where: { email: payload.email } });
    if (existing) {
      return { ok: false, message: 'Email is already in use' };
    }

    const passHash = await securePass(payload.password)

    console.log(
      'passHash',passHash
    )
    if (passHash === undefined) {
      throw new Error('Ha fallado el hash de la contraseña')
    }

    const user = await User.create({
      ...payload,
      // firstName: payload.firstName,
      // lastName: payload.lastName,
      // phoneNumber: payload.phoneNumber,
      // phoneCountryCode: payload.phoneCountryCode,
      // country: payload.country,
      // city: payload.city,
      // email: payload.email,
      // role: payload.role,
      role: UserRole.USER,
      password: passHash,
    });

    return { ok: true, message: 'Registered successfully', data: { id: user.id, email: user.email } };
  } catch (error) {
    console.error('Error in registerService:', error);
    return { ok: false, message: 'Error registering user' };
  }
}

export const loginService = async (payload: ILoginDto): Promise<IAuthResponse> => {
  try {
    const user = await User.findOne({ where: { email: payload.email } });
    if (!user) {
      return {
        ok: false,
        message: 'Invalid credentials',
      };
    }

    // TODO: Add password verification when we store password hashes
    
    const token = generateAccessToken({
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
      sub: user.id,
    })

    return {
      ok: true,
      message: 'Login successful',
      data: { 
        id: user.id,
        email: user.email,
        token, // token: token
      },
    };
  } catch (error) {
    console.error('Error in loginService:', error);
    return { ok: false, message: 'Error logging in' };
  }
}

export const forgotPasswordService = async (_payload: IForgotPasswordDto): Promise<IAuthResponse> => {
  try {
    // TODO: Generate token and send email
    return { ok: true, message: 'Password recovery - pending implementation' };
  } catch (error) {
    console.error('Error in forgotPasswordService:', error);
    return { ok: false, message: 'Error processing password recovery' };
  }
}

export const resetPasswordService = async (_payload: IResetPasswordDto): Promise<IAuthResponse> => {
  try {
    // TODO: Verify token and set new password
    return { ok: true, message: 'Password reset - pending implementation' };
  } catch (error) {
    console.error('Error in resetPasswordService:', error);
    return { ok: false, message: 'Error resetting password' };
  }
}

