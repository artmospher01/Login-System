import jwt from "jsonwebtoken"

const requiredLogin = async (req, res, next) => {
  try {
    const decode = jwt.verify(req.headers.authorization, process.env.SECRET_TOKEN)

    req.user = decode

    next()

  } catch (error) {
    console.log(error)
  }

}

export default requiredLogin
