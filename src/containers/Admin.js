import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel, HelpBlock } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Admin.css";

export default function Admin() {
  const [isLoading, setIsLoading] = useState(false);
    
  function redirectToIMS(event) {
    event.preventDefault();
    window.location.href="https://ims-na1-stg1.adobelogin.com/ims/authorize/v1?client_id=SampleBlueApp-Stage&scope=AdobeID,openid,service_principals.write,service_principals.write_restricted,read_organizations,u.roles.write,additional_info.roles";
  }
    
  return (
    <div className="Login">
        <form onSubmit={redirectToIMS}>
        <HelpBlock>Please click the button below to link your IMS account.</HelpBlock>
        <LoaderButton block type="submit" bsSize="large" >Login with IMS</LoaderButton>
        </form>
    </div>
  );
}