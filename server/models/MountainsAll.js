module.exports = (sequelize, DataTypes) => {
  const MountainsAll = sequelize.define(
    "MountainsAll",
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
      trail_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      trail_name: DataTypes.STRING,
      trail_description: DataTypes.TEXT,
      difficulty: DataTypes.STRING,
      length: DataTypes.FLOAT,
      elevation_gain: DataTypes.INTEGER,
      mountain_id: DataTypes.INTEGER,
    },
    {
      timestamps: false,
    }
  );

  return MountainsAll;
};
