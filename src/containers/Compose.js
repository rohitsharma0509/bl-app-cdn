import React from "react";
import { onError } from "../libs/errorLib";
import "./Admin.css";

export default class Compose extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            userviews: null,
        };
    }

    componentDidMount() {
        this.fetchComposePage();
    }

    async fetchComposePage() {
        this.setIsLoading(true);

        try {
            let response = await fetch('https://local-test.acrobat.com/blueapp/composepage?email=' + encodeURIComponent(sessionStorage.accessToken), {
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

    getComposePage() {
        const { userviews } = this.state;
        if(userviews === null) {
            return;
        }
        
        console.log(userviews.agreementViewList);
        for (var index = 0; index < userviews.agreementViewList.length; index++) {
            let userview = userviews.agreementViewList[index];
            console.log(userview);
            if (userview.name == "COMPOSE") {
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
                        <iframe src={this.getComposePage()}></iframe>
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