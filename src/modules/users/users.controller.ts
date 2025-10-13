import { Request, Response } from "express";
import {
  createUserService,
  deleteUserService,
  getUserByIdService,
  getUsersService,
  updateUserService,
  getUserProfileService,
} from "./users.service";
import { IUserFilter, UserRole } from "./interfaces/users.interface";

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const result = await getUserProfileService();

    if (!result.ok) {
      res.status(400).send({
        message: result.message,
        status: 400,
        ok: false,
      });
      return;
    }

    res.status(200).send({
      message: result.message,
      status: 200,
      ok: true,
      data: result.data,
    });
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    res.status(500).send({
      message: 'Internal server error',
      status: 500,
      ok: false,
    });
  }
}

export const createUser = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    // Basic validations
    if (!data.firstName || !data.lastName || !data.email || !data.phoneNumber) {
      res.status(400).send({
        message: 'Missing required fields: firstName, lastName, email, phoneNumber',
        status: 400,
        ok: false,
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      res.status(400).send({
        message: 'Invalid email format',
        status: 400,
        ok: false,
      });
      return;
    }

    // Validate role
    if (data.role && !Object.values(UserRole).includes(data.role)) {
      res.status(400).send({
        message: `Invalid role. Allowed: ${Object.values(UserRole).join(', ')}`,
        status: 400,
        ok: false,
      });
      return;
    }

    const result = await createUserService(data);

    if (!result.ok) {
      res.status(400).send({
        message: result.message,
        status: 400,
        ok: false,
      });
      return;
    }

    res.status(201).send({
      message: result.message,
      status: 201,
      ok: true,
      data: result.data,
    });
  } catch (error) {
    console.error('Error in createUser:', error);
    res.status(500).send({
      message: 'Internal server error',
      status: 500,
      ok: false,
    });
  }
}

export const getUsers = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    
    // Safe validation and sanitization
    const filter: IUserFilter = {};
    
    // firstName
    if (query.firstName && typeof query.firstName === 'string') {
      const sanitizedName = query.firstName.trim();
      if (sanitizedName.length > 0 && sanitizedName.length <= 50) {
        filter.firstName = sanitizedName;
      }
    }
    
    // lastName
    if (query.lastName && typeof query.lastName === 'string') {
      const sanitizedLast = query.lastName.trim();
      if (sanitizedLast.length > 0 && sanitizedLast.length <= 50) {
        filter.lastName = sanitizedLast;
      }
    }
    
    // email
    if (query.email && typeof query.email === 'string') {
      const sanitizedEmail = query.email.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (sanitizedEmail.length > 0 && sanitizedEmail.length <= 100 && emailRegex.test(sanitizedEmail)) {
        filter.email = sanitizedEmail;
      }
    }
    
    // role
    if (query.role && typeof query.role === 'string') {
      if (Object.values(UserRole).includes(query.role as UserRole)) {
        filter.role = query.role as UserRole;
      }
    }
    
    // country
    if (query.country && typeof query.country === 'string') {
      const sanitizedCountry = query.country.trim();
      if (sanitizedCountry.length > 0 && sanitizedCountry.length <= 50) {
        filter.country = sanitizedCountry;
      }
    }
    
    // city
    if (query.city && typeof query.city === 'string') {
      const sanitizedCity = query.city.trim();
      if (sanitizedCity.length > 0 && sanitizedCity.length <= 50) {
        filter.city = sanitizedCity;
      }
    }

    const result = await getUsersService(filter);

    if (!result.ok) {
      res.status(400).send({
        message: result.message,
        status: 400,
        ok: false,
      });
      return;
    }

    res.status(200).send({
      message: result.message,
      status: 200,
      ok: true,
      data: result.data,
    });
  } catch (error) {
    console.error('Error in getUsers:', error);
    res.status(500).send({
      message: 'Internal server error',
      status: 500,
      ok: false,
    });
  }
}

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    
    // Validate id
    const numericId = Number(id);
    if (isNaN(numericId) || numericId <= 0) {
      res.status(400).send({
        message: 'Invalid user id',
        status: 400,
        ok: false,
      });
      return;
    }
    
    const result = await getUserByIdService(numericId);

    if (!result.ok) {
      res.status(404).send({
        message: result.message,
        status: 404,
        ok: false,
      });
      return;
    }

    res.status(200).send({
      message: result.message,
      status: 200,
      ok: true,
      data: result.data,
    });
  } catch (error) {
    console.error('Error in getUserById:', error);
    res.status(500).send({
      message: 'Internal server error',
      status: 500,
      ok: false,
    });
  }
}

// update whole resource
export const updateUser = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const id = data.id;

    if (!id || isNaN(Number(id))) {
      res.status(400).send({
        message: 'Invalid user id',
        status: 400,
        ok: false,
      });
      return;
    }

    // Validate email format if provided
    if (data.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        res.status(400).send({
          message: 'Invalid email format',
          status: 400,
          ok: false,
        });
        return;
      }
    }

    // Validate role
    if (data.role && !Object.values(UserRole).includes(data.role)) {
      res.status(400).send({
        message: `Invalid role. Allowed: ${Object.values(UserRole).join(', ')}`,
        status: 400,
        ok: false,
      });
      return;
    }

    const result = await updateUserService(Number(id), data);

    if (!result.ok) {
      res.status(400).send({
        message: result.message,
        status: 400,
        ok: false,
      });
      return;
    }

    res.status(200).send({
      message: result.message,
      status: 200,
      ok: true,
      data: result.data,
    });
  } catch (error) {
    console.error('Error in updateUser:', error);
    res.status(500).send({
      message: 'Internal server error',
      status: 500,
      ok: false,
    });
  }
}

export const updateUserPartial = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const id = req.params.id;
    
    // Validate id
    const numericId = Number(id);
    if (isNaN(numericId) || numericId <= 0) {
      res.status(400).send({
        message: 'Invalid user id',
        status: 400,
        ok: false,
      });
      return;
    }

    // Validate email format if provided
    if (data.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        res.status(400).send({
          message: 'Invalid email format',
          status: 400,
          ok: false,
        });
        return;
      }
    }

    // Validate role if provided
    if (data.role && !Object.values(UserRole).includes(data.role)) {
      res.status(400).send({
        message: `Invalid role. Allowed: ${Object.values(UserRole).join(', ')}`,
        status: 400,
        ok: false,
      });
      return;
    }

    const result = await updateUserService(numericId, data);

    if (!result.ok) {
      res.status(400).send({
        message: result.message,
        status: 400,
        ok: false,
      });
      return;
    }

    res.status(200).send({
      message: result.message,
      status: 200,
      ok: true,
      data: result.data,
    });
  } catch (error) {
    console.error('Error in updateUserPartial:', error);
    res.status(500).send({
      message: 'Internal server error',
      status: 500,
      ok: false,
    });
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    
    // Validate id
    const numericId = Number(id);
    if (isNaN(numericId) || numericId <= 0) {
      res.status(400).send({
        message: 'Invalid user id',
        status: 400,
        ok: false,
      });
      return;
    }

    const result = await deleteUserService(numericId);

    if (!result.ok) {
      res.status(404).send({
        message: result.message,
        status: 404,
        ok: false,
      });
      return;
    }

    res.status(200).send({
      message: result.message,
      status: 200,
      ok: true,
      data: result.data,
    });
  } catch (error) {
    console.error('Error in deleteUser:', error);
    res.status(500).send({
      message: 'Internal server error',
      status: 500,
      ok: false,
    });
  }
}
