import userModel from "../models/model.js";
import { nanoid } from "nanoid";

export async function shortBigUrl(req, res) {
    const requestedUrl = req.body.url;
    const uniqueId = nanoid(10);

    try {
        const checkUrlinDb = await userModel.findOne({ "originalUrl": requestedUrl });

        if (checkUrlinDb) {
            return res.status(409).send("URL already exists, shorten another one");
        }

        const newInstance = new userModel({ "originalUrl": requestedUrl, "shortedUrl": uniqueId });
        await newInstance.save();

        res.status(201).json({
            "message": "Shortened URL generated successfully",
            "shortedUrl": `http://localhost:5252/shortUrl/${uniqueId}`
        });
    } catch (err) {
        console.log("Error: " + err);
        res.status(500).send("Server error. Please try again later.");
    }
}

export async function getBigUrlFromShortUrl(req, res) {
    const requestUrl = req.params.shortUrl;

    try {
        const checkShortUrl = await userModel.findOne({ "shortedUrl": requestUrl });

        if (checkShortUrl) {
            return res.redirect(checkShortUrl.originalUrl);
        } else {
            return res.status(409).json({ "warning": "Your URL is not correct" });
        }
    } catch (err) {
        console.log("Error: " + err);
        res.status(500).send("Server error. Please try again later.");
    }
}
