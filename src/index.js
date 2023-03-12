const express = require("express");
const bodyParser = require("body-parser");

const apiRoutes = require("./routes");
const { PORT, DB_SYNC } = require("./config/serverConfig");
const db = require("./models");
// const { User, Role } = require("./models");

const setupAndStartServer = async () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", apiRoutes);

  if (DB_SYNC) {
    db.sequelize.sync({ alter: true });
  }
  // const user = await User.findByPk(3);
  // const role = await Role.findByPk(1);
  // user.addRole(role);

  app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
  });
};

setupAndStartServer();
