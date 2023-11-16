import { Model, QueryInterface, DataTypes } from 'sequelize';

import { Iteam } from '../../Interfaces/Iteam';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<Iteam>>('teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      teamName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'team_name',
      },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('teams');
  },
};
