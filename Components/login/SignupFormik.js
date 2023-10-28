import React, { useState } from 'react'
import headerlogo from "../../Assets/Images/headerlogo.svg";
import Signinimg from "../../Assets/Images/signupimage.png";
import Selectbox from "../Selectbox";
import CheckBox from "../CheckBox";
import Modalpage from "../Modalpage.js";
import Buttons from "../Buttons";
import Apidata from "../../services/LoginServices";
import { colors } from '../Color';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Privacypolicy = ({ footer }) => {
    const { t, i18n } = useTranslation();
    let navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [option, setOption] = useState([
        { label: "EN", value: "en" },
        { label: "AR", value: "ar" },
      ]);

    const forget_user = useSelector(state => state.userReducer.user._id);

    const initialValues = {
        name: "",
        mobileNumber: "",
        email: "",
        otp: "",
        password: "",
        profilePic: "none",
        usertype: "User_Type_1",
        terms_and_conditions: "",
        fav_teamAndLeague: ["Barcelona", "Real Madrid", "LiverPool"],
        language: "En",
        dateofBirth: "1999-12-06",
    }
    const validationSchema = () => {
        return Yup.object().shape({
            name: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            email: Yup.string()
                .email('Invalid email address').required('Required'),
            mobileNumber: Yup.string()
                .max(15, 'Must be Correct code and Mobile number')
                .required('Required'),
            password: Yup.string()
                .max(20, 'Must be 8 characters or less')
                .required('Required'),
            otp: Yup.string()
                .max(6, 'Must be 6 characters or less')
                .required('Required'),

        });
    }

    const sendotp = (values) => {
        Apidata.getotp(values).then((res) => {
            if (res.result.status === 200) {
                toast.success(res.result.message);
            } else {
                toast.warn(res.result.message);
            }
        });
    };

    const handleClickSignin = (value) => {
        if (value == "signin") {
          navigate("/signin");
        } else if (value == "signup") {
          navigate("/signin");
        }
      };
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleChangeRules = () => {
        navigate("/rules");
    };
    const handleChangePrivacy = () => {
        navigate("/privacy");
    };
    return (
        <div className="Signin " dir={i18n.language == "ar" ? "rtl" : "ltr"}>
            <div className="row " style={{ borderRadius: "20px" }}>
                <div className="col-md-6">
                    <div className="d-flex flex-row justify-content-center pb-2 pt-3">
                        <div className="col-md-8 ">
                            <div className="d-flex flex-row align-content-center py-2">
                                <div className="pt-2 col-8 d-flex justify-content-start">
                                    <img src={headerlogo} width="70%" alt="" />
                                </div>
                                <div className="col-2 d-flex align-items-center ">
                                    <Selectbox
                                        option={option}
                                        defaultValue={i18n.language}
                                        style={{
                                        width: "100%",
                                        }}
                                        bordered={false}
                                    />
                                    </div>
                            </div>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={sendotp}
                            >
                                <Form>
                                    <label htmlFor="Email" className='mt-2'>Name</label>
                                    <Field
                                        name="name"
                                        type="text"
                                        className="form-control"
                                        placeholder="Name"
                                    />
                                    <ErrorMessage
                                        name="name"
                                        component="div"
                                        className="text-danger"
                                    />
                                    <div className=''>
                                        <label htmlFor="Email" className='mt-2'>Email</label>
                                        <Field
                                            name="email"
                                            type="text"
                                            className="form-control"
                                            placeholder="Email"
                                        // style={{width:"80%"}}
                                        />
                                        <ErrorMessage
                                            name="email"
                                            component="div"
                                            className="text-danger"
                                        />
                                    </div>
                                    <div className=''>
                                        <label htmlFor="Email" className='mt-2'>Password</label>
                                        <Field
                                            name="password"
                                            type="text"
                                            className="form-control"
                                            placeholder="Password"
                                        // style={{width:"80%"}}

                                        />
                                        <ErrorMessage
                                            name="password"
                                            component="div"
                                            className="text-danger"
                                        />
                                    </div>
                                    <div className=' col-12 d-flex flex-row align-content-center gap-1' >
                                        <div>
                                            <label htmlFor="Email" className='mt-2'>Mobile Number</label>
                                            <Field
                                                name="mobileNumber"
                                                type="text"
                                                className="form-control"
                                                placeholder="+91"
                                                style={{ width: "100%" }}

                                            />
                                            <ErrorMessage
                                                name="mobileNumber"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </div>
                                        <div className="col-3">
                                            <Buttons
                                                type="submit"
                                                className="getotp_btn"
                                                style={{
                                                    backgroundColor: colors.common_color,
                                                    color: colors.white,
                                                    borderRadius: 6,
                                                    fontSize: "14px",
                                                    width: "95%",
                                                    height: 38,
                                                    marginTop: 30,
                                                    borderColor: "transparent",
                                                }}
                                                text={t("GET_OTP")}
                                                value={"signup"}
                                                onClick={sendotp}
                                            />
                                        </div>
                                    </div>
                                    <div className=" ">
                                        <CheckBox
                                            style={{ fontSize: "13px", fontWeight: "400" }}
                                            text="I accept the Terms and Conditions, Privacy Policy & Rules"
                                        />
                                    </div>                        
                                </Form>
                            </Formik>
                            <div className="pt-1 col-md-10 d-flex flex-row justify-content-evenly align-content-center ">
                                <div style={{ fontSize: "12px" }}>
                                    {t("DONT_YOU_HAVE_ACCOUNT")}{" "}
                                    <span style={{ color: "#F48220" }}>
                                        <a
                                            style={{ color: "#F48220", fontWeight: 500 }}
                                            onClick={() => handleClickSignin("signin")}
                                        >
                                            {t("SIGNIN")}
                                        </a>{" "}
                                    </span>
                                </div>
                            </div>
                            <hr
                                className="col-md-10 hr_signup"
                                style={{
                                    background: "#9E9E9E",
                                    borderColor: "#9E9E9E",
                                    height: "1px",
                                }}
                            />
                            <div
                                className="privacy_btn col-md-10 d-flex flex-row justify-content-center align-content-center "
                                onClick={showModal}
                            >
                                <a
                                    onClick={handleChangePrivacy}
                                > {t("PRIVACY_POLICY")}</a> |{" "}
                                {t("TERMS_CONDITIONS")} |{" "}
                                <a
                                    onClick={handleChangeRules}

                                >{t("RULES")}</a>
                            </div>
                            <Modalpage
                                open={isModalOpen}
                                onOk={handleOk}
                                okText="Select Teams"
                                onCancel={handleCancel}
                                title="Select teams to follow"
                                footer={footer}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-6 d-flex flex-row justify-content-end">
                    <img src={Signinimg} className="imgside" alt="" />
                </div>
            </div>
        </div>
    )
}

export default Privacypolicy;