import React, { useState, useEffect } from "react";
import "../../Assets/Styles/Signin.css";
import CheckBox from "../CheckBox";
import { colors } from "../../Components/Color";
import headerlogo from "../../Assets/Images/headerlogo.svg";
import Selectbox from "../Selectbox";
import Signinimg from "../../Assets/Images/Signinimg.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from 'react-redux';
import { logindata, language, api, token, imagedata } from "../../Redux/Action";
import Apidata from "../../services/LoginServices";
import AdminApidata from "../Adminpage/Services/AdminServices"
import { toast, ToastContainer } from "react-toastify";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Forgetmodal from "../ForgetPage/Forgetmodal/Forgetmodal";
import PasswordShowHide from "../../Components/login/PasswordShowHide";
import Exitinguser from "../login/ExitingUser/Exitinguser";


const Signin = () => {
  const Image = useSelector(state => state.userReducer);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgdata, setImgdata] = useState([])
  useEffect(() => {
    initData()
  }, []);

  const initData = async () => {
    const Getbanner = await AdminApidata.GetAdminhometopbannertable()
    let getdata = Getbanner.data.Results
    dispatch(imagedata(getdata))
  }
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [option, setOption] = useState([
    { label: "EN", value: "en" },
    { label: "AR", value: "ar" },
  ]);
  const handleChange = (value) => {
    i18n.changeLanguage(value);
    localStorage.setItem("Language", value);
  };
  const validationSchema = () => {
    return Yup.object().shape({
      mail: Yup.string()
        .required("Email is required")
        .email("Email is invalid"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .max(40, "Password must not exceed 40 characters"),
    });
  };
  const initialValues = {
    mail: "",
    password: "",
  };
 
  const handleClick = (values) => {
    Apidata.Login(values).then((res) => {
      if (res.status === 200) {
        let existingUser = res.data.data.existingUser
        dispatch(logindata(res.data.data));
        dispatch(token(res.data.Token));
        localStorage.setItem("Token", res.data.Token);
        localStorage.setItem("Language", i18n.language);
        dispatch(language(i18n.language));        
        if (existingUser === true) {
          setIsModalOpen(true)
        }else{
          toast.success("Logged in Successfully");
          if (res.data.data?.usertype?.toLowerCase() === 'admin') {
            navigate('/adminhome');
          } else {
            navigate("/home");
          }
        }
      } else {
        toast.warn(res.statusText);
      }
    }
    );
  };
  const handleCancelClose = () => {
        setIsModalOpen(false);
  };


  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleClickSignin = (value) => {
    if (value == "signin") {
      navigate("/signin");
    } else if (value == "signup") {
      navigate("/signup");
    }
  };

  const handleChangeRules = () => {
    navigate("/rules");
  };
  const handleChangeTnC = () => {
    navigate("/termsncondition");
  };
  const handleChangePrivacy = () => {
    navigate("/privacy");
  };

  const GotoHomePage = () => {
    navigate("/");
  }

  return (

    <div className=" Signin" dir={i18n.language == "ar" ? "rtl" : "ltr"}>
      <div className="row " style={{ borderRadius: "20px" }}>
        <div className="col-md-6 ">
          <div className="d-flex flex-row justify-content-center pb-2 pt-1 mt-3 ">
            <div className="col-md-8  ">
              <div className="d-flex flex-row align-content-center p-1 pt-5">
                <div className="pt-2 col-8 d-flex justify-content-start">
                  <img src={headerlogo} width="70%" alt="" onClick={() => GotoHomePage()} />
                </div>
                <div className="col-2 d-flex align-items-center myarrow">
                  <Selectbox
                    option={option}
                    defaultValue={i18n.language}
                    handleChange={handleChange}
                    style={{
                      width: "100%",
                    }}
                    bordered={false}
                  />
                </div>
              </div>
              <div>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleClick}
                  
                >
                  <Form>
                    <div className=" col-md-10">
                      <label htmlFor="Email" className="mt-3">
                        {t('EMAIL')}
                      </label>
                      <Field
                        name="mail"
                        type="text"
                        className="form-control"
                        placeholder={t('EMAIL')}
                      // style={{width:"80%"}}
                      />
                    </div>
                    <ErrorMessage
                      name="mail"
                      component="div"
                      className="text-danger"
                    />
                    <div className=" col-md-10 position-relative">
                      <label htmlFor="password" className="mt-4">
                        {t('PASSWORD')}
                      </label>
                      <Field
                        name="password"
                        className="form-control"
                        placeholder={t('PASSWORD')}
                        component={PasswordShowHide}
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className=" col-md-10">
                      <div className="d-flex col-md-12 p-2 flex-row justify-content-between align-content-center p-2">
                        <div className="col d-md-flex justify-content-md-start labeltext">
                        </div>
                        <div
                          className="col-md-5 d-flex justify-content-end p-1 forgettext"
                          onClick={showModal}
                        >
                          {t("FORGOT_PASSWORD")}
                        </div>
                        <Forgetmodal
                          open={open}
                          onOk={handleOk}
                          onCancel={handleCancel}
                          title={
                            <h6 className="forgettitle">{t('FORGOT_PASSWORD')}</h6>
                          }
                          okButtonProps={{
                            disabled: true,
                          }}
                          cancelButtonProps={{
                            disabled: true,
                          }}
                        />
                      </div>
                    </div>
                    <div className=" col-md-10">
                      <button
                        type="submit"
                        style={{
                          backgroundColor: colors.common_color,
                          color: colors.white,
                          borderRadius: "8px",
                          width: "100%",
                          fontSize: "16px",
                          height: "44px",
                          marginTop: 20,
                          borderColor: "transparent",
                        }}
                      >
                        {t('SUBMIT')}
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>
              <div className="d-flex flex-column align-content-center justify-content-center">
                <div className="pt-3 col-md-10 d-flex flex-row justify-content-evenly align-content-center ">
                  <div className="dont_have_account">
                    {t("DONT_YOU_HAVE_ACCOUNT")}&nbsp;
                    <span className="signup_btn">
                      <a
                        href="/signup"
                        style={{ color: "#F48220", fontWeight: 500 }}
                      >{t("SIGNUP")}</a>{" "}

                    </span>
                  </div>
                </div>
                <div className="pt-3">
                  <hr
                    className="col-md-10"
                    style={{
                      background: "#9E9E9E",
                      borderColor: "#9E9E9E",
                      height: "1px",
                    }}
                  />
                </div>
                <div className="privacy_btn pt-2 col-md-10 d-flex flex-row justify-content-center align-content-center ">
                  <a onClick={handleChangePrivacy}>{t("PRIVACY_POLICY")}</a>&nbsp; | &nbsp;<a onClick={handleChangeTnC}>{t("TERMS_CONDITIONS")}</a>&nbsp; |
                  &nbsp;<a onClick={handleChangeRules}>{t("RULES")}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Exitinguser isModalOpen={isModalOpen}
          handleCancelClose={handleCancelClose} />
        <div className="col-md-6 d-flex flex-row justify-content-end ">
          <img src={Signinimg} className="imgside" alt="" />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signin;
