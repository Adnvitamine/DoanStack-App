import React from 'react';
import {Fragment } from "react";
import LoginUser from "./users/loginUser";


export default class SignIn extends React.Component {
    render(){
        return(
            <Fragment>
                <LoginUser />
            </Fragment>
        );
    }
}