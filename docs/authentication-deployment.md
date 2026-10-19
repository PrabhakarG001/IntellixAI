# Firebase sign-in deployment

The production sign-in unavailable message means Firebase could not initialize.
An unauthorized domain or OAuth callback failure happens later, after sign-in starts;
changing callback URLs cannot supply missing build variables.

## Required Vercel settings

In the Vercel project serving `intellix-ai-six.vercel.app`, open **Settings >
Environment Variables** and add the following for **Production**, and **Preview**
if previews should support sign-in:

| Variable | Source in Firebase Console |
| --- | --- |
| `VITE_FIREBASE_API_KEY` | Project settings > General > Your apps > existing web app > SDK configuration > `apiKey` |
| `VITE_FIREBASE_AUTH_DOMAIN` | Same web app's `authDomain` |
| `VITE_FIREBASE_PROJECT_ID` | Same web app's `projectId` |
| `VITE_FIREBASE_APP_ID` | Same web app's `appId` |

Use the existing `intellixai-3aaaf` project and web app so accounts and sessions
remain associated with the same provider. Do not create a replacement project.
The frontend project must match the backend's `FIREBASE_PROJECT_ID`.
Never substitute a Firebase Admin private key or AI provider credential here.

Redeploy **after** saving the variables. Vite embeds them during the build;
adding settings does not change an already deployed JavaScript bundle.
Local `Frontend/.env.local` is ignored by Git and is not sent to Vercel.
The build now rejects missing or placeholder configuration instead of publishing
a page whose sign-in button can never work. No values are included in its error.

Use the repository root as Vercel's Root Directory with the existing root
`vercel.json`: it installs in `Frontend`, runs the root build script, and publishes
`Frontend/dist`. Keep the `/login` rewrite so direct visits and reloads work.

## Provider settings to verify

Inspection of Firebase's public project configuration confirmed that
`intellix-ai-six.vercel.app` is already authorized. No domain change is needed to
resolve the observed missing-build-configuration error. The checks below apply
if sign-in reports a separate provider error after the build settings are fixed.

1. Firebase Console > Authentication > Sign-in method: enable **Google** in the
   existing project and set its required support email.
2. Authentication > Settings > Authorized domains: include
   `intellix-ai-six.vercel.app` and any custom or preview hostname actually used.
   Add `localhost` and `127.0.0.1` if local sign-in testing is required.
   Enter hostnames, without schemes, ports, or paths.
3. For the Google OAuth web client used by Firebase, ensure its authorized redirect
   URIs include `https://intellixai-3aaaf.firebaseapp.com/__/auth/handler` when using
   that default `authDomain`. Use the exact configured auth domain's handler if
   your existing setup differs. `/login` is an application route, not the Google
   OAuth callback.
4. Keep the Firebase-provided `authDomain`. Changing it to the Vercel hostname
   requires hosting/proxying Firebase's auth helper endpoints as described in
   Firebase's redirect guidance; a generic SPA rewrite does not provide them.

## Verification

Open `/login` after redeploying: the configuration warning must be absent and
Google sign-in enabled. Complete sign-in with a real account, reload to confirm
session persistence, then log out and confirm private workspace routes redirect
to `/login`. A cancelled popup must leave the user signed out and permit retry.
The existing back arrow is on `/login` at every viewport size, including during
session loading. The public welcome page intentionally has no back control.

References: [Vite build variables](https://vite.dev/guide/env-and-mode),
[Firebase Google sign-in](https://firebase.google.com/docs/auth/web/google-signin),
[Firebase redirect hosting](https://firebase.google.com/docs/auth/web/redirect-best-practices).
