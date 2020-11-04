import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./App.css";
import Routes from "./Routes";
import { AppContext } from "./libs/contextLib";


function App() {
  
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const history = useHistory();

  function handleLogout() {
    sessionStorage.clear();
    userHasAuthenticated(false);
    history.push("/login");
  }

  useEffect(() => {
    onLoad();
  }, []);

  function onLoad() {
      if(sessionStorage.getItem("accessToken") !== null ) {
          userHasAuthenticated(true);
      }
    setIsAuthenticating(false);
  }

  function getMenus() {
    if(isAuthenticated) {
      return getMenusForLoggedInUser();
    }
    else {
      return getMenusForLoggedOutUser();
    }
  }
  function getMenusForLoggedInUser() {
    if(sessionStorage.getItem("accessToken") == "admin@bluecrm.com") {
      return (
        <>
          <LinkContainer to="/admin">
            <NavItem>Admin Setup</NavItem>
          </LinkContainer> 
          <NavItem onClick={handleLogout}>Logout</NavItem>
        </>
      )
    }
    else {
      return (
        <>
          <LinkContainer to="/compose">
            <NavItem>Compose</NavItem>
          </LinkContainer>
          <LinkContainer to="/manage">
            <NavItem>Manage</NavItem>
          </LinkContainer> 
          <LinkContainer to="/myaccount">
            <NavItem>My Account</NavItem>
          </LinkContainer> 
          <NavItem onClick={handleLogout}>Logout</NavItem>
        </>
      )
    }
   }

   function getMenusForLoggedOutUser(){
     return (
     <>
      <LinkContainer to="/signup">
        <NavItem>Signup</NavItem>
      </LinkContainer>
      <LinkContainer to="/login">
        <NavItem>Login</NavItem>
      </LinkContainer>
    </>
    );
   }

  return (
    !isAuthenticating &&
    <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">BlueCRM</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
          {getMenus()}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <Routes />
      </AppContext.Provider>
    </div>
  );
}

export default App;