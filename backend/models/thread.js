import mongoose from "mongoose";
import { randomUUID } from "node:crypto";

const MessageSchema = new mongoose.Schema({
  id: { type: String, required: true, default: () => randomUUID() },
  role: { type: String, enum: ["user", "assistant"], required: true },
  content: { type: String, required: true },
  thought: { type: String, default: "" },
});

const ThreadSchema = new mongoose.Schema({
  id: { type: String, required: true, index: true },
  userId: { type: String, required: true, index: true },
  title: { type: String, default: "New chat" },
  messages: { type: [MessageSchema], default: [] },
}, {
  timestamps: true // adds createdAt and updatedAt
});

// Avoid OverwriteModelError
const ThreadModel = mongoose.models.Thread || mongoose.model("Thread", ThreadSchema);

// In-memory fallback map when MongoDB is disconnected: key = `${userId}:${id}`
const memoryStore = new Map();

function isMongoConnected() {
  return mongoose.connection.readyState === 1;
}

export class Thread {
  constructor(doc) {
    this.id = doc.id;
    this.userId = doc.userId;
    this.title = doc.title;
    this.createdAt = doc.createdAt || new Date();
    this.updatedAt = doc.updatedAt || new Date();
    this.messages = doc.messages || [];
  }

  static async all(userId) {
    if (isMongoConnected()) {
      try {
        const docs = await ThreadModel.find({ userId }).sort({ updatedAt: -1 }).lean();
        return docs.map(doc => new Thread(doc));
      } catch (err) {
        console.warn("MongoDB find failed, falling back to memory store:", err.message);
      }
    }
    const results = [];
    for (const [, val] of memoryStore.entries()) {
      if (val.userId === userId) {
        results.push(new Thread(val));
      }
    }
    return results.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  }

  static async findById(id, userId) {
    if (isMongoConnected()) {
      try {
        const doc = await ThreadModel.findOne({ id, userId }).lean();
        if (doc) return new Thread(doc);
      } catch (err) {
        console.warn("MongoDB findById failed, falling back to memory store:", err.message);
      }
    }
    const memDoc = memoryStore.get(`${userId}:${id}`) || memoryStore.get(`guest-user:${id}`);
    return memDoc ? new Thread(memDoc) : null;
  }

  static async upsert({ id, userId, title, messages }) {
    const normalizedMessages = normalizeMessages(messages);
    const resolvedTitle = title ? sanitizeTitle(title) : titleFromMessages(normalizedMessages);
    const now = new Date();

    const memKey = `${userId}:${id}`;
    const existing = memoryStore.get(memKey);
    const record = {
      id,
      userId,
      title: resolvedTitle,
      messages: normalizedMessages,
      createdAt: existing?.createdAt || now,
      updatedAt: now,
    };
    memoryStore.set(memKey, record);

    if (isMongoConnected()) {
      try {
        const updateData = {
          title: resolvedTitle,
          messages: normalizedMessages,
        };
        const doc = await ThreadModel.findOneAndUpdate(
          { id, userId },
          { $set: updateData, $setOnInsert: { id, userId } },
          { new: true, upsert: true, setDefaultsOnInsert: true }
        ).lean();
        return new Thread(doc);
      } catch (err) {
        console.warn("MongoDB upsert failed, using memory record:", err.message);
      }
    }
    return new Thread(record);
  }

  static async create({ id = randomUUID(), userId, title = "New chat", messages = [] } = {}) {
    return Thread.upsert({ id, userId, title, messages });
  }

  static async delete(id, userId) {
    memoryStore.delete(`${userId}:${id}`);
    memoryStore.delete(`guest-user:${id}`);
    if (isMongoConnected()) {
      try {
        await ThreadModel.deleteOne({ id, userId });
      } catch (err) {
        console.warn("MongoDB delete failed:", err.message);
      }
    }
  }

  async save() {
    return Thread.upsert(this);
  }

  toClient() {
    return {
      id: this.id,
      userId: this.userId,
      title: this.title,
      createdAt: this.createdAt ? new Date(this.createdAt).toISOString() : new Date().toISOString(),
      updatedAt: this.updatedAt ? new Date(this.updatedAt).toISOString() : new Date().toISOString(),
      updatedAtLabel: formatRelativeTime(this.updatedAt || new Date()),
      messages: this.messages.map((message, index) => ({
        id: message.id || `${this.id}-${index}`,
        role: message.role,
        content: message.content,
        thought: message.thought || "",
      })),
    };
  }
}

export function normalizeMessages(messages) {
  if (!Array.isArray(messages)) return [];

  return messages
    .filter((message) => {
      const role = message?.role;
      const content = message?.content ?? message?.text;
      return (
        ["user", "assistant"].includes(role) &&
        typeof content === "string" &&
        content.trim()
      );
    })
    .map((message) => {
      const normalized = {
        id: message.id || randomUUID(),
        role: message.role,
        content: String(message.content ?? message.text),
      };

      const thought = message.thought ?? message.reasoning;
      if (typeof thought === "string" && thought.trim()) {
        normalized.thought = thought;
      }

      return normalized;
    });
}

export function titleFromMessages(messages) {
  const firstUserMessage = normalizeMessages(messages).find(
    (message) => message.role === "user",
  );

  if (!firstUserMessage) return "New chat";

  const words = firstUserMessage.content
    .replace(/[^\w\s-]/g, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 5);

  return words.length ? words.join(" ") : "New chat";
}

function sanitizeTitle(title) {
  const cleanTitle = String(title || "New chat").trim();
  return cleanTitle.slice(0, 80) || "New chat";
}

function formatRelativeTime(value) {
  const timestamp = new Date(value).getTime();
  const diffMs = Date.now() - timestamp;
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (!Number.isFinite(timestamp) || diffMs < minute) return "Just now";
  if (diffMs < hour) return `${Math.floor(diffMs / minute)} min ago`;
  if (diffMs < day) return `${Math.floor(diffMs / hour)} hr ago`;
  if (diffMs < 7 * day) return `${Math.floor(diffMs / day)} days ago`;

  return new Date(value).toLocaleDateString("en", {
    month: "short",
    day: "numeric",
  });
}
