export const nodeEnvs = {
    development: "development",
    production: "production",
    testing: "testing"
}


export const corsOptions = {
    origin: "https://magnet-brains-chi.vercel.app",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true
}