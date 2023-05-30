import React from 'react';
import './App.css';
import Login from './Pages/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainScreen from './Pages/MainScreen';
import Reservations from './Pages/Reservations';
import AddReservation from "./Pages/AddReservation";
import DeleteReservation from "./Pages/DeleteReservation";
import UpdateReservation from "./Pages/UpdateReservation";
import FindReservation from "./Pages/FindReservation";
import FrontDesk from './Pages/FrontDesk';
import Arrivals from './Pages/Arrivals';
import RoomManagement from './Pages/RoomManagement';
import MaidManagement from './Pages/MaidManagement';
import Cashiering from './Pages/Cashiering';
import Billing from './Pages/Billing';
import Misc from './Pages/Misc';
import EndOfDay from './Pages/EndOfDay';
import GuestMessages from './Pages/GuestMessages'
import StaffMessages from './Pages/StaffMessages';
import Orders from './Pages/Orders';

function App() {
  return (
    <div className="App">
      <Router> 
        <Routes>
          <Route path="/main" element={<MainScreen/>}/> 
          <Route path="/reservations" element={<Reservations/>}/> 
          <Route path="/add-reservation" element={<AddReservation/>}/>
          <Route path="/delete-reservation" element={<DeleteReservation/>}/>
          <Route path="/update-reservation" element={<UpdateReservation/>}/>
          <Route path="/find-reservation" element={<FindReservation/>}/>
          <Route path="/front desk" element={<FrontDesk/>}/> 
          <Route path="/arrivals" element={<Arrivals/>}/> 
          <Route path="/room-management" element={<RoomManagement/>}/>
          <Route path="/maid-management" element={<MaidManagement/>} /> 
          <Route path="/cashiering" element={<Cashiering/>}/> 
          <Route path="/billing" element={<Billing/>}/> 
          <Route path="/misc" element={<Misc/>}/> 
          <Route path="/end-of-day" element={<EndOfDay/>}/>
          <Route path="/guest-messages" element={<GuestMessages/>}/>  
          <Route path="/staff-messages" element={<StaffMessages/>}/> 
          <Route path="/orders" element={<Orders/>}/> 
          <Route path="/" element={<Login/>}/> 
        </Routes>
        </Router> 
    </div>
  );
}

export default App;
