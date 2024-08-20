import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });
export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_URL: process.env.DATABASE_URL,
  bcrypt_url: process.env.BCRYPT_SALT_ROUND,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  expires_times: process.env.EXPIRES_TIME,
};
