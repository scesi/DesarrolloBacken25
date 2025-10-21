'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * Ejecuta la migración (creación de la tabla).
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize} Sequelize
   */
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('messages', {
      id: {
        // En PostgreSQL, INTEGER.UNSIGNED se mapea a SERIAL o INTEGER.
        // Usaremos SERIAL para auto-incremento y clave primaria.
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      // NOTA: Si usas IDs de usuarios de tipo UUID, cambia 'Sequelize.INTEGER' 
      // por 'Sequelize.UUID' aquí y en receiverId.
      senderId: {
        type: Sequelize.STRING, // Mapeado de INTEGER.UNSIGNED
        allowNull: false,
        field: 'sender_id', // Convención snake_case (si la aplicas)
        // Puedes añadir aquí la referencia a la tabla 'users' si existe:
        /*
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
        */
      },
      receiverId: {
        type: Sequelize.STRING, // Mapeado de INTEGER.UNSIGNED
        allowNull: false,
        field: 'receiver_id', // Convención snake_case (si la aplicas)
        /*
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
        */
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      readAt: {
        type: Sequelize.DATE, // Mapeado de DataTypes.DATE
        allowNull: true,
        field: 'read_at', // Convención snake_case (si la aplicas)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'created_at', // Convención snake_case
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'updated_at', // Convención snake_case
      }
    });

    // ---
    // Creación de índices para optimizar búsquedas por remitente y receptor
    // ---
    await queryInterface.addIndex('messages', ['sender_id'], {
      name: 'idx_messages_sender_id'
    });
    
    await queryInterface.addIndex('messages', ['receiver_id'], {
      name: 'idx_messages_receiver_id'
    });

    // Índice compuesto para optimizar las conversaciones
    await queryInterface.addIndex('messages', ['sender_id', 'receiver_id', 'created_at'], {
      name: 'idx_messages_conversation_time'
    });
  },

  /**
   * Deshace la migración (elimina la tabla).
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize} Sequelize
   */
  async down(queryInterface, Sequelize) {
    // Elimina la tabla `messages`
    await queryInterface.dropTable('messages');
  }
};