'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * Ejecuta la migración (creación de la tabla).
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize} Sequelize
   */
  async up(queryInterface, Sequelize) {
    // Definimos los valores de la enumeración PostStatus.
    // **Asegúrate de que estos valores coincidan con los de tu interfaz `PostStatus`.**
    const PostStatusValues = ['ACTIVE', 'DRAFT', 'ARCHIVED']; // Ejemplo: ajusta esto a los valores reales de tu enum

    await queryInterface.createTable('posts', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT, // Mapea a DataTypes.TEXT
        allowNull: false,
      },
      // Clave Foránea a la tabla 'users'
      user_id: { // Coincide con `field: 'user_id'` en el modelo
        type: Sequelize.UUID, // Asume que la clave primaria de `users` es de tipo UUID
        allowNull: false,
        references: {
          model: 'users', // Nombre de la tabla referenciada
          key: 'id'       // Columna de la tabla referenciada
        },
        onUpdate: 'CASCADE', // Opciones estándar para FKs
        onDelete: 'CASCADE', // Opciones estándar para FKs
      },
      total_votes: { // Coincide con `field: 'total_votes'` en el modelo
        type: Sequelize.INTEGER,
        allowNull: true, // Sequelize por defecto pone null si no se especifica, aunque aquí debería ser false ya que tiene `defaultValue`
        defaultValue: 0,
      },
      status: {
        type: Sequelize.ENUM(...PostStatusValues),
        allowNull: false,
        defaultValue: 'ACTIVE', // Asume que 'ACTIVE' es el valor por defecto
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'createdAt' // Sequelize usa `createdAt` por defecto, pero es bueno ser explícito
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updatedAt' // Sequelize usa `updatedAt` por defecto
      }
    });

    // ---
    // Creación de índices adicionales definidos en el modelo
    // ---

    // Índice para `user_id` (ya está implícito por la FK, pero lo añadimos para ser explícitos)
    await queryInterface.addIndex('posts', ['user_id'], {
      name: 'idx_posts_user_id'
    });

    // Índice para `status`
    await queryInterface.addIndex('posts', ['status'], {
      name: 'idx_posts_status'
    });

    // Índice para `created_at` (Sequelize usa `createdAt` como nombre de campo)
    await queryInterface.addIndex('posts', ['createdAt'], {
      name: 'idx_posts_created_at'
    });

    // Índice para `total_votes`
    await queryInterface.addIndex('posts', ['total_votes'], {
      name: 'idx_posts_total_votes'
    });
  },

  /**
   * Deshace la migración (elimina la tabla).
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize} Sequelize
   */
  async down(queryInterface, Sequelize) {
    // Elimina la tabla `posts`
    await queryInterface.dropTable('posts');
  }
};