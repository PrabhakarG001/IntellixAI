import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.resolve(__dirname, "../data");
const storePath = path.join(dataDir, "threads.json");

export class Thread {
  constructor({
    id,
    title = "New chat",
    createdAt = new Date(),
    updatedAt = new Date(),
    messages = [],
  }) {
    if (!id) {
      throw new Error("Thread id is required.");
    }

    this.id = String(id);
    this.title = sanitizeTitle(title);
    this.createdAt = new Date(createdAt).toISOString();
    this.updatedAt = new Date(updatedAt).toISOString();
    this.messages = normalizeMessages(messages);
  }

  static async all() {
    const threads = await readThreads();
    return threads.map((thread) => new Thread(thread));
  }

  static async findById(id) {
    const threads = await readThreads();
    const thread = threads.find((item) => item.id === id);
    return thread ? new Thread(thread) : null;
  }

  static async upsert({ id, title, messages }) {
    const threads = await readThreads();
    const existingIndex = threads.findIndex((item) => item.id === id);
    const existing = existingIndex >= 0 ? threads[existingIndex] : null;
    const normalizedMessages = normalizeMessages(messages);
    const thread = new Thread({
      id,
      title: title || existing?.title || titleFromMessages(normalizedMessages),
      createdAt: existing?.createdAt || new Date(),
      updatedAt: new Date(),
      messages: normalizedMessages,
    });

    if (existingIndex >= 0) {
      threads[existingIndex] = thread;
    } else {
      threads.unshift(thread);
    }

    await writeThreads(threads);
    return thread;
  }

  static async create({ id = randomUUID(), title = "New chat", messages = [] } = {}) {
    return Thread.upsert({ id, title, messages });
  }

  static async delete(id) {
    const threads = await readThreads();
    const nextThreads = threads.filter((thread) => thread.id !== id);
    await writeThreads(nextThreads);
  }

  async save() {
    return Thread.upsert(this);
  }

  toClient() {
    return {
      id: this.id,
      title: this.title,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      updatedAtLabel: formatRelativeTime(this.updatedAt),
      messages: this.messages.map((message, index) => ({
        id: `${this.id}-${index}`,
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

async function readThreads() {
  try {
    const raw = await fs.readFile(storePath, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

async function writeThreads(threads) {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(storePath, JSON.stringify(threads, null, 2));
}
