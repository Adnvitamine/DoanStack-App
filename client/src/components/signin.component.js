import { Component, Fragment } from "react";
import LoginUser from "./users/loginUser";


export default class SignIn extends Component {
    render(){
        return(
            <Fragment>
                <LoginUser />
            </Fragment>
        );
    }
}