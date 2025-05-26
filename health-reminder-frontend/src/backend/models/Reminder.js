module.exports = (sequelize, DataTypes) => {
  const Reminder = sequelize.define('Reminder', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      defaultValue: 'medium'
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed', 'snoozed'),
      defaultValue: 'pending'
    },
    notifyEmail: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    notifySMS: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    notifyWhatsApp: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    timestamps: true
  });

  Reminder.associate = function(models) {
    Reminder.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };

  return Reminder;
};