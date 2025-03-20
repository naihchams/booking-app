const msal = require("@azure/msal-node");
const axios = require("axios");

const config = {
  auth: {
    clientId: process.env.CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
    clientSecret: process.env.CLIENT_SECRET,
  },
};

const cca = new msal.ConfidentialClientApplication(config);

const tokenRequest = {
  scopes: [`${process.env.API_SCOPE}/.default`],
};

async function getAccessTokenAndCallAPI() {
  try {
    const response = await cca.acquireTokenByClientCredential(tokenRequest);
    const accessToken = response.accessToken;
    console.log("Access token:", accessToken);

    const apiResponse = await axios.get(
      "https://api.yourservice.com/endpoint",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("API response:", apiResponse.data);
  } catch (error) {
    console.error("Error acquiring token or calling API:", error);
  }
}

getAccessTokenAndCallAPI();
