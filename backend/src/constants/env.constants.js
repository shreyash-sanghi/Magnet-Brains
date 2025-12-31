import dotenv from "dotenv";
import path from "path";
const env = process.env.NODE_ENV || "development";

const envs = {
    development: ".env",
    testing: ".env.staging",
    production: ".env.production"
}
const envPath = path.resolve(process.cwd(), envs[env]);


dotenv.config({ path: envPath });


dotenv.config();



export class envProvider {
    static PORT = process.env.PORT || 3001;
    static nodenv = process.env.NODE_ENV || "development";
    static dburi = process.env.DATABASE_URI;
}

