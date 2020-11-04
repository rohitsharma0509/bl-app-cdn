import React from "react";
import { onError } from "../libs/errorLib";
import "./Admin.css";

export default class Manage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            userviews: null,
        };
    }

    componentDidMount() {
        this.fetchManagePage();
    }

    async fetchManagePage() {
        this.setIsLoading(true);

        try {
            let response = await fetch('https://local-test.acrobat.com/blueapp/managepage?email=' + encodeURIComponent(sessionStorage.accessToken), {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            })

            let result = await response.json();
            if(response.status>=400) {
                throw new Error("ResponseCode=" + response.status + " " + JSON.stringify(result));
            }
            if (result) {
                this.setState({
                    userviews: result,
                });
            }
        }
        catch (e) {
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

    getManagePage() {
        const { userviews } = this.state;
        if(userviews == null) {
            return;
        }

        let page = "MANAGE";
        if(window.location.href.endsWith("myaccount")) {
            page="USER_PROFILE";
        }
        
        for (var index = 0; index < userviews.userViewList.length; index++) {
            let userview = userviews.userViewList[index];
            if (userview.name == page) {
                return userview.url;
            }
        }
        return null;
    }

    render() {
        const { isLoading, userviews } = this.state;

        if (isLoading) {
            return <div>Loading...</div>;
        }
        else {
            if (userviews) {
                return (
                    <div className="">
                        <iframe src={this.getManagePage()}></iframe>
                    </div>
                )
            }
            else {
                return (
                    <div className="Login">
                    </div>
                )
            }
        }
    }
}