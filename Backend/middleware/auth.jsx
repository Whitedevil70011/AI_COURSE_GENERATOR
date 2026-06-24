import { auth } from 'express-oauth2-jwt-bearer'

// Verifies Bearer access_token from Auth0
export const protect = auth({
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
  audience: process.env.AUTH0_AUDIENCE,
})

// Attaches user metadata to req — use after protect
export const attachUser = (req, res, next) => {
  req.userId = req.auth.payload.sub        // Auth0 user ID
  req.userEmail = req.auth.payload.email   // email
  req.userName = req.auth.payload.name     // name
  next()
}