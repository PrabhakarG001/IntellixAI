import express from "express";
import { verifyUser } from "../utils/auth.js";
import {
  clearChat,
  createNewChat,
  deleteChat,
  getChatById,
  getChats,
  handleChat,
  handleChatStream,
} from "../controllers/chatController.js";

export function createChatRouter(authenticate = verifyUser) {
const router = express.Router();

router.get("/chats", authenticate, getChats);
router.get("/chat/:id", authenticate, getChatById);
router.post("/new-chat", authenticate, createNewChat);
router.delete("/chat/:id", authenticate, deleteChat);
router.post("/chat/:id/clear", authenticate, clearChat);
router.post("/chat", authenticate, handleChat);
router.post("/chat/stream", authenticate, handleChatStream);
router.post("/stream", authenticate, handleChatStream);

return router;
}
