import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from '../../../config/database.config'

import { IVoto } from "../interfaces/votes.interface";


export interface VoteCreationAttributes extends Optional<IVoto, 'id'> {}

class Vote extends Model<IVoto, VoteCreationAttributes> implements IVoto {
  public id!: number;
  public name!: string;
  public date!: Date;
  public count!: number;
  public finished!: boolean;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Vote.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    finished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    // modelName: 'Votes',
    tableName: 'votes',
    timestamps: true,
  }
)

export default Vote;