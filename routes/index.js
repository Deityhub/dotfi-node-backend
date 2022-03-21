const store = require("./store");

const routes = (app) => {
  app.use("/api/v1", store);
};

module.exports = routes;
