// Inside models/Trails.js

module.exports = (sequelize, DataTypes) => {
  const Trails = sequelize.define(
    "Trails",
    {
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
      // Additional options can be specified here
      tableName: "Trails", // Specifies the table name (optional)
      timestamps: false, // Set timestamps to false to exclude createdAt and updatedAt
    }
  );

  // Define associations if needed
  Trails.associate = (models) => {
    Trails.belongsTo(models.Mountains, {
      foreignKey: "mountain_id",
      onDelete: "CASCADE",
    });
  };

  return Trails;
};
