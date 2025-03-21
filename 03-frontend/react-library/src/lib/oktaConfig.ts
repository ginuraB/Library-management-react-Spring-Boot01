export const oktaConfig = {
  clientId: process.env.REACT_APP_OKTA_CLIENT_ID || "",
  issuer: process.env.REACT_APP_OKTA_ISSUER || "",
  redirectUri: "http://localhost:3000/login/callback",
  scopes: ["openid", "profile", "email"],
  pkce: true,
  disableHttpsCheck: true,
};
