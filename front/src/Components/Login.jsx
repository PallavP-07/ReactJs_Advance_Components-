import { useState } from 'react';
import '../Components/Login.css';
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios';
import * as AiIcons from 'react-icons/ai';
import HomeNav from './HomeNav';
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";


const Login = () => {
    const [Login, setLogin] = useState({

        username: "",
        password: ""
    })
    const toastUse={
        position:"top-right",
        autoClose:2000,
        pauseOnHover:true,
        draggable:true,
        theme:"light",
    }

    const Navigate = useNavigate()

    const InputHandeler = (e) => {
        setLogin({ ...Login, [e.target.name]: e.target.value })

    }
    const [optRole, setoptRole] = useState()
    const handleSelectOption = (e) => {
            e.preventDefault()
            setoptRole(e.target.value)
        }

    const dataValidation=()=>{
        const {username,password}=Login;
        if(!username||!password){

            toast.error("please fill all field",toastUse);
            return false;   
        
        }else if(password.length<8){
            toast.error("password should be more then 8 charecter",toastUse);
            return false;  {}
         }
    else{
        toast.error("Login UnSuccessfull",toastUse);
       
        return true;
        
    }
    }

    const LoginDataa = async (e) => {
        e.preventDefault();
        dataValidation();
    
        try {
                
            if (optRole === "Admin") {
                const response = await axios.post("http://localhost:7000/login", Login)
                    .then(res => {})
                    console.log(response);
                    Navigate("/admindashbord")
            }
            if (optRole === "User") {
                console.log("User")
                const response=await axios.post("http://localhost:7000/empLogin",Login)
            .then(res=>{})
            console.log(response);

            Navigate("/empdashbord")
            }


        } catch (error) {
            console.log(error);
        }


    }

    
    



    return (
        <>
        <div>
        <HomeNav/>

        </div>
       
            <div className='Logpage'>
                <div className='timeshetimg'>
                    <img className='limg' src='https://th.bing.com/th/id/R.64b579946005deea21e15436b751ce55?rik=Y5zVWyjcB3oTQw&riu=http%3a%2f%2flawwallet.in%2fwp-content%2fuploads%2f2021%2f06%2faccounting-101-1080x675-min-1-1024x640.jpeg&ehk=iScQzq16FATFljc%2bYCJKhiT3oBuYe0gg5RM%2f3hRP2jk%3d&risl=&pid=ImgRaw&r=0.jpg' />
                </div>

                <div className='Logindiv'>
                    <div className="row text-center mt-5">
                        < AiIcons.AiOutlineLogin className="Loginimg"/>

                        <h1 className="Firsthading"> Login</h1>
                        <div className="col-sm-6 offset-3">
                            <form >


                                <input type="text" placeholder="UserName" className="form-control" name="username" value={Login.username} onChange={InputHandeler} /><br />


                              
                                
                                        <input type="password" placeholder=" Password" className="form-control" name="password" value={Login.password} onChange={InputHandeler} /><br />

            
                                    
                                        <form id="make_checkbox_select" >

                                            <select className="form-control" onChange={handleSelectOption}>
                                                <option>Select type</option>
                                                <option value="Admin">Admin</option>
                                                <option value="User">User</option>
                                            </select>
                                        </form>
                            
                              <br/>
                                <button className="btn" type="submit" onClick={LoginDataa} >Login</button>
                                <br /><br />
                                <a className="Firsthading1" ><Link className="Firsthading1" to="/signup">Don't Have Account? Create New Account</Link></a>

                            </form>
                            <ToastContainer/>
                        </div>
                    </div>


                </div>
            </div>
        </>
    );
}
export default Login;