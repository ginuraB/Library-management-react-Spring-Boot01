import { Navigate } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import { SpinnerLoading } from "../layouts/Utils/SpinnerLoading";
import OktaSigninWidget from "./OktaSigninWidget";

const LoginWidget = () => {
    const { oktaAuth, authState } = useOktaAuth();

    const onSuccess = async (tokens) => {
        console.log("Login successful!", tokens); // Debugging
        await oktaAuth.handleLoginRedirect(tokens);
    };

    const onError = (err) => {
        console.log("Sign-in error: ", err);
    };

    if (!authState) {
        console.log("Auth state is still loading..."); // Debugging
        return <SpinnerLoading />;
    }

    if (authState.isAuthenticated) {
        console.log("User is authenticated, redirecting...");
        return <Navigate to="/" />;
    }

    console.log("Auth state loaded, showing login widget");
    return <OktaSigninWidget onSuccess={onSuccess} onError={onError} />;
};

export default LoginWidget;
