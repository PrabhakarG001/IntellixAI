<div align="center">
  <img src="Frontend/public/logo.png" width="96" alt="IntellixAI logo" />
  <h1>IntellixAI</h1>
  <p><strong>Streaming AI chat, built end to end.</strong></p>
  <p>A React workspace for conversation, coding help, and reasoning—backed by a JavaScript API for authentication, streaming, and conversation storage.</p>

  <img src="https://img.shields.io/badge/React-19-149ECA?style=flat-square&amp;logo=react&amp;logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/Node.js-22.12%2B-43853D?style=flat-square&amp;logo=nodedotjs&amp;logoColor=white" alt="Node.js 22.12 or newer" />
  <img src="https://img.shields.io/badge/Express-5-333333?style=flat-square&amp;logo=express&amp;logoColor=white" alt="Express 5" />
  <img src="https://img.shields.io/badge/AI-MiniMax_M3-7952B3?style=flat-square" alt="MiniMax M3 integration" />

  <p><a href="#engineering-highlights">Engineering</a> · <a href="#architecture">Architecture</a> · <a href="#quick-start">Quick start</a> · <a href="https://github.com/PrabhakarG001/IntellixAI">Repository</a></p>
</div>

> **Verification status:** The frontend, backend, and automated integration tests are included here. Live MiniMax inference, a real Firebase login, and MongoDB persistence have not been verified against external accounts. Configure your own credentials before running the application.

<!-- Add a genuine application screenshot or GIF here when one is available. -->

## Overview

IntellixAI gives developers and curious learners one workspace for general questions, programming assistance, and reasoning tasks. It combines a conversational UI with server-managed context, streamed answers, and optional persistent history.

The engineering work spans the full request lifecycle: React state and cancellation, authenticated Express routes, a centralized provider boundary, SSE decoding across network packets, and per-user storage. The project emphasizes practical integration and explicit failure handling; it does not claim production scale or benchmark results.

## Engineering highlights

| Area | Implementation |
| --- | --- |
| Streaming lifecycle | The shared SSE decoder handles upstream and frontend events, including fragmented UTF-8, CRLF boundaries, usage events, and completion detection. Client cancellation propagates to the provider. |
| Authentication and isolation | Firebase ID-token verification protects chat routes; records are scoped to the signed-in user. |
| Provider boundary | One backend service calls the official MiniMax M3 HTTP API directly. Credentials stay server-side; the server fixes the model and endpoint. |
| Failure handling | Input limits, safe error categories, a two-minute provider timeout, and one retry for pre-stream transient failures. No provider fallback or fake answers. |
| State consistency | A synchronous frontend submission guard and per-process backend locks prevent concurrent generation on the same thread. Regeneration replaces the last exchange. |
| Testability | Node's test runner exercises service behavior, stream parsing, and real local HTTP integration with mocked provider responses. |

## What you can do

| Capability | What is implemented |
| --- | --- |
| Live conversations | Stream answers, stop generation, and regenerate the latest response. |
| Task modes | Talk, Coding, and Reasoning share the same MiniMax M3 model. |
| Personal history | Create, search, clear, and delete chats with automatic titles. Pinning and renaming are local UI state and reset on reload. |
| Readable answers | Markdown, code blocks, tables, task lists, and response/code copying. |
| Sign-in | Google login through Firebase Authentication. |
| Storage | MongoDB persistence when configured; temporary process memory otherwise. |
| Interface | Responsive dark layout, animated WebGL backgrounds, and loading states. |

## Technology stack

| Layer | Technologies |
| --- | --- |
| Frontend | React 19, Vite 7, React Router 7, Tailwind CSS 4, custom CSS |
| UI and rendering | Framer Motion, OGL, Lucide React, React Markdown, remark-gfm |
| Backend | Node.js, Express 5, JavaScript ES modules, native `fetch` |
| Authentication | Firebase Web SDK and Firebase Admin SDK |
| AI integration | Official MiniMax HTTP API through native `fetch`, fixed to `MiniMax-M3` |
| Database and storage | MongoDB through Mongoose 9; optional process-memory storage |
| Development and hosting | npm, Node.js test runner; Vercel configuration for the frontend build only |

