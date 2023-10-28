import { Fragment, useState } from "react"
import axios from "axios";
import './Signup.css';
import HomeNav from "./HomeNav";
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import * as IoIcons from 'react-icons/md';
import { useNavigate } from "react-router-dom";


const Signup = () => {
    const [Signup, setSignup] = useState({
        username: "",
        email: "",
        password: "",
        cpassword: "",
        fullname: ""
    })

    const Navigate = useNavigate();

    const toastUse = {
        position: "top-right",
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    }
    const dataValidation = () => {
        const { username, email, password, cpassword, fullname } = Signup;
        if (!username || !email || !password || !cpassword || !fullname) {

            toast.error("please fill all field", toastUse);
            return false;
        } else if (password !== cpassword) {
            toast.error("password and confirm password should be match", toastUse);
            return false;
        } else if (password.length < 8) {
            toast.error("password should be more then 8 charecter", toastUse);
            return false;
        }
        else {
            toast.success("signup Successfull", toastUse);
            Navigate('/login')
            return true;

           
        }
    }

    const InputHandeler = (e) => {
        setSignup({ ...Signup, [e.target.name]: e.target.value })
    }

    const Signupdata = async (e) => {
        e.preventDefault();
        dataValidation();
        const result = await axios.post(`http://localhost:7000/adduser`, Signup)
        console.log(result);
    }
    return (
      <>
            <div>
                <HomeNav />

            </div>

            <div className="Signupmainbox">

            <div className="box1">
                   <img  className="adminimg" src="https://th.bing.com/th/id/OIP.QSQ6_f5W-BvVk-xaUvVS9wHaGh?pid=ImgDet&rs=1.jpg"/>
</div>


            <div className="MainBox">


                <div className="row text-center ">
                    <div ><  IoIcons.MdAdminPanelSettings className="adminlogo" /></div>
                    <h1 className="Firsthading">Admin Signup</h1>
                    <div className="SignupForm">
                        <form>
                            <input type="text" placeholder="Enter Fullname" className="form-control" name="fullname" value={Signup.fullname} onChange={InputHandeler} pattern="[A-Za-z]" required /><br />
                            <input type="text" placeholder="UserName" className="form-control" name="username" value={Signup.username} onChange={InputHandeler} pattern="[A-Za-z]" required="true" /><br />
                            <input type="email" placeholder=" Email" className="form-control" name="email" value={Signup.email} onChange={InputHandeler} /><br />
                            <input type="password" placeholder="Enter Password" className="form-control" name="cpassword" value={Signup.cpassword} onChange={InputHandeler} /><br />
                            <input type="password" placeholder="confirm Password" className="form-control" name="password" value={Signup.password} onChange={InputHandeler} /><br />
                            <button className="btn" type="submit" onClick={(e) => { Signupdata(e) }} >SignUP</button>
                            <br /><br />
                            <a href="/login" className="Firsthading1" >AllReady Have Account?</a>

                        </form>
                        <ToastContainer />
                    </div>
                </div>
            </div>

            </div>
            </>
    );
}
export default Signup;