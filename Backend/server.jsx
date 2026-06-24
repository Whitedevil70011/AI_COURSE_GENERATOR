import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { auth } from "express-oauth2-jwt-bearer";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Auth0 JWT verification middleware
const checkJwt = auth({
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
  audience: process.env.AUTH0_AUDIENCE,
});

// Public route
app.get("/", (req, res) => {
  res.json({
    message: "Server running",
  });
});

// Protected route
app.get("/api/profile", checkJwt, (req, res) => {
  res.json({
    success: true,
    auth: req.auth,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
