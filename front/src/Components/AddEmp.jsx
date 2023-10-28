import React, { useState } from 'react';
import './Signup.css';
import axios from "axios";
import * as mdIcons from 'react-icons/md';
import Navbar from './Navbar';
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import  Validator  from 'validator';

function AddEmp() {
    const [addEmp , setAddEmp] = useState({
        empName:"",
        empId:"",
        empMobile:"",
        empEmail:"",
        password:"",
        username:""
    })

   

    const toastUse = {
        position: "top-right",
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    }

    const dataValidation = () => {
        const { empId,empName,username,empEmail,empMobile,password} = addEmp;
        if (!empId||!empName||!username||!empEmail||!empMobile||!password) {

            toast.error("please fill all fields", toastUse);
            return false;
        } 
        
      
        else if (password.length < 8) {
            toast.error("password should be more then 8 charecter", toastUse);
            return false;
        }
        else if(!Validator.isEmail(addEmp.empEmail))
        {
        toast.error("Please fill the acurate email", toastUse);
        }

      
        else {
            toast.success("Employee Added Successfull", toastUse);
            return true;
        }
    }


const  InputHandeler = (e) =>{
    setAddEmp ({...addEmp, [e.target.name]: e.target.value})
   
   
}

const addNewEmp = async(e) =>{
 e.preventDefault();
 dataValidation();
 const response = await axios.post('/addemp',addEmp );
 console.log(response);
 console.log(addEmp);

}



  return (
      <>
<div><Navbar/></div>

    <div className="MainBox">
                <div className="row text-center ">
                   <div><mdIcons.MdPersonAddAlt1 className="adminlogo"/></div>
                    <h1 className="Firsthading">Add Employee</h1>
                    <div className="addEmpForm">
                        <form>
                        <input type="text" placeholder="Name" className="form-control" name="empName" value={addEmp.empName} onChange={InputHandeler}/><br />
                        <input   type="text" placeholder="UserName" className="form-control"  name="username" value={addEmp.username} onChange={InputHandeler}/><br />
                            <input type="text" placeholder="Id" className="form-control" name="empId" value={addEmp.empId} onChange={InputHandeler} /><br />
                            <input type="text" placeholder=" Contact Number" className="form-control" name="empMobile" value={addEmp.empMobile} onChange={InputHandeler} /><br />
                            <input type="email" placeholder="Email" className="form-control" name="empEmail" value={addEmp.empEmail} onChange={InputHandeler}/><br />
                            <input type="password"  placeholder="Password" className="form-control" name="password" value={addEmp.password} onChange={InputHandeler} /><br />
                            <button className="btn" type="submit" onClick={(e) => { addNewEmp(e) }} >Submit</button>
                           
                            

                        </form>
                        <ToastContainer/>
                    </div>
                </div>
   
   
            </div>


            </>
  )
}

export default AddEmp