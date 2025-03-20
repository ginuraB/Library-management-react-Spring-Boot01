import { Navigate } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import { SpinnerLoading } from "../layouts/Utils/SpinnerLoading";
import OktaSigninWidget from "./OktaSigninWidget";

const LoginWidget = () => {
    const { oktaAuth, authState } = useOktaAuth();

    const onSuccess = async (tokens) => {
        await oktaAuth.handleLoginRedirect(tokens);
    };

    const onError = (err) => {
        console.log("Sign-in error: ", err);
    };

    if (!authState) {
        return <SpinnerLoading />;
    }

    return authState.isAuthenticated ? (
        <Navigate to="/" />
    ) : (
        <OktaSigninWidget onSuccess={onSuccess} onError={onError} />
    );
};

export default LoginWidget;
