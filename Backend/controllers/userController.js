import { getUserInfo } from '../services/auth0Service.js'

export const getUserProfile = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const user = await getUserInfo(token)  // fetch from Auth0 /userinfo

    res.json({
      success: true,
      user: {
        id: user.sub,
        name: user.name,
        email: user.email,
        picture: user.picture
      }
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}