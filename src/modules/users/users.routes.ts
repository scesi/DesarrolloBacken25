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
import { userRoleValidation } from '../../middleware/userRole.middleware';
import { UserRole } from './interfaces/users.interface';

const UserRouter = Router();

UserRouter.get('/profile', validateSesionUser, getUserProfile);

UserRouter.post('/', createUser);

UserRouter.get('/', getUsers);
// UserRouter.get('/:id', getUserById);
UserRouter.get(
  '/:id',
  validateSesionUser,
  userRoleValidation(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  getUserById,
);

UserRouter.put('/:id', updateUser);
UserRouter.patch('/:id', updateUserPartial);

UserRouter.delete('/:id', deleteUser);

export default UserRouter;