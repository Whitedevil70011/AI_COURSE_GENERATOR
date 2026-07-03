// Fetch full user info from Auth0 /userinfo endpoint
const getUserInfo = async (accessToken) => {
  const response = await fetch(
    `https://${process.env.AUTH0_DOMAIN}/userinfo`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  if (!response.ok) throw new Error('Failed to fetch user info from Auth0');

  const user = await response.json();

  return user;
};

module.exports = { getUserInfo };