export const refereshAccessToken = async (token: any) => {
  const urlParamsObject = {
    client_id: process.env.GOOGLE_CLIENT_ID || "",
    client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
    grant_type: "refresh_token",
    refresh_token: token.refreshToken || "",
  };

  const urlPart = new URLSearchParams(urlParamsObject);
  const url = "https://oauth2.googleapis.com/token?" + urlPart;

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });
    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }
    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (err) {
    console.log(err);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
};
