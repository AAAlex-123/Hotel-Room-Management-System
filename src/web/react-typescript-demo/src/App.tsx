import React from 'react';
import './App.css';
import Login from './Pages/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainScreen from './Pages/MainScreen';
import Reservations from './Pages/Reservations';
import FrontDesk from './Pages/FrontDesk';
import Arrivals from './Pages/Arrivals';
import RoomManagement from './Pages/RoomManagement';
import Cashiering from './Pages/Cashiering';
import Misc from './Pages/Misc';

function App() {
  return (
    <div className="App">
      <Router> 
        <Routes>
          <Route path="/main" element={<MainScreen/>}/> 
          <Route path="/reservations" element={<Reservations/>}/> 
          <Route path="/front desk" element={<FrontDesk/>}/> 
          <Route path="/arrivals" element={<Arrivals/>}/> 
          <Route path="/room management" element={<RoomManagement/>}/> 
          <Route path="/cashiering" element={<Cashiering/>}/> 
          <Route path="/misc" element={<Misc/>}/> 
          <Route path="/" element={<Login/>}/> 
        </Routes>
        </Router> 
    </div>
  );
}

export default App;
