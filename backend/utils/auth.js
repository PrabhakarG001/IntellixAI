import { getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

// Using a placeholder until the user sets up their Firebase Admin SDK:
if (getApps().length === 0) {
  initializeApp({
    projectId: "intellixai-3aaaf"
  }); 
}

export const verifyUser = async (req, res, next) => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) {
    req.user = { uid: "guest-user" };
    return next();
  }

  try {
    const decodedToken = await getAuth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.warn("Auth verification warning, proceeding with guest profile:", error.message || error);
    req.user = { uid: "guest-user" };
    next();
  }
};
