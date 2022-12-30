const fs = require("fs");
const csv = require("csv-parser");
const firestore = require("@google-cloud/firestore");

// Connect to the Firestore database
// const db = new firestore.Firestore();
const db = new firestore.Firestore({
  keyFilename: "wedding-website-bf9a3-44d379003ebf.json",
});

// Get a reference to the collection where you want to store the documents
const collection = db.collection("invitees");

// Read the CSV file and parse it into an array of objects
const rows = [];
fs.createReadStream("guest_list.csv")
  .pipe(csv())
  .on("data", (data) => rows.push(data))
  .on("end", () => {
    // Iterate through the array of objects, skipping the first element
    for (const row of rows) {
      // Extract the data from the object
      const fname = row["First Name"];
      const lname = row["Last Name"];
      const familyName = row["Family Name"];
      const attending = true;
      const rsvped = false;

      // Create a new document in the collection with the extracted data
      collection.add({
        fname: fname,
        lname: lname,
        group_name: familyName,
        attending: attending,
        rsvped: rsvped,
      });
    }

    console.log("Import completed successfully");
  });
