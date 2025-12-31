export const nodeEnvs = {
    development: "development",
    production: "production",
    testing: "testing"
}


export const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true
}