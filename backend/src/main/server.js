const Hapi = require("@hapi/hapi");
const LoadModelService = require("../app/services/LoadModelService");
const predictionRoutes = require("../app/routes/PredictionRoutes");
const InputError = require("../errors/InputError");
const configs = require("../config");
const PredictionController = require("../app/controllers/PredictionController");

const init = async () => {
  const server = Hapi.server({
    port: configs.port,
    host: "0.0.0.0",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  const model = await LoadModelService.loadModel();
  server.app.model = model;

  const predictionController = new PredictionController(model);
  server.route(predictionRoutes(predictionController));
  // server.route(predictionRoutes);

  server.ext("onPreResponse", (request, h) => {
    const response = request.response;

    if (response instanceof InputError) {
      const newResponse = h.response({
        status: "fail",
        message: response.message,
      });

      newResponse.code(response.statusCode);
      return newResponse;
    }

    if (response.isBoom) {
      const newResponse = h.response({
        status: "fail",
        message: response.message,
      });

      newResponse.code(response.output.statusCode);
      return newResponse;
    }

    return h.continue;
  });

  await server.start();
  console.log(`Server is running at : ${server.info.uri}`);
};

init();
