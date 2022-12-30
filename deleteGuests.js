const firestore = require("@google-cloud/firestore");

// Connect to the Firestore database using the service account key file
const db = new firestore.Firestore({
  keyFilename: "wedding-website-bf9a3-44d379003ebf.json",
});

// Get a reference to the collection where the documents are stored
const collection = db.collection("invitees");

// Delete all the documents in the collection
collection.get().then((snapshot) => {
  snapshot.forEach((doc) => doc.ref.delete());
});

// Delete the collection itself
// collection.delete();

console.log("Deletion completed successfully");
