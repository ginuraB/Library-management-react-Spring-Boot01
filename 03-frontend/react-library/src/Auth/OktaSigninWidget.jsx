import { useEffect, useRef } from "react";
import OktaSignIn from "@okta/okta-signin-widget";
import "@okta/okta-signin-widget/dist/css/okta-sign-in.min.css";
import { oktaConfig } from "../lib/oktaConfig";

const OktaSigninWidget = ({ onSuccess, onError }) => {
    const widgetRef = useRef(null);

    // useEffect(() => {
    //     if (!widgetRef.current) return;

    //     const widget = new OktaSignIn(oktaConfig);

    //     widget
    //         .showSignInToGetTokens({ el: widgetRef.current })
    //         .then(onSuccess)
    //         .catch(onError);

    //     return () => widget.remove();
    // }, [onSuccess, onError]);

    useEffect(() => {
        if (!widgetRef.current) return;

        const widget = new OktaSignIn({
            baseUrl: oktaConfig.issuer.split('/oauth2')[0], // Fix issuer URL
            clientId: oktaConfig.clientId,
            redirectUri: oktaConfig.redirectUri,
            authParams: {
                pkce: true,
                issuer: oktaConfig.issuer,
                scopes: ['openid', 'profile', 'email'],
            },
        });

        widget
            .showSignInToGetTokens({ el: widgetRef.current })
            .then(onSuccess)
            .catch(onError);

        return () => widget.remove();
    }, []);


    return (
        <div className="container mt-5 mb-5">
            <div ref={widgetRef}></div>
        </div>
    );
};

export default OktaSigninWidget;
