import React, { useState, useEffect } from "react";
import theme from "./config/theme.js";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./config/GlobalStyles";
import Header from "./Components/Header";
import Loader from "./Components/Loader";
import { Switch, Route, useLocation, Redirect } from "react-router-dom";
import Dash from "./Views/Dash";
import Signup from "./Views/Signup";
import Product from "./Views/Product";
import Profile from "./Views/Profile";
import Login from "./Views/Login";

import useChallenge from "./services/firebase/useChallenge";
import useAuth from "./services/firebase/useAuth";
import useProduct from "./services/firebase/useProduct"
import firebase from "firebase/app"; // the firbase core lib
import "firebase/auth"; // specific products
import "firebase/firestore";
import firebaseConfig from "./config/firebase"; // the firebase config we set up ealier





 
let initAttemptedRoute = "/"

function Protected({ authenticated, children, ...rest }) {

  initAttemptedRoute  = useLocation().pathname;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        authenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function RedirectToDash({ authenticated, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !authenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: initAttemptedRoute,
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function App() {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();
  const {
    isAuthenticated,
    createEmailUser,
    signInEmailUser,
    signInWithProvider,
    signOut,
    user,
    loading
  } = useAuth(firebase.auth);

  const {
    createProduct,
    readProducts,
    readComments,
    createComment,
  } = useProduct(firebase.firestore)

  const {
    readChallenges 
  } = useChallenge(firebase.firestore);


  const handleClick =  async e => {
    setMenuOpen(!menuOpen);
  };

  const handleOuterWrapperClick = e => {
    setMenuOpen(false);
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  if (loading ) {
    return  <Loader />;
  } 
 
  
  return (

    <div style={{overflowX: 'hidden'}}>
      <ThemeProvider theme={theme}>
        {location.pathname !== "/Signup" && location.pathname !== "/login" && (
          <Header
            onClick={handleClick}
            signOut={signOut}
            user={user}
            open={menuOpen}
          />
        )}
        <GlobalStyles />
        <div
          onClick={handleOuterWrapperClick}
          style={{
            width: "100vw",
            horizontalScroll: "none",
            overflowX: "hidden",
            height: "100vh"
          }}
        >
          <Switch>
            <Protected authenticated={isAuthenticated} exact path="/">
              <Dash user={user} readComments={readComments} createComment={createComment} readProducts={readProducts} readChallenges={readChallenges} />
            </Protected>
            <RedirectToDash authenticated={isAuthenticated} path="/Signup">
              
            
            {
                /**
                 * I have set up these loaders to handle the social sign-in redirect
                 * which redirects back to the page you initiated it from
                 * as such we only want to show the page after the redirect has authenticated
                 */
              } 

                <Signup
                signInWithProvider={signInWithProvider}
                createEmailUser={createEmailUser}
              />

          
              
            </RedirectToDash>
            <RedirectToDash authenticated={isAuthenticated} path="/login">
                  <Login
                  signInWithProvider={signInWithProvider}
                  signInEmailUser={signInEmailUser}
                />
            </RedirectToDash>
            <Protected authenticated={isAuthenticated} path="/profile">
              <Profile  user={user} />
            </Protected>
            <Protected authenticated={isAuthenticated} path="/checkin">
              <Product  createProduct={createProduct}  user={user} />
            </Protected>
          </Switch>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
