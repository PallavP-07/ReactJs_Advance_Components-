import React, { useState, useRef, useEffect } from "react";
import "../Assets/Styles/Card.css";
import Miclogoicon from "../Assets/Images/Miclogoicon.svg";
import Netlogoicon from "../Assets/Images/Netlogoicon.svg";
import Vectorlogoicon from "../Assets/Images/predictEditSmall.svg";
import Liveicon from "../Assets/Images/Liveicon.svg";
import Buttons from "./Buttons";
import { useTranslation } from "react-i18next";
import utils from "./utils";
import { useNavigate } from "react-router-dom";
import { Modal, Tooltip } from "antd";
import Apidata from "../services/FixtureService";
import Loader from "./Loader";
import AdminServices from "../Components/Adminpage/Services/AdminServices";
import PicsixApidata from "../services/PredictionService"
const favIcon =
  "https://el-stricker.s3.ap-south-1.amazonaws.com/teamLogo/favicon.ico";

const Card = ({ style, data, value }) => {
  const contentRef = useRef(null);
  let navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [facts, setFacts] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (value) => {
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const predict = () => predictNav(data);
  const predictNav = (data) => {
    if (data.competitionFormat === "International cup") {
      navigate("/prediction", {
        state: {
          comptid: data.comptId,
          inx: 1,
          visible: true,
          name: t("KNOCKOUT_KNOWLEDGE"),
        },
      });
    } else {
      navigate("/prediction", {
        state: {
          comptid: data.comptId,
          inx: 0,
          visible: true,
          name: t("PICK_6"),
        },
      });
      localStorage.setItem("SelectedMenuItem", "Predictions");
    }
  };
  const navigateWidget = async (competitionId, macthId, seasonId) => {
    window.open('/widget' + '?competitionId=' + competitionId + '&macthId=' + macthId + '&seasonId=' + seasonId, '_blank', 'noopener,noreferrer');
  }

  const handleAnalysis = async (data) => {
    setIsModalOpen(true);
    setIsLoading(true);
    let GetMatchFacts = await Apidata.MatchFacts(data)
    setIsLoading(false);
    let GetMatchFactsResults = GetMatchFacts.data.data
    let factsArr = []
    GetMatchFactsResults.map((item) => {
      factsArr.push(item.fact)
    })
    setFacts([...factsArr])
  }
  return (
    <>
      <div
        className="content card"
        style={style}
        dir={i18n.language == "ar" ? "rtl" : "ltr"}
      >
        <div className="card-body text-center">
          <div className="col-12 d-flex flex-row">
            {data.button ? (
              <>
                <div className="col-8 d-flex flex-row justify-content-start">
                  <h5 className=" grouptitle">{data.Group}</h5>
                </div>
                {value == 1 ? (
                  <div className="col-4 col-md-4 d-md-flex flex-md-row justify-content-end gap-2">
                    <Tooltip placement="top" title={"Prediction"}>
                      <img
                        className="predicimg"
                        src={Vectorlogoicon}
                        alt="Prediction"
                        width={25}
                        height={25}
                        onClick={predict}
                      ></img>
                    </Tooltip>
                    <Tooltip placement="top" title={"Live Action"}>
                      <img
                        className="predicimg"
                        onClick={() => navigateWidget(data.competitionId, data.macthId, data.seasonId)}
                        src={Miclogoicon}
                        alt="Live Action"
                        width={25}
                        height={25}
                      ></img>
                    </Tooltip>
                    <Tooltip placement="top" title={"Analysis"}>
                      <img
                        className="predicimg"
                        src={Netlogoicon}
                        alt="Analysis"
                        width={25}
                        height={25}
                        onClick={() => handleAnalysis(data.macthId)}
                      ></img>
                    </Tooltip>
                  </div>
                ) : (
                  <div className="col-md-4 d-md-flex flex-md-row justify-content-end gap-2">
                    <Tooltip placement="top" title={"Live Action"}>
                      <img
                        className="predicimg"
                        onClick={() => navigateWidget(data.competitionId, data.macthId, data.seasonId)}
                        src={Miclogoicon}
                        alt="Live Action"
                        width={25}
                        height={25}
                      ></img>
                    </Tooltip>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="col-md-12 d-md-flex flex-md-row justify-content-center">
                  <h5 className=" grouptitle mb-0">{data.Group}</h5>
                </div>
              </>
            )}
          </div>
          <div className="col-12 d-flex flex-column justify-content-between">
            <div className="d-flex flex-row justify-content-around align-items-center  mt-2">
              <div className=" col-5 d-flex flex-row justify-content-around align-items-center">
                <div className="teamname col-6 d-flex align-items-center justify-content-center">
                  {data.Ateam}
                </div>
                <div className="col-6 d-flex  align-content-center justify-content-center">
                  <img
                    src={data.Ateamimg}
                    className="img-fluid cardCountryLogo"
                    alt={data.AteamimgAlt}
                    onError={(event) => {
                      event.target.src = favIcon;
                      event.onerror = null;
                    }}
                  />
                </div>
              </div>
              <div className=" col-auto d-flex align-items-center p-1">
                {data.Vs}
              </div>
              <div className=" col-5 d-flex flex-row justify-content-around align-items-center">
                <div className="col-md-6 d-flex  align-content-center justify-content-center">
                  <img
                    src={data.Bteamimg}
                    className="img-fluid cardCountryLogo"
                    alt={data.BteamimgAlt}
                    onError={(event) => {
                      event.target.src = favIcon;
                      event.onerror = null;
                    }}
                  />
                </div>
                <div className="teamname col-md-6 d-flex  align-items-center justify-content-center">
                  {data.Bteam}
                </div>
              </div>
            </div>
          </div>
          {undefined !== data.goal && (
            <div>
              <h5 className="mb-0">{`${undefined == data.goal.home ? "" : data.goal.home
                }${undefined == data.goal.away ? "" : ` - ${data.goal.away}`
                }`}</h5>
            </div>
          )}
          {data.live ? (
            <div className="col-12 d-flex flex-row justify-content-center">
              <div className="col-6 ">
                <div className=" d-flex flex-row justify-content-end">
                  <img
                    src={Liveicon}
                    alt="mic"
                    width={25}
                    className="img-fluid"
                  ></img>
                </div>
              </div>
              <div className="col-6">
                <div className="cardlive d-flex flex-row justify-content-start">
                  Live
                </div>
              </div>
            </div>
          ) : (
            <div className="col-md-12 p-1 d-md-flex flex-md-row justify-content-center ">
              <div className=" timestyle d-flex flex-column justify-content-center align-items-center">
                <h5 className="pt-2">
                  {" "}
                  {utils.getLocalTimeByDays(data.date_time)}
                </h5>
              </div>
            </div>
          )}
          {data.btn ? (
            <div className="col-md-12  p-1 d-md-flex flex-md-row justify-content-center">
              <div className="col-md-4">
                <Buttons
                  // className=" p-2 "
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    borderRadius: 4,
                    width: "80%",
                    border: "1px #9A9696 solid",
                  }}
                  text={"Home"}
                  onClick={handleClick}
                />
              </div>
              <div className="col-md-4  ">
                <Buttons
                  // className=" p-2 "
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    borderRadius: 4,
                    width: "80%",
                    border: "1px #9A9696 solid",
                  }}
                  text={"Draw"}
                  onClick={handleClick}
                />
              </div>
              <div className="col-md-4">
                <Buttons
                  // className=" p-2 "
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    borderRadius: 4,
                    width: "80%",
                    border: "1px #9A9696 solid",
                  }}
                  text={"Away"}
                  onClick={handleClick}
                />
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <Modal
        title="Analysis"
        open={isModalOpen}
        onCancel={handleCancel}
        borderRadius={20}
        width={1100}
        style={{
          top: 20,
        }}
        footer={
          <></>
        }
      >
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {
              facts.map((item) => {
                return (
                  <ul className="analysisList">
                    <li>
                      {item}
                    </li>
                  </ul>
                )
              })
            }
          </>
        )}
      </Modal>
    </>
  );
};

export default Card;