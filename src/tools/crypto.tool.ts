import bcrypt, { hash } from 'bcrypt'

import { ENV } from '../config/env.config'

export const securePass = async (pws: string): Promise<string | undefined> => {
  try {
    // console.log('crypto', pws)
    const salt = await bcrypt.genSaltSync(+ENV.SALTS);
    const hash = await new Promise<string>((resolve, reject) => {
      bcrypt.hash(pws, salt, (err, hash) => {
        if (err) {
          console.error('Ha ocurrido un error al generar el hash de la contraseña', err);
          reject(err);
        } else {
          console.log('hash', hash);
          resolve(hash);
        }
      });
    });
    
    return hash;
  } catch (error) {
    console.error('Error on secure pass', error);
    return undefined;
  }
}

export const validatePassHash = async (plainPass: string, passHash: string): Promise<boolean> => {
  try {
    const result = await new Promise<boolean>((resolve, reject) => {
      bcrypt.compare(plainPass, passHash, (err, result) => {
        if (err) {
          console.error('Ha ocurrido un error al validar el hash de la contraseña', err);
          reject(err);
        } else {
          resolve(!!result);
        }
      });
    });
    
    return result;
  } catch (error) {
    console.error("Error al validar el hash", error);
    return false;
  }
}