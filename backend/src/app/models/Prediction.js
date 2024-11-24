class Prediction {
  constructor(id, result, suggestion, createdAt) {
    this.id = id;
    this.result = result;
    this.suggestion = suggestion;
    this.createdAt = createdAt;
  }

  toObject() {
    return {
      id: this.id,
      result: this.result,
      suggestion: this.suggestion,
      createdAt: this.createdAt,
    };
  }
}

module.exports = Prediction;