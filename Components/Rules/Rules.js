import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { useTranslation } from 'react-i18next';
import Heading from '../Heading';
import "../../Assets/Styles/Rules.css"

const Rules = () => {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const navList = [
        {
            name: t('FOOTBALL'),
            index: 0,
            visible: true,
            // link: "home"
        },
        {
            name: t("CRICKET"),
            index: 1,
            visible: false,
            // link: "leaderboard"
        },
        {
            name: t('BASKETBALL'),
            index: 2,
            visible: false,
            // link: "leaderboard"
        },
        {
            name: t('GOLF'),
            index: 3,
            visible: false,
            // link: "leaderboard" 
        },
        {
            name: t('TENNIS'),
            index: 4,
            visible: false,
            // link: "leaderboard"
        },
        {
            name: t('HOCKEY'),
            index: 5,
            visible: false,
            // link: "leaderboard"
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
    return (
        <div>
            <Navbar
                navlink={navlinks}
                handleChangeTitle={handleChangeTitle}
            />

            <div className='rules' dir={i18n.language == "ar" ? "rtl" : "ltr"}>
                <div className="col-12">
                    <Heading
                        className="p-2"
                        heading={t("RULES")}
                        style={{ color: "#F48220", fontSize: "25px", fontWeight: "bold" }}
                    />
                </div>
                <div className='subheading1'>
                    <b>
                        <span>{t("RULE1_DESCRIPTION")}
                        </span>
                    </b>
                </div>
                <div className='subheading'>
                    <span>
                        <b>{t("RULE2_TILTE")}</b>
                        {t("RULE2_DESCRIPTION")}
                        <br />
                    </span>
                </div>
                <div className='subheading'>
                    <span>
                        <b>1) {t("DESCRIPTION")} </b>
                        {t("RULE_DESCRIPTION")}
                    </span>
                </div>
                <div className='subheading'>
                    <span>
                        <b>2) {t("ELIGIBILITY")} </b>
                        {t("RULE_ELGIBILITY")}
                        <br />
                        {t("RULES_ELIGIBILITY2")}
                    </span>
                </div>
                <div className='subheading'>
                    <span>
                        <b>3) {t("HOW_TO_PARTICIPATE")} </b>
                        {t("HOW_TO_PARTICIPATE_DESCRIPTION")}
                        <br />
                        {t("HOW_TO_PARTICIPATE_DESCRIPTION1")}
                        <br />
                        {t("HOW_TO_PARTICIPATE_DESCRIPTION2")}
                        <br />
                        {t("HOW_TO_PARTICIPATE_DESCRIPTION3")}
                    </span>
                </div>
                <div className='subheading'>
                    <div >
                        <span>
                            <b>4) {t("SCORING_AND_WINNING_DETERMINATIONS")} </b>
                            <br />
                            <b>{t("PRIZE_WINNER_DETERMINATION")}</b>
                            {t("SCORING_AND_WINNING1")}
                            <br />
                            <br />
                            {t("SCORING_AND_WINNING2")}
                            <br />
                            <br />
                            {t("SCORING_AND_WINNING3")}
                            <br />
                            <br />
                            {t("SCORING_AND_WINNING4")}
                        </span>
                    </div>
                    <table class="table table-bordered border-primary">
                        <tr>
                            <td><span>{t("PARTICIPATING_COUNTRY")}</span></td>
                            <td><span>{t("VALUE_CAP")}</span></td>
                        </tr>
                        <tr>
                            <td><span>{t("BAHRAIN")}</span></td>
                            <td><span>{t("BAHRAIN_AMOUNT")}</span></td>
                        </tr>
                        <tr>
                            <td><span>{t("EGYPT")}</span></td>
                            <td><span>{t("EGYPT_AMOUNT")}</span></td>
                        </tr>
                        <tr>
                            <td><span>{t("SAUDI_ARABIA")}</span></td>
                            <td><span>{t("SAUDI_ARABIA_AMOUNT")}</span></td>
                        </tr>
                        <tr>
                            <td><span>{t("UNITED_ARAB_EMIRATES")}</span></td>
                            <td><span>{t("UNITED_ARAB_EMIRATES_AMOUNT")}</span></td>
                        </tr>
                    </table>
                    <b>{t("PREDICTION_PERIOD_AND_ACORING_TITLE")}</b>
                    {t("PREDICTION_PEROID_AND_SCORING")}
                    <br />
                    {t("PREDICTION_PEROID_AND_SCORING1")}
                    <br />
                    <br />
                    {t("TIE_TITLE")}
                    <br />
                    {t("TIE_BREAK_RULES")}
                    <br />
                    {t("TIE1_TITLE")} {t("TIE1")}
                    <br />
                    {t("TIE2_TITLE")} {t("TIE2")}
                    <br />
                    {t("TIE3_TITLE")} {t("TIE3")}
                    <br />
                    {t("TIE4_TITLE")} {t("TIE4")}
                    <br />
                    {t("TIE5_TITLE")} {t("TIE5")}
                    <br />
                    {t("TIE6_TITLE")} {t("TIE6")}
                    <br />
                    {t("TIE7_TITLE")} {t("TIE7")}
                    <br />
                    {t("TIE_IF_THE_STILL")}
                    <br />
                    <br />
                    {t("TIE_TABULATION")}
                    <br />
                    {t("TIE_IN_THE_EVENT_DISCRIPTION1")}
                    <br />
                    {t("TIE_IN_THE_EVENT_DISCRIPTION2")}
                    <br />
                    {t("TIE_IN_THE_EVENT_DISCRIPTION3")}
                </div>
                <div className='subheading'>
                    <span>
                        <b>5) {t("NOTIFICATION OF WINNERS_TITLE")} </b>
                        {t("NOTIFICATION OF WINNERS_DESCRIPTION")}
                    </span>
                </div>
                <div className='subheading'>
                    <span>
                        <b>6) {t("PRIZES")}: </b>
                        {t("PRIZES_DESCRIPTION")}
                    </span>
                </div>
                <div className='subheading'>
                    <span>
                        <b>7) {t("MISCELLANEOUS")} </b>
                        {t("MISCELLANEOUS_DESCRIPTION")}
                    </span>
                </div>
                <div className='subheading'>
                    <span>
                        <b>8) {t("LIMITATION_OF_LIABILITY_AND_DISASTER_OF_WARRANTIES")} </b>
                        {t("LIMITATION_OF_LIABILITY_AND_DISASTER_OF_WARRANTIES_DESCRIPTION")}
                    </span>
                </div>
                <div className='subheading'>
                    <span>
                        <b>9) {t("BINDING ARBITRATION")} </b>
                        {t("BINDING_ARBITRATION_DESCRIPTION")}
                    </span>
                </div>
                <div className='subheading'>
                    <span>
                        <b>10) {t("GOVERNING LAW AND JURISDICTION")}</b>
                        {t("GOVERNING LAW AND JURISDICTION_DESCRIPTION")}
                    </span>
                </div>
                <div className='subheading'>
                    <span>
                        <b>11) {t("PRIVACY")} </b>
                        {t("PRIVACY_DESCRIPTION")}
                    </span>
                </div>
                <div className='subheading'>
                    <span>
                        <b>12) {t("SPONSOR")} </b>
                        {t("SPONSOR_DESCRIPTION")}
                    </span>
                </div>
            </div>


        </div>
    )
}

export default Rules