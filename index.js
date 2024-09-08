import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/routes.js";

const app = express();

// Use environment variables for port, hostname, and MongoDB URL
const port = process.env.PORT || 5252;
const hostname = process.env.HOSTNAME || "localhost";
const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/shorturls";

app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({ "message": "fine", "greet": "hello world!!" });
});

app.use("/shortUrl", router);

mongoose.connect(mongoUri)
    .then(() => {
        app.listen(port, hostname, () => {
            console.log(`Server started at port ${port}`);
        });
        console.log("Server is UP and database is connected successfully");
    })
    .catch((err) => {
        console.log(err);
    });
