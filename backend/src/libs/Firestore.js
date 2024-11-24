const { Firestore } = require("@google-cloud/firestore");
const configs = require("../config");

const db = new Firestore({ projectId: configs.projectId });

module.exports = db;