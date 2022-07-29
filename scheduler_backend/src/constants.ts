import "dotenv/config";
export const SESSION_KEY = process.env.SESSION_KEY || "$session_key$";
export const MONGODB_URI = process.env.MONGODB_URI as string;
export const FRONTEND_URL = process.env.FRONTEND_URL as string;

export const PORT = 80;
export const FRONTEND_DIR = __dirname + "../../../scheduler_frontend/build";