## Architecture

```mermaid
flowchart LR
    U[User] --> R[React chat workspace]
    R <-->|Sign-in and ID token| F[Firebase Authentication]
    subgraph B[Backend boundary: provider credential stays here]
        E[Express API and token verification] --> S[MiniMax service]
        K[MINIMAX_API_KEY in server environment] -.-> S
        E <--> T[User-scoped thread storage]
    end
    R -->|Firebase token and chat data| E
    S -->|HTTPS request| M[MiniMax M3]
    M -->|Streamed response| S
    S -->|Content, reasoning, usage| E
    E -->|SSE events| R
    T <--> D[(MongoDB or temporary memory)]
```

The browser never calls MiniMax directly. Express verifies the Firebase token, validates history, forwards provider events, and saves completed answers with their complete separated reasoning text for subsequent turns. Partial failures are reported explicitly. Reasoning events are separate from answer content; the UI does not currently display a separate reasoning panel.

<details>
<summary><strong>Project structure</strong></summary>

```text
Frontend/
  src/
    components/          Chat, sidebar, input, and visual effects
    config/              Task-mode definitions
    hooks/               Chat state and generation lifecycle
    pages/               Login page
    services/            Firebase, backend requests, SSE, and history helpers
    styles/              Global styling
  test/                  Transport and history tests
  vite.config.js         Plugins and local API proxy
backend/
  controllers/           Chat CRUD and response handlers
  models/                Conversation storage
  routes/                Authenticated API routes
  services/              Request validation and MiniMax integration
  utils/                 Authentication and safe errors
  scripts/               Live MiniMax smoke check
  test/                  Service and HTTP integration tests
  app.js                 Express application factory
  server.js              Environment, database connection, and startup
shared/                  SSE decoder used by frontend and backend
package.json             Root install, run, build, and test scripts
vercel.json              Frontend build configuration
```

</details>

## Quick start

### Prerequisites

- Node.js **22.12 or newer**, npm, and Git. Vite 7 requires at least Node 22.12 on the 22.x line.
- A direct MiniMax API key with MiniMax-M3 access and available quota.
- A Firebase project with Google sign-in enabled and frontend domains authorized.
- MongoDB only if persistent history is required.

The frontend Firebase project must match the backend's `FIREBASE_PROJECT_ID`.

### Clone and install

```sh
git clone https://github.com/PrabhakarG001/IntellixAI.git
cd IntellixAI
npm run install:all
```

Installation reads the root, frontend, and backend package manifests.

### Configure the frontend

Create `Frontend/.env.local` only if it does not already exist, using `Frontend/.env.example` as a reference. Supply your Firebase project's public browser configuration:

