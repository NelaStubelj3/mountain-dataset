const express = require("express");
const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");
const db = require("./models");
const sequelizeConfig = require("./config/config.json");
const { Mountains } = require("./models/Mountains");
const { Trails } = require("./models/Trails");
const { MountainsAll } = require("./models/MountainsAll");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const sequelize = new Sequelize(sequelizeConfig.development);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to db has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

// Routers
const mountainsRouter = require("./routes/Mountains");
app.use("/mountains", mountainsRouter);
const trailsRouter = require("./routes/Trails");
app.use("/trails", trailsRouter);
const mountainsallRouter = require("./routes/MountainsAll");
app.use("/mountainsall", mountainsallRouter);

sequelize
  .sync("forse:true")
  .then(() => {
    console.log("Database synced successfully");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });
