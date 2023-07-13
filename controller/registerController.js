
import { hash } from "bcrypt"
import userModel from "../schema/user.js"




async function registerController(req, res) {
  try {
    const { name, phone, email, date, answer, password } = req.body

    switch (true) {
      case (!name): return res.status(400).json({ message: "name is required" })
      case (!phone): return res.status(400).json({ message: "phone is required" })
      case (!email): return res.status(400).json({ message: "email is required" })
      case (!date): return res.status(400).json({ message: "date is required" })
      // case (!answer): return res.status(400).json({ message: "answer is required" })
      case (!password): return res.status(400).json({ message: "password is required" })
    }

    const alreadyExist = await userModel.findOne({ email })
    if (alreadyExist) {
      return res.status(400).json({ message: "email have been registered" })
    }

    const hashPass = await hash(password, 10)

    const user = await new userModel({
      name,
      email,
      phone,
      date,
      answer,
      password: hashPass
    }).save()

    if (user) {
      res.status(200).json({
        message: "create account is successful",
        success: true,
        user
      })
    }

  } catch (error) {
    console.log(error)
  }
}

export default registerController
