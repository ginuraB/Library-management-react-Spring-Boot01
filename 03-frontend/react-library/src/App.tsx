import React from "react";
import "./App.css";
import { Navbar } from "./layouts/Navbar And Footer/Navbar";
import { Footer } from "./layouts/Navbar And Footer/Footer";
import { HomePage } from "./layouts/HomePage/HomePage";
export const App = () => {
  return (
    <div>
      <Navbar />;
      <HomePage />
      <Footer />
    </div>
  );
};
