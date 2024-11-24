
const db = require("../../libs/Firestore");

class FirestoreService {
  async storeData(id, data) {
    const predictCollection = db.collection("predictions");

    return predictCollection.doc(id).set(data.toObject());
  }

  async getAllData() {
    const predictCollection = db.collection("predictions");
    const snapshot = await predictCollection.get();

    if (snapshot.empty) {
      return [];
    }

    const data = [];
    snapshot.forEach((doc) => {
      data.push({ id: doc.id, history: { ...doc.data() } });
    });

    return data;
  }
}

module.exports = new FirestoreService();