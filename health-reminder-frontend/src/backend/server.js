const app = require('./app');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 3000;

// Test DB connection and sync models
sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });