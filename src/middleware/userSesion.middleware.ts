import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { ENV } from "../config/env.config";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
export const validateSesionUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // validaciones
    // si la req tiene token en los headers
    const { authorization } = req.headers

    if (!authorization) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // validar el tippo de token
    // "Bearer ey....eyJ......" => ['Bearer', 'ey....eyJ......', ..]
    const [ type, token ] = authorization.split(' ')
    if (type !== "Bearer") {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // validar el token
    jwt.verify(
      token,
      ENV.JWT_SECRET,
      async (error, decoded) => {
        if (error || !decoded) {
          console.error('Error validando el JWT', error)
          return res.status(401).send({
            message: 'No access'
          })
        }

        // const user =
        // buscar los datos de usuario en BD 

        req.user = decoded;

        // si todo esta bien entonces llamamos a la funcion next();
        next();
      }
    )

  } catch (error) {
    console.error('Erron on validate sesion user', error)
  }
}