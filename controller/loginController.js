import { compare } from "bcrypt"
import userModel from "../schema/user.js"
import jwt from "jsonwebtoken"

async function loginController(req, res) {
  const { email, password } = req.body
  try {
    if (!email) return res.status(400).json({ message: "email is required", success: false })
    if (!password) return res.status(400).json({ message: "password is required", success: false })

    // check email
    const user = await userModel.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: "email hasn't been registered", success: false })
    }

    // check password
    const checkPassword = await compare(password, user.password)
    if (!checkPassword) return res.status(400).json({ message: "password is wrong", success: false })

    const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN, {
      expiresIn: "1d"
    })

    if (token) {
      res.status(200).json({
        success: true,
        message: "login is successfull",
        user,
        token
      })
    } else {
      res.status(500).json({
        success: false,
        message: "cannot get the token, something is wrong"
      })
    }

  } catch (error) {
    console.log(error)
  }

}

export default loginController
