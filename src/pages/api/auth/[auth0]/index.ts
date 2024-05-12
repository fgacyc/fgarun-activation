import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

export default handleAuth({
  login: handleLogin(() => {
    return {
      authorizationParams: {
        audience: "https://graphql.development.fgacyc.com/",
      },
      returnTo: "/register",
    };
  }),
});
