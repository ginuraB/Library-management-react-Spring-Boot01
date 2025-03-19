import React from "react";
import "./App.css";
import { Navbar } from "./layouts/Navbar And Footer/Navbar";
import { Footer } from "./layouts/Navbar And Footer/Footer";
import { HomePage } from "./layouts/HomePage/HomePage";
import { SearchBooksPage } from "./layouts/SearchBooksPage/SearchBooksPage";
import { Navigate, redirect, Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { BookCheckoutPage } from "./layouts/BookCheckoutPage/BookCheckoutPage";
export const App = () => {
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
