import axios from 'axios';
import React, { Fragment, useState } from 'react'
import * as AIIcons from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import './Home.css'



const Addtask = () => {
    const [addTask, setAddTask] = useState({
        projectName: "",
        taskName: "",
        assignee: "",
        empId: "",
        startDate: "",
        endDate: "",
        description: ""
    })


    const [Employee, setEmployee] = useState([])
    const [EmployeeId, setEmployeeId] = useState()

    

    React.useEffect(() => {

        getCharacters();
    }, []);

    async function getCharacters() {
        const response = await axios.get(`/getEmp`);

        console.log(response);
        setEmployee(response.data)
    }


    const toastUse = {
        position: "top-right",
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    }

    const dataValidation = () => {
        const { projectName, taskName, assignee, empId, startDate, endDate, description } = addTask;
        if (!projectName || !taskName || !assignee || !empId || !startDate || !endDate || !description) {

            toast.error("please fill all field", toastUse);
            return false;
        }
        else {
            toast.success("Task add Successfull", toastUse);
            return true;
        }
    }
    const Navigate = useNavigate()

    const inputHandler = (e) => {
        setAddTask({ ...addTask, [e.target.name]: e.target.value });
    }

    const AddTaskData = async (e) => {
        e.preventDefault();
        dataValidation();

        try {
            const result = await axios.post(`http://localhost:7000/addtask`, addTask);
            if (result.data) {
                Navigate('/assignwork')
                console.log(addTask);

            }
        }
        catch (error) {
            console.log(error)
        }


    }



    const handleIdDemo = (e) => {
      
    //   alert(e.target.value);
      setEmployeeId(e.target.value)
    }





    return (
        <Fragment>
            <div>
                <Navbar />
            </div>
            <div className="MainBox">
                <div className="row text-center ">
                    <div><AIIcons.AiFillFileAdd className='emplogo' /><h1 className="Firsthading">Add Task</h1></div>

                    <div >
                        <form className="AddtaskForm">
                            <input type="text" placeholder="Project Name" className="form-control" name="projectName" value={addTask.projectName} onChange={inputHandler} /><br />
                            <input type="text" placeholder="Task Name" className="form-control" name="taskName" value={addTask.taskName} onChange={inputHandler} /><br />


                            <form id="make_checkbox_select" >

                                <select className="form-control" name="assignee" value={Employee.assignee}   onChange={handleIdDemo}>
                                    {Employee.map(item => (
                                        <option key={item._id} value={item.empId}>
                                            {item.empName}
                                        </option>
                                    ))}

                                </select>
                            </form><br />








                            <input type="text" placeholder="empId" className="form-control" name="empId" value={EmployeeId} onChange={inputHandler} /><br />
                            <input type="date" placeholder="Start Date" className="form-control" name="startDate" value={addTask.startDate} onChange={inputHandler} /><br />
                            <input type="date" placeholder=" End Date" className="form-control" name="endDate" value={addTask.endDate} onChange={inputHandler} /><br />
                            <input type="text" placeholder=" Description" className="form-control" name="description" value={addTask.description} onChange={inputHandler} /><br />
                            <button className="btn" type="submit" onClick={AddTaskData} >Submit</button>
                            {/* <button className="btn" type="submit" onClick={getEmployeeName} >getname</button>
   */}

                        </form>
                        <ToastContainer />
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default Addtask