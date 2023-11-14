module.exports = (sequelize, DataTypes) => {
  const Mountains = sequelize.define(
    "Mountains",
    {
      mountain_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      mountain_name: DataTypes.STRING,
      country: DataTypes.STRING,
      height: DataTypes.DECIMAL,
      mountain_description: DataTypes.TEXT,
      highest_peak: DataTypes.STRING,
    },
    {
      timestamps: false,
    }
  );

  return Mountains;
};
