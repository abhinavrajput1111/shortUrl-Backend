import mongoose, { mongo } from "mongoose";
import mongodb from "mongodb";


const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true,
    },
    shortedUrl: {
        type: String,
        required: true
    }
})

const userModel = mongoose.model("shorturl", urlSchema);

export default userModel;