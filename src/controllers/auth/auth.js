function makeAuthController({ userUseCase, client,jwt }) {
  return Object.freeze({
    googleAuthLogin,
    googleAuthCallback,
  });

  function googleAuthLogin(req, res) {
    try {
      const authUrl = client.generateAuthUrl({
        access_type: "offline",
        scope: [
          "email",
          "profile",
        //   "https://www.googleapis.com/auth/gmail.send",
          "https://www.googleapis.com/auth/gmail.readonly",
        //   "https://www.googleapis.com/auth/gmail.compose",
        ],
      });
      console.log(authUrl);
      res.redirect(authUrl);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }
  async function googleAuthCallback(req, res) {
    const { code } = req.query;
    try {
      const { tokens } = await client.getToken(code);
      console.log("access_token",tokens);
      client.setCredentials(tokens);
      // console.log("called");
      // get user informations
      const { data } = await client.request({
        url: "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
        method: "GET",
      });
      const  databaseName = "db1";
      if(tokens.refresh_token)
      {
      const userdata={
        name:data.name,
        email:data.email,
        access_token:tokens.access_token,
        refresh_token:tokens.refresh_token,
        picture:data.picture,
        locale:data.locale,
        access_token_expiry_date:tokens.expiry_date
      }
      
      const results= await  userUseCase.createUserAction({userdata,databaseName})
      
    }
      console.log("google data : ", data);

      // use JWT to create token and store it in session or cookies
      res.redirect("/");
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  }
}

module.exports = makeAuthController;
