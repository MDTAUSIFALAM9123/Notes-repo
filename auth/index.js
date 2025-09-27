import express from "express"
import { config } from "dotenv";
import connectiontoDB from "./src/db/connection.js"
import userRouter from "./src/routes/user.route.js"

config()
const app= express()

app.use(express.json());

const PORT=process.env.PORT

app.use("/api", userRouter);

app.listen(PORT, async ()=>{
    await connectiontoDB();
    console.log(`App is running ${PORT} `);
})

