/**
* Connexion à la base de données mongoDB (base de données non relationnel)
*/
const mongodb = require("mongodb");

// Lien de la base de donnée
const client = new mongodb.MongoClient("mongodb+srv://Sportizer-user:5sFYefhA5EpZqAa0@cluster0.7vuaetn.mongodb.net/?retryWrites=true&w=majority", {
  useUnifiedTopology: true
});

const connectToMongoDB = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

const getDB = () => client.db("Application");

module.exports = { connectToMongoDB, getDB };