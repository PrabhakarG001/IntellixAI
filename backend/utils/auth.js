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
    // We can allow unauthenticated access for now if we want to preserve fallback,
    // but the requirement is to restrict chats to the logged-in user.
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decodedToken = await getAuth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Auth verification failed", error);
    res.status(403).json({ error: "Invalid token" });
  }
};
