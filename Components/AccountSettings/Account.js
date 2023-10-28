import React, { useEffect, useState } from 'react'
import InputBox from '../InputBox';
import Edit from "../../Assets/Images/Edit.png";
import Heading from '../Heading'
import '../../Assets/Styles/AccSettings.css'
import { useTranslation } from "react-i18next";
import Apidata from "../../services/LoginServices";
import { useSelector, useDispatch } from "react-redux";
import { logindata } from "../../Redux/Action";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import Buttons from '../Buttons';
import { colors } from '../../Components/Color';
import Modalpage from "../login/SignupCard.js/Matchseletionmodel/Modalpage.js";
import AccTeamCard from './AccTeamCard';
import Changepassword from './Changepassword';
import { Formik, Field, Form, ErrorMessage } from "formik";
import DropdownSearchForCountry from "./CountryDropdown"
import Select from "react-select";
import DropdownSearch from '../DropdownSearch';


const Account = () => {
    const { t, i18n } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const imgUrl = "https://el-stricker.s3.ap-south-1.amazonaws.com/teamLogo/SHG.png";
    const [otp, setOtp] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [country, setCountry] = useState();
    const [language, setlanguage] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [InitphoneNumber, setInitPhoneNumber] = useState();
    const [userDp, setUserDp] = useState();
    const [option, setOption] = useState([{ label: "En", value: "en" }, { label: "Ar", value: "ar" }]);
    const [selectedOptions, setSelectedOptions] = useState("");
    const dispatch = useDispatch();


    const [isOtp, setIsOtp] = useState(false)

    const showTeamModal = () => {
        setIsModalOpen(true);
    };

    const teamhandleOk = () => {
        setIsModalOpen(false);
    };

    const teamhandleCancel = () => {
        setIsModalOpen(false);
    };
    const userMobile = useSelector(state => state.userReducer);
    let userPhone = userMobile.user.mobileNumber
    const [file, setFile] = useState();
    const [isError, setIsError] = useState(false);
    const [errormsg, setErrorMsg] = useState("");

    const profilepicChange = async (e) => {
        const { value, files } = e.target;
        const [file] = e.target.files;
        setUserDp(URL.createObjectURL(file));
        setFile(files[0]);
    }

    const updateUserProfile = async () => {
        const formData = new FormData();
        formData.append('data', file)
        formData.append('data', file.name)
        formData.append('data', name)
        let profile = await Apidata.userProfilepic(formData, userMobile.user._id)
    }


    const handleChange = (e, name) => {
        const { value } = e.target.value;
        if (name == "otp") {
            setOtp(e.target.value)
        }
        if (name == "mobileNumber") {
            setIsOtp(true)
        }
    }

    useEffect(() => {
        initData();
    }, []);

    const initData = async (phoneNumber, key = 1) => {
        let data
        if (key == 0) {
            data = {
                "phoneNumber": phoneNumber
            }
        } else {
            data = {
                "phoneNumber": userPhone
            }
        }

        let userDetails = await Apidata.editUser(data);
        let datas = userDetails.data.Results;
        localStorage.setItem("country", datas.country)
        dispatch(logindata(userDetails.data.Results));
        setName(datas.name);
        setEmail(datas.email)
        setlanguage(datas.language)
        setCountry(datas.country)
        setSelectedOptions(datas.language);
        setPhoneNumber(datas.mobileNumber)
        setUserDp(datas.profilePic)
        setOtp(datas.otp)
    }

    
    const userUpdateApi = async () => {
        const userUpdateData = {
            "country": country,
            "name": name,
            "mobileNumber": phoneNumber,
            "email": email,
            "language": language,
        }
        let checking = await Apidata.updateUser(userUpdateData, userMobile.user._id)
        if (checking.status !== 200) {
            toast.warn(checking.data.Message)
            return
        }
        toast.success(checking.data.Message)
        await updateUserProfile();
        await initData(phoneNumber, 0)
        teamhandleCancel()
    }

    const handlePhnumber = (e) => {
        setPhoneNumber(e.target.value)
        if (e.target.value.length > 13) {
            setIsError("error");
            setErrorMsg("Phone number is not valid")
            return
        }
        setIsError();
        setErrorMsg("")

        if (e.target.value === userPhone) {
            setIsOtp(false)
        } else {
            setIsOtp(true)
        }



    }

    const getOtp = (value) => {
        const phoneNo = { phoneNo: phoneNumber, func: "otp" };
        Apidata.getotp(phoneNo).then((res) => {
            let otpData = res.data
            if (otpData.result.status !== 200) {
                toast.warn(otpData.result.message)
                return
            }
            toast.success(otpData.result.message)
        });
    };


    const verifyOtp = async (value) => {
        const verifyNo = { phoneNo: phoneNumber, code: otp };
        let otpVerified = await Apidata.verifyotp(verifyNo)
        if (otpVerified.status !== 200) {
            toast.warn(otpVerified.data.result.message);
            return
        }
        toast.success(otpVerified.data.result.message
        );
        setIsOtp(false)
    };

    const handleUpdate = async () => {
        if (!otp || !name || !email || !country || !language || !phoneNumber) {
            toast.warn("Some required field is missing...");
        }
        if (isOtp) {
            toast.warn("Verify your Mobile number");
        }
        else {
            userUpdateApi();

        }
    }

    const handleVerify = () => {
        verifyOtp()
    }
    const handleSentOtp = () => {
        getOtp()
    }

    const handleCountry = (value) => {
        setCountry(value)
    }

    const handleSelect = (data) => {
        setlanguage(data.value);
        setSelectedOptions(data.value)
    }

    const initialValues = {
        name: name,
        email: email,
        language: language,
        country: country,
        phnumber: phoneNumber,
    }
    const phoneRegExp = /(\+|00)(297|93|244|1264|358|355|376|971|54|374|1684|1268|61|43|994|257|32|229|226|880|359|973|1242|387|590|375|501|1441|591|55|1246|673|975|267|236|1|61|41|56|86|225|237|243|242|682|57|269|238|506|53|5999|61|1345|357|420|49|253|1767|45|1809|1829|1849|213|593|20|291|212|34|372|251|358|679|500|33|298|691|241|44|995|44|233|350|224|590|220|245|240|30|1473|299|502|594|1671|592|852|504|385|509|36|62|44|91|246|353|98|964|354|972|39|1876|44|962|81|76|77|254|996|855|686|1869|82|383|965|856|961|231|218|1758|423|94|266|370|352|371|853|590|212|377|373|261|960|52|692|389|223|356|95|382|976|1670|258|222|1664|596|230|265|60|262|264|687|227|672|234|505|683|31|47|977|674|64|968|92|507|64|51|63|680|675|48|1787|1939|850|351|595|970|689|974|262|40|7|250|966|249|221|65|500|4779|677|232|503|378|252|508|381|211|239|597|421|386|46|268|1721|248|963|1649|235|228|66|992|690|993|670|676|1868|216|90|688|886|255|256|380|598|1|998|3906698|379|1784|58|1284|1340|84|678|681|685|967|27|260|263)(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{4,20}$/

    const validationSchema = () => {
        return Yup.object().shape({
            name: Yup.string()
                .required("Name is required")
                .min(2, "Name must be at least 2 characters")
                .max(25, "Name must not exceed 25 characters"),
            email: Yup.string()
                .required("Email is required")
                .email("Email is invalid"),
            language: Yup.string()
                .required("Language is required"),
            country: Yup.string()
                .required("Country Name is required"),
            phnumber: Yup.string()
                .matches(phoneRegExp, " Phone number is not valid")
                .required("Phone Number is required"),

        });
    };

    return (
        <div className='col-md-12 accountBox'>
            <div className='col-12 d-flex flex-row justify-content-start' >
                <Heading
                    className=""
                    heading={t('ACCOUNT_SETTINGS')}
                    style={{ color: " #323232", fontSize: "16px", fontWeight: "600" }}
                />
            </div>
            <div className="col-12 d-flex column align-items-center mt-3">
                <img src={userDp} alt="" className='userImg' />
            </div>
            <div className='col-12 mt-1 d-flex align-items-center p-1 '>
                <label className='btn btn-light'><img className='labelEdit' src={Edit} alt="" /> {t('EDIT')}
                    <input type="file" className='inputfilepic' size="60" onChange={e => profilepicChange(e)} />
                </label>
            </div>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleUpdate}
                enableReinitialize
            >

                <Form>
                    <div className='col-12 d-flex flex-column flex-md-row justify-content-start '>
                        <div className='pt-4 p-2 col-12 col-md-3' style={{ fontSize: "12px" }}>
                            <label className='labeltext'>{t('NAME')}</label>
                            <div className='pt-2 inputbox'>
                                <Field
                                    required
                                    name="name"
                                    value={name}
                                    class="form-control"
                                    placeholder={t('NAME')}
                                    onChange={(e) => setName(e.target.value)}
                                    style={{
                                        borderRadius: 5,
                                        fontSize: 12,
                                        height: 39

                                    }}>
                                </Field>
                            </div>
                            <ErrorMessage
                                name="name"
                                component="div"
                                className="text-danger"
                            />
                        </div>


                        <div className='pt-0 pt-md-4 p-2 col-12 col-md-3' style={{ fontSize: "12px" }}>
                            <label className='labeltext'>{t('EMAIL')}</label>
                            <div className='pt-2 inputbox'>
                                <Field
                                    name="email"
                                    value={email}
                                    required
                                    class="form-control"
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={t('EMAIL')}
                                    style={{
                                        borderRadius: 5,
                                        fontSize: 12,
                                        height: 39
                                    }}>
                                </Field>
                            </div>
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-danger"
                            />
                        </div>



                        <div className='pt-0 pt-md-4 p-2 col-12 col-md-3' style={{ fontSize: "12px" }}>
                            <label className='labeltext'>{t('LANGUAGE')}</label>
                            <div className='pt-2 inputbox'>
                                {/* <Field
                                    name="language"
                                    value={language}
                                    required
                                    class="form-control"
                                    placeholder={t('LANGUAGE')}
                                    style={{
                                        borderRadius: 5,
                                        fontSize: 12,
                                        height: 39
                                    }}
                                    onChange={(e) => {
                                        setlanguage(e.target.value);
                                        if (e.target.value.length > 10) {
                                            setIsError(true);
                                        }
                                    }}>
                                </Field> */}
                                <DropdownSearch
                                    handleSelect={handleSelect}
                                    selectedOptions={selectedOptions}
                                    placeholder={selectedOptions}
                                    optionList={option}
                                />
                            </div>
                            <ErrorMessage
                                name="language"
                                component="div"
                                className="text-danger"
                            />
                        </div>

                        <div className='pt-0 pt-md-4 p-2 col-12 col-md-3' style={{ fontSize: "12px" }}>
                            <label className='labeltext'>{t('COUNTRY')}</label>
                            <div className='pt-2 inputbox'>
                                <DropdownSearchForCountry setCountry={handleCountry}
                                    def={{ label: country, value: country }}
                                />

                            </div>
                            <ErrorMessage
                                name="country"
                                component="div"
                                className="text-danger"
                            />
                        </div>

                    </div>

                    <div className='col-12 d-flex flex-column flex-md-row justify-content-start '>
                        <div className='pt-0 pt-md-4 p-2 col-12 col-md-3 ' style={{ fontSize: "12px" }}>
                            <label className='labeltext'>{t('MOBILE_NO')}</label>
                            <div className='pt-2 inputbox'>
                                <Field
                                    name="phnumber"
                                    required
                                    status={isError}
                                    value={phoneNumber}
                                    class="form-control"
                                    placeholder={t('MOBILE_NUMBER')}
                                    style={{
                                        borderRadius: 5,
                                        // width: "80%"
                                        fontSize: 12,
                                        height: "40px",

                                    }}
                                    onChange={(e) => handlePhnumber(e)}
                                >
                                </Field>
                            </div>
                            <ErrorMessage
                                name="phnumber"
                                component="div"
                                className="text-danger"
                            />
                        </div>


                        {isOtp &&
                            <div className='col-12 col-md-9 d-flex  align-items-center'>
                                <div className='pt-4 pt-md-5 col-4 col-md-3' style={{ fontSize: "12px" }}>
                                    <Buttons
                                        style={{
                                            backgroundColor: colors.common_color,
                                            color: colors.white,
                                            borderRadius: "8px",
                                            width: 100,
                                            fontSize: "12px",
                                            height: "40px",
                                            marginTop: 0
                                        }}
                                        value={"Verify"}
                                        text={t('SEND OTP')}
                                        onClick={handleSentOtp}
                                    />
                                </div>
                                <div className='pt-0 pt-md-4 col-4 col-md-3  align-items-center' style={{ fontSize: "12px" }}>
                                    <label className='labeltext'>{t('OTP')}</label>
                                    <div className='pt-2 inputbox'>
                                        <InputBox
                                            required
                                            class="form-control"
                                            placeholder={t('OTP')}
                                            style={{
                                                borderRadius: 5,
                                                height: '35px',
                                                fontSize: 12,
                                            }}
                                            onChange={(e) => setOtp(e.target.value)}

                                        />
                                    </div>
                                </div>
                                <div className='pt-0 pt-md-4 d-flex ps-2 col-4 col-md-3'>
                                    {otp ?
                                        <div>
                                            <Buttons
                                                style={{
                                                    backgroundColor: colors.common_color,
                                                    color: colors.white,
                                                    borderRadius: "8px",
                                                    width: 100,
                                                    fontSize: "12px",
                                                    height: "40px",
                                                    marginTop: 29
                                                }}
                                                value={"Verify"}
                                                text={t('VERIFY')}
                                                onClick={handleVerify}
                                            />
                                        </div>
                                        : null
                                    }
                                </div>
                            </div>}
                    </div>
                    <div>
                        <Changepassword phoneNumber={phoneNumber} />
                    </div>
                    <div className='d-flex flex-column mt-3'>
                        <div className='col-6 d-flex flex-row justify-content-start  ' >
                            <Heading
                                className="p-2"
                                heading={t('MY_TEAMS_LEAGUES')}
                                style={{ color: " #323232", fontSize: "16px", fontWeight: "600" }}
                            />
                            <div className='d-flex align-items-center '>
                                <a
                                    onClick={showTeamModal}
                                    class="btn btn-light text-center">
                                    <img src={Edit} alt="" style={{ width: 15, }} />
                                </a>
                                <Modalpage
                                    open={isModalOpen}
                                    onOk={teamhandleOk}
                                    okText="Select Teams"
                                    onCancel={teamhandleCancel}
                                    title="Select teams to follow"
                                    progress="update"
                                />
                            </div>
                        </div>
                        <div className='p-2 '>
                            <AccTeamCard />
                        </div>
                    </div>
                    <div className='pt-4 p-2 col-md-12 d-flex flex-row justify-content-center'>
                        <Buttons
                            type="submit"
                            style={{
                                backgroundColor: colors.common_color,
                                color: colors.white,
                                borderRadius: "8px",
                                width: 210,
                                fontSize: "16px",
                                height: "40px",
                                marginTop: 29
                            }}
                            value={"Submit"}
                            text={t('SUBMIT')}
                            onClick={handleUpdate}
                        />
                    </div>
                </Form>
            </Formik>

            <div class="mb-5 pb-5"></div>
            <br /><br />
        </div>

    )
}
export default Account