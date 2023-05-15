import React from 'react';
import './App.css';
import Login from './Components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainScreen from './Pages/MainScreen';

function App() {
  return (
    <div className="App">
      <Router> 
        <Routes>
          <Route path="/main" element={<MainScreen/>}/> 
          <Route path="/" element={<Login/>}/> 
        </Routes>
        </Router> 
    </div>
  );
}

export default App;
