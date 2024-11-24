require("dotenv").config();

module.exports = {
  port: process.env.PORT ?? 3000,
  modelUrl: process.env.MODEL_URL,
  projectId: process.env.PROJECT_ID,
};