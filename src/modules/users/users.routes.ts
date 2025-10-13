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

const UserRouter = Router();

UserRouter.post('/', createUser);

UserRouter.get('/', getUsers);
UserRouter.get('/profile', getUserProfile);
UserRouter.get('/:id', getUserById);

UserRouter.put('/:id', updateUser);
UserRouter.patch('/:id', updateUserPartial);

UserRouter.delete('/:id', deleteUser);

export default UserRouter;