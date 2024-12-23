const { storeData, getAllData } = require("../services/FirestoreService");
const { predictClassification } = require("../services/InferenceService"); 
const crypto = require("crypto");
const Prediction = require("../models/Prediction");

class PredictionController {
  constructor(model) {
    this.model = model;
  }

  async postPredictHandler(request, h) {
    const { image } = request.payload;

    const { confidenceScore, label, suggestion } = await predictClassification(
      this.model,
      image
    );

    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const prediction = new Prediction(id, label, suggestion, createdAt);
    await storeData(id, prediction);

    // Message Response Model
    const response = h.response({
    status: "success",
    message: "Model is predicted successfully", 
    data: prediction,
  });

    response.code(201);
    return response;
  }

  async getPredictHandler(request, h) {
    const data = await getAllData();

    const response = h.response({
      status: "success",
      data,
    });

    response.code(200);
    return response;
  }
}

module.exports = PredictionController;
