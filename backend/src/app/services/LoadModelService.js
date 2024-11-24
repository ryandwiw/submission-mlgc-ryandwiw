const tf = require("@tensorflow/tfjs-node");
const configs = require("../../config");

class LoadModelService {
  async loadModel() {
    try {
      const model = await tf.loadGraphModel(configs.modelUrl);
      // console.log("Model loaded successfully:", model);
      return model;
    } catch (error) {
      console.error("Error loading model:", error);
      throw new Error("Model loading failed");
    }
  }
}

module.exports = new LoadModelService();