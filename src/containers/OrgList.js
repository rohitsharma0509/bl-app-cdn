import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, FormGroup, FormControl, ControlLabel, HelpBlock } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../libs/errorLib";
import "./Admin.css";

export default class OrgList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      step: 1,
      orgs: [],
      selectedOrg: null,
      productProfiles: [],
      selectedProfile: null,
    };
  }

  componentDidMount() {
    this.fetchOrgs();
  }

  async fetchOrgs() {
    this.setIsLoading(true);
    
    try {
        let response = await fetch('https://local-test.acrobat.com/blueapp/adminorgs', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'            
            }
        })
        
        let result = await response.json();
        if(response.status>=400) {
          throw new Error("ResponseCode=" + response.status + " " + JSON.stringify(result));
        }
        if(result) {
          this.setState({
            orgs: result,
            selectedOrg: result[0].id,
          });
        }
    }
    catch(e) {
        console.log(e);
        onError(e);
    }
    this.setIsLoading(false);
  }

  orgSelectHandler = async(event) => {
    event.preventDefault();

    this.setIsLoading(true);
    console.log(this.state.selectedOrg);

    try {
      let response = await fetch('https://local-test.acrobat.com/blueapp/clientcredentials?orgId='+this.state.selectedOrg, {
          method: 'GET',
          headers: {
              'Accept': 'application/json'            
          }
      })
      
      let result = await response.json();
      if(response.status>=400) {
        throw new Error("ResponseCode=" + response.status + " " + JSON.stringify(result));
      }

      if(result) {
        let response = await fetch('https://local-test.acrobat.com/blueapp/productprofiles', {
          method: 'GET',
          headers: {
              'Accept': 'application/json'            
          }
        })
      
        let result = await response.json();
        if(response.status>=400) {
          throw new Error("ResponseCode=" + response.status + " " + JSON.stringify(result));
        }
        if(result) {
          this.setState({
            productProfiles: result,
            selectedProfile: result[0].profile_id,
            step: 2,
          });
        }
      }
    }
    catch(e) {
      console.log(e);
      onError(e);
    }
    this.setIsLoading(false);

  }

  profileSelectHandler = async(event) => {
    event.preventDefault();

    this.setIsLoading(true);
    console.log(this.state.selectedProfile);

    try {
      let response = await fetch('https://local-test.acrobat.com/blueapp/defaultproductprofile?profileId='+ this.state.selectedProfile, {
          method: 'GET',
          headers: {
              'Accept': 'application/json'            
          }
      })
      
      let result = await response.json();
      if(response.status>=400) {
        throw new Error("ResponseCode=" + response.status + " " + JSON.stringify(result));
      }
      if(result) {
        this.setState({
          step: 3,
        });
      }
    }
    catch(e) {
        console.log(e);
        onError(e);
    }
    this.setIsLoading(false);
  }

  setIsLoading(value) {
    this.setState({
      isLoading: value,
    });
  }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }
  
  render() {
    const { isLoading, orgs, step, productProfiles} = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    }
    else if (step === 1) {
      return (
        <div className="Login">
          <form onSubmit={this.orgSelectHandler}>
            <label>Select Org:</label>
            <select name='selectedOrg' onChange={this.myChangeHandler}>
                {orgs.map(item => (
                  <option value={item.id}>
                    {item.type} {item.name} 
                  </option>
                ))}
            </select>
            <br/>
            <br/>
            <input type='submit' />
        </form>
        </div>
      )
    }
    else if (step === 2) {
      return (
        <div className="Login">
          <form onSubmit={this.profileSelectHandler}>
            <label>Select Default Profile for user auto provisioning:</label> 
            <select name='selectedProfile' onChange={this.myChangeHandler}>
              {productProfiles.map(item => (
                <option value={item.profile_id}>
                  {item.name} 
                </option>
              ))}
            </select>
            <br/>
            <br/>
            <input type='submit' />
          </form>
        </div>
        
      )
    }
    else if (step === 3) {
      return (
        <div className="Login">
          <form>Default Profile Set Successfully.</form>
        </div>
        
      )
    }
    
  }
  
}