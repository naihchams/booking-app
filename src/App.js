import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { config } from "./Config";
import { PublicClientApplication } from "@azure/msal-browser";
import BookingPage from "./BookingPage";
import QRPage from "./qr-page";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isAuthenticated: false,
      user: {},
    };
    this.PublicClientApplication = new PublicClientApplication({
      auth: {
        clientId: config.appId,
        redirectUri: config.redirectUri,
      },
      cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: true,
      },
    });
  }

  async componentDidMount() {
    try {
      const response =
        await this.PublicClientApplication.handleRedirectPromise();
      let account = null;

      if (response && response.account) {
        account = response.account;
        this.setState({
          isAuthenticated: true,
          user: account,
        });
      } else {
        const currentAccounts = this.PublicClientApplication.getAllAccounts();
        if (currentAccounts.length > 0) {
          account = currentAccounts[0];
          this.setState({
            isAuthenticated: true,
            user: account,
          });
        } else {
          this.login();
          return;
        }
      }

      const tokenRequest = {
        scopes: config.scopes,
        account: account,
      };

      const tokenResponse =
        await this.PublicClientApplication.acquireTokenSilent(tokenRequest);
      const accessToken = tokenResponse.accessToken;

      localStorage.setItem("accessToken", accessToken);
      console.log("Access token saved to local storage:", accessToken);
    } catch (err) {
      console.error("MSAL error:", err);
      this.setState({ error: err });
    }
  }

  login = async () => {
    try {
      await this.PublicClientApplication.loginRedirect({
        scopes: config.scopes,
        prompt: "select_account",
      });
    } catch (err) {
      console.error("Login error:", err);
      this.setState({ isAuthenticated: false, user: {}, error: err });
    }
  };

  logout() {
    localStorage.removeItem("accessToken");
    this.PublicClientApplication.logout();
  }

  render() {
    return (
      <Router>
        <Routes>
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/qr" element={<QRPage />} />
          <Route path="*" element={<Navigate to="/booking" />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
