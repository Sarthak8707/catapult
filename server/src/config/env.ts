import 'dotenv/config';
import dotenv from 'dotenv';
import path from 'path';
import { error } from 'console';

dotenv.config({
  path: path.resolve(__dirname, "../../../.env"),
});

// if(!process.env.JWT_SECRET){
//   throw new Error("JWT SECRET is not defined");
// }

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing");
}



export const env = {
  DATABASE_URL: process.env.DATABASE_URL!,
  PORT: Number(process.env.PORT ?? 3000),
  JWT_SECRET: process.env.JWT_SECRET
}
