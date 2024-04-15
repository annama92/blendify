import logo from './logo.svg';
import './App.css';
import SliderButton from "./components/SliderButton";
import Starting from "./components/Starting";
import Display from "./components/Display";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Starting />}>
        </Route>
        <Route path="attribute" element={<SliderButton />}>
        </Route>
        <Route path="results" element={<Display />}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
