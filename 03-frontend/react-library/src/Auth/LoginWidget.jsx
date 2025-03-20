import { Navigate } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import OktaAuth from "@okta/okta-auth-js";
import { SpinnerLoading } from "../layouts/Utils/SpinnerLoading";
//import { OktaSignIn } from '@okta/okta-signin-widget';
import OktaSignIn from '@okta/okta-signin-widget';

const LoginWidget = ({ config }) => {
    const { oktaAuth, authState } = useOktaAuth();
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
    return authState.isAuthenticated ?
        <Navigate to={{ pathname: '/' }} />
        :
        <OktaSignIn
            config={config}
            onSuccess={onSuccess}
            onError={onError}
        />


}
export default LoginWidget