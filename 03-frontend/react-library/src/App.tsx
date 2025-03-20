import React from "react";
import "./App.css";
import { Navbar } from "./layouts/Navbar And Footer/Navbar";
import { Footer } from "./layouts/Navbar And Footer/Footer";
import { HomePage } from "./layouts/HomePage/HomePage";
import { SearchBooksPage } from "./layouts/SearchBooksPage/SearchBooksPage";
import { Navigate, redirect, Route, Routes, useNavigate } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { BookCheckoutPage } from "./layouts/BookCheckoutPage/BookCheckoutPage";
//import OktaAuth from "@okta/okta-auth-js";
import { oktaConfig } from "./lib/oktaConfig";
import {OktaAuth, toRelativeUrl} from "@okta/okta-auth-js";


const oktaAuth = new OktaAuth(oktaConfig);  
 


export const App = () => {

  const customAuthHandler = () => {
    const Navigate = useNavigate();
    const handleLoginRedirect = () => {
    Navigate("/login"); // Navigate to the "/login" route
  }

  const restoreOriginalUri = async (_oktaAuth: any, originalUri: string) => {
  const navigate = useNavigate(); // Use the navigate function from React Router v6
  navigate(toRelativeUrl(originalUri || "/", window.location.origin), { replace: true });
};

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />;
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/search" element={<SearchBooksPage />} />
          <Route
            path="/checkout/:bookId"
            element={<BookCheckoutPage />}
          ></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
};
