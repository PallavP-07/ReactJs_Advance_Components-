import React, { Fragment, useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom';
import './Home.css';
import NavbarUser from '../Components/UserNavbar';
import * as GiIcone from 'react-icons/gi';

const UpdateEmp = () => {


    useEffect(() => {
        getSingleTask()
    }, [])


    const [addData, setUserData] = useState({
        percentage: "",
        status:""

    })

    const { value } = useParams()


    const getSingleTask = async () => {
        try {

            const response = await axios.get(`http://localhost:7000/singletask/${value}`)
            console.log(response);
            if (response.data.success) {
                setUserData(response.data.result)
            }


        } catch (error) {
            console.log(error);
        }
    }




    const handleInputs = (e) => {
        setUserData({ ...addData, [e.target.name]: e.target.value })
    }
    const Navigate = useNavigate()
    const editTask = async (e) => {
        e.preventDefault();



        const response = await axios.put(`http://localhost:7000/updatetask/${value}`, { addData })


        console.log(response)

        if (response.data.success) {
            alert("task Updated Succesfully...")
            Navigate("/workprogres")
        }
    }


    return (
        <Fragment>

<div><NavbarUser/></div>
            <div className="MainBox">
                <div className="row text-center ">
                    <div><GiIcone.GiProgression className="pogressworkicon"/>,<h1 className="Firsthading"> Update Work Progress</h1></div>

                    <form >
                        <div className='forminput'>
                        <input type="text"
                            placeholder="empId"
                            className='form-control'
                            name="empId"
                            value={addData.empId}
                        />
                   </div>
                   <div className='forminput'>
                        <input type="text" name="projectName" id="projectName"
                            value={addData.projectName}

                            placeholder="projectName"
                            className='form-control'
                        /> 
                   </div>
                   <div className='forminput'>
                        <input type="text" name="taskName" id="taskName"
                            value={addData.taskName}
                            placeholder="taskName"
                            className='form-control'
                        />
                   </div>
                   <div className='forminput'>
                        <input type="text" name="assignee" id="assignee"
                            value={addData.assignee}
                            placeholder="assignee"
                            className='form-control '
                        />
                   </div>
                   <div className='forminput'>
                        <input type="text"
                            name="startDate"
                            value={addData.startDate}
                            placeholder="startDate"
                            className='form-control '
                        />
                   </div>
                   <div className='forminput'>

                        <input type="text"
                            name="endDate"
                            value={addData.endDate}
                            placeholder="endDate"
                            className='form-control '
                        />
                   </div>
                   <div className='forminput'>
                        <input type="text"
                            name="description"
                            value={addData.description}
                            placeholder="description"
                            className='form-control '
                        />
                   </div>

                        <input type="text"
                            name="percentage"
                            value={addData.percentage}
                            onChange={handleInputs}
                            placeholder="percentage"
                            className='form-control '
                        />
                        <br />
                        <div className='form_btn'>
                            <div>
                                <button type="Submit" value='Edit' onClick={(e) => editTask(e)} className="btn_5">Submit</button>

                            </div>
                            <div>

                                <select className='btncss'  name = "status"  onChange={handleInputs} value={addData.status} >
                                    <option>Status</option>
                                    <option value="Opend">Opend</option>
                                    <option value="Closed">Closed</option>
                                    <option value="InProgress">InProgress</option>
                                    <option value="Pending">Pending</option>
                                </select >
                            </div>

                        </div>

                    </form>


                </div>

            </div>

        </Fragment>
    )
}

export default UpdateEmp
