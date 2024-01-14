module.exports = (sequelize, DataTypes) => {
  const Trails = sequelize.define(
    "Trails",
    {
      trail_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      trail_name: DataTypes.STRING,
      trail_description: DataTypes.TEXT,
      difficulty: DataTypes.STRING,
      length: DataTypes.FLOAT,
      elevation_gain: DataTypes.INTEGER,
    },
    {
      timestamps: false,
    }
  );

  Trails.associate = (models) => {
    Trails.belongsTo(models.Mountains, { foreignKey: "mountain_id" });
  };

  return Trails;
};
