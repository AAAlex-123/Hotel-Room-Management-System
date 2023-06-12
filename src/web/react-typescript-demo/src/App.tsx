"use client"
import './App.css';
import React from 'react'
import Login from './Pages/Login';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import MainScreen from './Pages/MainScreen';
import Reservations from './Pages/Reservations';
import AddReservation from "./Pages/AddReservation";
import DeleteReservation from "./Pages/DeleteReservation";
import UpdateReservation from "./Pages/UpdateReservation";
import FindReservation from "./Pages/FindReservation";
import FrontDesk from './Pages/FrontDesk';
import Arrivals from './Pages/Arrivals';
import RoomManagement from './Pages/RoomManagement';
import Housekeeping from './Pages/Housekeeping';
import RoomHistory from './Pages/RoomHistory';
import OutOfOS from './Pages/OutOfOS';
import MaidManagement from './Pages/MaidManagement';
import DeleteGroup from './Pages/DeleteGroup';
import AssignRooms from './Pages/AssignRooms';
import RoomNotes from './Pages/RoomNotes';
import Orders from './Pages/Orders';
import Cashiering from './Pages/Cashiering';
import Billing from './Pages/Billing';
import CheckOut from './Pages/CheckOut';
import FastCharge from './Pages/FastCharge';
import Statistics from './Pages/Statistics';
import Misc from './Pages/Misc';
import EndOfDay from './Pages/EndOfDay';
import GuestMessages from './Pages/GuestMessages'
import StaffMessages from './Pages/StaffMessages';
import LogicClient from './Pages/client/page';
import ClientMenu from './Pages/client/menu/page';
import ClientCharge from './Pages/client/charge/page';


function App() {
  return (
    <div className="App">
      <Router> 
        <Routes>
          <Route path="/main" element={<MainScreen/>}/> 
          <Route path="/client" element={<LogicClient/>}/> 
          <Route path="/client/menu" element={<ClientMenu/>}/> 
          <Route path="/client/charge" element={<ClientCharge/>}/> 
          <Route path="/reservations" element={<Reservations/>}/> 
          <Route path="/reservations/add" element={<AddReservation/>}/>
          <Route path="/reservations/delete" element={<DeleteReservation/>}/>
          <Route path="/reservations/update" element={<UpdateReservation/>}/>
          <Route path="/reservations/find" element={<FindReservation/>}/>
          <Route path="/front" element={<FrontDesk/>}/> 
          <Route path="/arrivals" element={<Arrivals/>}/> 
          <Route path="/room" element={<RoomManagement/>}/>
          <Route path="/room/housekeeping" element={<Housekeeping/>}/>
          <Route path="/room/history" element={<RoomHistory/>}/>
          <Route path="/room/oos_o" element={<OutOfOS/>}/>
          <Route path="/maid" element={<MaidManagement/>} /> 
          <Route path="/maid/delete" element={<DeleteGroup/>} /> 
          <Route path="/maid/assign" element={<AssignRooms/>} /> 
          <Route path="/maid/notes" element={<RoomNotes/>} /> 
          <Route path="/cashiering" element={<Cashiering/>}/> 
          <Route path="/cashiering/billing" element={<Billing/>}/> 
          <Route path="/cashiering/check-out" element={<CheckOut/>}/> 
          <Route path="/fast-charge" element={<FastCharge/>}/> 
          <Route path="/statistics" element={<Statistics/>}/> 
          <Route path="/misc" element={<Misc/>}/> 
          <Route path="/misc/end-of-day" element={<EndOfDay/>}/>
          <Route path="/guest-messages" element={<GuestMessages/>}/>  
          <Route path="/staff-messages" element={<StaffMessages/>}/> 
          <Route path="/maid/orders" element={<Orders/>}/> 
          <Route path="/" element={<Login/>}/> 
        </Routes>
        </Router> 
    </div>
  );
}

export default App;
