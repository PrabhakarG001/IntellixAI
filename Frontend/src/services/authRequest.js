const sessionExpired = () => new Error('Your session is invalid or expired. Please sign in again.');

export function createAuthenticatedFetch({ auth, logout, fetchImpl = globalThis.fetch }) {
  return async (url, options = {}) => {
    if (!auth) throw new Error('Sign-in is unavailable. Please contact the site administrator.');
    const user = auth.currentUser;
    if (!user) throw sessionExpired();
    const send = async forceRefresh => {
      let token;
      try { token = await user.getIdToken(forceRefresh); }
      catch (error) {
        if (['auth/user-token-expired', 'auth/invalid-user-token', 'auth/user-disabled'].includes(error?.code)) {
          if (auth.currentUser === user) await logout();
          throw sessionExpired();
        }
        throw new Error('Unable to verify your session. Check your connection and try again.');
      }
      // Do not send a previous account's request after account switching or logout.
      if (!token || auth.currentUser !== user) throw sessionExpired();
      const headers = new Headers(options.headers);
      headers.set('Authorization', `Bearer ${token}`);
      return fetchImpl(url, { ...options, headers });
    };
    let response = await send(false);
    if (response.status === 401) {
      if (auth.currentUser !== user) throw sessionExpired();
      // Authentication middleware rejected this before running the API action.
      response = await send(true);
      if (response.status === 401) {
        if (auth.currentUser === user) await logout();
        throw sessionExpired();
      }
    }
    if (auth.currentUser !== user) throw sessionExpired();
    return response;
  };
}
