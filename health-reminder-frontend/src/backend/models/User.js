module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.ENUM('patient', 'doctor', 'admin'),
      defaultValue: 'patient'
    },
    emailNotifications: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    smsNotifications: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    whatsappNotifications: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    timestamps: true
  });

  User.associate = function(models) {
    User.hasMany(models.Reminder, {
      foreignKey: 'userId',
      as: 'reminders'
    });
  };

  return User;
};