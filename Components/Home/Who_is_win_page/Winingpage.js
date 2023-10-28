import React, { useState, useEffect } from "react";
import "../../../Assets/Styles/Winingpage.css";
import Heading from "../../Heading";
import Buttons from "../../Buttons";
import { colors } from "../../Color";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import AdminServices from "../../Adminpage/Services/AdminServices";
import moment from "moment";
const Qatar =
  "https://el-stricker.s3.ap-south-1.amazonaws.com/teamLogo/EPL+-+S.png";
const England =
  "https://el-stricker.s3.ap-south-1.amazonaws.com/teamLogo/BHR.png";

const Winingpage = () => {
  let navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [teams, setTeams] = useState([{
    value: '8cnknu5d296s8effrjwvjzf2s',
    competitionId: "82wo38rqeizxlfjjhfjy4rx7u",
    label: 'Premier League (BHR)'
  },
  {
    value: '80foo89mm28qjvyhjzlpwj28k',
    competitionId: "2kwbbcootiqqgmrzs6o5inle5",
    label: 'Premier League (ENG)'
  }])
  const [BHR, setBHR] = useState()
  const [ENG, setENG] = useState()
  useEffect(() => {
    loadPickSixMatchDetails()
  }, []);


  const loadPickSixMatchDetails = async () => {
    let teamFirstData = await AdminServices.ChooseLeague(teams[0].value);
    let teamSecondData = await AdminServices.ChooseLeague(teams[1].value);
    let BHR = teamFirstData?.data?.data
    let ENG = teamSecondData?.data?.data
    let ENG_index = 0
    let BHR_index = 0
    for (let i = 0; i < BHR?.length; i++) {
      if (moment().isBefore(moment(BHR[i]?.startDate))) {
        BHR_index = i
        break;
      }
    }
    for (let i = 0; i < ENG?.length; i++) {
      if (moment().isBefore(moment(ENG[i]?.startDate))) {
        ENG_index = i
        break;
      }
    }
    setENG(ENG[ENG_index].matchDays)
    setBHR(BHR[BHR_index].matchDays)
  };
  const predict = (val) => {
    localStorage.setItem("SelectedMenuItem", t("PREDICTIONS"));

    if (teams[0].competitionId === val) {
      navigate("/prediction", {
        state: {
          comptid: teams[0].competitionId,
          inx: 0,
          visible: true,
          name: t("PICK_6"),
        },
      });
    } else {
      navigate("/prediction", {
        state: {
          comptid: teams[1].competitionId,
          inx: 0,
          visible: true,
          name: t("PICK_6"),
        },
      });

    }

  };
  return (
    <>
      <div className="col-md-12 Quick">
        <div className="col d-md-flex  justify-content-center py-2">
          <Heading
            heading="Predict the most Popular Matches"
            style={{
              color: "#F48220",
              fontSize: "22px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          />
        </div>
        <div className="col-md-12 d-md-flex justify-content-center gap-2 p-2">
          <div className="col-md-6 ">
            <div className="d-flex justify-content-center">
              <img src={Qatar} width="40%"></img>
            </div>
            <div className="d-flex justify-content-center teamnameInWin pt-2">
              {teams[1].label}
            </div>
            <div className="d-flex justify-content-center teamMatchdate pt-3">
              {ENG}
            </div>
            <div className="d-flex justify-content-center py-3">
              <Buttons
                style={{
                  backgroundColor: colors.common_color,
                  color: colors.white,
                  borderRadius: "6px",
                }}
                // value={"signin"}
                text={"Predict"}
                onClick={() => predict("2kwbbcootiqqgmrzs6o5inle5")}
              />
            </div>
          </div>
          <div className="verticleLine"></div>
          <div className="col-md-6 ">
            <div className="d-flex justify-content-center">
              <img src={England} width="40%"></img>
            </div>
            <div className="d-flex justify-content-center teamnameInWin pt-2">
              {teams[0].label}
            </div>
            <div className="d-flex justify-content-center teamMatchdate pt-3">
              {BHR}
            </div>
            <div className="d-flex justify-content-center py-3">
              <Buttons
                style={{
                  backgroundColor: colors.common_color,
                  color: colors.white,
                  borderRadius: "6px",
                }}
                text={"Predict"}
                onClick={() => predict("82wo38rqeizxlfjjhfjy4rx7u")}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Winingpage;
