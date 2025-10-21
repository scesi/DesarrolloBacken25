import { sequelize } from './config/database.config';

import Server from './config/server.config'
import { ENV } from './config/env.config'

async function connectWithRetry() {
  try {
    await sequelize.authenticate();
    console.info('Database connected');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    setTimeout(connectWithRetry, 5000);
  }
}

async function start() {
  try {
    await connectWithRetry()
    // await sequelize.authenticate(); 
    // await sequelize.sync();

    console.info('Se ha conectado a la base de datos!')
    
    Server.listen(ENV.PORT, () => {
      console.log(`Server is running on http://localhost:${ENV.PORT}`)
    })
  } catch (error) {
    console.error('Error al iniciar el servidor', error)
  }
}

start()
