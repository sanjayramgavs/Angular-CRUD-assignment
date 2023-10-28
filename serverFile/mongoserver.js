const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const uri =
  "mongodb+srv://root:root@appcluster.15wfgab.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client
  .connect()
  .then(() => {
    console.log("Connected to MongoDB Atlas...");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
    process.exit(1);
  });

const usersCollection = client.db("TestDb").collection("users");

app.get("/getAll", async (req, res) => {
  try {
    const users = await usersCollection.find().toArray();
    res.send(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).send(error.message);
  }
});

app.get("/getById", async (req, res) => {
  const userId = req.query.uid;
  try {
    const user = await usersCollection.findOne({ userid: userId });
    res.send(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error.message);
    res.status(500).send(error.message);
  }
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "u1" && password === "p1") {
    res.send({ message: "Login successful", token: "your-auth-token" });
  } else {
    res.status(401).send({ message: "Authentication failed" });
  }
});

app.post("/insert", async (req, res) => {
  const { userid, email, password } = req.body;
  try {
    await usersCollection.insertOne({ userid, email, password });
    res.send("Insert Success");
  } catch (error) {
    console.error("Error inserting user:", error.message);
    res.status(500).send(error.message);
  }
});

app.put("/update", async (req, res) => {
  const { userid, email, password } = req.body;
  try {
    await usersCollection.updateOne({ userid }, { $set: { email, password } });
    res.send("Update Success");
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).send(error.message);
  }
});

app.delete("/delete", async (req, res) => {
  const userId = req.query.uid;
  try {
    await usersCollection.deleteOne({ userid: userId });
    res.send("Delete Success");
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(500).send(error.message);
  }
});

const contactUsCollection = client.db("TestDb").collection("ContactUs");

app.post("/addContact", async (req, res) => {
  const { firstName, lastName, email, phoneNumber, address, message } =
    req.body;
  try {
    await contactUsCollection.insertOne({
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      message,
    });
    res.send("Contact added successfully");
  } catch (error) {
    console.error("Error adding contact:", error.message);
    res.status(500).send(error.message);
  }
});

app.listen(9900, () => {
  console.log("Server is running on port 9900...");
});
