import React, { useState } from "react";
import "../../Assets/Styles/PasswordShowHide.css";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useTranslation } from "react-i18next";


const PasswordShowHide = ({ field, form, placeholder }) => {
    const { t, i18n } = useTranslation();

    const [showHidePassword, changeShowHidePassword] = useState(false);
    const hasError = form.touched[field.name] && form.errors[field.name];
     
    return (
        <div className="input-container">
            <input
                style={{height:38}}
                type={showHidePassword ? "text" : "password"}
                {...field}
                className={hasError ? "input-error input-field" : "input-field"}
                placeholder={placeholder}
            />
            <i
                style={{borderColor:"#667085",height:38,textAlign:"center"}}
                className={hasError ? "icon-error icon" : "fa fa-key icon"}
                onClick={() => changeShowHidePassword(!showHidePassword)}
            >
                {showHidePassword ? (
                    <EyeTwoTone
                        className="iconColor"
                    />
                ) : (
                    <EyeInvisibleOutlined
                        className="iconColor"
                    />
                )}

            </i>
        </div>
    );
};

export default PasswordShowHide;
