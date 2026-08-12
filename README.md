# 🤖 IntellixAI

An intelligent, full-stack AI chat platform featuring real-time Server-Sent Events (SSE) streaming, dual reasoning modes (Quick & Deep Thinking), secure Firebase authentication, persistent MongoDB conversation storage, and an immersive dark-mode UI with WebGL visual effects.

---

## 🌟 Features

- **⚡ Real-Time Streaming Responses**: Powered by OpenRouter API and Server-Sent Events (SSE) for fluid, token-by-token AI text generation.
- **🧠 Dual Reasoning Modes**:
  - **Quick Mode**: Instant, direct responses for quick answers and lightweight conversations.
  - **Deep Reasoning Mode**: Displays step-by-step thinking processes, reasoning tokens, and structured analysis.
- **🔐 Secure Authentication**: Integrated Firebase Authentication supporting Google OAuth 2.0 and Email/Password login.
- **💬 Full Conversation Management**:
  - Automatic chat titling based on message context.
  - Sidebar chat history with search filtering.
  - Pin favorite chats, rename threads, or delete unwanted conversations.
  - Stop generation midway & regenerate AI responses.
- **🎨 Immersive Dark Aesthetic & Visual Effects**:
  - Interactive **LightRays** WebGL canvas background that responds to cursor movement.
  - Physics-based **DotField** interactive canvas overlay.
  - Markdown formatting support with code syntax, GFM tables, and math formatting.
- **📱 Responsive Layout**: Seamless UI experience across desktop, tablet, and mobile displays.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + Custom CSS
- **Animations & WebGL**: [Framer Motion](https://www.framer.com/motion/), [OGL](https://github.com/oframe/ogl) (WebGL framework)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Markdown Processing**: `react-markdown` & `remark-gfm`
- **Auth Client**: [Firebase Web SDK v12](https://firebase.google.com/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/) & [Express v5](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose v9](https://mongoosejs.com/)
- **AI Integration**: [OpenAI Node SDK](https://github.com/openai/openai-node) connecting to [OpenRouter API](https://openrouter.ai/)
- **Auth Verification**: Firebase Admin SDK
- **Streaming**: Server-Sent Events (SSE)

### Deployment & Tools
- **Deployment Ready**: Root `vercel.json` configured for SPA routing.

---

## 📁 Project Architecture

```
IntellixAI/
├── Frontend/                 # React + Vite Frontend Application
│   ├── public/               # Public assets
│   ├── src/
│   │   ├── components/       # Reusable UI components (Sidebar, ChatArea, LightRays, DotField, etc.)
│   │   ├── hooks/            # Custom React hooks (useChat)
│   │   ├── pages/            # Page components (LoginPage)
│   │   ├── services/         # API & Firebase configurations
│   │   └── styles/           # Global styles and Tailwind setups
│   ├── package.json
│   └── vite.config.js
│
├── backend/                  # Node.js + Express Backend Service
│   ├── controllers/          # Request handlers (chatController, intellixController)
│   ├── models/               # Mongoose thread & message schemas
│   ├── routes/               # API endpoints (/api/chat, /api/intellix)
│   ├── services/             # Core business logic & stream orchestration
│   ├── utils/                # OpenRouter client & Auth verifiers
│   ├── server.js             # Express application entrypoint
│   └── package.json
│
├── package.json              # Root script manager
├── vercel.json               # Vercel deployment configuration
└── README.md                 # Project documentation
```

---

## 🔑 Environment Configuration

### Backend Environment Variables (`backend/.env`)

Create a `.env` file inside the `backend/` directory:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/intellixai
OPENROUTER_API_KEY=your_openrouter_api_key_here
OPENROUTER_MODEL=openai/gpt-oss-120b
```

### Frontend Environment Variables (`Frontend/.env`)

Create a `.env` file inside the `Frontend/` directory:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## 📡 API Reference

### Auth Header
All protected endpoints require a Firebase Bearer ID Token in the request header:
```
Authorization: Bearer <FIREBASE_ID_TOKEN>
```

### Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Health check endpoint |
| `GET` | `/api/chats` | Fetch user conversation history |
| `GET` | `/api/chat/:id` | Fetch specific chat thread details |
| `POST` | `/api/new-chat` | Initialize a new conversation thread |
| `DELETE`| `/api/chat/:id` | Delete a specific conversation thread |
| `POST` | `/api/chat/:id/clear` | Clear messages inside a thread |
| `POST` | `/api/intellix/stream` | Stream AI response with Server-Sent Events (SSE) |

---

## 📄 License

This project is licensed under the ISC License. Feel free to customize and build upon it!
