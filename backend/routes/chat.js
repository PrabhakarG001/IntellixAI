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

const router = express.Router();

router.get("/chats", verifyUser, getChats);
router.get("/chat/:id", verifyUser, getChatById);
router.post("/new-chat", verifyUser, createNewChat);
router.delete("/chat/:id", verifyUser, deleteChat);
router.post("/chat/:id/clear", verifyUser, clearChat);
router.post("/chat", verifyUser, handleChat);
router.post("/chat/stream", verifyUser, handleChatStream);

export default router;
