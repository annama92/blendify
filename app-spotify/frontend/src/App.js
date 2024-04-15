import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import ButtonSection from "./components/ButtonsSection";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import Starting from "./components/Starting";
import SliderButton from "./components/SliderButton";
import { Slider } from "@mui/material";

function App() {
  return (
    // <div style={{ background: "black" }}>
    //   <Menu className="top"></Menu>
    //   <ButtonSection className="middle"></ButtonSection>
    //   <Footer className="bottom"></Footer>
    // </div>
    // <Router>
    //   <Routes>
    //     <Route exact path='/'>
    //       <Starting />
    //     </Route>
    //     <Route path='/attribute'>
    //       <SliderButton />
    //     </Route>
    //     <Route path='/results'>
    //       <div style={{ background: "black" }}>
    //         <Menu className="top"></Menu>
    //         <ButtonSection className="middle"></ButtonSection>
    //         <Footer className="bottom"></Footer>
    //       </div>
    //     </Route>
    //   </Routes>
    // </Router>
    // <Starting />
    <SliderButton />
  );
}

export default App;
