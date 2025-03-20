import { Redirect } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import OktaAuth from "@okta/okta-auth-js";
import { SpinnerLoading } from "../layouts/Utils/SpinnerLoading";

const LoginWidget = ({ config }) => {
    const { octaAuth, authState } = useOktaAuth();
    const onSuccess = (tokens) => {
        OktaAuth.handleLoginRedirect(tokens);

    };
    const onError = (err) => {
        console.log('Sign-in error: ', err);

    }

    if (!authState) {
        return (
            <SpinnerLoading />
        );
    }
    return authState.isAuthenticated

}