import { Router } from 'express';
import { 
  createUser, 
  getUsers, 
  updateUser, 
  updateUserPartial, 
  getUserById, 
  deleteUser, 
  getUserProfile,
} from './users.controller';
import { validateSesionUser } from '../../middleware/userSesion.middleware';

const UserRouter = Router();

UserRouter.get('/profile', validateSesionUser, getUserProfile);

UserRouter.post('/', createUser);

UserRouter.get('/', getUsers);
UserRouter.get('/:id', getUserById);

UserRouter.put('/:id', updateUser);
UserRouter.patch('/:id', updateUserPartial);

UserRouter.delete('/:id', deleteUser);

export default UserRouter;