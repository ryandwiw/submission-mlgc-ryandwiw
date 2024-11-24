const PredictionController = require("../controllers/PredictionController");

const predictionRoutes = (predictionController) => [
  {
    path: "/predict",
    method: "POST",
    handler: predictionController.postPredictHandler.bind(predictionController),
    options: {
      payload: {
        allow: "multipart/form-data",
        multipart: true,
        maxBytes: 1000000,
      },
    },
  },
  {
    path: "/predict/histories",
    method: "GET",
    handler: predictionController.getPredictHandler.bind(predictionController),
  },
];

module.exports = predictionRoutes;