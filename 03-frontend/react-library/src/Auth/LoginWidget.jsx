import { Redirect } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import OktaAuth from "@okta/okta-auth-js";
import { SpinnerLoading } from "../layouts/Utils/SpinnerLoading";
import { OktaSigninWidget } from '@okta/okta-signin-widget';

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
    return authState.isAuthenticated ?
        <Redirect to={{ pathname: '/' }} />
        :
        <OktaSigninWidget
            config={config}
            onSuccess={onSuccess}
            onError={onError}
        />


}
export default LoginWidget