```dotenv
VITE_API_BASE_URL=/api
VITE_FIREBASE_API_KEY=your_firebase_web_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

These Firebase web settings are public browser configuration, not backend credentials. Never put `MINIMAX_API_KEY` in a frontend environment file. Enable Google sign-in and authorize the app's hostname in the matching Firebase project.

For hosted builds (including Vercel), add the four `VITE_FIREBASE_*` variables above in the hosting project's environment settings for each deployed environment (Production and/or Preview). Local `.env.local` files are ignored by Git and are not uploaded. Vite embeds these values at build time: redeploy after saving them, or restart Vite after changing local settings. Missing configuration displays a sign-in unavailable message and disables login; it does not allow unauthenticated access. See [Vite environment variables](https://vite.dev/guide/env-and-mode).

### Configure the backend

Create `backend/.env` if it does not exist, then edit it locally. Preserve existing environment files.

```dotenv
MINIMAX_API_KEY=your_minimax_api_key_here
PORT=5000
CLIENT_ORIGIN=http://localhost:5173,http://127.0.0.1:5173
FIREBASE_PROJECT_ID=your_firebase_project_id
# Optional: omit for temporary in-memory storage.
# MONGODB_URI=mongodb://127.0.0.1:27017/intellixai
```

| Variable | Purpose |
| --- | --- |
| `MINIMAX_API_KEY` | Backend-only direct MiniMax credential; the only active AI credential. |
| `PORT` | Backend port; defaults to `5000`. |
| `CLIENT_ORIGIN` | Comma-separated frontend origin allowlist; defaults to the local origins above. |
| `FIREBASE_PROJECT_ID` | Firebase project for token verification; omission uses the existing project default. |
| `MONGODB_URI` | Optional database URI. Without it, chats reset on server restart. |
| `VITE_API_BASE_URL` | Optional **public frontend** setting; defaults to `/api`. Set before building. |

For a separately hosted backend, put its public URL in `Frontend/.env.local`:

```dotenv
VITE_API_BASE_URL=https://your-backend.example/api
```

The backend fixes the model and endpoint in `backend/services/minimaxService.js`; no model environment variable is needed:

```text
Model:    MiniMax-M3
Endpoint: POST https://api.minimax.io/v1/chat/completions
Auth:     Authorization: Bearer <MINIMAX_API_KEY>
```

The model and endpoint are verified against MiniMax's [invocation guide](https://platform.minimax.io/docs/guides/text-generation) and [HTTP compatibility reference](https://platform.minimax.io/docs/api-reference/text-openai-api). Requests use bearer authentication, `stream_options.include_usage`, `reasoning_split: true`, and `max_completion_tokens: 8192`. Talk and Coding use `thinking.type: disabled`; Reasoning uses `adaptive`. Stored assistant reasoning is returned as `reasoning_content` in the next request. There are no gateway SDKs, alternate models, or provider fallbacks.

Only `MINIMAX_API_KEY` is read for AI authentication. Existing local environment files are preserved; remove unused legacy entries when editing them locally.

### Start the application

Run each command from the repository root in a separate terminal:

```sh
# Terminal 1
npm run start:backend
```

```sh
# Terminal 2
npm run dev:frontend
```

Open `http://localhost:5173` and sign in. Vite proxies `/api` to `http://localhost:5000`. If either port changes, update the proxy/backend URL and the allowed frontend origin. When `MONGODB_URI` is set, startup waits for MongoDB and exits if the connection fails; otherwise, it warns that storage is temporary.

## Validation

From the repository root:

```sh
npm test
npm run build
```

Tests cover validation, failure classification, bounded retries, HTTP integration, regeneration, cancellation, concurrency, and fragmented streams. Provider responses and authentication are injected in integration tests; they do not verify real Firebase sign-in, MongoDB persistence, or MiniMax billing/access. No coverage percentage, lint script, or TypeScript check is claimed.

The build writes `Frontend/dist`. To preview it:

```sh
cd Frontend
npm run preview
```

Preview does not use Vite's development API proxy. Set `VITE_API_BASE_URL` before building when previewing against a separate backend.

Check configuration without a billable request, from the root:

```sh
cd backend
npm run check:api
```

The result separates key presence from authentication and inference; the latter remain `not_checked` until a live request succeeds. Backend liveness is checked independently with `GET /`. No public endpoint exposes provider configuration or performs diagnostic inference.

To check the real MiniMax account, run from the root:

```sh
cd backend
npm run test:live
```

The live check sends a small, potentially billable request when a key exists. Missing credentials return `MINIMAX_NOT_CONFIGURED`. Mocked tests are not proof of live model access.

<details>
<summary><strong>API reference</strong></summary>

