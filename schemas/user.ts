import { sequelize } from "../config/dbconfig";
import { Sequelize, DataType, Model } from 'sequelize-typescript';


/*export const User = sequelize.define('User', {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
    },
    role: {
        type: DataType.ENUM('Admin', 'Basic'), 
        allowNull: false,
      },
    email: {
      type: DataType.STRING,
      allowNull: false,
    },
    password: {
      type: DataType.STRING,
      allowNull: false,
    },
  });
  
  User.sync();*/

  export const User = sequelize.define('User', {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
    },
    role: {
      type: DataType.ENUM('Admin', 'Basic'),
      allowNull: false,
    },
    email: {
      type: DataType.STRING,
      allowNull: false,
    },
    password: {
      type: DataType.STRING,
      allowNull: false,
    },
    hasDeleteAccess: {
      type: DataType.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
    feedaccess: {
      type: DataType.ARRAY(DataType.INTEGER),
      allowNull: true,
    }
  });
  
  User.sync();
  
  

