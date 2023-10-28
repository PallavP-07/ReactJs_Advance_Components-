import React, { useState } from "react";
import "../../Assets/Styles/Forgetmain.css";
import { colors } from "../Color";
import { message } from "antd";
import Apidata from "../../services/LoginServices";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import DropdownSearchForCountryCode from "../login/CountrycodeDropdown";
import { t } from "i18next";
import PasswordShowHide from "../../Components/login/PasswordShowHide";

const GetOtp = ({ mob, setMob, setShow, func, phoneNumber }) => {
  const [countryCode, setcountryCode] = useState("");
  const [countryCodeSelected, setcountryCodeSelected] = useState(true);

  const handleChange = (e) => {
    setMob(e.target.value);
  };

  const { t, i18n } = useTranslation();

  const UserNotFound = () => toast("Invalid Mobile Number");
  const UserFound = () => toast("OTP has been sent to your registered mobile number");

  const openNotification = (values) => {
    let phoneNumer = "";
    if (func === "ChangePassword") {
      phoneNumer = phoneNumber;
    } else {
      phoneNumer = countryCode + values.phnumber;
    }
    localStorage.setItem("phonenumber", phoneNumer);
    const verified = { phoneNo: phoneNumer, func: "forgot" };
    Apidata.getotp(verified)
      .then((res) => {
        if (res.data.result.status == 200) {
          UserFound();
          setShow("verifyotp");
        } else if (res.data.result.status == 400) {
          UserNotFound();
        }
      })
      .catch((error) => {
        message.error({
          content: "Something went wrong please try again later",
          className: "custom-class",
        });
      });
  };

  const handleCountryCode = (value) => {
    setcountryCode(value);
    setcountryCodeSelected(true);
  };

  const initialValues = {
    phnumber: "",
    countryCode: "",
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = () => {
    return Yup.object().shape({
      phnumber: Yup.string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("Phone Number is required"),
    });
  };

  {
    return (
      <div dir={i18n.language == "ar" ? "rtl" : "ltr"}>
        {func !== "ChangePassword" ? (
          <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={openNotification}
          >
            <Form>
              <div className="pt-2 col-md-12 " style={{ fontSize: "12px" }}>
                <div className=" col-12 d-flex flex-row gap-1 ">
                  <div style={{ width: "7rem" }}>
                    <DropdownSearchForCountryCode
                      setCountry={handleCountryCode}
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
                  <div className="text-danger">
                    {countryCodeSelected ? null : "Country code required"}
                  </div>
                  &nbsp;&nbsp;
                  <ErrorMessage
                    name="phnumber"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>

              <div className="py-2 pt-3 text-center">
                <button
                  class="btn"
                  style={{
                    color: colors.white,
                    borderRadius: 5,
                    fontSize: "15px",
                    width: "45%",
                    height: "2.3rem",
                    backgroundColor: mob ? "#F48220" : "#F48220",
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
                  {t('SEND_CODE')}
                </button>
              </div>
            </Form>
          </Formik>
        ) : (
          <div>
            <div className="text-center">
              {`${t('OTP_SENT_DESCRIPTION')} ${phoneNumber}`}
            </div>
            <div className="text-center">
              {t('SENT_OTP_DESCRIPTION')}
            </div>
            <div className="py-2 pt-3 text-center">
              <button
                style={{
                  color: colors.white,
                  borderRadius: 5,
                  fontSize: "15px",
                  width: "30%",
                  height: "2.3rem",
                  backgroundColor: mob ? "#F48220" : "#F48220",
                  border: "none",
                }}
                onClick={() => {
                  if (countryCode == "") {
                    setcountryCodeSelected(false);
                  } else {
                    setcountryCodeSelected(true);
                  }
                  if (func === "ChangePassword") {
                    openNotification();
                  }
                }}
              >
                {t('SEND_CODE')}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
};

const VerifyOtp = ({ mob, onCancel }) => {
  const [geterror, setgeterror] = useState("");
  // Tost msg
  const { t, i18n } = useTranslation();
  const ChangePasswordsuccesmsg = () => toast("Password changed successfully.");
  const ChangePassworderrormsg = () => toast("Something went wrong - Try Again.");
  const Wrongotp = () => toast("You have entered an invalid OTP");

  const navigate = useNavigate();

  const handleClickfun = (value) => {
    Apidata.verifyotp({
      phoneNo: localStorage.getItem("phonenumber"),
      code: value.SecurityCode,
    }).then((res) => {
      if (res.data.result.status == 200) {
        Apidata.Forget({
          phoneNumber: localStorage.getItem("phonenumber"),
          password: value.newPassword,
        }).then((res) => {
          if (res.status == 200) {
            ChangePasswordsuccesmsg();
            onCancel();
            navigate("/signin");
          } else {
            ChangePassworderrormsg();
          }
        });
      } else if (res.data.result.status === 500) {
        Wrongotp();
      }
    });
  };

  const validationSchema = Yup.object().shape({
    newPassword: Yup.string().min(6).required("Password Required"),
    confirmpassword: Yup.string()
      .min(6)
      .when("newPassword", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("newPassword")],
          "Both password need to be the same"
        ),
      })
      .required("Confirm Password Required"),
  });


  return (
    <div dir={i18n.language == "ar" ? "rtl" : "ltr"}>
      <Formik
        initialValues={{
          SecurityCode: "",
          newPassword: "",
          confirmpassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleClickfun}

      >
        <Form>
          <Field
            name="SecurityCode"
            placeholder={t('OTP')}
            className="form-control "
            style={{
              borderRadius: "5px",
            }}
            maxLength={6}
          />

          <div className="pt-2 position-relative">
            <Field
              name="newPassword"
              placeholder={t('NEW_PASSWORD')}
              component={PasswordShowHide}
              className="form-control"
              style={{
                borderRadius: "5px",
              }}
            />
            <ErrorMessage
              name="newPassword"
              component="div"
              className="text-danger"
            />
          </div>

          <div className="pt-2 position-relative">
            <Field
              name="confirmpassword"
              placeholder={t('CONFIRM_PASSWORD')}
              className="form-control"
              component={PasswordShowHide}
              style={{
                borderRadius: "5px",
              }}
            />
          </div>
          <ErrorMessage
            name="confirmpassword"
            component="div"
            className="text-danger"
          />
          <div>
            <span className="text-danger">{geterror}</span>
          </div>

          <div className="py-2 text-center">
            <button
              type="submit"
              style={{
                color: colors.white,
                borderRadius: 5,
                fontSize: "15px",
                width: "30%",
                height: "2.3rem",
                backgroundColor: mob ? "#F48220" : "#F48220",
                border: "none",
              }}
            >
              {t('CONFIRM')}
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

const ForgetMain = (props) => {
  const [mob, setMob] = useState("");
  const [show, setShow] = useState("generateOtp");

  return (
    <div className="col-12 px-2">
      {show == "generateOtp" ? (
        <GetOtp
          mob={mob}
          setMob={setMob}
          setShow={setShow}
          func={props.func}
          phoneNumber={props.phoneNumber}
        />
      ) : (
        <VerifyOtp mob={mob} setMob={setMob} onCancel={props.onCancel} />
      )}
    </div>
  );
};
export default ForgetMain;
