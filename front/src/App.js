
import { Route,Routes } from "react-router-dom";
import Signup from './Components/Signup';
import Login from './Components/Login';
import Home from "./Components/Home";
import AdminDashbord from './Components/AdminDashbord'
import AddNewTAsk from "./Components/AddTask";
import AssigneeWork from './Components/AssigneeWork';
import AddEmp from "./Components/AddEmp";
import EpmDashbord from "./Components/EpmDashbord"
import UpdateAssignWork from "./Components/UpdateAssigenWork"
import NavbarUser from "./Components/UserNavbar"
import WorkProgress from "./Components/Work_progress";
import Viewemp from  "./Components/Viewemp";
import ViewSpecificEmp from "./Components/ViewSpecificEmp";
import UpdateEmp from "./Components/UpdateEmp";
import PopupGfg from  "./Components/Popup";
function App() {
  return (
    <>



    <Routes>

      <Route  path='/login' element={<Login/>}></Route>
      <Route  path='/' element={<Home/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/addtask' element={<AddNewTAsk/>}></Route>
      <Route path='/admindashbord' element={<AdminDashbord/>}></Route>
      <Route path="/assignwork" element={<AssigneeWork/>}></Route>
      <Route path="/addnewemp" element={<AddEmp/>}></Route>
      <Route path="/empdashbord" element={<EpmDashbord/>}></Route>
      <Route path="/updateasignwork" element={<UpdateAssignWork/>}></Route>
      <Route path="/employeedashbord" element={< NavbarUser/>}></Route>
       <Route path="/workprogres" element={<WorkProgress/>}></Route>
       <Route path="/viewallemp" element={<Viewemp/>}></Route>
       <Route path="/getEmpid/:id" element={< ViewSpecificEmp/>}></Route>
       <Route path="/Updateemp/:value" element={< UpdateEmp/>}></Route>
       <Route path="/popupbox" element={<PopupGfg/>}></Route>
    </Routes>
    </>
  );
}

export default App;
