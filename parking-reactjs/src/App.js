import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Master from "./layouts/Master";
import UserMaster from "./layouts/UserMaster";
import Home from "./pages/Home";
import Login from "./auth/Login";
import AdminMaster from "./admin/layouts/AdminMaster"
import Dashboard from "./admin/Dashboard";
import AddCity from "./admin/cities/AddCity";
import ManageCity from "./admin/cities/ManageCity";
import UpdateCity from "./admin/cities/UpdateCity";
import AddParking from "./admin/parkings/AddParking";
import ManageParking from "./admin/parkings/ManageParking";
import UpdateParking from "./admin/parkings/UpdateParking";
import AddSlots from "./admin/slots/AddSlots";
import ManageSlot from "./admin/slots/ManageSlot";
import UpdateSlots from "./admin/slots/UpdateSlots";
import ViewCity from "./users/city/ViewCity";
import ManageBooking from "./admin/bookings/ManageBooking";
import Register from "./users/auth/Register";
import ViewParking from "./users/parking/ViewParking";
import ViewSlots from "./users/slots/ViewSlots";
import AddVehicle from "./users/vehicle/AddVehicle";
import ViewVehicle from "./users/vehicle/ViewVehicle";
import AddBooking from "./users/booking/AddBooking";
import ViewBooking from "./users/booking/ViewBooking";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Master/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/view_city" element={<ViewCity/>}/>
          <Route path="/view_parking/:_id" element={<ViewParking/>}/>
          <Route path="/view_slots/:_id" element={<ViewSlots/>}/> 
          <Route path="/register" element={<Register/>}/>
        </Route>
        <Route path="/user" element={<UserMaster/>}>
          <Route path="/user" element={<Home/>}/>
          <Route path="/user/view_city" element={<ViewCity/>}/>
          <Route path="/user/view_parking/:_id" element={<ViewParking/>}/>
          <Route path="/user/view_slots/:_id" element={<ViewSlots/>}/> 
          <Route path="/user/add_vehicle" element={<AddVehicle/>}/>
          <Route path="/user/view_vehicle" element={<ViewVehicle/>}/>
          <Route path="/user/add_booking/:_id/:parkingId" element={<AddBooking/>}/>
          {/* _id: slot Id, parkingId */}
          <Route path="/user/view_booking" element={<ViewBooking/>}/>
        </Route>
        <Route path="/admin" element={<AdminMaster/>}>
          <Route path="/admin" element={<Dashboard/>}/>
            <Route path="/admin/add_city" element={<AddCity/>}/>
            <Route path="/admin/manage_city" element={<ManageCity/>}/>
            <Route path="/admin/update_city/:id" element={<UpdateCity/>}/>
            <Route path="/admin/add_parking" element={<AddParking/>}/>
            <Route path="/admin/manage_parking" element={<ManageParking/>}/>
            <Route path="/admin/update_parking/:id" element={<UpdateParking/>}/>
            <Route path="/admin/add_slot" element={<AddSlots/>}/>
            <Route path="/admin/manage_slot" element={<ManageSlot/>}/>
            <Route path="/admin/update_slot/:id" element={<UpdateSlots/>}/>
            <Route path="/admin/manage_booking" element={<ManageBooking/>}/>
        </Route>
      </Routes>
    </Router>

  );
}

export default App;
