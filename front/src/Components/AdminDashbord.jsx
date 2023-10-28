import React from 'react'
import Navbar from '../Components/Navbar'
import './Navbar.css';

const  AdminDashbord = () => {
  return (<>

      <div>
           <Navbar/>

      </div>
 


    <div>
<div className="main-container">
  <div className="heading">
   <h1 className="heading__title">Welcome To Admin Dashbord</h1>
    <p className="heading__credits"><a className="heading__link" target="_blank" >RapidQube TimeSheet</a></p>
  </div>
  <div className="cards">
    <div className="card card-1">
      <div className="card__icon"><i className="fas fa-bolt"></i></div>
      <p className="card__exit"><i className="fas fa-times"></i></p>
      <h2 className="card__title">Home</h2>
      <p className="card__apply">
        <a className="card__link" href="/">Read More<i className="fas fa-arrow-right"></i></a>
      </p>
    </div>
    <div className="card card-2">
      <div className="card__icon"><i className="fas fa-bolt"></i></div>
      <p className="card__exit"><i className="fas fa-times"></i></p>
      <h2 className="card__title">Add Employee</h2>
      <p className="card__apply">
        <a className="card__link" href="/addnewemp">Read More<i className="fas fa-arrow-right"></i></a>
      </p>
    </div>
    <div className="card card-3">
      <div className="card__icon"><i className="fas fa-bolt"></i></div>
      <p className="card__exit"><i className="fas fa-times"></i></p>
      <h2 className="card__title">Add Task</h2>
      <p className="card__apply">
        <a className="card__link" href="/addtask">Read More<i className="fas fa-arrow-right"></i></a>
      </p>
    </div>
    <div className="card card-4">
      <div className="card__icon"><i className="fas fa-bolt"></i></div>
      <p className="card__exit"><i className="fas fa-times"></i></p>
      <h2 className="card__title">Assignee Work</h2>
      <p className="card__apply">
        <a className="card__link" href="assignwork">Read More <i className="fas fa-arrow-right"></i></a>
      </p>
    </div>
    <div className="card card-5">
      <div className="card__icon"><i className="fas fa-bolt"></i></div>
      <p className="card__exit"><i className="fas fa-times"></i></p>
      <h2 className="card__title">View  Employee</h2>
      <p className="card__apply">
        <a className="card__link" href="/viewallemp">Read More <i className="fas fa-arrow-right"></i></a>
      </p>
    </div>
    
  </div>
</div>
    </div>
{/* 
   <div>
     <img className='imgdasbord' src='https://static1.bigstockphoto.com/2/5/8/large1500/852866.jpg'/>
   </div> */}

    </>

  )
  
}

export default AdminDashbord