import User from "./models/users.model";
import { Op } from "sequelize";

import { ICreateUser } from "./dtos/CreateUser.dto";
import { IUpdateUser } from "./dtos/UpdateUser.dto";

import { IUserFilter, IUser } from "./interfaces/users.interface";

import { IServiceResponse } from "../../types";
import { sequelize } from "../../config/database.config";

export const createUserService = async (payload: ICreateUser): Promise<IServiceResponse<IUser>> => {
  try {
    // Check if email already exists
    const existingUser = await User.findOne({
      where: { email: payload.email }
    });

    if (existingUser) {
      return {
        message: 'Email is already in use',
        ok: false,
      }
    }

    const user = await User.create(payload);
  
    return {
      message: 'User created successfully',
      ok: true,
      data: user.dataValues
    }
  } catch (error) {
    console.error('Error in createUserService:', error);
    return {
      message: 'Error creating user',
      ok: false,
    }
  }
}

// Esqueleto para obtener el perfil del usuario (implementación pendiente)
export const getUserProfileService = async (): Promise<IServiceResponse<null>> => {
  try {
    return {
      message: 'User profile - pending implementation',
      ok: true,
      data: null,
    }
  } catch (error) {
    console.error('Error in getUserProfileService:', error)
    return {
      message: 'Error getting user profile',
      ok: false,
    }
  }
}

export const getUsersService = async (filter: IUserFilter): Promise<IServiceResponse<User[]>> => {
  try {
    const whereConditions: any = {};
    
    if (filter.firstName) {
      whereConditions.firstName = {
        [Op.iLike]: `%${filter.firstName}%`
      };
    }
    
    if (filter.lastName) {
      whereConditions.lastName = {
        [Op.iLike]: `%${filter.lastName}%`
      };
    }
    
    if (filter.email) {
      whereConditions.email = {
        [Op.iLike]: `%${filter.email}%`
      };
    }
    
    if (filter.role) {
      whereConditions.role = filter.role;
    }
    
    if (filter.country) {
      whereConditions.country = {
        [Op.iLike]: `%${filter.country}%`
      };
    }
    
    if (filter.city) {
      whereConditions.city = {
        [Op.iLike]: `%${filter.city}%`
      };
    }

    const users = await User.findAll({
      where: whereConditions,
      order: [['createdAt', 'DESC']],
      limit: 100 // Limitar resultados para evitar sobrecarga
    });

    return {
      message: 'Users fetched successfully',
      ok: true,
      data: users,
    }
  } catch (error) {
    console.error('Error in getUsersService:', error)
    return {
      message: 'Error fetching users',
      ok: false,
    }
  }
}

export const getUserByIdService = async (id: number): Promise<IServiceResponse<IUser>> => {
  try {
    const user = await User.findByPk(id);
    
    if (!user) {
      return {
        message: 'User not found',
        ok: false,
      }
    }
    
    return {
      message: 'User fetched successfully',
      ok: true,
      data: user.dataValues,
    }
  } catch (error) {
    console.error('Error in getUserByIdService:', error)
    return {
      message: 'Error fetching user',
      ok: false,
    }
  }
}

export const updateUserService = async (id: number, payload: IUpdateUser): Promise<IServiceResponse<number>> => {
  try {
    // If updating email, ensure it is not used by another user
    if (payload.email) {
      const existingUser = await User.findOne({
        where: { 
          email: payload.email,
          id: { [Op.ne]: id }
        }
      });

      if (existingUser) {
        return {
          message: 'Email is already used by another user',
          ok: false,
        }
      }
    }

    const response = await User.update(payload, {
      where: {
        id,
      }
    });
    
    if (response[0] === 0) {
      return {
        message: 'User not found',
        ok: false,
      }
    }

    return {
      message: 'User updated successfully',
      ok: true,
      data: response[0],
    }
  } catch (error) {
    console.error('Error in updateUserService:', error)
    return {
      message: 'Error updating user',
      ok: false,
    }
  }
}

export const deleteUserService = async (id: number): Promise<IServiceResponse<number>> => {
  try {
    const response = await User.destroy({
      where: {
        id,
      },
      // force: true // HARD - delete
    });

    if (response === 0) {
      return {
        message: 'User not found',
        ok: false,
      }
    }

    return {
      message: 'User deleted successfully',
      ok: true,
      data: response,
    }
  } catch (error) {
    console.error('Error in deleteUserService:', error)
    return {
      message: 'Error deleting user',
      ok: false,
    }
  }
}
