import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "node:dns";

dotenv.config();
dns.setServers([
  "1.1.1.1",
  "8.8.8.8"
]);

const app = express();

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log("DB Error:", err));


const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

const Contact = mongoose.model("Contact", contactSchema);



app.post("/contact", async (req, res) => {
  try {
    console.log("DATA RECEIVED:", req.body);

    const newMessage = new Contact(req.body);
    await newMessage.save();

    res.json({ message: "Message received " });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error " });
  }
});


app.get("/messages", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ _id: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages " });
  }
});


// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} `);
});