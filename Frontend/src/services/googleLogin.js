export function loginErrorMessage(error) {
  switch (error?.code) {
    case 'auth/popup-closed-by-user': return 'Sign-in was cancelled. You can try again.';
    case 'auth/cancelled-popup-request': return 'Another sign-in is already open.';
    case 'auth/popup-blocked': return 'Allow popups for this site, then try again.';
    case 'auth/unauthorized-domain': return 'This site is not authorized for Google sign-in. Contact the site administrator.';
    case 'auth/operation-not-allowed': return 'Google sign-in is not enabled. Contact the site administrator.';
    case 'auth/network-request-failed': return 'Sign-in could not connect. Check your connection and try again.';
    case 'auth/too-many-requests': return 'Too many sign-in attempts. Please wait and try again.';
    case 'auth/user-disabled': return 'This account cannot sign in. Contact support.';
    default: return 'Unable to sign in with Google. Please try again.';
  }
}

export function createGoogleLogin({ auth, provider, popup, redirect, redirectResult }) {
  let pendingLogin;
  let pendingRedirect;
  return {
    login() {
      if (!auth) return Promise.reject(new Error('Sign-in is unavailable.'));
      if (pendingLogin) return pendingLogin;
      pendingLogin = (async () => {
        try {
          return (await popup(auth, provider)).user;
        } catch (error) {
          if (error?.code !== 'auth/popup-blocked') throw error;
          await redirect(auth, provider);
          return null;
        }
      })().finally(() => { pendingLogin = null; });
      return pendingLogin;
    },
    completeRedirect() {
      if (!auth) return Promise.resolve(null);
      pendingRedirect ??= Promise.resolve().then(() => redirectResult(auth));
      return pendingRedirect;
    },
  };
}
