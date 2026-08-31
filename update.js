const admin = require("firebase-admin");
const fs = require("fs");

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DB_URL
});

const db = admin.database();

async function update() {
  try {
    const buses = JSON.parse(fs.readFileSync("buses.json", "utf8"));

    await db.ref("buses").set(buses);

    console.log("buses updated successfully");
    process.exit(0); // force exit
  } catch (err) {
    console.error(err);
    process.exit(1); // exit on error
  }
}

update();
