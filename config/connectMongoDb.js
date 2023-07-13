import mongoose from "mongoose"

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("connect mongo success")
  } catch (error) {
    console.log(error)
    console.log("cannot connect with mongobd")

  }
}

export default connectMongo