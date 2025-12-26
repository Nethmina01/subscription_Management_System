import { config } from "dotenv";

//allow to switch between production and development env
const env = process.env.NODE_ENV || "development";
config({ path: `.env.${env}.local` });

export const { PORT , NODE_ENV, DB_URI} = process.env;
