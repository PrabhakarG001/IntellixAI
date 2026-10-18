# IntellixAI

IntellixAI is a full-stack chat application with a React interface, Firebase sign-in, conversation management, and streaming AI responses. Its MiniMax integration uses a JavaScript Express backend to keep provider credentials on the server.

> **Migration status:** The MiniMax M3 implementation described below exists in the local working tree but is not included in this documentation-only commit. A fresh checkout of `main` will not support the MiniMax configuration or new test commands until the application migration is committed separately. The instructions below apply to the migrated application.

## Features

- Stream responses over Server-Sent Events (SSE), stop generation, and regenerate the latest answer.
- Choose Talk, Coding, or Reasoning; all three modes use MiniMax M3.
- Sign in with Google through Firebase Authentication.
- Create, search, clear, and delete conversations, with automatic titles. Pinning and renaming are local UI state and do not persist across reloads.
- Render Markdown, code blocks, tables, and task lists, with response and code-copy controls.
- Use the responsive dark interface with animated WebGL backgrounds.
- Store conversations in MongoDB, or use temporary in-memory storage for development.

## Technology stack

| Layer | Technologies |
| --- | --- |
| Frontend | React 19, Vite 7, React Router 7, Tailwind CSS 4, custom CSS |
| UI and rendering | Framer Motion, OGL, Lucide React, React Markdown, remark-gfm |
| Backend | Node.js 22+, Express 5, JavaScript ES modules, native `fetch` |
| Authentication | Firebase Web SDK and Firebase Admin SDK |
| Storage | MongoDB through Mongoose 9; optional process-memory storage |
| AI | Official MiniMax HTTP API, fixed to `MiniMax-M3` |
| Tests | Node.js test runner, mocked provider responses, local HTTP integration tests |

## Architecture

```text
Frontend/
  src/
    components/          Chat interface, sidebar, input, and visual effects
    config/              Task-mode definitions
    hooks/               Chat state and generation lifecycle
    pages/               Login page
    services/            Firebase, backend requests, SSE, and history helpers
    styles/              Global styling
  test/                  Transport and history tests
  vite.config.js         React/Tailwind plugins and local API proxy
backend/
  controllers/           Chat CRUD and response handlers
  models/                Conversation storage
  routes/                Authenticated API routes
  services/              Request validation and centralized MiniMax integration
  utils/                 Authentication and safe errors
  scripts/               Live MiniMax smoke check
  test/                  Service and HTTP integration tests
  app.js                 Express application factory
  server.js              Environment loading, database connection, and startup
shared/                  SSE decoding shared by frontend and backend
package.json             Root install, run, build, and test scripts
vercel.json              Frontend build configuration
```

The browser sends a Firebase ID token and chat data to Express. The backend verifies the token, validates the conversation, calls MiniMax, forwards streamed events, and saves a completed answer. The MiniMax key never reaches the browser. Failed or interrupted generations are not saved as successful answers.

## Prerequisites

- Node.js **22.12 or newer**, npm, and Git (Vite 7 requires at least Node 22.12 on the 22.x line).
- A MiniMax API key with access to `MiniMax-M3` and available account quota.
- A Firebase project with Google sign-in enabled and your frontend domains authorized.
- MongoDB only if persistent conversation storage is required.

The frontend currently contains Firebase project configuration in `Frontend/src/services/firebase.js`. Ensure that it matches the project used by the backend's `FIREBASE_PROJECT_ID`.

## Installation and environment

From the repository root, install all three package manifests:

```sh
npm run install:all
```

Create `backend/.env` if it does not already exist. Use the following placeholders and edit the file locally; preserve any existing environment file.

```dotenv
MINIMAX_API_KEY=your_minimax_api_key_here
PORT=5000
CLIENT_ORIGIN=http://localhost:5173,http://127.0.0.1:5173
FIREBASE_PROJECT_ID=your_firebase_project_id
# Optional: omit for temporary in-memory storage.
# MONGODB_URI=mongodb://127.0.0.1:27017/intellixai
```

| Variable | Location | Purpose |
| --- | --- | --- |
| `MINIMAX_API_KEY` | Backend | Required for AI requests; the only AI-provider credential. |
| `PORT` | Backend | Server port; defaults to `5000`. |
| `CLIENT_ORIGIN` | Backend | Comma-separated allowed frontend origins. Defaults to the two local origins above. |
| `FIREBASE_PROJECT_ID` | Backend | Firebase project for ID-token verification. If omitted, the code uses its existing project default. |
| `MONGODB_URI` | Backend | Optional MongoDB connection URI. Without it, chats reset when the process restarts. |
| `VITE_API_BASE_URL` | Frontend | Optional public backend URL, including `/api`; defaults to `/api`. |

For a separately hosted backend, set `Frontend/.env.local` before building:

```dotenv
VITE_API_BASE_URL=https://your-backend.example/api
```

### MiniMax model configuration

The service fixes these values in `backend/services/minimaxService.js`; no model or endpoint environment variable is needed:

```text
Model:    MiniMax-M3
Endpoint: POST https://api.minimax.io/v1/chat/completions
Auth:     Authorization: Bearer <MINIMAX_API_KEY>
```

This contract is documented in MiniMax's [model invocation guide](https://platform.minimax.io/docs/guides/text-generation) and [Chat Completions reference](https://platform.minimax.io/docs/api-reference/text-openai-api). Talk and Coding disable thinking; Reasoning enables adaptive thinking. The backend requests separated reasoning, streamed usage, and an output limit of 8,192 tokens, including reasoning tokens. It makes at most one retry for pre-stream transient network/server failures and never falls back to another provider.

