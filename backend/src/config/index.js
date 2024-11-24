require("dotenv").config();

module.exports = {
  port: process.env.PORT ?? 8080,
  modelUrl: process.env.MODEL_URL,
  projectId: process.env.PROJECT_ID,
};
