import React, { useState } from 'react'
import { colors } from '../Color';
import Apidata from "../../services/LoginServices";
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { t } from 'i18next';


const GetOtp = ({ mobile, setShow }) => {
    const { t, i18n } = useTranslation();
    const initialValues = {
        mobile: mobile
    }
    const validationSchema = () => {
        return Yup.object().shape({
            mobile: Yup.string()
                .max(15, 'Must be Correct code and Mobile number')
                .required('Required'),

        });
    }


    const openNotification = async (values) => {
        const verified = { "phoneNo": values.mobile, "func": "forgot" }
        let otpData = await Apidata.getotp(verified)
        setShow("verifyotp")

    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={openNotification}
        >
            <Form>
                <label htmlFor="Email" className='mt-4'>{t('MOBILE_NUMBER')}</label>
                <Field
                    name="mobile"
                    type="text"
                    className="form-control"
                    placeholder="MobileNo"
                />
                <ErrorMessage
                    name="mobile"
                    component="div"
                    className="text-danger"
                />


                <div className='py-2'>
                    <button
                        class="btn"
                        type="submit"
                        style={{
                            backgroundColor: mobile ? "#F48220" : "#F48220", opacity: mobile ? "0.9" : "0.4",
                            color: colors.white,
                            borderRadius: "8px",
                            width: "100%",
                            fontSize: "16px",
                            height: "44px",
                            marginTop: 30,
                            borderColor: "transparent",
                        }}
                    >{t('SEND_CODE')}</button>
                </div>

            </Form>
        </Formik>

    )
}
const VerifyOtp = () => {


    const initialValues = {
        newPassword: '',
        confirmpassword: '',
        code: ''
    }
    const validationSchema = () => {
        return Yup.object().shape({
            code: Yup.string()
                .max(6, 'Must be 6 characters')
                .required('Required'),
            newPassword: Yup.string()
                .max(20, 'Must be 8 characters')
                .required('Required')
                .matches('Password can Must be 8 characters.'),
            confirmpassword: Yup
                .string()
                .required('Required')
                .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')

        });
    }

    const confirmOtp = async (values) => {
        const verfiedOTP = { "phoneNo": values.mobile, "code": values.code }
        let verifyOtpData = await Apidata.verifyotp(verfiedOTP)

    }
    return (
        <Formik
            initialValues={{
                password: "",
                changepassword: ""
            }}
            validationSchema={Schema}
            onSubmit={() => { }}

        >

            {({ values, errors, handleSubmit, handleChange, handleBlur }) => {
                return (
                    <form onSubmit={handleSubmit}>
                        <label for="passowrd">{t('PASSWORD')}</label>
                        <input
                            type="password"
                            name="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                        />
                        <span class="error" style={{ color: "red" }}>
                            {errors.password}
                        </span>

                        <label for="passowrd">{t('CONFIRM_PASSWORD')}</label>
                        <input
                            type="password"
                            name="changepassword"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.changepassword}
                        />
                        <span class="error" style={{ color: "red" }}>
                            {errors.changepassword}
                        </span>
                    </form>
                );
            }}
        </Formik>

    )
}
const ForgetFormik = () => {
    const [mobile, setmobile] = useState("")
    const [show, setShow] = useState("generateOtp")

    return (
        <div className="col-12 px-2">
            {
                show == "generateOtp" ?
                    <GetOtp
                        mobile={mobile}
                        setmobile={setmobile}
                        setShow={setShow}
                    /> :
                    <VerifyOtp
                        mobile={mobile}
                        setmobile={setmobile}
                    />
            }
        </div>
    )
}
export default ForgetFormik;