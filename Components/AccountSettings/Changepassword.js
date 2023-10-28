import React, { useState } from 'react'
import Forgetmodal from '../ForgetPage/Forgetmodal/Forgetmodal';
import PasswordInputbox from '../PasswordInputbox';
import { colors } from '../../Components/Color';
import Buttons from '../Buttons';
import { useTranslation } from "react-i18next";

const Changepassword = ({ phoneNumber }) => {
    const { t, i18n } = useTranslation();
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [oldPassword, setOldPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = (e) => {
        setOpen(false);
    };

    const handleCancel = (e) => {
        setOpen(false);
    };
    const handleChange = (e) => {
        setEmail({ email: e.target.value })
    }

    return (
        <div className='d-flex flex-row justify-content-between' dir={i18n.language == "ar" ? "rtl" : "ltr"}>
            <div className='p-2  d-flex flex-row mt-4 '>
                <Buttons
                    style={{
                        color: colors.black,
                        borderRadius: "8px",
                        width: "100%",
                        fontSize: "16px",
                        height: "40px"
                    }}
                    value={"Submit"}
                    text={t('CHANGE_PASSWORD')}
                    onClick={showModal}
                />
            </div>
            <Forgetmodal
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                func={"ChangePassword"}
                title={<h6 className='forgettitle'>{t('CHANGE_PASSWORD')}</h6>}
                phoneNumber={phoneNumber}
                okButtonProps={{
                    disabled: true,
                }}
                cancelButtonProps={{
                    disabled: true,
                }}
                data={
                    <div>
                        <div className='p-2'>
                            <PasswordInputbox
                                value={oldPassword}
                                size="large"
                                onChange={(e) => handleChange(e)}
                                required
                                allowClear
                                style={{
                                    borderRadius: "5px",
                                }}
                                placeholder={t('OLD_PASSWORD')}
                            />
                        </div>
                        <div className='pt-2 p-2'>
                            <PasswordInputbox
                                value={newPassword}
                                size="large"
                                onChange={(e) => handleChange(e)}
                                required
                                allowClear
                                style={{
                                    borderRadius: "5px",
                                }}
                                placeholder={t('NEW_PASSWORD')}
                            />
                        </div>
                        <div className='pt-2 p-2'>
                            <PasswordInputbox
                                value={confirmPassword}
                                size="large"
                                onChange={(e) => handleChange(e)}
                                required
                                allowClear
                                style={{
                                    borderRadius: "5px",
                                }}
                                placeholder={t('CONFORM_PASSWORD')}
                            />
                        </div>
                        <div className='p-2  d-flex flex-row '>
                            <Buttons
                                style={{
                                    backgroundColor: colors.common_color,
                                    color: colors.white,
                                    borderRadius: "8px",
                                    width: "100%",
                                    fontSize: "16px",
                                    height: "40px"
                                }}
                                value={"Submit"}
                                text={t('SUBMIT')}
                            />
                        </div>
                    </div>
                }
            />

        </div>
    )
}
export default Changepassword;