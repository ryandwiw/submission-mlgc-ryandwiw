const tf = require("@tensorflow/tfjs-node");
const InputError = require("../../errors/InputError");

class InferenceService {
  async predictClassification(model, image) {
    try {
      const tensor = tf.node
        .decodeJpeg(image)
        .resizeNearestNeighbor([224, 224])
        .expandDims()
        .toFloat();

      const classes = ["Cancer", "Non-cancer"];
      const prediction = model.predict(tensor);
      const score = await prediction.data();

      const confidenceScore = score[0] * 100;
      const label = score[0] > 0.5 ? classes[0] : classes[1];

      let suggestion = label === "Cancer"
        ? "Segera periksa ke dokter!"
        : "Selamat anda masih sehat!";

      return { confidenceScore, label, suggestion };
    } catch (error) {
      console.log(error);
      throw new InputError("Error during prediction");
    }
  }
}

const inferenceServiceInstance = new InferenceService();

module.exports = {
  predictClassification: inferenceServiceInstance.predictClassification.bind(inferenceServiceInstance),
  instance: inferenceServiceInstance,
};