## Run locally

Start the backend from the repository root:

```sh
npm run start:backend
```

In a second terminal, also from the root:

```sh
npm run dev:frontend
```

Open `http://localhost:5173` and sign in. Vite proxies `/api` to `http://localhost:5000`. If you change the backend port, update that proxy or set `VITE_API_BASE_URL` accordingly. If Vite selects a different frontend port, include its actual origin in `CLIENT_ORIGIN`.

The backend waits for MongoDB when `MONGODB_URI` is set and exits if the connection fails. Without it, startup warns that storage is temporary.

## API endpoints

All `/api` routes require `Authorization: Bearer <FIREBASE_ID_TOKEN>`. This is a Firebase session token, not the MiniMax key.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/` | Backend health response |
| `GET` | `/api/chats` | List the signed-in user's conversations |
| `GET` | `/api/chat/:id` | Retrieve a conversation |
| `POST` | `/api/new-chat` | Create an empty conversation |
| `DELETE` | `/api/chat/:id` | Delete a conversation |
| `POST` | `/api/chat/:id/clear` | Clear a conversation |
| `POST` | `/api/chat` | Generate and return a complete JSON response |
| `POST` | `/api/chat/stream` | Generate an SSE response |

`/api/stream` aliases the streaming route. The router also mounts under `/api/intellix` with the same relative paths.

Example chat request body:

```json
{
  "message": "Explain this function.",
  "mode": "coding"
}
```

Optional fields include `chatId`, `thinkingMode` (`quick` or `deep`), and `regenerate`. SSE events include `meta`, `content`, `thought`, `usage`, `done`, and `error`. The UI renders the answer content; receiving reasoning events does not imply a separate reasoning panel is displayed.

## Build and tests

Run from the repository root:

```sh
npm test
npm run build
```

Tests cover backend validation and failure handling, local frontend-to-backend HTTP integration with mocked MiniMax responses, regeneration, cancellation, concurrency, and fragmented streams. They do not require a provider key or verify a live MiniMax account, real Firebase login, or MongoDB persistence. No lint or TypeScript check script is configured.

The production frontend is written to `Frontend/dist`. To preview it:

```sh
cd Frontend
npm run preview
```

Preview does not use the development server's API proxy. Set `VITE_API_BASE_URL` before building when previewing against a separately running backend.

To check the actual MiniMax account, run from the root:

```sh
cd backend
npm run test:live
```

This sends a small, potentially billable request when a key is configured. A missing key returns `MINIMAX_NOT_CONFIGURED`. Successful mocked tests are not evidence of live model access or available billing quota.

## Deployment

Deploy Express as a Node service and include the root `shared/` directory alongside `backend/`. Configure backend environment variables, persistent MongoDB storage, and the exact frontend origin allowlist.

The existing `vercel.json` builds only the frontend; it does not deploy Express or configure SPA history fallback. Configure the frontend host to serve `index.html` for application routes. Route `/api` to Express or set the public `VITE_API_BASE_URL` before building. Allow SSE without proxy buffering and request durations longer than the backend's two-minute timeout.

Generation locking and development memory storage are per process. Multiple backend instances require shared coordination and persistent storage.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| `MINIMAX_NOT_CONFIGURED` / HTTP 503 | Set a real backend `MINIMAX_API_KEY` and restart Express. |
| `MINIMAX_AUTH` / HTTP 502 | Check the backend key and account access; do not put the key in frontend configuration. |
| `MINIMAX_REQUEST` / HTTP 502 | Confirm M3 entitlement, supported input, and conversation limits. |
| `MINIMAX_QUOTA` / HTTP 503 | Check MiniMax balance, plan, and quota. |
| HTTP 429 | Wait for the provider rate limit to clear. |
| HTTP 401 | Sign in again and confirm both Firebase configurations use the same project. |
| CORS rejection / HTTP 403 | Match the frontend scheme, hostname, and port in `CLIENT_ORIGIN`. |
| HTTP 409 | Wait for or stop the generation already running in this conversation. |
| Network failure, invalid stream, or HTML response | Check the backend URL, `/api` routing, and running server. A frontend-only host cannot serve Express routes. |
| Timeout or interrupted answer | Check connectivity and proxy streaming/time limits; retry or shorten the request. |
| Chats disappear after restart | Configure `MONGODB_URI` for persistent storage. |
| MongoDB startup failure | Check the URI, database availability, credentials, and network permissions. |

See MiniMax's [error-code reference](https://platform.minimax.io/docs/api-reference/errorcode) for account-side diagnostics. Errors after streaming starts arrive as SSE `error` events; the HTTP response has already started.

## Security and contributions

- Keep `MINIMAX_API_KEY`, database credentials, and other secrets exclusively in backend environment configuration. Never use `VITE_MINIMAX_API_KEY` or `NEXT_PUBLIC_MINIMAX_API_KEY`.
- Vite variables are public build-time configuration. Use them only for values safe to expose, such as the backend URL.
- Environment files are ignored by Git; example files must contain placeholders only. Review diffs for secrets before committing.
- Preserve Firebase authentication and per-user conversation isolation when contributing. Run the applicable tests and production build before submitting changes.

## License

`backend/package.json` declares ISC. No standalone repository-wide `LICENSE` file is included.
