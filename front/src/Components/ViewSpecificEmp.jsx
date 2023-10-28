import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from '../Components/Navbar';
import './Home.css'
function ViewSpecificEmp() {
    const [View, setView] =useState({
        empName:"",
        empId:"",
        empMobile:"",
        empEmail:"",
        password:"",
        username:""
    })

    useEffect(()=>{
        getSingleRecord()
    },[])

    const { id } = useParams() 
    // console.log(value);
    

    const getSingleRecord = async () => {
        try {
            const response = await axios.get(`/getEmpid/${id}`)
            console.log(response);
            setView(response.data) 
        } catch (error) {
console.log(error);
        }
    }


    
  return (
    <>
    <div>
    <Navbar />
</div>

    <div className="container py-4" >


      <div className ="UserImage">
        <img  className ="User_Image_link" src='https://st.depositphotos.com/1175928/1293/i/950/depositphotos_12930995-stock-photo-user-profile-icon.jpg'/>
      </div>
      
      <h1 className="display-4">Employee_Id: {View.empId}</h1>
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item"> Employee Name: {View.empName}</li>
        <li className="list-group-item">User Name: {View.username}</li>
        <li className="list-group-item">Email: {View.empEmail}</li>
        <li className="list-group-item">Contact Number: {View.empMobile}</li>
        <li className="list-group-item">Password:{View.password}</li>
       
      </ul>
    </div>
    </>
  )
}

export default ViewSpecificEmp