import { sequelize } from "../config/dbconfig";
import { DataType } from 'sequelize-typescript';


export const Feed = sequelize.define('Feed', {
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataType.STRING,
        allowNull: false,
      },
      url: {
        type: DataType.STRING,
        allowNull: false,
      },
      description: {
        type: DataType.STRING,
        allowNull: true,
      },
  });
  
  Feed.sync();
  

