'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * Ejecuta la migración (creación de la tabla).
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize} Sequelize
   */
  async up(queryInterface, Sequelize) {
    // Definimos los valores de la enumeración UserRole.
    // **Asegúrate de que estos valores coincidan con los de tu interfaz `UserRole`.**
    const UserRoleValues = ['USER', 'ADMIN']; // Ejemplo: ajusta esto a los valores reales de tu enum

    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      firstName: {
        type: Sequelize.STRING(50), // Usamos STRING(longitud) para ser explícitos
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      phoneNumber: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      phoneCountryCode: {
        type: Sequelize.STRING(5),
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // Correspondiente a `unique: true` en el modelo y uno de los `indexes`
      },
      role: {
        type: Sequelize.ENUM(...UserRoleValues),
        allowNull: false,
        defaultValue: 'USER', // Asume que 'USER' es el valor por defecto
      },
      password: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), // Opcional: define un default para mejor compatibilidad
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    });

    // ---
    // Creación de índices adicionales definidos en el modelo
    // NOTA: El índice `email` ya se maneja con `unique: true` en la definición de la columna.
    // ---

    // Índice para `role`
    await queryInterface.addIndex('users', ['role'], {
      name: 'idx_users_role'
    });

    // Índice para `country`
    await queryInterface.addIndex('users', ['country'], {
      name: 'idx_users_country'
    });

    // Índice para `city`
    await queryInterface.addIndex('users', ['city'], {
      name: 'idx_users_city'
    });
  },

  /**
   * Deshace la migración (elimina la tabla).
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize} Sequelize
   */
  async down(queryInterface, Sequelize) {
    // Elimina la tabla `users`
    await queryInterface.dropTable('users');

    // **NOTA sobre el ENUM:**
    // Dependiendo del dialecto (ej. PostgreSQL), puede ser necesario eliminar el tipo ENUM también.
    // Si estás usando MySQL o SQLite, generalmente no es necesario.
    // Para PostgreSQL, podrías necesitar algo como:
    /*
    await queryInterface.sequelize.query('DROP TYPE "enum_users_role";');
    */
  }
};