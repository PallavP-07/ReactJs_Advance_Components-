import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'
import { useTranslation } from 'react-i18next';
import Homeimg from "../../Assets/Images/Homeimg.svg"
import Resultimg from "../../Assets/Images/Resultimg.svg"
import Predictionimg from "../../Assets/Images/Predictionimg.svg"
import Prizeimg from "../../Assets/Images/Prizeimg.svg"
const Admin = ({ children }) => {
    const { t, i18n } = useTranslation();
    let navigate = useNavigate();
    const navList = [
        {
            name: t('FOOTBALL'),
            index: 0,
            visible: true,
        },
        {
            name: t("CRICKET"),
            index: 1,
            visible: false,
        },
        {
            name: t('BASKETBALL'),
            index: 2,
            visible: false,
        },
        {
            name: t('GOLF'),
            index: 3,
            visible: false,
        },
        {
            name: t('TENNIS'),
            index: 4,
            visible: false,
        },
        {
            name: t('HOCKEY'),
            index: 5,
            visible: false,
        },
    ]
    const [navlinks, setNavlinks] = useState(navList)

    useEffect(() => {
        setNavlinks(navList)
    }, [i18n.language]);


    const handleChangeTitle = (inx) => {
        navlinks.map((item) => {
            if (item.index == inx) {
                item.visible = true;
            } else {
                item.visible = false;
            }
            return item;
        });
        setNavlinks([...navlinks]);
    };
    const sideNavList = [
        {
            name: t('HOME'),
            img: Homeimg,
            index: 0,
            visible: true,
            link: "adminhome"
        },
        {
            name: t('PREDICTIONS'),
            img: Predictionimg,
            index: 1,
            visible: false,
            link: "adminprediction"
        },
        {
            name: t('PRIZES'),
            img: Prizeimg,
            index: 2,
            visible: false,
            link: "adminprizes"

        }, {
            name: t("SPONSORS_CLIENTS"),
            img: Resultimg,
            index: 3,
            visible: false,
            link: "adminsponser"
        },
    ]
    const [sideMenus, setSideMenus] = useState(sideNavList)

    useEffect(() => {
        setSideMenus(sideNavList)
    }, [i18n.language])

    const sidehandleChangeTitle = (data) => {
        sideMenus.map(item => {
            if (item.index === data.index) {
                item.visible = true
            } else {
                item.visible = false
            }
            return item
        })
        setSideMenus([...sideMenus])
        navigate(`/${data.link}`);
    }
    return (
        <>
            <Navbar
                navlink={navlinks}
                handleChangeTitle={handleChangeTitle}
            />
            <div className='landingpage ' dir={i18n.language == "ar" ? "rtl" : "ltr"} >
                <div className="row " >
                    <div className="col-md-2 sidebarstyle">
                        <Sidebar
                            sideMenus={sideMenus}
                            sidehandleChangeTitle={sidehandleChangeTitle} />
                    </div>
                    <div class="d-flex justify-content-center">
                        <div className="col-md-12">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin