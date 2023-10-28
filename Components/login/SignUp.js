import React, { useState } from "react";
import "../../Assets/Styles/Signin.css";
import Selectbox from "../Selectbox";
import CheckBox from "../CheckBox";
import { colors } from "../../Components/Color";
import headerlogo from "../../Assets/Images/headerlogo.svg";
import Signinimg from "../../Assets/Images/signupimage.png";
import { useNavigate } from "react-router-dom";
import Modalpage from "./SignupCard.js/Matchseletionmodel/Modalpage.js";
import { useTranslation } from "react-i18next";
import Apidata from "../../services/LoginServices";
import { toast, ToastContainer } from "react-toastify";
import { logindata, token } from "../../Redux/Action";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import DropdownSearchForCountryCode from "./CountrycodeDropdown";
import { useDispatch } from "react-redux";
import PasswordShowHide from "../../Components/login/PasswordShowHide";


const SignUp = ({ footer }) => {
  const [Checkboxvalue, setCheckboxvalue] = useState(false);
  const [mobileotpvar, setmobileotpvar] = useState(false);
  const [countryCode, setcountryCode] = useState("");
  const [countryName, setcountryName] = useState("");
  const [countryCodeSelected, setcountryCodeSelected] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [signup, setSignup] = useState({
    name: "",
    mobileNumber: "",
    email: "",
    otp: "",
    country: "",
    password: "",
    profilePic: "none",
    usertype: "User",
    terms_and_conditions: "YES",
    language: "En",
    dateofBirth: "1999-12-06",
  });
  const [option, setOption] = useState([
    { label: "EN", value: "en" },
    { label: "AR", value: "ar" },
  ]);
  const initialValues = {
    name: "",
    mail: "",
    password: "",
    otp: "",
    phnumber: "",
    checkbox: "",
    countryCode: "",
  };

  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  let navigate = useNavigate();

  var SignupElements = document.forms.signupform;
  var SignupData = new FormData(SignupElements);
  var phoneNumber = SignupData.get("phnumber");
  const OtpSendmsg = () => toast("OTP successfully sent to your number.");
  const SignupSucces = () =>
    toast("Your account is created successfully.");
  const Userallredyexist = () => toast("User already exists");
  const otpexists = () => toast("User with this phone number already exists");
  const Wrongotp = () => toast("You have entered the invalid OTP.");
  const handleChange = (value) => {
    i18n.changeLanguage(value);
    localStorage.setItem("Language", value);
  };
  const sendotp = async (value) => {
    const phoneNo = { phoneNo: countryCode + value.phnumber, func: "otp" };
    let verifymail = { mail: value.mail }
    let Getres = await Apidata.emailverify(verifymail)
    if (Getres.status === 200) {
      Apidata.getotp(phoneNo).then((res) => {
        if (res.data.result.status === 200) {
          OtpSendmsg();
          setmobileotpvar(true);
        } else if (res.data.result.status === 400) {
          otpexists();
        }
      });
    } else {
      toast.warn(Getres.statusText)
    }
  };


  const handleClick = (value) => {
    if (mobileotpvar == true) {
      signup.name = value.name;
      signup.mobileNumber = countryCode + value.phnumber;
      signup.email = value.mail;
      signup.password = value.password;
      signup.otp = value.otp;
      signup.country = countryName;
      setSignup(signup);
      const verifyNo = {
        phoneNo: countryCode + value.phnumber,
        code: value.otp,
      };
      Apidata.verifyotp(verifyNo).then((res) => {
        if (res.data.result.status === 200) {
          Apidata.signUp(signup).then((res) => {
            localStorage.setItem("Token", res.data.Token);
            dispatch(logindata(res.data.data));
            dispatch(token(res.data.Token));
            localStorage.setItem("Language", i18n.language);
            if (res.status === 200) {
              SignupSucces();
              showModal();
            } else if (res.status === 400) {
              Userallredyexist();
            }
          });
        } else if (res.data.result.status === 500) {
          Wrongotp();
        }
      });
    } else {
      sendotp(value);
    }
  };

  const handleClickSignin = (value) => {
    // showModal();
    if (value == "signin") {
      navigate("/signin");
    } else if (value == "signup") {
      navigate("/signin");
    }
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = () => {
    return Yup.object().shape({
      name: Yup.string()
        .required("Name is required")
        .min(2, "Name must be at least 2 characters")
        .max(25, "Name must not exceed 25 characters"),
      mail: Yup.string()
        .required("Email is required")
        .email("Email is invalid"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .max(16, "Password must not exceed 16 characters"),
      phnumber: Yup.string()
        .matches(phoneRegExp, " Phone number is not valid")
        .required("Phone Number is required"),
    });
  };


  const showModal = () => {
    setTimeout(() => {
      setIsModalOpen(true);
    }, 2000);
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
  const handleChangeTnC = () => {
    navigate("/termsncondition");
  };

  const handleCountryCode = (value) => {
    setcountryCode(value);
    setcountryCodeSelected(true);
  };

  const handleCountryName = (value) => {
    setcountryName(value);
  };

  const GotoHomePage = () => {
    navigate("/");
  }

  return (
    <div className="Signin" dir={i18n.language == "ar" ? "rtl" : "ltr"}>
      <div className="row " style={{ borderRadius: "20px" }}>
        <div className="col-md-6">
          <div className="d-flex flex-row justify-content-center pb-2 pt-3">
            <div className="col-md-8 ">
              <div className="d-flex flex-row align-content-center py-2">
                <div className="pt-2 col-8 d-flex justify-content-start">
                  <img src={headerlogo} width="70%" alt="" onClick={() => GotoHomePage()} />
                </div>
                <div className="col-2 d-flex align-items-center ">
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

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleClick}
              >
                {({ handleChange }) => {
                  return (
                    <Form id="signupform">
                      <div className=" col-md-10" style={{ fontSize: "12px" }}>
                        <label className="labeltext">{t("NAME")}</label>
                        <div className="pt-2 inputbox">
                          <Field
                            type="text"
                            className="form-control"
                            name="name"
                            placeholder={t("NAME")}
                            style={{
                              borderRadius: "5px",
                            }}
                          />
                        </div>
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div
                        className="pt-2 col-md-10"
                        style={{ fontSize: "12px" }}
                      >
                        <label className="labeltext">{t("EMAIL")}</label>
                        <div className="pt-2 inputbox">
                          <Field
                            type="text"
                            className="form-control"
                            name="mail"
                            placeholder={t("EMAIL")}
                            style={{
                              borderRadius: "5px",
                            }}
                          />
                          <ErrorMessage
                            name="mail"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div
                        className="pt-2 col-md-10 "
                        style={{ fontSize: "12px" }}
                      >
                        <label className="labeltext">{t("PASSWORD")}</label>
                        <div className="pt-2 inputbox position-relative">
                          <Field
                            name="password"
                            className="form-control"
                            placeholder={t("PASSWORD")}
                            component={PasswordShowHide}
                          />

                          <ErrorMessage
                            name="password"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <ErrorMessage name="number" component="div" />
                      <Form>
                        <div
                          className="pt-2 col-md-10 mobilesignup"
                          style={{ fontSize: "12px" }}
                        >
                          <label className="labeltext">
                            {t("MOBILE_NUMBER")}
                          </label>
                          <div className="pt-2 inputbox">
                            <div className=" col-12 d-flex flex-row gap-1 ">
                              <div style={{ width: "10rem" }}>
                                <DropdownSearchForCountryCode
                                  setCountry={handleCountryCode}
                                  setcountryName={handleCountryName}
                                />
                              </div>
                              <Field
                                name="phnumber"
                                type="tel"
                                className="form-control"
                                style={{
                                  borderRadius: "5px",
                                }}
                                placeholder={t("12 345 6789")}
                              />
                            </div>
                            <div class="d-flex ">
                              &nbsp;&nbsp;
                              <ErrorMessage
                                name="phnumber"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                        </div>
                      </Form>
                      {mobileotpvar ? (
                        <div>
                          <div
                            className="pt-2 col-md-10 "
                            style={{ fontSize: "12px" }}
                          >
                            <label className="labeltext">{t("OTP")}</label>
                            <div className="pt-2 inputbox">
                              <Field
                                name="otp"
                                className="form-control"
                                style={{
                                  borderRadius: "5px",
                                }}
                                maxLength={6}
                                placeholder={t("OTP")}
                              />
                            </div>
                          </div>
                          <div className="py-2 ">
                            <CheckBox
                              name="checkbox"
                              value={Checkboxvalue}
                              style={{ fontSize: "0.8rem", fontWeight: "400" }}
                              text="I accept the Terms and Conditions, Privacy Policy & Rules"
                              onChange={(e) => {
                                setCheckboxvalue(e.target.checked);
                              }}
                              checked={Checkboxvalue}
                            />
                          </div>
                        </div>
                      ) : null}
                      {mobileotpvar ? (
                        <div className="pt-2 col-md-10">
                          <button
                            type="submit"
                            style={
                              Checkboxvalue
                                ? {
                                  backgroundColor: colors.common_color,
                                  color: colors.white,
                                  borderRadius: "8px",
                                  width: "100%",
                                  fontSize: "16px",
                                  height: "44px",
                                  border: "none",
                                }
                                : {
                                  backgroundColor: "gray",
                                  borderRadius: "8px",
                                  color: colors.white,
                                  width: "100%",
                                  fontSize: "16px",
                                  height: "44px",
                                  border: "none",
                                  cursor: "notAllowed",
                                }
                            }
                            disabled={!Checkboxvalue}
                          >
                            {t('SIGNUP')}
                          </button>
                        </div>
                      ) : (
                        <div className="pt-2 col-md-10">
                          <button
                            type="submit"
                            style={{
                              backgroundColor: colors.common_color,
                              color: colors.white,
                              borderRadius: "8px",
                              width: "100%",
                              fontSize: "16px",
                              height: "44px",
                              border: "none",
                            }}
                            onClick={() => {
                              if (countryCode == "") {
                                setcountryCodeSelected(false);
                              } else {
                                setcountryCodeSelected(true);
                              }
                            }}
                          >
                            {t('VERIFY')}
                          </button>
                        </div>
                      )}
                    </Form>
                  );
                }}
              </Formik>
              <div className="d-flex flex-column align-content-center justify-content-center">
                <div className="pt-3 col-md-10 d-flex flex-row justify-content-evenly align-content-center ">
                  <div className="dont_have_account">
                    {t("DONT_YOU_HAVE_ACCOUNT")}&nbsp;
                    <span className="signup_btn">
                      <a
                        style={{ color: "#F48220", fontWeight: 500 }}
                        href="/signin"
                        onClick={() => handleClickSignin("signin")}
                      >
                        {t("SIGNIN")}
                      </a>
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
                <div className="privacy_btn col-md-10 d-flex flex-row justify-content-center align-content-center ">
                  <a onClick={handleChangePrivacy}>{t("PRIVACY_POLICY")}</a>&nbsp; |
                  &nbsp;<a onClick={handleChangeTnC}>{t("TERMS_CONDITIONS")}</a>&nbsp; | &nbsp;
                  <a onClick={handleChangeRules}>{t("RULES")}</a>
                </div>
              </div>
              <Modalpage
                open={isModalOpen}
                onOk={handleOk}
                okText="Select Teams"
                onCancel={handleCancel}
                title="Select teams to follow"
                footer={footer}
                progress="insert"
              />
            </div>
          </div>
        </div>
        <div className="col-md-6 d-flex flex-row justify-content-end">
          <img src={Signinimg} className="imgside" alt="" />
        </div>
      </div>
      <br />
      <ToastContainer />
    </div>
  );
};

export default SignUp;
