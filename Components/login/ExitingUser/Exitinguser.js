import React, { useState } from 'react'
import { Modal } from "antd";
import { colors } from '../../Color';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import PasswordShowHide from "../PasswordShowHide";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Apidata from "../../../services/LoginServices";

const Exitinguser = ({ isModalOpen, handleCancelClose }) => {
    const [geterror, setgeterror] = useState("");
    const { t, i18n } = useTranslation();
    let navigate = useNavigate();
    const userMobile = useSelector(state => state.userReducer);

    const ChangePasswordsuccesmsg = () => toast.success("Password changed successfully.");

    
    
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
      
      const userHandel = async (name) => {
        const userUpdateData = {
            "password":name.confirmpassword,
            "existingUser":false
        }      
        let checking = await Apidata.updateUser(userUpdateData, userMobile.user._id)
        ChangePasswordsuccesmsg();
        handleCancelClose()

      }

    return (
        <>
            <Modal
                title="Change Password"
                open={isModalOpen}
                onCancel={handleCancelClose}
                borderRadius={20}
                footer={[]}
            >             
                <Formik
                    initialValues={{
                        newPassword: "",
                        confirmpassword: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, actions) => {
                        userHandel(values).then(() => {
                          actions.resetForm({
                            values: {
                                newPassword: "",
                                confirmpassword: "",
                            },
                          });
                        });
                      }}

                >
                    <Form>  
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
                                    backgroundColor:"#F48220",
                                    border: "none",
                                }}
                            >
                                {t('SUBMIT')}
                            </button>
                        </div>
                    </Form>
                </Formik>
            </Modal>
        </>

    )
}

export default Exitinguser