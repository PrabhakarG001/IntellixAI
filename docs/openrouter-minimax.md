# MiniMax M3.1 Flash free through OpenRouter

The JavaScript backend now uses native `fetch` with:

- Endpoint: `https://openrouter.ai/api/v1/chat/completions`
- Model: `minimax/minimax-m3.1-flash:free`
- Server-only credential: `OPENROUTER_API_KEY`
- Optional attribution URL: `OPENROUTER_SITE_URL`

Keep the key in the ignored `backend/.env` for local development and in Render's
environment settings for production. Restart the backend or redeploy after
changing the key. A direct MiniMax key cannot authenticate to OpenRouter. No
SDK dependency, paid-model fallback or frontend credential is introduced.

Talk and Coding use low reasoning effort; Reasoning uses high effort. This model
requires reasoning, so the backend never sends `thinking: disabled` or requests
zero effort. It requests streamed usage and an 8192-token generation budget.
The diagnostic uses a 2048-token budget to allow reasoning before a short answer.

OpenRouter's `reasoning`, `reasoning_details` and streaming error envelopes are
handled. Reasoning details, including opaque blocks, stay server-side and are
preserved in order for subsequent requests. The existing chat event protocol,
Firebase authentication, ownership checks and page layout remain unchanged.
Existing `MINIMAX_*` application error codes are retained for compatibility.

## Credential failure verified on October 20, 2026

The live diagnostic reached OpenRouter but authentication failed. A separate
`GET https://openrouter.ai/api/v1/key` request using the existing local backend
credential returned HTTP 401 with the provider message **User not found**.
This identifies an OpenRouter credential/account error, not a missing Firebase
user or a missing database user row. The backend maps it to a safe HTTP 502
`MINIMAX_AUTH` explanation pointing to `OPENROUTER_API_KEY`.

Replace the rejected key using [OpenRouter's key settings](https://openrouter.ai/settings/keys),
set the valid key on the backend only, then run:

```sh
cd backend
npm run check:api
npm run test:live
```

The configuration check does not contact the provider. The live test must report
successful authentication and inference before claiming live generation works.
Neither keys nor generated text are printed by the diagnostic. Existing local
environment files were preserved, and no production environment setting was
changed. The deployed Render backend still needs to run the updated source.

The free route was present in the public catalog when checked, with zero prompt
and completion prices, and was absent from the EU-region catalog. Availability
and free-request limits can change; unavailable free routes fail rather than
silently switching to a paid model.

References: [model](https://openrouter.ai/minimax/minimax-m3.1-flash:free),
[reasoning](https://openrouter.ai/docs/guides/best-practices/reasoning-tokens),
[streaming](https://openrouter.ai/docs/api/reference/streaming).
