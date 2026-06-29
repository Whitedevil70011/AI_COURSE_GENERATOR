const { getUserInfo } = require('../services/auth0Service');

const getUserProfile = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid Authorization header' });
    }

    const token = authHeader.split(' ')[1];
    const user = await getUserInfo(token); // fetch from Auth0 /userinfo

    res.json({
      success: true,
      user: {
        id: user.sub,
        name: user.name,
        email: user.email,
        picture: user.picture,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getUserProfile };
