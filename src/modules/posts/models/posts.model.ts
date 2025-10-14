import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from '../../../config/database.config';
import { IPost, PostStatus } from "../interfaces/posts.interface";
import User from "../../users/models/users.model";

export interface PostCreationAttributes extends Optional<IPost, 'id' | 'totalVotes' | 'status'> {}

class Post extends Model<IPost, PostCreationAttributes> implements IPost {
  public id!: number;
  public title!: string;
  public content!: string;
  public userId!: number;
  public totalVotes!: number;
  public status!: PostStatus;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 255]
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 10000]
      }
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'user_id',
      references: {
        model: 'users',
        key: 'id'
      },
      validate: {
        notEmpty: true
      }
    },
    totalVotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'total_votes',
      validate: {
        min: 0
      }
    },
    status: {
      type: DataTypes.ENUM(...Object.values(PostStatus)),
      allowNull: false,
      defaultValue: PostStatus.ACTIVE,
      validate: {
        notEmpty: true
      }
    }
  },
  {
    sequelize,
    tableName: 'posts',
    timestamps: true,
    indexes: [
      {
        fields: ['user_id']
      },
      {
        fields: ['status']
      },
      {
        fields: ['created_at']
      },
      {
        fields: ['total_votes']
      }
    ]
  }
)

// Define associations
Post.belongsTo(User, {
  foreignKey: 'userId',
  targetKey: 'id',
  as: 'author'
});

User.hasMany(Post, {
  foreignKey: 'userId',
  sourceKey: 'id',
  as: 'posts'
});

export default Post;
