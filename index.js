import express from "express"
import "dotenv/config"
import connectMongo from "./config/connectMongoDb.js"
import cors from "cors"
import route from "./router/authRoute.js"


const app = express()

connectMongo()

//! middleware
app.use(express.json())
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);


app.use("/auth", route)

app.get("/", (req, res) => {
  res.send("success")
})

console.log(process.env.PORT)
app.listen(process.env.PORT, () => { console.log("server is running") })