import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Login.css";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import { useFormFields } from "../libs/hooksLib";
import { useHistory } from "react-router-dom";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: ""
  });
    
  const { userHasAuthenticated } = useAppContext();

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    
    try {
        let response = await fetch('https://local-test.acrobat.com/blueapp/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"email": fields.email, "password": fields.password})
        })
        
        let result = await response.json();
        if(response.status>=400) {
          throw new Error("ResponseCode=" + response.status + " " + JSON.stringify(result));
        }
        if(result && result.accessToken) {
            sessionStorage.setItem("accessToken", result.accessToken);
            userHasAuthenticated(true);
            
            history.push("/");
        }
    }
    catch(e) {
        console.log(e);
        onError(e);
        setIsLoading(false);
    }
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={fields.password}
            onChange={handleFieldChange}
            type="password"
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Login
        </LoaderButton>
      </form>
    </div>
  );
}