All `/api` routes require `Authorization: Bearer <FIREBASE_ID_TOKEN>`. This is a Firebase session token, not the MiniMax key.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/` | Public backend health response |
| `GET` | `/api/chats` | List the user's conversations |
| `GET` | `/api/chat/:id` | Retrieve a conversation |
| `POST` | `/api/new-chat` | Create a conversation |
| `DELETE` | `/api/chat/:id` | Delete a conversation |
| `POST` | `/api/chat/:id/clear` | Clear a conversation |
| `POST` | `/api/chat` | Return a complete JSON answer |
| `POST` | `/api/chat/stream` | Stream an SSE answer |

`/api/stream` aliases the streaming route. The router also mounts at `/api/intellix` with the same relative paths.

```json
{
  "message": "Explain this function.",
  "mode": "coding"
}
```

Optional fields include `chatId`, `thinkingMode` (`quick` or `deep`), and `regenerate`. Stream events include `meta`, `content`, `thought`, `usage`, `done`, and `error`.

</details>

## Deployment and current limits

Deploy Express as a Node service with the root `shared/` directory available. Include `shared/` when building the frontend as well. Configure persistent MongoDB storage and exact frontend origins for a hosted installation.

The Vercel configuration installs the frontend's locked dependencies and builds the frontend only; it does not deploy Express or configure SPA history fallback. Configure the frontend host to serve `index.html` for application routes, and route `/api` to Express or set `VITE_API_BASE_URL` before building. Streaming requires proxy buffering to be disabled and request durations longer than the backend's two-minute timeout.

Locks and memory storage are per process. Multiple backend instances need shared coordination and persistent storage. No working public deployment or application screenshot is included here.

Dependency audit on October 18, 2026: the backend has no reported advisories; the frontend has five (four high findings in Firebase's unused Firestore/gRPC dependency chain and one low esbuild development-server finding). Firestore is not imported by this application. npm proposes a breaking Firebase downgrade for that chain; it has not been applied. These findings remain open.

<details>
<summary><strong>Troubleshooting</strong></summary>

| Symptom | Check |
| --- | --- |
| `MINIMAX_NOT_CONFIGURED` / 503 | Set the backend key and restart Express. |
| `MINIMAX_AUTH` / 502 | Verify the direct MiniMax key and account access. |
| `MINIMAX_MODEL` / 502 | Check account access to MiniMax-M3. |
| `MINIMAX_ACCESS` / 502 | Check account permissions. |
| `MINIMAX_REQUEST` / 502 | Check input and parameter limits. |
| `MINIMAX_QUOTA` / 503 | Check MiniMax balance and quota. |
| HTTP 429 | Wait for the provider rate limit to clear. |
| HTTP 401 | Sign in again; verify both Firebase project configurations. |
| Sign-in unavailable / missing `VITE_FIREBASE_*` | Set all four required frontend Firebase settings in `.env.local` or the hosting build environment, then restart or rebuild and redeploy. Setting them only in `backend/.env` has no effect on Vite. |
| CORS rejection / 403 | Match the frontend scheme, hostname, and port in `CLIENT_ORIGIN`. |
| HTTP 409 | Wait for or stop the active generation in this thread. |
| Invalid stream, HTML, or network failure | Check backend availability and `/api` routing. A frontend-only host cannot serve Express. |
| Interrupted answer or timeout | Check connectivity and proxy streaming limits; retry or shorten the prompt. |
| History disappears | Configure MongoDB; process-memory history resets on restart. |
| MongoDB startup failure | Verify the URI, database availability, and network permissions. |

Errors after streaming starts arrive as SSE `error` events. MiniMax's [error reference](https://platform.minimax.io/docs/api-reference/errorcode) covers provider-side diagnostics.

</details>

## Security

- Keep provider keys and database credentials on the backend. Never use `VITE_MINIMAX_API_KEY` or `NEXT_PUBLIC_MINIMAX_API_KEY`.
- Vite environment variables are public build-time configuration. Use them only for values safe to expose.
- `.gitignore` excludes local environment files, dependencies, build outputs, caches, and private credential exports while allowing `.env.example` files. Review staged files before committing.
- Previously committed credentials must be revoked and rotated. Ignore rules protect future commits; they do not remove secrets from Git history.

## Next steps

These are future improvements, not shipped features:

- Verify MiniMax inference and a hosted installation with real account configuration.
- Add genuine UI screenshots and a verified deployment link.
- Persist pinned chats and custom titles through the backend.
- Add signed-in browser tests, real database integration checks, and coordination across backend instances.

## Explore and contribute

Browse the [source repository](https://github.com/PrabhakarG001/IntellixAI), report reproducible problems in [Issues](https://github.com/PrabhakarG001/IntellixAI/issues), or propose a focused change through [Pull requests](https://github.com/PrabhakarG001/IntellixAI/pulls). Keep secrets out of commits and run the applicable tests and production build before submitting changes.

**License:** `backend/package.json` declares ISC. No standalone repository-wide `LICENSE` file is included.
