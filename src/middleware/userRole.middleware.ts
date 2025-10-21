import { NextFunction, Request, Response } from "express";
import { UserRole } from "../modules/users/interfaces/users.interface";
import User from "../modules/users/models/users.model";

export const userRoleValidation = (...roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { sub: userId } = req.user;
  
    if (!userId) {
      return res.status(401).send({
        message: 'Unauthorized',
        ok: false,
        status: 401, 
      })
    }
  
    const user = await User.findByPk(userId);
  
    if (!user) {
      return res.status(401).send({
        message: 'Unauthorized',
        ok: false,
        status: 401, 
      })
    }
    
    if (!roles.includes(user.role)) {
      return res.status(401).send({
        message: 'Unauthorized',
        ok: false,
        status: 401, 
      })
    }
  
    next();
  }
}
