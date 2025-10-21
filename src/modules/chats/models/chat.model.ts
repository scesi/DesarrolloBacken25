import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from '../../../config/database.config'

interface IMessage {
  id: number;
  senderId: string;
  receiverId: string;
  content: string;
  readAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MessageCreationAttributes extends Optional<IMessage, 'id' | 'readAt'> {}

class Message extends Model<IMessage, MessageCreationAttributes> implements IMessage {
  public id!: number;
  public senderId!: string;
  public receiverId!: string;
  public content!: string;
  public readAt?: Date | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Message.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    senderId: { type: DataTypes.STRING, allowNull: false },
    receiverId: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    readAt: { type: DataTypes.DATE, allowNull: true }
}, {
    sequelize,
    tableName: 'messages',
    timestamps: true
});

export default Message;