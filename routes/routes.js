import express from "express";
import { shortBigUrl, getBigUrlFromShortUrl } from "../controllers/controllers.js";

const router = express.Router();

router.post("/", shortBigUrl);

router.get("/:shortUrl", getBigUrlFromShortUrl);


export default router;