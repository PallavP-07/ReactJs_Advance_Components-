import React from 'react'
import NavbarUser from '../Components/UserNavbar'
import './Navbar.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const  EpmDashbord = () => {
  return (<>

      <div>
           <NavbarUser/>

      </div>
 


    <div>
<div className="main-container">
  <div className="heading">
    <h1 className="heading__title">Welcome To Employee Dashbord</h1>
    <p className="heading__credits"><a className="heading__link" target="_blank" href="https://dribbble.com/sl">RapidQube TimeSheet</a></p>
  </div>
  <div className="cards">
    <div className="card card-1">
      <div className="card__icon"><i className="fas fa-bolt"></i></div>
      <p className="card__exit"><i className="fas fa-times"></i></p>
      <h2 className="card__title">TimeSheet </h2>
      <p className="card__apply">
      <Popup trigger={<button  className='ReadMore'> Read More </button>} ><i className="fas fa-arrow-right"></i>
  <p> <h5>   Time Sheet</h5> 
Report regular and overtime hours worked with this simple timesheet template. Perfect for small businesses, contractors, or the self-employed, this Excel timesheet template records time in, time out, and lunch breaks for each day of the workweek. As a timesheet in Excel, the total hours, regular hours, and overtime hours are automatically calculated. This timesheet template can also help you track the efficiency and productivity of teams within your company or business unit. This printable timesheet template is easy to edit and log hours worked. This is an accessible template.</p>
      </Popup>
    
      </p>
    </div>
    <div className="card card-2">
      <div className="card__icon"><i className="fas fa-bolt"></i></div>
      <p className="card__exit"><i className="fas fa-times"></i></p>
      <h2 className="card__title">Task Planing</h2>
      <p className="card__apply">
      <Popup trigger={<button className='ReadMore'> Read More </button>} ><i className="fas fa-arrow-right"></i>
  <p> <h5>What is task planning and why is it useful?</h5> 
  Task planning is the act of breaking down long-term deliverables into practical chunks that are easier to tackle and can act as lead measures to help you stay on track. There are lots of advantages to task planning, a few of which include</p>
      </Popup>
      </p>
    </div>
    <div className="card card-3">
      <div className="card__icon"><i className="fas fa-bolt"></i></div>
      <p className="card__exit"><i className="fas fa-times"></i></p>
      <h2 className="card__title">Time management</h2>
      <p className="card__apply">
      <Popup trigger={<button  className='ReadMore'> Read More </button>} ><i className="fas fa-arrow-right"></i>
  <p> <h5>What Is Time Management?</h5>
  The modern concept of time management - the act of planning the amount of time you spend on which activities - really began with Frederick Taylor's scientific management techniques. His goal was to increase worker productivity. To do this, he conducted time and motion studies and began to focus on the best ways for jobs to be performed to maximize the work completed in a given amount of time.
</p>
      </Popup>
      </p>
    </div>
    <div className="card card-4">
      <div className="card__icon"><i className="fas fa-bolt"></i></div>
      <p className="card__exit"><i className="fas fa-times"></i></p>
      <h2 className="card__title">Panding Task</h2>
      <p className="card__apply">
        <a className="card__link" href="/workprogres">Read More <i className="fas fa-arrow-right"></i></a>
      </p>
    </div>
    
  </div>
</div>
    </div>

    </>

  )
  
}

export default EpmDashbord