import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from '../../../config/database.config';

import { IUser, UserRole } from "../interfaces/users.interface";

export interface UserCreationAttributes extends Optional<IUser, 'id'> {}

class User extends Model<IUser, UserCreationAttributes> implements IUser {
  public id!: string;
  public firstName!: string;
  public lastName!: string;
  public phoneNumber!: string;
  public phoneCountryCode!: string;
  public country!: string;
  public city!: string;
  public email!: string;
  public role!: UserRole;
  public password!: string;
  // public dateOfBith!: Date;
  declare createdAt: Date;
  declare updatedAt: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,    
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 50]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 50]
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [7, 15]
      }
    },
    phoneCountryCode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 5]
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 50]
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 50]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    role: {
      type: DataTypes.ENUM(...Object.values(UserRole)),
      allowNull: false,
      defaultValue: UserRole.USER,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 150]
      }
    },
    // dateOfBith: {
    //   type: DataTypes.DATE,
    //   allowNull: true,
    // }
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['email']
      },
      {
        fields: ['role']
      },
      {
        fields: ['country']
      },
      {
        fields: ['city']
      }
    ]
  }
)

export default User;
