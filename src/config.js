import { config } from "dotenv";
config();

export default{
    MONGODB_URI_ATLAS:process.env.MONGODB_URI_ATLAS,
    MONGODB_URI: process.env.MONGODB_URI,
    PORT: process.env.PORT || 4000,
    SECRET:process.env.SECRET
}