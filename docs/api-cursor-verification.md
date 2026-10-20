# API and desktop cursor fixes

## Root causes

The custom cursor stylesheet hid every native cursor on fine-pointer devices,
including login and public pages where the custom cursor was not mounted. Its
click and loading animations also replaced its positioning transform. Native
cursors now remain enabled, while the existing decoration uses independent
translation, scale and rotation. Its listeners no longer restart whenever its
visibility changes, and leaving or blurring the document resets pressed state.

CRUD calls discarded backend error messages, assumed every response was valid
JSON with the expected chat shape, and had no deadline. The shared JSON request
helper preserves server errors, validates response envelopes and times out after
30 seconds, including token lookup and response-body parsing. Existing Firebase
token verification and the one-time refresh on HTTP 401 remain in place.

The empty workspace omitted its API error entirely. It now displays the same
error style as a conversation. Chat state also ignores outdated list/selection
responses and clears from a previous account, shares concurrent chat-creation
requests, and does not fetch the local placeholder as a server-side chat.
Invalid stream events are rejected before reaching message state.

## Verification and external configuration

Run `npm test` and `npm run build` from the repository root. There are no lint or
type-check scripts in the current package manifests. Integration tests use a
local HTTP server and explicitly stub the upstream AI response; these are tests,
not application fallbacks. Browser checks exercised click/loading cursor
positioning, native cursor styles, the text caret, dialogs, blur/re-entry,
unmount, scroll, reload, login/home navigation, mobile input and request races.

On October 20, 2026, the deployed frontend used
`https://intellixai.onrender.com/api`. Production's seven canonical chat routes
rejected unauthenticated requests with JSON HTTP 401; the streaming CORS
preflight returned HTTP 204 and allowed `authorization,content-type`.
The optional `/api/stream` alias returned HTML HTTP 404 on Render, although it
exists in the repository. The frontend uses `/api/chat/stream`; redeploy the
backend from current `main` if callers need the optional alias.

The local live diagnostic reported `MINIMAX_NOT_CONFIGURED` without attempting
inference. Set a valid `MINIMAX_API_KEY` in the **backend environment only** and
restart the backend (or redeploy Render), then run `npm run test:live` from
`backend`. Never put this key in `VITE_*` settings or commit an environment file.
Successful production inference and private-data operations require a real
Firebase session and have not been verified by these unauthenticated checks.

Local Vite development proxies `/api` to `http://localhost:5000`. Production
should keep `VITE_API_BASE_URL=https://intellixai.onrender.com/api`, with Render's
`CLIENT_ORIGIN` allowing the frontend hostname and `FIREBASE_PROJECT_ID` matching
the frontend's existing Firebase project. Dashboard settings were not changed.

The current MiniMax endpoint and M3 thinking/streaming parameters match the
[official OpenAI-compatible API documentation](https://platform.minimax.io/docs/api-reference/text-openai-api).
